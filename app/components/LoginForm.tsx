'use client'

import { useState } from "react"
import Heading from "./Heading"
import Input from "./inputs/Input"
import { SubmitHandler, FieldValues, useForm } from "react-hook-form"
import Button from "./Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

function LoginForm() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: errors} = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
        ...data,
        redirect: false
    }).then((callback) => {
        setIsLoading(false)

        if (callback?.ok) {
            router.push('/cart')
            router.refresh()
            toast.success('Logged in')
          }
  
          if (callback?.error) {
            toast.error(callback.error)
          }
    })
  } 

  return (
    <>
      <Heading title="Sign in to SokoMall" />
      <Button outline label="Continue with Google" icon={AiOutlineGoogle} onClick={() => {}} />
      <hr className="bg-slate-300 w-full h-px" />
      <Input id="email" label="email" disabled={isLoading} register={register} errors={errors} required/>
      <Input id="password" label="password" disabled={isLoading} register={register} errors={errors} required type="password"/>
      <Button label={isLoading ? 'Loading' : 'Login'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm">Do not have an account?
        <Link href='register' className="underline">
          Sign Up
        </Link>
      </p>
    </>
  )
}

export default LoginForm