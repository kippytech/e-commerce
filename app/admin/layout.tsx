import React from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "E-Shop Admin",
  description: "E-Shop Admin Dashboard",
};

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}

export default AdminLayout;
