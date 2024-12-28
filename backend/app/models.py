from typing import Optional
import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
import sqlalchemy as sa

# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)
    description: str | None = Field(default=None, max_length=500) 


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)
    description: str | None = Field(default=None, max_length=500)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)
    description: str | None = Field(default=None, max_length=500)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    # description: str | None = Field(default=None)
    description: str | None = Field(default=None, sa_column=sa.Column(sa.Text))
    public: bool = Field(default=True, sa_column=sa.Column(sa.Boolean, server_default=sa.true()))
    public_home: bool = Field(default=True, sa_column=sa.Column(sa.Boolean, server_default=sa.true()))

# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="items")
    # replies: list["ReplyItem"] = Relationship(back_populates="item")
    replies: list["ReplyItem"] = Relationship(back_populates="item",cascade_delete=True)
    public: bool = Field(default=True, sa_column=sa.Column(sa.Boolean, server_default=sa.true()))
    public_home: bool = Field(default=True, sa_column=sa.Column(sa.Boolean, server_default=sa.true()))

# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Properties to return via API Restricted, id is always required
class ItemPublicRestricted(ItemBase):
    id: uuid.UUID
    

class ItemsPublicRestricted(SQLModel):
    data: list[ItemPublicRestricted]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


class ReplyItemBase(SQLModel):
    description: str | None = Field(
        default=None, sa_column=sa.Column(sa.Text)
    )
    item_id: uuid.UUID 
    score: int = Field(default=0, sa_column=sa.Column(sa.Integer, server_default="0"))


class ReplyItemCreate(ReplyItemBase):
    pass


class ReplyItemUpdate(SQLModel):
    description: str | None = Field(
        default=None, sa_column=sa.Column(sa.Text)
    )
    score: Optional[int] = Field(default=None)

class ReplyItem(ReplyItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)    
    item_id: uuid.UUID = Field(
        foreign_key="item.id", nullable=False, ondelete="CASCADE"
    )    
    # item_id: uuid.UUID = Field(foreign_key="item.id", nullable=False, sa_column=sa.Column(sa.ForeignKey("item.id", ondelete="CASCADE")))
    item: Item | None = Relationship(back_populates="replies")    
    # item: Optional["Item"] = Relationship(back_populates="replies")    
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship()
    score: int = Field(default=0, sa_column=sa.Column(sa.Integer, server_default="0"))

class ReplyItemPublic(SQLModel):
    id: uuid.UUID
    description: str | None
    item_id: uuid.UUID
    owner_id: uuid.UUID
    score: int     

class ReplyItemsPublic(SQLModel):
    data: list[ReplyItemPublic]
    count: int