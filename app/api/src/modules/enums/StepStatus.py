from enum import Enum


class StepStatus(str, Enum):
    EMPTY = "EMPTY",
    INCORRECT = "INCORRECT",
    CORRECT = "CORRECT",
