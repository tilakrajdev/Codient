
# 🚀 Codient (AI-Powered Code Reviewer)

An intelligent code review system built with the MERN stack that leverages artificial intelligence to analyze, review, and suggest improvements for code. This project enhances development efficiency by providing automated code reviews with detailed feedback and recommendations.

## 🌟 Features

- **AI-Powered Analysis**: Uses Google Gemini AI for intelligent code review
- **Syntax Highlighting**: Beautiful code display with PrismJS
- **Markdown Rendering**: Rich formatting for review feedback
- **Real-time Review**: Instant code analysis and suggestions
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Modern UI**: Clean and responsive React interface
- **RESTful API**: Well-structured backend with Express.js

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Gemini AI** - AI model for code analysis
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Secure API key management

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API calls
- **PrismJS** - Syntax highlighting
- **Markdown Rendering** - Rich text display
- **Modern CSS** - Responsive styling

## 📁 Project Structure

```
Codient/
├── Backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   └── ai.controllers.js
│   │   ├── routes/          # API routes
│   │   │   └── ai.routes.js
│   │   ├── services/        # Business logic
│   │   │   └── ai.service.js
│   │   └── app.js          # Express app configuration
│   ├── server.js           # Server entry point
│   └── package.json        # Dependencies and scripts
├── Frontend/               # React Vite application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API integration
│   │   ├── styles/         # CSS styling
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.js      # Vite configuration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tilakrajdev/Codient.git
   cd Codient
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the Backend directory:
   ```env
   GOOGLE_GEMINI_KEY=your_gemini_api_key_here
   PORT=5000
   ```

### 🔑 Getting Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start the Backend**
   ```bash
   cd Backend
   npm start
   ```

## 📚 API Documentation

### Endpoints

#### POST `/api/ai/review`
Reviews the provided code and returns AI-generated feedback.

**Request Body:**
```json
{
  "code": "your code here"
}
```

**Response:**
```json
{
  "success": true,
  "review": "AI-generated code review with suggestions",
  "timestamp": "2025-01-26T12:00:00.000Z"
}
```

## 🎯 Usage

1. **Open the application** in your browser
2. **Paste your code** in the input area
3. **Click "Review Code"** to get AI analysis
4. **View the results** with syntax highlighting and formatted feedback
5. **Implement suggestions** to improve your code quality

## ✨ Features in Detail

### Backend Features
- **AI Integration**: Seamless connection with Google Gemini AI
- **Error Handling**: Comprehensive error management
- **CORS Support**: Enables frontend-backend communication
- **Modular Architecture**: Clean separation of concerns
- **Environment Security**: Secure API key management

### Frontend Features
- **Vite Setup**: Lightning-fast development experience
- **PrismJS Integration**: Beautiful syntax highlighting for multiple languages
- **Markdown Rendering**: Rich formatting for AI responses
- **Responsive Design**: Works on desktop and mobile devices
- **Axios Integration**: Robust HTTP client for API calls
- **Enhanced Layout**: Modern and intuitive user interface

## 🔧 Configuration

### Backend Configuration
- **Port**: Configurable via environment variable
- **CORS**: Enabled for frontend domain
- **AI Model**: Uses Gemini 2.5 Flash for optimal performance

### Frontend Configuration
- **Vite**: Optimized build configuration
- **PrismJS**: Support for JavaScript, Python, Java, and more
- **Styling**: Modern CSS with responsive design

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/Codient.git
   cd Codient
   ```
3. **Switch to the dev branch**
   ```bash
   git checkout dev
   ```
4. **Create your feature branch from dev**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
5. **Make your changes and commit**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```
7. **Open a Pull Request to the `dev` branch**

### Branch Structure
- **`main`** - Production-ready code
- **`dev`** - Development branch for new features
- **`feature/*`** - Individual feature branches

### Contribution Guidelines
- All pull requests should target the `dev` branch
- Ensure your code follows the existing style
- Add tests for new features
- Update documentation as needed
- Make sure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful code analysis
- PrismJS for beautiful syntax highlighting
- React and Vite communities for excellent tools
- Express.js for robust backend framework

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Documentation: Check the wiki section

## 🚀 Future Enhancements

- [ ] Multi-language support for more programming languages
- [ ] User authentication and profile management
- [ ] Code history and review tracking
- [ ] Integration with GitHub/GitLab
- [ ] Custom AI model training
- [ ] Collaborative code review features
- [ ] Plugin system for IDE integration

---

**Happy Coding!** 🎉

Made with ❤️ by [Tilak Raj Dev](https://github.com/tilakrajdev)
