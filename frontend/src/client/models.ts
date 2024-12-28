export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type ItemCreate = {
  title: string
  description?: string | null
  public?: boolean
  public_home?: boolean
}

export type ItemPublic = {
  title: string
  description?: string | null
  id: string
  owner_id: string 
  public?: boolean
  public_home?: boolean
}

export type ItemUpdate = {
  title?: string | null
  description?: string | null
  public?: boolean
  public_home?: boolean
}

export type ItemsPublic = {
  data: Array<ItemPublic>
  count: number
}

export type ItemPublicRestricted = {
  title: string
  description?: string | null
  id: string  
  public?: boolean
  public_home?: boolean
}

export type ItemsPublicRestricted = {
  data: Array<ItemPublicRestricted>
  count: number
}

export type Message = {
  message: string
}

export type MessageQuizz = {
  message: string
  quizz: any
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  description?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
  description?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
  description?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}

export type ReplyItemCreate = {
  item_id: string
  description?: string | null
  score?: number
}

export type ReplyItemPublic = {  
  description?: string | null
  id: string
  owner_id: string 
  item_id: string 
  score: number
}

export type ReplyItemUpdate = {
  item_id: string 
  description?: string | null
  score?: number
}

export type ReplyItemsPublic = {
  data: Array<ReplyItemPublic>
  count: number
}
