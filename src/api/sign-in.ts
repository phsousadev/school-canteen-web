import { api } from "@/lib/axios"

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
}

export async function signIn({ email, password }: SignInBody): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/sessions', {
    email,
    password,
  })

  return response.data
}
