from fastapi import APIRouter, Depends
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import Depends, HTTPException, status

from app.core.config import settings

import secrets
import os

router = APIRouter()

security = HTTPBasic()
SWAGGER_UI_USERNAME = os.environ.get("SWAGGER_UI_USERNAME")
SWAGGER_UI_PASSWORD = os.environ.get("SWAGGER_UI_PASSWORD")


def get_current_username_basic_auth(credentials: HTTPBasicCredentials = Depends(security)):    
    correct_username = secrets.compare_digest(credentials.username, SWAGGER_UI_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, SWAGGER_UI_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@router.get("/docs")
async def get_documentation(username: str = Depends(get_current_username_basic_auth)):
    return get_swagger_ui_html(openapi_url=f"{settings.API_V1_STR}/private/openapi.json", title="docs")


@router.get("/openapi.json")
async def openapi(username: str = Depends(get_current_username_basic_auth)):
    return get_openapi(title = "FastAPI", version="0.1.0")

