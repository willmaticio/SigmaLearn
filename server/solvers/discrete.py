from server.schemas import SolveResponse
from server.solvers.utils.steps import StepLogger
from typing import Any, Dict

def dispatch(expr: Any, mode: str, options: Dict) -> SolveResponse:
    """Dispatch discrete math solver based on mode."""
    if mode in ("auto", "logic"):
        return simplify_logic(expr, options)
    elif mode == "combinatorics":
        return do_combinatorics(expr, options)
    return SolveResponse(ok=False, errors=[f"Unsupported mode: {mode}"])

def simplify_logic(expr: Any, options: Dict) -> SolveResponse:
    """Simplify logical expressions."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy.logic import simplify_logic as sympy_simplify
        from sympy import symbols
        from sympy.logic.boolalg import And, Or, Not
        
        log.add("Initial expression", None, expr)
        
        simplified = sympy_simplify(expr)
        log.add("Apply logical identities", expr, simplified)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Logic simplification error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_combinatorics(expr: Any, options: Dict) -> SolveResponse:
    """Compute combinatorics (factorials, permutations, combinations)."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import factorial, binomial, sympify
        
        query_str = str(expr)
        log.add("Parse query", None, expr)
        
        # Try to detect pattern like C(n,r) or P(n,r)
        import re
        comb_match = re.search(r'C\((\d+),\s*(\d+)\)', query_str)
        perm_match = re.search(r'P\((\d+),\s*(\d+)\)', query_str)
        
        if comb_match:
            n, r = int(comb_match.group(1)), int(comb_match.group(2))
            result = binomial(n, r)
            log.add(f"Combination C({n},{r})", None, result,
                    note=f"n!/(r!(n-r)!) = {n}!/({r}!{n-r}!)")
            return SolveResponse(
                ok=True,
                result_latex=None,
                steps=log.get_steps(),
                warnings=warnings
            )
        
        if perm_match:
            n, r = int(perm_match.group(1)), int(perm_match.group(2))
            from sympy import factorial
            result = factorial(n) // factorial(n - r)
            log.add(f"Permutation P({n},{r})", None, result,
                    note=f"n!/(n-r)! = {n}!/{n-r}!")
            return SolveResponse(
                ok=True,
                result_latex=None,
                steps=log.get_steps(),
                warnings=warnings
            )
        
        # Fallback: just evaluate
        result = sympify(expr)
        log.add("Evaluate", expr, result)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Combinatorics error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
