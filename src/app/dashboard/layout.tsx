import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { FAB } from "@/components/dashboard/fab";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="lg:ml-[260px] px-6 py-6 md:py-8 pb-32">{children}</main>
      <FAB />
    </div>
  );
}
