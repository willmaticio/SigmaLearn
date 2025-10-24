from typing import Any, Optional

def to_latex(x: Any) -> Optional[str]:
    """Convert SymPy expression to LaTeX string."""
    if x is None:
        return None
    
    try:
        from sympy import latex as sympy_latex
        return sympy_latex(x)
    except Exception:
        return str(x)
