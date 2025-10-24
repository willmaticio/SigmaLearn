import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from server.config import settings
from server.schemas import SolveRequest, SolveResponse, HealthResponse
from server.solvers import algebra, calculus, linear_algebra, discrete
from server.solvers.utils.parse import parse_query

app = FastAPI(
    title=settings.API_NAME,
    version=settings.API_VERSION,
    description="Step-by-step mathematical solver API for SigmaLearn"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(",") if settings.CORS_ORIGINS != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthResponse)
def health():
    """Health check endpoint."""
    return HealthResponse(
        status="ok",
        ocr=settings.ENABLE_OCR,
        java=settings.ENABLE_JAVA
    )

@app.post("/api/solve", response_model=SolveResponse)
def solve(req: SolveRequest):
    """
    Solve mathematical problems with step-by-step solutions.
    
    Supports:
    - Algebra: simplification, equation solving
    - Calculus: derivatives, integrals, limits, series
    - Linear Algebra: RREF, eigenvalues, determinant, nullspace
    - Discrete Math: logic simplification, combinatorics
    """
    t0 = time.time()
    
    # Validate input size
    if len(req.query) > settings.MAX_INPUT_SIZE:
        raise HTTPException(status_code=413, detail="Input too large")
    
    # Parse query
    expr_or_data, parse_warnings = parse_query(req.subject, req.query, req.options)
    
    # Route to appropriate solver
    if req.subject == "la":
        resp = linear_algebra.dispatch(expr_or_data, req.mode, req.options)
    elif req.subject in ("calc1", "calc2"):
        resp = calculus.dispatch(expr_or_data, req.mode, req.options)
    elif req.subject == "discrete":
        resp = discrete.dispatch(expr_or_data, req.mode, req.options)
    else:
        resp = algebra.dispatch(expr_or_data, req.mode, req.options)
    
    # Add timing and warnings
    resp.elapsed_ms = int((time.time() - t0) * 1000)
    resp.warnings.extend(parse_warnings)
    
    return resp

@app.get("/")
def root():
    """API root endpoint."""
    return {
        "name": settings.API_NAME,
        "version": settings.API_VERSION,
        "docs": "/docs",
        "health": "/health"
    }
