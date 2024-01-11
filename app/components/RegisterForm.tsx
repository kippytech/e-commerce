'use client'

import { useState } from "react"
import Heading from "./Heading"
import Input from "./inputs/Input"
import { SubmitHandler, FieldValues, useForm } from "react-hook-form"
import Button from "./Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation"

function RegisterForm() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: errors} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/register', data).then(() => {
      toast.success('Account created')

      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      }).then((callback) => {
        if (callback?.ok) {
          router.push('/cart')
          router.refresh()
          toast.success('Logged in')
        }

        if (callback?.error) {
          toast.error(callback.error)
        }
      })
    }).catch(() => toast.error('Something went wrong')).finally(() => setIsLoading(false))
  } 

  return (
    <>
      <Heading title="Sign up for SokoMall" />
      <Button outline label="Sign Up with Google" icon={AiOutlineGoogle} onClick={() => {}} />
      <hr className="bg-slate-300 w-full h-px" />
      <Input id="name" label="name" disabled={isLoading} register={register} errors={errors} required/>
      <Input id="email" label="email" disabled={isLoading} register={register} errors={errors} required/>
      <Input id="password" label="password" disabled={isLoading} register={register} errors={errors} required type="password"/>
      <Button label={isLoading ? 'Loading' : 'Sign Up'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm">Already have an account?
        <Link href='login' className="underline">
          Log in
        </Link>
      </p>
    </>
  )
}

export default RegisterForm