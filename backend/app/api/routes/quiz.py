from fastapi import APIRouter, Depends, UploadFile, File, Body
from fastapi.responses import JSONResponse
from typing import Optional
from app.api.deps import  get_current_user
from .core.quiz.schemas import BasicPrompt
from .core.quiz.utils import generate_description
from .core.quiz.services import QuizService
from .core.quiz.services import MockQuizStrategy, GPTQuizStrategy


router = APIRouter()


@router.get(
    "/test-gpt/",
    dependencies=[Depends(get_current_user)],
    status_code=200,
)
def test_gpt() -> JSONResponse:
    """
    Test GPT.
    """
    return JSONResponse(content={"message": "Test gpt ok"})

@router.post(
    "/gpt-description/",
    dependencies=[Depends(get_current_user)],
    status_code=200,
)
async def process_prompt(basic_prompt: BasicPrompt) -> JSONResponse:

    prompt = basic_prompt.prompt
    description = generate_description(prompt)
    

    return JSONResponse(content={"message":  description})

@router.post(
    "/gpt-quizz/",
    dependencies=[Depends(get_current_user)],
    status_code=200,
)
async def gpt_quizz(file: UploadFile, title:str = Body(), questions:int = Body()) -> JSONResponse:
    """
    Create Quiz.
    """   
    
    # strategy = MockQuizStrategy()
    strategy = GPTQuizStrategy()

    try:        
        quiz_service = QuizService(file, title, questions, strategy)  
        response = quiz_service.process()
    except Exception as e:
        response = {"message": f"Error al procesar el archivo: {e}"}
        return JSONResponse(content=response, status_code=500)
    
    return JSONResponse(content=response, status_code=200)
    
    
