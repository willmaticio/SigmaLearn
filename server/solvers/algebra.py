from server.schemas import SolveResponse
from server.solvers.utils.steps import StepLogger
from typing import Any, Dict

def dispatch(expr: Any, mode: str, options: Dict) -> SolveResponse:
    """Dispatch algebra solver based on mode."""
    if mode in ("algebra", "auto"):
        return solve_algebra(expr, options)
    return SolveResponse(ok=False, errors=[f"Unsupported mode: {mode}"])

def solve_algebra(expr: Any, options: Dict) -> SolveResponse:
    """Solve or simplify algebraic expressions."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import Eq, symbols, solve, expand, factor, simplify, sympify
        
        # Handle string input
        if isinstance(expr, str):
            if "=" in expr:
                # Equation solving
                lhs_str, rhs_str = expr.split("=", 1)
                x = symbols(options.get("var", "x"))
                try:
                    lhs = sympify(lhs_str)
                    rhs = sympify(rhs_str)
                    eq = Eq(lhs, rhs)
                    log.add("Parse equation", None, eq)
                    
                    solutions = solve(eq, x)
                    log.add(f"Solve for {x}", eq, solutions)
                    
                    return SolveResponse(
                        ok=True,
                        result_latex=str(solutions) if solutions else "No solution",
                        steps=log.get_steps(),
                        warnings=warnings
                    )
                except Exception as e:
                    errors.append(f"Equation solving error: {e}")
                    return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
        
        # Simplification steps
        log.add("Initial expression", None, expr)
        
        before = expr
        after = expand(expr)
        if after != before:
            log.add("Expand (distribute)", before, after)
            before = after
        
        after = factor(before)
        if after != before:
            log.add("Factor", before, after)
            before = after
        
        after = simplify(before)
        if after != before:
            log.add("Simplify", before, after)
            before = after
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Algebra error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
