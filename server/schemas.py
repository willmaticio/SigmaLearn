from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Dict, Any

Subject = Literal["la", "calc1", "calc2", "discrete"]
Mode = Literal[
    "auto",
    "algebra",
    "derivative",
    "integral",
    "limit",
    "series",
    "rref",
    "eigen",
    "det",
    "nullspace",
    "logic",
    "combinatorics",
    "recurrence"
]

class Step(BaseModel):
    index: int
    rule: str
    before_latex: Optional[str] = None
    after_latex: Optional[str] = None
    note: Optional[str] = None
    meta: Dict[str, Any] = Field(default_factory=dict)

class SolveRequest(BaseModel):
    subject: Subject
    query: str
    mode: Mode = "auto"
    options: Dict[str, Any] = Field(default_factory=dict)

class SolveResponse(BaseModel):
    ok: bool
    result_latex: Optional[str] = None
    steps: List[Step] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)
    errors: List[str] = Field(default_factory=list)
    elapsed_ms: Optional[int] = None

class OcrResponse(BaseModel):
    ok: bool
    latex: Optional[str] = None
    warnings: List[str] = Field(default_factory=list)

class HealthResponse(BaseModel):
    status: str
    ocr: bool
    java: bool
