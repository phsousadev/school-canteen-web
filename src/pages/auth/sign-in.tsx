import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const signInform = z.object({
  email: z.string().email(),
  password: z.string()
})

type SignInForm = z.infer<typeof signInform>

export function SignIn() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authenticate({
        email: data.email,
        password: data.password,
      })

      if (!response.token) {
        toast.error('Falha na autenticação')
        return
      }

      localStorage.setItem('token', response.token)
      toast.success('Autenticação realizada com sucesso')

      navigate('/')
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao tentar autenticar'
      toast.error(message)
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo cadastro</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                {...register('password')}
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
