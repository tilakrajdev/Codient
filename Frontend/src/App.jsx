import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { IoIosArrowDropdown } from "react-icons/io";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`);

  const [review, setReview] = useState(``);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [autoDetection, setAutoDetection] = useState(true);

  useEffect(() => {
    prism.highlightAll();

    // Simulate loading time - reduced for better UX
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Enhanced review function with custom prompt support
  async function reviewCode() {
    if (!code.trim()) {
      setReview("Please enter some code to review.");
      return;
    }

    setIsReviewing(true);
    setReview("🤖 Analyzing your code with AI...");

    try {
      // Build analysis prompt with custom prompt support
      const basePrompt = `You are Codient AI - an expert ${language.toUpperCase()} code reviewer. Analyze this code and provide a comprehensive yet concise review:

\`\`\`${language}
${code}
\`\`\``;

      const customAnalysisPrompt = customPrompt.trim()
        ? `${basePrompt}

**CUSTOM USER REQUEST:**
${customPrompt}

**Please address the custom request above along with providing structured feedback in this format:**`
        : basePrompt +
          "\n\n**Provide structured feedback in this EXACT format:**";

      const enhancedAnalysisPrompt = `${customAnalysisPrompt}

# 🔍 Code Analysis Results

## ⚠️ Issues Found
${
  code.length < 20
    ? "- Code snippet too short for detailed analysis"
    : "- [List 2-3 specific issues with line references if possible]"
}

## ⚡ Performance Improvements
\`\`\`${language}
// Before (current code issues)
${code.split("\n")[0] || "// Your code here"}

// After (optimized version)
// Show improved version here
\`\`\`

## 🛡️ Security & Best Practices
- **Security:** [Any security concerns or improvements]
- **Modern ${language.toUpperCase()}:** [Use latest language features]
- **Clean Code:** [Naming, structure, readability improvements]

## 🔧 Refactored Code
\`\`\`${language}
// Complete improved version
${
  code.length > 10
    ? "// Enhanced version of your code with fixes applied"
    : "// Paste more code for detailed refactoring"
}
\`\`\`

## 💡 Learning Points
- **Key Takeaway:** [Most important improvement]
- **Next Steps:** [What to focus on next]
- **Resources:** [Relevant documentation or patterns]

${
  customPrompt.trim()
    ? "\n## 🎯 Custom Analysis\n[Address the specific user request here]\n"
    : ""
}

---
*Analysis completed • Copy the improved code above*
      `;

      console.log(
        "Sending enhanced analysis request for",
        language,
        "code",
        customPrompt ? "with custom prompt" : ""
      );

      // Use environment variable for API URL, fallback to production URL
      const API_BASE_URL = import.meta.env.VITE_API_URL || "https://codient-beryl.vercel.app";
      
      const response = await axios.post(`${API_BASE_URL}/ai/get-review`, {
        code: enhancedAnalysisPrompt,
      });

      console.log("Response received:", response.data);

      // Extract review text from response
      const reviewText =
        typeof response.data === "string"
          ? response.data
          : response.data.response ||
            response.data.review ||
            response.data.message ||
            "No review available";

      setReview(reviewText);
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview(`# ❌ Code Analysis Failed

**Oops! Something went wrong with the AI analysis.**

## 🔧 Quick Troubleshooting:

### Backend Issues:
- ✅ **Check if server is running** on \`https://codient-beryl.vercel.app\`
- ✅ **Restart the backend** with \`npm start\`
- ✅ **Verify .env file** has Gemini API key

### Code Issues:
- ✅ **Ensure valid ${language.toUpperCase()} syntax**
- ✅ **Try a smaller code snippet** first
- ✅ **Check for special characters** that might break parsing

### Network Issues:
- ✅ **Check internet connection** for AI service
- ✅ **Disable VPN/Firewall** temporarily
- ✅ **Wait a moment** and try again

---

**Error Details:**
\`\`\`
${error.message}
\`\`\`

**Next Steps:**
1. Fix the issue above
2. Refresh the page
3. Try analyzing your code again

*Need help? Check the console (F12) for more details*`);
    } finally {
      setIsReviewing(false);
    }
  }

  // Enhanced language detection with manual override capability
  useEffect(() => {
    // Only auto-detect if auto detection is enabled and language selector is not being used manually
    if (autoDetection && !showLanguageSelector) {
      const detectLanguage = (code) => {
        const codeStr = code.toLowerCase().trim();

        // C Detection - HIGHEST PRIORITY to detect C code properly
        if (
          (codeStr.includes("#include<stdio.h>") ||
            codeStr.includes("#include <stdio.h>") ||
            codeStr.includes("stdio.h") ||
            codeStr.includes("stdlib.h") ||
            codeStr.includes("printf(") ||
            codeStr.includes("scanf(") ||
            codeStr.includes("malloc(") ||
            codeStr.includes("free(") ||
            codeStr.includes("int main(") ||
            codeStr.includes("int main()") ||
            codeStr.includes("void main(") ||
            codeStr.includes("return 0;") ||
            (codeStr.includes("#include") && codeStr.includes("printf")) ||
            (codeStr.includes("int main") && codeStr.includes("printf"))) &&
          !(
            codeStr.includes("cout") ||
            codeStr.includes("cin") ||
            codeStr.includes("std::") ||
            codeStr.includes("iostream") ||
            codeStr.includes("namespace") ||
            codeStr.includes("class ") ||
            codeStr.includes("#include <iostream>") ||
            codeStr.includes("#include<iostream>")
          )
        ) {
          return "c";
        }

        // Rust Detection - Move to top priority for better detection
        if (
          codeStr.includes("fn ") ||
          codeStr.includes("fn main") ||
          codeStr.includes("println!") ||
          codeStr.includes("use std::") ||
          codeStr.includes("let mut") ||
          codeStr.includes("match ") ||
          codeStr.includes("impl ") ||
          codeStr.includes("struct ") ||
          codeStr.includes("enum ") ||
          codeStr.includes("trait ") ||
          codeStr.includes("&str") ||
          codeStr.includes("vec!") ||
          codeStr.includes("option<") ||
          codeStr.includes("result<") ||
          codeStr.includes("&mut ") ||
          codeStr.includes("-> ") ||
          codeStr.includes("cargo ") ||
          codeStr.includes("#[derive") ||
          codeStr.includes("pub fn") ||
          codeStr.includes("mod ")
        ) {
          return "rust";
        }

        // Go Detection - Enhanced patterns
        if (
          codeStr.includes("package main") ||
          codeStr.includes("func main") ||
          codeStr.includes("import (") ||
          codeStr.includes("fmt.print") ||
          codeStr.includes("go func") ||
          codeStr.includes("defer ") ||
          codeStr.includes("make(") ||
          codeStr.includes("chan ") ||
          codeStr.includes("goroutine") ||
          codeStr.includes("select {") ||
          codeStr.includes("interface{}") ||
          codeStr.includes("func(")
        ) {
          return "go";
        }

        // C++ Detection - Enhanced patterns
        if (
          codeStr.includes("#include") &&
          (codeStr.includes("cout") ||
            codeStr.includes("cin") ||
            codeStr.includes("std::") ||
            codeStr.includes("iostream") ||
            codeStr.includes("namespace") ||
            codeStr.includes("class ") ||
            codeStr.includes("#include <iostream>") ||
            codeStr.includes("vector<") ||
            codeStr.includes("string ") ||
            codeStr.includes("auto ") ||
            codeStr.includes("template<"))
        ) {
          return "cpp";
        }

        // Python Detection - Enhanced patterns
        if (
          codeStr.includes("def ") ||
          codeStr.includes("import ") ||
          codeStr.includes("from ") ||
          codeStr.includes("print(") ||
          codeStr.includes("if __name__") ||
          codeStr.includes("elif ") ||
          codeStr.includes("range(") ||
          codeStr.includes("len(") ||
          codeStr.includes("lambda ") ||
          codeStr.includes("with ") ||
          codeStr.includes("yield ") ||
          codeStr.includes("async def") ||
          codeStr.includes("self.") ||
          codeStr.includes("class ") ||
          codeStr.includes("try:") ||
          codeStr.includes("except:")
        ) {
          return "python";
        }

        // Java Detection - Enhanced patterns
        if (
          codeStr.includes("public class") ||
          codeStr.includes("private ") ||
          codeStr.includes("public static void main") ||
          codeStr.includes("system.out") ||
          codeStr.includes("string[]") ||
          codeStr.includes("package ") ||
          codeStr.includes("import java") ||
          codeStr.includes("extends ") ||
          codeStr.includes("implements ") ||
          codeStr.includes("@override") ||
          codeStr.includes("arraylist") ||
          codeStr.includes("hashmap") ||
          codeStr.includes("public void") ||
          codeStr.includes("static ")
        ) {
          return "java";
        }

        // TypeScript Detection - Enhanced patterns with parameter type annotations
        if (
          codeStr.includes(": string") ||
          codeStr.includes(": number") ||
          codeStr.includes(": boolean") ||
          codeStr.includes("): ") ||
          codeStr.includes("interface ") ||
          codeStr.includes("type ") ||
          codeStr.includes("<T>") ||
          codeStr.includes("enum ") ||
          codeStr.includes("readonly ") ||
          codeStr.includes("export interface") ||
          codeStr.includes("import type") ||
          codeStr.includes("as ") ||
          (codeStr.includes("function") && codeStr.includes(": ")) ||
          (codeStr.includes("(") &&
            codeStr.includes(": ") &&
            codeStr.includes(")")) ||
          (codeStr.includes("class ") && codeStr.includes(": "))
        ) {
          return "typescript";
        }

        // JavaScript Detection - Enhanced patterns
        if (
          codeStr.includes("function") ||
          codeStr.includes("const ") ||
          codeStr.includes("let ") ||
          codeStr.includes("var ") ||
          codeStr.includes("console.log") ||
          codeStr.includes("=>") ||
          codeStr.includes("require(") ||
          codeStr.includes("export ") ||
          codeStr.includes("import ") ||
          codeStr.includes("document.") ||
          codeStr.includes("window.") ||
          codeStr.includes("settimeout") ||
          codeStr.includes("json.") ||
          codeStr.includes("array.") ||
          codeStr.includes("object.")
        ) {
          return "javascript";
        }

        // PHP Detection - Enhanced patterns
        if (
          codeStr.includes("<?php") ||
          (codeStr.includes("$") &&
            (codeStr.includes("echo ") ||
              codeStr.includes("print ") ||
              codeStr.includes("$_get") ||
              codeStr.includes("$_post") ||
              codeStr.includes("function ") ||
              codeStr.includes("class ") ||
              codeStr.includes("->") ||
              codeStr.includes("namespace ") ||
              codeStr.includes("use ") ||
              codeStr.includes("array(") ||
              codeStr.includes("foreach")))
        ) {
          return "php";
        }

        // Ruby Detection - Enhanced patterns
        if (
          (codeStr.includes("def ") && codeStr.includes("end")) ||
          codeStr.includes("puts ") ||
          codeStr.includes("require ") ||
          codeStr.includes(".each") ||
          codeStr.includes("attr_") ||
          (codeStr.includes("class ") && codeStr.includes("end")) ||
          codeStr.includes("module ") ||
          codeStr.includes("yield ") ||
          codeStr.includes("begin") ||
          codeStr.includes("rescue") ||
          codeStr.includes("gem ") ||
          codeStr.includes("@")
        ) {
          return "ruby";
        }

        // Additional language detection for other common languages
        if (
          codeStr.includes("using system") ||
          (codeStr.includes("namespace ") && codeStr.includes("class "))
        ) {
          return "csharp";
        }

        if (
          codeStr.includes("import ") &&
          codeStr.includes("fun ") &&
          codeStr.includes("val ")
        ) {
          return "kotlin";
        }

        if (
          codeStr.includes("import ") &&
          codeStr.includes("func ") &&
          codeStr.includes("var ")
        ) {
          return "swift";
        }

        // Default fallback
        return "javascript";
      };

      const detectedLang = detectLanguage(code);
      setLanguage(detectedLang);
    }
  }, [code, showLanguageSelector, autoDetection]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="language-indicator">
            <div className="auto-language-display">
              <span className="language-badge">
                {language === "javascript"
                  ? "JavaScript"
                  : language === "typescript"
                  ? "TypeScript"
                  : language === "python"
                  ? "Python"
                  : language === "java"
                  ? "Java"
                  : language === "c"
                  ? "C"
                  : language === "cpp"
                  ? "C++"
                  : language === "php"
                  ? "PHP"
                  : language === "ruby"
                  ? "Ruby"
                  : language === "go"
                  ? "Go"
                  : language === "rust"
                  ? "Rust"
                  : language === "csharp"
                  ? "C#"
                  : language === "kotlin"
                  ? "Kotlin"
                  : language === "swift"
                  ? "Swift"
                  : language.charAt(0).toUpperCase() + language.slice(1)}
              </span>
            </div>
          </div>

          {/* Circular Dropdown Button */}
          <div className="circular-dropdown">
            <button
              onClick={() => setShowCustomPrompt(!showCustomPrompt)}
              className="circular-dropdown-btn"
              title="Advanced options"
            >
              ▼
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: "absolute" }}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>

            {showCustomPrompt && (
              <div className="dropdown-card">
                <div className="dropdown-section">
                  <div className="dropdown-header">
                    <span className="dropdown-icon">🤖</span>
                    <span className="dropdown-title">
                      Auto Language Detection
                    </span>
                    <label className="dropdown-toggle">
                      <input
                        type="checkbox"
                        checked={autoDetection}
                        onChange={(e) => setAutoDetection(e.target.checked)}
                        style={{ marginRight: "0.5rem" }}
                      />
                      {autoDetection ? "ON" : "OFF"}
                    </label>
                  </div>
                  {autoDetection && (
                    <div className="dropdown-content">
                      <div className="dropdown-status">
                        Auto-detected: <strong>{language.toUpperCase()}</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="dropdown-section">
                  <div
                    className="dropdown-header"
                    onClick={() =>
                      setShowLanguageSelector(!showLanguageSelector)
                    }
                  >
                    <span className="dropdown-icon">🌐</span>
                    <span className="dropdown-title">Manual Language</span>
                    <span className="dropdown-chevron">
                      {showLanguageSelector ? "▼" : "▶"}
                    </span>
                  </div>

                  {showLanguageSelector && (
                    <div className="dropdown-content">
                      <select
                        value={language}
                        onChange={(e) => {
                          setLanguage(e.target.value);
                          setAutoDetection(false); // Disable auto detection when manually selecting
                        }}
                        className="dropdown-select"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="php">PHP</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                        <option value="csharp">C#</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="swift">Swift</option>
                      </select>
                      <div className="dropdown-status">
                        Manual mode: {language.toUpperCase()} selected
                      </div>
                    </div>
                  )}
                </div>

                <div className="dropdown-section">
                  <div className="dropdown-header">
                    <span className="dropdown-icon">🎯</span>
                    <span className="dropdown-title">Custom Analysis</span>
                  </div>
                  <div className="dropdown-content">
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Enter specific analysis request...&#10;&#10;Examples:&#10;• Security vulnerabilities&#10;• Performance optimizations&#10;• Error handling review&#10;• Modern language features&#10;• Code complexity analysis"
                      className="dropdown-textarea"
                      rows="5"
                    />
                    {customPrompt.trim() && (
                      <div className="dropdown-preview">
                        <strong>Active:</strong> {customPrompt.substring(0, 50)}
                        {customPrompt.length > 50 ? "..." : ""}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => {
                // Enhanced language mapping for PrismJS syntax highlighting
                const prismLangMap = {
                  javascript: "javascript",
                  typescript: "typescript",
                  python: "python",
                  java: "java",
                  c: "c",
                  cpp: "cpp",
                  php: "php",
                  ruby: "ruby",
                  go: "go",
                  rust: "rust",
                  csharp: "csharp",
                  kotlin: "kotlin",
                  swift: "swift",
                };

                const prismLang = prismLangMap[language] || "javascript";

                // Enhanced fallback handling for syntax highlighting
                try {
                  if (prism.languages[prismLang]) {
                    return prism.highlight(
                      code,
                      prism.languages[prismLang],
                      prismLang
                    );
                  } else {
                    // Try common alternative mappings
                    const altMapping = {
                      csharp: "clike",
                      kotlin: "kotlin",
                      swift: "swift",
                    };

                    const altLang = altMapping[prismLang];
                    if (altLang && prism.languages[altLang]) {
                      return prism.highlight(
                        code,
                        prism.languages[altLang],
                        altLang
                      );
                    }

                    // Final fallback to JavaScript
                    return prism.highlight(
                      code,
                      prism.languages.javascript,
                      "javascript"
                    );
                  }
                } catch (error) {
                  console.warn(
                    "Syntax highlighting failed, using plain text:",
                    error
                  );
                  return code; // Return plain code if highlighting fails
                }
              }}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          <div
            onClick={reviewCode}
            className={`review ${isReviewing ? "reviewing" : ""}`}
            disabled={isReviewing}
          >
            {isReviewing ? (
              <>
                <span className="review-spinner"></span>
                Reviewing...
              </>
            ) : (
              "Review Code"
            )}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review ||
              `# 🤖 Codient AI Code Reviewer

**Intelligent Code Analysis • Created by Tilak**

---

## � **Getting Started**
1. **Paste your code** in the left editor
2. **Language auto-detected** (${language.toUpperCase()})
3. **Click "Review Code"** for instant AI analysis
4. **Get actionable insights** with code examples

---

## ⚡ What You Get
- **🔍 Issues & Fixes** - Spot problems with solutions
- **⚡ Performance Boost** - Optimize your code efficiency  
- **🛡️ Security Check** - Vulnerability detection & fixes
- **📚 Best Practices** - Modern ${language.toUpperCase()} patterns
- **🔧 Ready Code** - Copy-paste improved versions

---

## 🎯 Supported Languages
\`JavaScript\` \`TypeScript\` \`Python\` \`Java\` \`C\` \`C++\` \`PHP\` \`Ruby\` \`Go\` \`Rust\` + More!

*AI can analyze any programming language, even if not listed above*

---

## 💡 Pro Tips
- Paste complete functions for better analysis
- Include imports/dependencies for context
- Try different languages - auto-detection works!

---

*Powered by Google Gemini AI • Start coding!* �`}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
