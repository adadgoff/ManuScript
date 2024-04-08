from enum import Enum


class UserStepStatus(str, Enum):
    INCORRECT = "INCORRECT",
    CORRECT = "CORRECT",
