import { notFound, redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { getCurrentAdmin } from "./action";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { userId, sessionClaims } = await auth();
  const adminUser = await getCurrentAdmin();

  // Redirect if not admin
  if (!adminUser) {
    redirect("/");
    return notFound();
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </div>
    </div>
  );
}
