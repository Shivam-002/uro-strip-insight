from typing import List, Optional
from utils import ErrorCode
from models.response import FailureResponse


class FailureException(Exception):
    def __init__(
        self,
        error_code,
        error_message: ErrorCode,
        error_details: Optional[List[str]] = None,
    ):
        self.error_response = FailureResponse(
            error_code=error_code,
            error_message=error_message,
            error_details=error_details,
        )
