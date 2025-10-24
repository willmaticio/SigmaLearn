from typing import Tuple, Any, List
import re

def parse_query(subject: str, query: str, options: dict) -> Tuple[Any, List[str]]:
    """
    Parse query into SymPy expression.
    Returns (expr_or_struct, warnings)
    """
    warnings: List[str] = []
    q = query.strip()

    # Import SymPy components
    try:
        from sympy import symbols, Matrix, sympify
        from sympy.parsing.sympy_parser import parse_expr
        from sympy.parsing.latex import parse_latex
    except ImportError as e:
        warnings.append(f"SymPy import error: {e}")
        return q, warnings

    # Matrix quick handling (CSV-like or list notation)
    if subject == "la" and (q.startswith("[[") or (q.startswith("[") and "]," in q)):
        try:
            import ast
            data = ast.literal_eval(q)
            return Matrix(data), warnings
        except Exception as e:
            warnings.append(f"Matrix parse warning: {e}")

    # Try LaTeX parsing
    if any(tok in q for tok in [
        "\\frac", "\\int", "\\sum", "\\begin{bmatrix}", "\\left", "\\right",
        "\\log", "\\sin", "\\cos", "\\lim", "\\sqrt", "\\partial"
    ]):
        try:
            expr = parse_latex(q)
            return expr, warnings
        except Exception as e:
            warnings.append(f"LaTeX parse warning: {e}")

    # Fallback plain parser
    try:
        expr = parse_expr(q, evaluate=False)
        return expr, warnings
    except Exception as e:
        warnings.append(f"Plain parse warning: {e}")
        # Try sympify as last resort
        try:
            expr = sympify(q)
            return expr, warnings
        except Exception:
            return q, warnings  # Return raw string
