from pydantic import BaseModel

from app.api.modules.enums.StepType import StepType


class SStepInfo(BaseModel):
    id: int
    type: StepType
    text: str
    answer: str | None
    order: int

# TODO: version with comments.