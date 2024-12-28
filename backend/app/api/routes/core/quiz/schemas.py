from pydantic import BaseModel
from fastapi import UploadFile, File
from typing import Optional

class BasicPrompt(BaseModel):
    prompt: str


class PDFUpload(BaseModel):
    file: UploadFile 
   