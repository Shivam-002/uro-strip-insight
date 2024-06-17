from pydantic import BaseModel
from typing import Optional, List
from utils import ErrorCode


class SuccessResponse(BaseModel):
    status: str = "success"
    data: dict


class FailureResponse(BaseModel):
    status: str = "failure"
    error_code: str
    error_message: str
    error_details: Optional[List[str]] = None


