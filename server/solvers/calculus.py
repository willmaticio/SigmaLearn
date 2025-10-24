from server.schemas import SolveResponse
from server.solvers.utils.steps import StepLogger
from typing import Any, Dict

def dispatch(expr: Any, mode: str, options: Dict) -> SolveResponse:
    """Dispatch calculus solver based on mode."""
    if mode in ("auto", "derivative"):
        return do_derivative(expr, options)
    elif mode == "integral":
        return do_integral(expr, options)
    elif mode == "limit":
        return do_limit(expr, options)
    elif mode == "series":
        return do_series(expr, options)
    return SolveResponse(ok=False, errors=[f"Unsupported mode: {mode}"])

def detect_diff_rule(expr: Any, var: Any) -> str:
    """Detect which differentiation rule to apply."""
    try:
        from sympy import Mul, Pow, Add
        
        if expr.is_Mul:
            return "Product Rule"
        if expr.is_Pow and expr.base.has(var) and expr.exp.is_Number:
            return "Power Rule"
        if expr.is_Add:
            return "Sum Rule"
        if expr.func.__name__ in ("sin", "cos", "exp", "log", "tan"):
            if expr.args[0] != var:
                return "Chain Rule"
            return f"{expr.func.__name__} derivative"
        return "Differentiation"
    except Exception:
        return "Differentiation"

def do_derivative(expr: Any, options: Dict) -> SolveResponse:
    """Compute derivative with steps."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import symbols, diff
        
        var_name = options.get("var", "x")
        x = symbols(var_name)
        
        log.add("Initial expression", None, expr)
        
        rule = detect_diff_rule(expr, x)
        log.add(f"{rule}: prepare", expr, None)
        
        result = diff(expr, x)
        log.add(f"Apply d/d{var_name}", expr, result)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Derivative error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_integral(expr: Any, options: Dict) -> SolveResponse:
    """Compute integral with steps."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import symbols, integrate
        
        var_name = options.get("var", "x")
        x = symbols(var_name)
        
        log.add("Initial expression", None, expr)
        log.add("Set up integral", expr, None, note=f"∫ ... d{var_name}")
        
        result = integrate(expr, x)
        log.add("Integrate", expr, result)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Integration error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_limit(expr: Any, options: Dict) -> SolveResponse:
    """Compute limit with steps."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import symbols, limit, oo
        
        var_name = options.get("var", "x")
        x = symbols(var_name)
        point = options.get("point", 0)
        
        # Handle infinity
        if str(point).lower() in ("inf", "infinity", "oo"):
            point = oo
        
        log.add(f"Limit as {var_name} → {point}", expr, None)
        
        result = limit(expr, x, point)
        log.add("Evaluate limit", expr, result)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Limit error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)

def do_series(expr: Any, options: Dict) -> SolveResponse:
    """Compute Taylor/Maclaurin series."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import symbols, series
        
        var_name = options.get("var", "x")
        x = symbols(var_name)
        point = options.get("point", 0)
        n = options.get("n", 6)
        
        log.add(f"Taylor series centered at {var_name}={point}", expr, None)
        
        result = series(expr, x, point, n)
        log.add(f"Expand to order {n}", expr, result)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"Series error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
