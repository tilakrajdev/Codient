import React, { useEffect } from "react";
import "./Loading.css";

const Loading = () => {
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
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Modern AI Neural Network Logo */}
        <div className="ai-logo-container">
          <svg
            className="ai-neural-logo"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="neuralGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#5b73ff" />
                <stop offset="100%" stopColor="#ff006e" />
              </linearGradient>
              <filter id="aiGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Central AI Core */}
            <circle
              cx="60"
              cy="60"
              r="8"
              fill="url(#neuralGradient)"
              filter="url(#aiGlow)"
              className="ai-core"
            />

            {/* Neural Network Nodes */}
            <circle
              cx="30"
              cy="30"
              r="4"
              fill="url(#neuralGradient)"
              className="neural-node node-1"
            />
            <circle
              cx="90"
              cy="30"
              r="4"
              fill="url(#neuralGradient)"
              className="neural-node node-2"
            />
            <circle
              cx="20"
              cy="60"
              r="4"
              fill="url(#neuralGradient)"
              className="neural-node node-3"
            />
            <circle
              cx="100"
              cy="60"
              r="4"
              fill="url(#neuralGradient)"
              className="neural-node node-4"
            />
            <circle
              cx="30"
              cy="90"
              r="4"
              fill="url(#neuralGradient)"
              className="neural-node node-5"
            />
            <circle
              cx="90"
              cy="90"
              r="4"
              fill="url(#neuralGradient)"
              className="neural-node node-6"
            />

            {/* Connection Lines */}
            <line
              x1="30"
              y1="30"
              x2="60"
              y2="60"
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              opacity="0.7"
              className="connection c1"
            />
            <line
              x1="90"
              y1="30"
              x2="60"
              y2="60"
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              opacity="0.7"
              className="connection c2"
            />
            <line
              x1="20"
              y1="60"
              x2="60"
              y2="60"
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              opacity="0.7"
              className="connection c3"
            />
            <line
              x1="100"
              y1="60"
              x2="60"
              y2="60"
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              opacity="0.7"
              className="connection c4"
            />
            <line
              x1="30"
              y1="90"
              x2="60"
              y2="60"
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              opacity="0.7"
              className="connection c5"
            />
            <line
              x1="90"
              y1="90"
              x2="60"
              y2="60"
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              opacity="0.7"
              className="connection c6"
            />

            {/* Data Flow Particles */}
            <circle r="2" fill="#00d4ff" className="data-particle p1">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d="M30,30 Q45,45 60,60" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#ff006e" className="data-particle p2">
              <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                <path d="M90,30 Q75,45 60,60" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        {/* Codient Text Logo */}
        <div className="text-logo">
          <span className="brand-text">CODIENT</span>
          <div className="ai-badge">AI POWERED</div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <p className="ai-tagline">Neural Code Analysis Loading...</p>
        </div>

        {/* Loading Animation */}
        <div className="loading-spinner">
          <div className="spinner-ring">
            <div className="spinner-dot"></div>
            <div className="spinner-dot"></div>
            <div className="spinner-dot"></div>
            <div className="spinner-dot"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="loading-status">Initializing AI Engine...</p>
        </div>

        {/* Creator Tag - Compact */}
        <div className="creator-compact">by Tilak</div>
      </div>
    </div>
  );
};

export default Loading;
