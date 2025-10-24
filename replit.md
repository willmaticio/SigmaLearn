# SigmaLearn - Academic Math Platform

## Project Overview

SigmaLearn is an open-source academic mathematics platform designed for Computer Science and Data Science students. It provides:

- **Knowledge Base**: Curated mathematical topics across 4 subject areas
- **Step-by-Step Solver**: Interactive solver powered by SymPy showing detailed solution steps
- **Subject Areas**: Linear Algebra, Calculus I, Calculus II, Discrete Mathematics
- **Technologies**: React + Vite + TypeScript (frontend), FastAPI + Python + SymPy (backend)

## Recent Changes

### 2025-01-24: Initial Development
- Created comprehensive React frontend with academic design theme
- Implemented all core components: Home, Knowledge Base, Subject Hubs, Topic Details
- Built interactive solver panel with MathLive input support
- Set up client-side search using Lunr.js
- Configured academic color palette (#F8F9FB background, #2B6CB0 accent)
- Added 8 sample topics (2 per subject) with KaTeX rendering
- Implemented responsive layout with sidebar navigation and right rail formulas

## Project Architecture

### Frontend (client/)
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom academic theme
- **Math Rendering**: KaTeX for formulas, MathLive for input
- **Search**: Lunr.js for client-side full-text search
- **Routing**: Wouter for lightweight routing
- **State Management**: TanStack Query for server state

### Backend (server/)
- **API Framework**: FastAPI (Python)
- **Math Engine**: SymPy for symbolic mathematics
- **Step Logging**: Custom step-by-step solution tracking
- **Optional Features**: OCR (Tesseract), Java bridge for advanced algorithms

### Content (content/)
- **Format**: Markdown files with YAML frontmatter
- **Structure**: `/content/<subject>/<topic>.md`
- **Formulas**: Reference files in `/content/_formulas/<subject>.md`

## User Preferences

### Design Guidelines
- Academic, scholarly aesthetic suitable for CS/Data Science students
- Clean, distraction-free layout prioritizing content readability
- Serif fonts (Source Serif Pro) for body content
- Sans-serif (Inter) for UI elements
- Monospace (JetBrains Mono) for code and steps
- Muted color palette with blue accent (#2B6CB0)
- Generous whitespace and clear typography hierarchy
- Responsive design: mobile-first approach

### Content Philosophy
- Step-by-step solutions with clear rule labels
- No login required - fully accessible platform
- Sample problems and interactive examples
- Focus on core CS/DS mathematical foundations

## Development Setup

### Frontend
```bash
cd client
npm install
npm run dev  # Runs on port 5173
```

### Backend (when implemented)
```bash
pip install -r server/requirements.txt
uvicorn server.main:app --reload --host 0.0.0.0 --port 8000
```

### Environment Variables
Create `.env` file based on `.env.example`:
- `VITE_API_BASE`: Backend API URL (default: http://localhost:8000/api)

## Adding New Topics

1. Create Markdown file: `content/<subject>/<topic-slug>.md`
2. Add YAML frontmatter:
```yaml
---
title: "Topic Title"
subject: "linear-algebra" | "calculus-1" | "calculus-2" | "discrete-math"
tags: ["tag1", "tag2"]
level: "undergraduate" | "graduate" | "advanced"
description: "Brief description"
---
```
3. Write content with inline LaTeX: `$...$` or `$$...$$`
4. Rebuild search index (automatic on app load)

## API Endpoints (Backend)

### POST /api/solve
Solve mathematical problems with step-by-step solutions.

**Request**:
```json
{
  "subject": "la" | "calc1" | "calc2" | "discrete",
  "query": "x^2 + 3*x - 5",
  "mode": "auto" | "derivative" | "integral" | "rref" | ...,
  "options": { "var": "x" }
}
```

**Response**:
```json
{
  "ok": true,
  "result_latex": "...",
  "steps": [
    { "index": 1, "rule": "...", "before_latex": "...", "after_latex": "..." }
  ],
  "warnings": [],
  "elapsed_ms": 50
}
```

### GET /health
Health check endpoint.

## License

- **Code**: MIT License
- **Content**: CC BY-SA 4.0
