import React, { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Initializing Codient AI...");

  useEffect(() => {
    // Console welcome message
    console.log(`
    🤖 CODIENT AI CODE REVIEWER
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    ✨ Features:
    • Smart code analysis with Gemini AI
    • Multi-language support (10+ languages)
    • Real-time syntax highlighting
    • Code quality suggestions
    
    🛠️ Tech Stack:
    • React + Vite
    • Node.js + Express
    • Google Gemini AI
    • PrismJS
    
    👨‍💻 Created by Tilak
    🌟 Making code review smarter!
    
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    // Simulate loading progress
    const steps = [
      { text: "Initializing Codient AI...", duration: 800 },
      { text: "Loading Neural Networks...", duration: 700 },
      { text: "Connecting to Gemini AI...", duration: 600 },
      { text: "Setting up Code Analyzer...", duration: 500 },
      { text: "Ready for Code Review!", duration: 400 },
    ];

    let currentStepIndex = 0;
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      setLoadingProgress(progress);

      if (currentStepIndex < steps.length - 1) {
        if (progress > (currentStepIndex + 1) * 20) {
          currentStepIndex++;
          setCurrentStep(steps[currentStepIndex].text);
        }
      }

      if (progress >= 100) {
        clearInterval(progressInterval);
        setCurrentStep("Ready for Code Review!");
      }
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Simple AI Logo */}
        <div className="ai-logo">
          <svg width="80" height="80" viewBox="0 0 80 80" className="logo-svg">
            <defs>
              <linearGradient
                id="aiGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="url(#aiGradient)"
              strokeWidth="2"
            />
            <circle cx="40" cy="40" r="8" fill="url(#aiGradient)" />
            <circle cx="25" cy="25" r="3" fill="url(#aiGradient)" />
            <circle cx="55" cy="25" r="3" fill="url(#aiGradient)" />
            <circle cx="25" cy="55" r="3" fill="url(#aiGradient)" />
            <circle cx="55" cy="55" r="3" fill="url(#aiGradient)" />
            <line
              x1="25"
              y1="25"
              x2="32"
              y2="32"
              stroke="url(#aiGradient)"
              strokeWidth="1"
            />
            <line
              x1="55"
              y1="25"
              x2="48"
              y2="32"
              stroke="url(#aiGradient)"
              strokeWidth="1"
            />
            <line
              x1="25"
              y1="55"
              x2="32"
              y2="48"
              stroke="url(#aiGradient)"
              strokeWidth="1"
            />
            <line
              x1="55"
              y1="55"
              x2="48"
              y2="48"
              stroke="url(#aiGradient)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="brand-name">CODIENT</h1>
        <p className="brand-subtitle">AI Code Reviewer</p>

        {/* Creator Info */}
        <div className="creator-info">
          <span className="creator-label">CREATED BY</span>
          <span className="creator-name">Tilak</span>
        </div>

        {/* Loading Spinner */}
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="progress-info">
            <span className="progress-percent">
              {Math.round(loadingProgress)}%
            </span>
            <span className="progress-status">{currentStep}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
