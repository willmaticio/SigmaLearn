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
    elif mode == "ode":
        return do_ode(expr, options)
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
        from sympy import symbols, diff, simplify
        
        var_name = options.get("var", "x")
        x = symbols(var_name)
        
        log.add("Initial expression", None, expr)
        
        rule = detect_diff_rule(expr, x)
        log.add(f"{rule}: prepare", expr, None)
        
        result = diff(expr, x)
        log.add(f"Apply d/d{var_name}", expr, result)
        
        # Try to simplify the result
        try:
            simplified = simplify(result)
            if simplified != result:
                log.add("Simplify", result, simplified)
                result = simplified
        except Exception:
            pass
        
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
        from sympy import symbols, integrate, simplify, Add
        
        var_name = options.get("var", "x")
        x = symbols(var_name)
        definite = options.get("definite", False)
        lower = options.get("lower", None)
        upper = options.get("upper", None)
        
        log.add("Initial expression", None, expr)
        
        if definite and lower is not None and upper is not None:
            log.add("Set up definite integral", expr, None, note=f"∫[{lower}, {upper}] ... d{var_name}")
            result = integrate(expr, (x, lower, upper))
            log.add(f"Evaluate from {lower} to {upper}", expr, result)
        else:
            log.add("Set up indefinite integral", expr, None, note=f"∫ ... d{var_name}")
            
            # Check if it's a sum
            if isinstance(expr, Add):
                log.add("Apply sum rule", expr, None, note="∫(f + g) = ∫f + ∫g")
            
            result = integrate(expr, x)
            log.add("Integrate", expr, result)
            
            # Try to simplify
            try:
                simplified = simplify(result)
                if simplified != result:
                    log.add("Simplify", result, simplified)
                    result = simplified
            except Exception:
                pass
        
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

def do_ode(expr: Any, options: Dict) -> SolveResponse:
    """Solve ordinary differential equations."""
    log = StepLogger()
    warnings: list[str] = []
    errors: list[str] = []
    
    try:
        from sympy import symbols, Function, dsolve, Eq, Derivative
        from sympy.core.function import AppliedUndef
        
        var_name = options.get("var", "x")
        func_name = options.get("func", "y")
        x = symbols(var_name)
        y = Function(func_name)
        
        # If expr is a string equation like "y'' + y = 0" or "Derivative(y(x), x, 2) + y(x) = 0", parse it
        if isinstance(expr, str):
            from sympy.parsing.sympy_parser import parse_expr
            # Provide both the function and the derivative helper
            expr = parse_expr(expr, local_dict={var_name: x, func_name: y, 'Derivative': Derivative})
        
        # Check if it's an equation
        is_equation = isinstance(expr, Eq)
        if not is_equation:
            # Assume it's in the form: expr = 0
            expr = Eq(expr, 0)
        
        log.add("Differential equation", None, expr)
        
        # Identify the unknown function
        funcs = expr.atoms(AppliedUndef)
        if not funcs:
            errors.append("No unknown function found in equation")
            return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
        
        func = list(funcs)[0]
        log.add("Unknown function", None, func, note=f"Solve for {func}")
        
        # Solve the ODE
        result = dsolve(expr, func)
        log.add("Apply dsolve", expr, result)
        
        return SolveResponse(
            ok=True,
            result_latex=None,
            steps=log.get_steps(),
            warnings=warnings
        )
    
    except Exception as e:
        errors.append(f"ODE error: {str(e)}")
        return SolveResponse(ok=False, steps=log.get_steps(), errors=errors, warnings=warnings)
