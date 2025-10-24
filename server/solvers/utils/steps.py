from typing import Optional, Dict, Any, List
from server.schemas import Step

class StepLogger:
    def __init__(self, max_steps: int = 200):
        self.steps: List[Step] = []
        self.idx = 1
        self.max_steps = max_steps

    def add(
        self,
        rule: str,
        before=None,
        after=None,
        note: Optional[str] = None,
        meta: Optional[Dict[str, Any]] = None
    ):
        if len(self.steps) >= self.max_steps:
            return
        
        from .latex import to_latex
        
        self.steps.append(Step(
            index=self.idx,
            rule=rule,
            before_latex=to_latex(before) if before is not None else None,
            after_latex=to_latex(after) if after is not None else None,
            note=note,
            meta=meta or {}
        ))
        self.idx += 1

    def get_steps(self) -> List[Step]:
        return self.steps
