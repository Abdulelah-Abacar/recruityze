"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Blog",
    icon: FileText,
    href: "/admin/blog",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full w-64 border-r">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold text-primary">Recruityze Admin</h1>
      </div>
      <div className="space-y-1 p-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md p-3 transition-colors",
              pathname.startsWith(route.href)
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100",
            )}
          >
            <route.icon className="h-5 w-5" />
            <span>{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
