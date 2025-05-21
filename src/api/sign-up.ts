import { api } from "@/lib/axios"

export type Role = 'ADMIN' | 'USER'

export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface SignUpBody {
  name: string
  email: string
  password: string
  phone: string
}

export interface SignInResponse {
  token: string
  user: Omit<User, 'password'>
}

export async function signUp({ name, email, password, phone }: SignUpBody): Promise<SignInResponse> {

  console.log(name)
  console.log(email)
  console.log(password)
  console.log(phone)

  const response = await api.post<SignInResponse>('/users', {
    name,
    email,
    password,
    phone
  })

  return response.data
}
