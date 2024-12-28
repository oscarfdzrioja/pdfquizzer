from fastapi import APIRouter

from app.api.routes import items, login, users, utils, docs, quiz, replies


api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(quiz.router, prefix="/gpt", tags=["gpt"])
api_router.include_router(replies.router, prefix="/replies", tags=["replies"])
api_router.include_router(docs.router,prefix="/private", tags=["documentation"])
