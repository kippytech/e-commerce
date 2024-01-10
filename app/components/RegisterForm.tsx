'use client'

import { useState } from "react"
import Heading from "./Heading"
import Input from "./inputs/Input"
import { SubmitHandler, FieldValues, useForm } from "react-hook-form"
import Button from "./Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"

function RegisterForm() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: errors} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
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