export interface IAuthUser {
  name: string
  email: string
  telefone: string | null
  token: string
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoggedUser {
  name: string
  email: string
  telefone: string | null
}

export interface ILoginResponse {
  access_token: string
  user: ILoggedUser
}

export interface ILoginForm {
  email: string
  password: string
}
