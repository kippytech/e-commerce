"use client";

import Container from "../Container";
import Link from "next/link";
import AdminNavItem from "@/app/admin/AdminNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

function AdminNav() {
  const pathName = usePathname();

  return (
    <div className="top-20 w-full border-b-[1px] pt-4 shadow-sm">
      <Container>
        <div className="flex flex-nowrap items-center justify-between gap-8 overflow-x-auto md:justify-center md:gap-12">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathName === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathName === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathName === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathName === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default AdminNav;
