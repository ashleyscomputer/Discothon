// src/components/GuardianWidget.tsx
import React, { useState, useEffect } from 'react';
import { usePanicGuardian } from '../hooks/usePanicGuardian';
import './GuardianWidget.css'; // Import our new styles

export function GuardianWidget() {
  const {
    userProfile,
    messages,
    isEmergency,
    isListening,
    isSettingsOpen,
    activateEmergency, // We can use this for a manual button too
    cancelEmergency,
    saveSettings,
    openSettings,
    closeSettings,
  } = usePanicGuardian();

  // New state to control the chat window
  const [isChatOpen, setIsChatOpen] = useState(false);

  // State for the settings form inputs
  const [name, setName] = useState(userProfile.name);
  const [word, setWord] = useState(userProfile.emergencyWord);
  const [contacts, setContacts] = useState(userProfile.emergencyWhatsApp);

  // Update local form state if userProfile changes (e.g., after loading)
  useEffect(() => {
    setName(userProfile.name);
    setWord(userProfile.emergencyWord);
    setContacts(userProfile.emergencyWhatsApp);
  }, [userProfile]);

  const handleSave = () => {
    saveSettings({ name, emergencyWord: word, emergencyWhatsApp: contacts });
  };

  // This is the "small circle" button
  const renderTriggerButton = () => (
    <button className="guardian-trigger-button" onClick={() => setIsChatOpen(true)}>
      <div
        className={`guardian-status-dot ${
          isEmergency ? 'emergency' : isListening ? 'listening' : 'not-listening'
        }`}
      />
    </button>
  );

  // This is the chat panel
  const renderChatPanel = () => (
    <div className="guardian-panel-overlay">
      <div className="guardian-panel-content">
        <div className="guardian-chat-header">
          <h2>AI Guardian</h2>
          <button className="guardian-close-btn" onClick={() => setIsChatOpen(false)}>✕</button>
        </div>
        <div className="guardian-conversation-area">
          {/* Welcome Message */}
          <div className="guardian-message Panic-message">
            <div className="guardian-message-content">
              <p>Hello {userProfile.name || 'friend'}! I'm listening for "{userProfile.emergencyWord}".</p>
              <span className="guardian-timestamp">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          {/* Dynamic Messages */}
          {messages.map((msg, index) => (
            <div key={index} className={`guardian-message ${msg.type}-message`}>
              <div className="guardian-message-content">
                <p>{msg.text}</p>
                <span className="guardian-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="guardian-instructions">
          <p>Status: <strong>{isListening ? 'Monitoring' : 'Offline'}</strong></p>
        </div>
        <button className="settings-btn" onClick={openSettings} style={{marginRight: '10px'}}>⚙ Settings</button>
        <button className="guardian-emergency-btn" style={{background: '#cfa109'}} onClick={activateEmergency}>Manual Panic</button>
      </div>
    </div>
  );

  // This is the settings panel
  const renderSettingsPanel = () => (
    <div className="guardian-panel-overlay">
      <div className="guardian-panel-content guardian-settings-content">
        <div className="guardian-chat-header">
          <h2>Safety Settings</h2>
          <button className="guardian-close-btn" onClick={closeSettings}>✕</button>
        </div>
        <div className="guardian-form-group">
          <label htmlFor="userName">Your Name</label>
          <input type="text" id="userName" value={name} onChange={(e) => setName(e.target.value)} placeholder="What should Panic call you?" />
        </div>
        <div className="guardian-form-group">
          <label htmlFor="emergencyWord">Emergency Trigger Word</label>
          <input type="text" id="emergencyWord" value={word} onChange={(e) => setWord(e.target.value)} placeholder="oranges" />
        </div>
        <div className="guardian-form-group">
          <label htmlFor="emergencyWhatsApp">Emergency WhatsApp Contacts (comma-separated)</label>
          <input type="text" id="emergencyWhatsApp" value={contacts} onChange={(e) => setContacts(e.target.value)} placeholder="+27661234567" />
        </div>
        <button className="guardian-save-btn" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );

  // This is the emergency panel
  const renderEmergencyPanel = () => (
    <div className="guardian-emergency-panel">
      <div className="guardian-emergency-content">
        <div className="guardian-emergency-icon">🚨</div>
        <div className="guardian-emergency-header">
          <h2>EMERGENCY ACTIVATED</h2>
          <p>Contacting help...</p>
        </div>
        <div className="guardian-call-options">
          {/* This button is now just for show, as the hook auto-sends */}
          <button className="guardian-call-option-btn">💬 Sending WhatsApp...</button>
        </div>
        <button className="guardian-emergency-btn" onClick={cancelEmergency} style={{ background: "#6b7280", marginTop: "15px" }}>Cancel (False Alarm)</button>
      </div>
    </div>
  );

  // Main render logic for the component
  return (
    <>
      {/* The trigger button is always shown (unless in emergency) */}
      {!isEmergency && renderTriggerButton()}

      {/* Show panels on top based on state */}
      {isEmergency && renderEmergencyPanel()}
      {isSettingsOpen && renderSettingsPanel()}
      {isChatOpen && !isSettingsOpen && !isEmergency && renderChatPanel()}
    </>
  );
}