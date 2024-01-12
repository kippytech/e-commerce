'use client'

import { FieldValues, UseFormRegister } from "react-hook-form"

type CheckboxProps = {
    id: string
    label: string
    disabled?: boolean
    register: UseFormRegister<FieldValues>
}

function Checkbox({ id, label, disabled, register }: CheckboxProps) {
  return (
    <div className="w-full flex gap-2 items-center">
        <input type="checkbox" className="cursor-pointer" 
          id={id} disabled={disabled} {...register(id)} placeholder="" 
        />
        <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
    </div>
  )
}

export default Checkbox