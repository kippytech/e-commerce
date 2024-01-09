'use client'

import { IconType } from "react-icons"

type ButtonPropsType = {
    label: string,
    disabled?: boolean,
    small?: boolean,
    outline?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ label, disabled, small, outline,  custom, icon: Icon, onClick }: ButtonPropsType) {
  return (
    <button disabled={disabled} className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 ${outline ? 'bg-white' : 'bg-slate-700'} ${outline ? 'text-slate-700' : 'text-white'} ${small ? 'text-sm font-light' : 'text-md font-semibold'} ${small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-[2px]'} ${custom ? custom : ''}`}>
        { Icon && <Icon  size={24}/>}
        { label }
    </button>
  )
}

export default Button