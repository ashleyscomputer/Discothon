// src/hooks/usePanicGuardian.ts
import { useState, useEffect, useCallback, useRef } from 'react';

// 1. Define types for our state
interface UserProfile {
  name: string;
  emergencyWord: string;
  emergencyWhatsApp: string;
}

interface Message {
  type: 'Panic'; // We'll just use 'Panic' for now
  text: string;
  timestamp: string;
}

// Helper to get profile from localStorage
const loadUserProfile = (): UserProfile => {
  const profile = localStorage.getItem('panicUserProfile');
  return profile
    ? JSON.parse(profile)
    : { name: '', emergencyWord: 'oranges', emergencyWhatsApp: '' };
};

// 2. Define the custom hook
export const usePanicGuardian = () => {
  // 3. Manage all state with useState
  const [userProfile, setUserProfile] = useState<UserProfile>(loadUserProfile);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // We use a ref to hold the recognition object so it's stable across renders
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 4. Convert class methods into stable useCallback functions
  const addMessage = useCallback((type: 'Panic', text: string) => {
    const newMessage: Message = {
      type,
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    // Add new messages, keeping existing ones
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const sendWhatsAppEmergency = useCallback(() => {
    const contacts = (userProfile.emergencyWhatsApp || '')
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c);

    if (!contacts.length) {
      addMessage('Panic', '⚠ No WhatsApp contacts configured.');
      return;
    }
    const message = `🚨 EMERGENCY! ${userProfile.name || 'I'} need help immediately! This is an automated alert.`;

    contacts.forEach((number) => {
      const url = `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      addMessage('Panic', `💬 WhatsApp message prepared for: ${number}`);
    });
  }, [userProfile, addMessage]);

  const activateEmergency = useCallback(() => {
    if (isEmergency) return; // Don't run if already in emergency state
    setIsEmergency(true);
    addMessage('Panic', '🚨 EMERGENCY DETECTED: Preparing WhatsApp messages...');
    sendWhatsAppEmergency();
  }, [isEmergency, addMessage, sendWhatsAppEmergency]);

  const cancelEmergency = useCallback(() => {
    setIsEmergency(false);
    addMessage('Panic', 'Emergency canceled. Resuming monitoring.');
  }, [addMessage]);

  const saveSettings = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('panicUserProfile', JSON.stringify(profile));
    setIsSettingsOpen(false);
    // This will cause the useEffect to restart if the word changed
  }, []);

  // 5. This useEffect handles the speech recognition setup and lifecycle
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addMessage('Panic', "⚠ Your browser doesn't support voice monitoring.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition; // Save to ref

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }

      if (transcript.trim()) {
        const emergencyWord = (userProfile.emergencyWord || 'oranges').toLowerCase();
        if (transcript.toLowerCase().includes(emergencyWord)) {
          activateEmergency();
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      addMessage('Panic', 'Speech recognition stopped. Please check permissions.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Automatically restart if not in an emergency
      if (!isEmergency) {
        setTimeout(() => recognition.start(), 500);
      }
    };

    recognition.start();

    // 6. Cleanup function: runs when component unmounts
    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [userProfile.emergencyWord, activateEmergency, addMessage, isEmergency]); // Re-run effect if these change

  // 7. Return all state and functions for the component to use
  return {
    userProfile,
    messages,
    isEmergency,
    isListening,
    isSettingsOpen,
    activateEmergency,
    cancelEmergency,
    saveSettings,
    openSettings: () => setIsSettingsOpen(true),
    closeSettings: () => setIsSettingsOpen(false),
  };
};