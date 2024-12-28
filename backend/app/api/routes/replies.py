import uuid
from typing import Any

from h11 import Response

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from fastapi.responses import JSONResponse

from app.api.deps import CurrentUser, SessionDep
from app.models import Item, ItemCreate, ItemPublic, ItemsPublic, ItemUpdate, Message, ReplyItemsPublic
from app.models import ItemPublic, ItemPublicRestricted, ItemsPublicRestricted
from app.models import ReplyItem, ReplyItemPublic, ReplyItemCreate, ReplyItemUpdate

router = APIRouter()


@router.post("/", response_model=ReplyItemPublic)
def create_reply(
    *, session: SessionDep, current_user: CurrentUser, item_reply_in: ReplyItemCreate
) -> Any:
    """
    Create new reply item or update reply item same item_id.
    """
    
    item = session.get(Item, item_reply_in.item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
            
    statement = select(ReplyItem).where(
        ReplyItem.item_id == item_reply_in.item_id,
        ReplyItem.owner_id == current_user.id
    )    
    existing_reply_item = session.exec(statement).first()


    reply_item = ReplyItem.model_validate(item_reply_in, update={"owner_id": current_user.id, "item_id": item.id})
    session.add(reply_item)
    session.commit()
    session.refresh(reply_item)
    return reply_item


@router.get("/{id}")
def read_reply_items(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve Replyitems.
    """

    item = session.get(Item, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    print(item.replies)

    count_statement = (
        select(func.count())
        .select_from(ReplyItem)
        .where(ReplyItem.item_id == id)
    )
    count = session.exec(count_statement).one()
    statement = (
        select(ReplyItem)
        .where(ReplyItem.item_id == id)
        .offset(skip)
        .limit(limit)
    )
    results = session.exec(statement).all()

    items = []
    for reply_item in results:
        item_dict = reply_item.dict()
        item_dict["owner_email"] = reply_item.owner.email
        item_dict["owner_id"] = str( reply_item.owner_id )
        item_dict["item_id"] = str( reply_item.item_id )
        item_dict["id"] = str( reply_item.id )

        items.append(item_dict)

    print("items:", items)

    return JSONResponse({"data":items, "count":count})

