import React from 'react'
import { IconType } from 'react-icons'

type AdminNavItemProps = {
    selected?: boolean
    icon: IconType
    label: string
}
//icon rename Icon coz it's a component
function AdminNavItem({ selected, icon: Icon, label }: AdminNavItemProps) {
  return (
    <div className={`flex items-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}`}>
        <Icon size={20} />
        <div className='font-medium text-sm text-center break-normal'></div>
    </div>
  )
}

export default AdminNavItem