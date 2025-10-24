# SigmaLearn - Open Source Academic Math Platform

<div align="center">

**Master mathematics with step-by-step solutions**

An open-source platform for Computer Science and Data Science students to learn Linear Algebra, Calculus, and Discrete Math with interactive, detailed explanations.

[Live Demo](#) · [Documentation](#getting-started) · [Contributing](#contributing)

</div>

---

## ✨ Features

- **📚 Knowledge Base**: Curated collection of mathematical topics with clear definitions and examples
- **🔬 Step-by-Step Solver**: Interactive solver powered by SymPy showing every step of the solution
- **📐 Four Core Subjects**: Linear Algebra, Calculus I, Calculus II, and Discrete Mathematics
- **🎯 LaTeX & Plain Text Input**: Flexible math input supporting both LaTeX and plain text notation
- **🔍 Instant Search**: Client-side full-text search across all topics using Lunr.js
- **📱 Responsive Design**: Beautiful, accessible interface that works on all devices
- **🆓 100% Free & Open Source**: MIT licensed code, CC BY-SA licensed content

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- Python 3.10+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sigmalearn.git
   cd sigmalearn
   ```

2. **Set up the frontend**
   ```bash
   cd client
   npm install
   npm run dev  # Runs on http://localhost:5173
   ```

3. **Set up the backend** (in a new terminal)
   ```bash
   pip install -r server/requirements.txt
   uvicorn server.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Visit the application**
   - Frontend: http://localhost:5173
   - API Docs: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Frontend
VITE_API_BASE=http://localhost:8000/api

# Backend (optional)
ENABLE_OCR=false
ENABLE_JAVA=false
MAX_STEPS=200
```

## 📖 Usage

### Browsing Topics

1. Navigate to the Knowledge Base
2. Use the search bar or filter by subject/tags
3. Click on any topic to view detailed content

### Using the Solver

1. Go to any subject page (e.g., Linear Algebra)
2. Enter your mathematical expression in the solver panel
3. Choose between plain text or LaTeX input
4. Click "Solve Step-by-Step" to see the detailed solution

### Example Queries

**Calculus**:
- `x^2 * sin(x)` - Product rule differentiation
- `x * exp(x)` - Integration by parts

**Linear Algebra**:
- `[[1,2,1],[2,4,0],[3,6,3]]` - Matrix RREF
- `[[2,1],[1,2]]` - Eigenvalues

**Discrete Math**:
- `!(A & B)` - De Morgan's law
- `C(10, 3)` - Combinations

## 🏗️ Architecture

### Tech Stack

**Frontend**:
- React 18 + Vite + TypeScript
- Tailwind CSS for styling
- KaTeX for math rendering
- MathLive for math input
- Lunr.js for client-side search
- Wouter for routing

**Backend**:
- FastAPI (Python)
- SymPy for symbolic mathematics
- Pydantic for validation
- Step-by-step logging system

### Project Structure

```
sigmalearn/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
├── server/                # Backend FastAPI application
│   ├── solvers/          # Math solver modules
│   │   ├── algebra.py
│   │   ├── calculus.py
│   │   ├── linear_algebra.py
│   │   └── discrete.py
│   ├── main.py           # FastAPI app
│   ├── schemas.py        # Pydantic models
│   └── config.py         # Configuration
├── content/              # Sample topic files (embedded in code)
└── shared/              # Shared TypeScript schemas
```

## 📝 Adding New Topics

Topics are currently embedded in `client/src/lib/content.ts`. To add a new topic:

1. Add a new entry to the `SAMPLE_TOPICS` object:

```typescript
"subject-name/topic-slug": `---
title: "Your Topic Title"
subject: "linear-algebra"  // or calculus-1, calculus-2, discrete-math
tags: ["tag1", "tag2"]
level: "undergraduate"     // or graduate, advanced
description: "Brief description"
---

# Your Topic Content

Use inline math with $...$  or display math with $$...$$

## Example

Find the derivative of $x^2$...
`
```

2. The search index will automatically update when the app loads

## 🔌 API Reference

### POST /api/solve

Solve mathematical problems with step-by-step solutions.

**Request Body**:
```json
{
  "subject": "la" | "calc1" | "calc2" | "discrete",
  "query": "x^2 + 3*x - 5",
  "mode": "auto" | "derivative" | "integral" | "rref" | "eigen" | ...,
  "options": {
    "var": "x"
  }
}
```

**Response**:
```json
{
  "ok": true,
  "result_latex": "...",
  "steps": [
    {
      "index": 1,
      "rule": "Power Rule",
      "before_latex": "x^{2}",
      "after_latex": "2x",
      "note": "Optional explanation"
    }
  ],
  "warnings": [],
  "elapsed_ms": 15
}
```

### GET /health

Health check endpoint returning system status.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add Topics**: Create new mathematical content
2. **Improve Solvers**: Enhance step-by-step algorithms
3. **Fix Bugs**: Report and fix issues
4. **Improve UI**: Enhance the user experience
5. **Write Tests**: Add test coverage

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

- **Code**: MIT License - see [LICENSE](LICENSE)
- **Content**: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)

## 🙏 Acknowledgments

- Built with [SymPy](https://www.sympy.org/) for symbolic mathematics
- Math rendering by [KaTeX](https://katex.org/)
- Math input powered by [MathLive](https://cortexjs.io/mathlive/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📧 Contact

Project Link: [https://github.com/yourusername/sigmalearn](https://github.com/yourusername/sigmalearn)

---

<div align="center">
Made with ❤️ for students everywhere
</div>
