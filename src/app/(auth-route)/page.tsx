'use client'
import LogInButton from '@/components/form/buttons/LogInButton'
import PasswordInput from '@/components/form/inputs/PasswordInput'
import UserInput from '@/components/form/inputs/UserInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
  email: z.string().min(5).toLowerCase().trim(),
  password: z.string().min(6),
})

type LoginFormData = z.infer<typeof schema>

export default function Home() {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  async function handleLogin(loginInput: LoginFormData) {
    const result = await signIn('credentials', {
      email: loginInput.email,
      password: loginInput.password,
      redirect: false,
    })

    if (result?.error) {
      toast.error('E-mail ou senha incorretos', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      console.log(result?.error)
      return null
    }

    router.replace('/home')
  }

  return (
    <div className="h-full w-full bg-gray-100">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className=" flex items-center justify-center w-full h-full"
      >
        <div className="flex flex-col gap-5 lg:w-1/4 md:w-2/4 sm:w-3/4 p-7 rounded shadow-md bg-white">
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <UserInput
                label="Email"
                hasError={!!errors.email}
                value={value}
                setValue={onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <PasswordInput
                label="Senha"
                hasError={!!errors.password}
                value={value}
                setValue={onChange}
              />
            )}
          />
          <LogInButton />
        </div>
      </form>
    </div>
  )
}
