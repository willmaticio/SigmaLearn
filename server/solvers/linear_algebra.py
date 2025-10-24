from server.schemas import SolveResponse
from server.solvers.utils.steps import StepLogger
from typing import Any, Dict

def dispatch(expr: Any, mode: str, options: Dict) -> SolveResponse:
    """Dispatch linear algebra solver based on mode."""
    if mode in ("auto", "rref"):
        return do_rref(expr, options)
    elif mode == "eigen":
        return do_eigenvalues(expr, options)
    elif mode == "det":
        return do_determinant(expr, options)
    elif mode == "nullspace":
        return do_nullspace(expr, options)
    return SolveResponse(ok=False, errors=[f"Unsupported mode: {mode}"])

def do_rref(expr: Any, options: Dict) -> SolveResponse:
    """Compute Reduced Row Echelon Form."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import Matrix
        
        if not isinstance(expr, Matrix):
            errors.append("Expression must be a matrix")
            return SolveResponse(ok=False, errors=errors)
        
        log.add("Initial matrix", None, expr)
        
        # Get RREF
        rref_matrix, pivot_cols = expr.rref()
        
        log.add("Compute RREF", expr, rref_matrix, 
                note=f"Pivot columns: {pivot_cols}")
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"RREF error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_eigenvalues(expr: Any, options: Dict) -> SolveResponse:
    """Compute eigenvalues and eigenvectors."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import Matrix
        
        if not isinstance(expr, Matrix):
            errors.append("Expression must be a matrix")
            return SolveResponse(ok=False, errors=errors)
        
        if not expr.is_square:
            errors.append("Matrix must be square for eigenvalues")
            return SolveResponse(ok=False, errors=errors)
        
        log.add("Initial matrix", None, expr)
        
        # Compute eigenvalues
        eigenvals = expr.eigenvals()
        log.add("Compute eigenvalues", expr, dict(eigenvals),
                note="eigenvalue: multiplicity")
        
        # Get eigenvectors
        eigenvects = expr.eigenvects()
        for eigenval, multiplicity, vects in eigenvects:
            log.add(f"Eigenvector for λ={eigenval}", None, vects[0] if vects else None)
        
        return SolveResponse(
            ok=True,
            result_latex=str(eigenvals),
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Eigenvalue error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_determinant(expr: Any, options: Dict) -> SolveResponse:
    """Compute matrix determinant."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import Matrix
        
        if not isinstance(expr, Matrix):
            errors.append("Expression must be a matrix")
            return SolveResponse(ok=False, errors=errors)
        
        if not expr.is_square:
            errors.append("Matrix must be square for determinant")
            return SolveResponse(ok=False, errors=errors)
        
        log.add("Initial matrix", None, expr)
        
        det = expr.det()
        log.add("Compute determinant", expr, det)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Determinant error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_nullspace(expr: Any, options: Dict) -> SolveResponse:
    """Compute matrix nullspace."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import Matrix
        
        if not isinstance(expr, Matrix):
            errors.append("Expression must be a matrix")
            return SolveResponse(ok=False, errors=errors)
        
        log.add("Initial matrix", None, expr)
        
        nullspace = expr.nullspace()
        log.add("Compute nullspace", expr, nullspace,
                note=f"Dimension: {len(nullspace)}")
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Nullspace error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
