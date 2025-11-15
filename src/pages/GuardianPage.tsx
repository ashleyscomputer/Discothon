// src/pages/GuardianPage.tsx
import React from 'react'; 
// import './GuardianPage.css'; // We'll create this file next
// import { usePanicGuardian } from '../hooks/usePanicGuardian'; // We'll create this soon

export default function GuardianPage() {
  // We'll call our hook here
  // const { ... } = usePanicGuardian();

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">🛡</div>
          <h1>Panic</h1>
        </div>
        <p className="tagline">Your AI Guardian - Always listening, always protecting</p>
      </header>

      <div className="auth-notice" style={{ display: "none" }}>
        Authentication required for full features. Data stored locally.
      </div>

      <div className="status-bar">
        <div className="status-indicator">
          {/* This will be controlled by state */}
          <div className="status-dot"></div>
          <span>Monitoring for safety</span>
        </div>
        {/* This button will use an onClick handler */}
        <button className="settings-btn">⚙</button>
      </div>

      <main className="main-interface">
        <div className="conversation-area">
          <div className="message Panic-message">
            <div className="message-content">
              {/* This text will come from our hook */}
              <p>Hello! I'm Panic, your AI safety guardian. I'm always listening for your emergency word. You're never alone.</p>
              <span className="timestamp">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          {/* Messages will be rendered here from an array in our state */}
        </div>

        <div className="voice-indicator">
          <div className="voice-visualizer">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        </div>

        <div className="instructions">
          {/* This text will also come from state */}
          <p>Continuously listening for emergency word: "<strong>oranges</strong>"</p>
        </div>
      </main>

      {/* This panel will be shown conditionally */}
      <div className="emergency-panel" style={{ display: "none" }}>
        <div className="emergency-content">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-header">
            <h2>EMERGENCY ACTIVATED</h2>
            <p>Choose how to contact help:</p>
          </div>
          <div className="call-options">
            <button className="call-option-btn">💬 WhatsApp Message</button>
          </div>
          <button className="emergency-btn" style={{ background: "#6b7280", marginTop: "15px" }}>Cancel (False Alarm)</button>
        </div>
      </div>

      {/* This panel will also be shown conditionally */}
      <div className="settings-panel" style={{ display: "none" }}>
        <div className="settings-content">
          <div className="settings-header">
            <h2>Safety Settings</h2>
            <button className="close-settings-btn">✕</button>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="userName">Your Name</label>
              <input type="text" id="userName" placeholder="What should Panic call you?" />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyWord">Emergency Trigger Word</label>
              <input type="text" id="emergencyWord" placeholder="oranges" />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyWhatsApp">Emergency WhatsApp Contacts (comma-separated)</label>
              <input type="text" id="emergencyWhatsApp" placeholder="+27661234567,+27669876543" />
            </div>
          </div>
          <button className="save-btn">Save Settings</button>
        </div>
      </div>
    </div>
  );
}