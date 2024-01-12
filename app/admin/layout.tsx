import React from 'react'
import AdminNav from '../components/admin/AdminNav'

export const metadata = {
    title: 'SokoMall Admin',
    description: 'SokoMall Admin Dashboard'
}

type AdminLayoutProps = {
    children: React.ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
        <AdminNav />
        { children }
    </div>
  )
}

export default AdminLayout