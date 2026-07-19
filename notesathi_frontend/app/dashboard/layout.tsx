import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import Footer from "@/app/_components/footer";
import { getNotifications } from "@/lib/api/notifications";

// Every page under /dashboard reads the auth cookie (directly or via a
// server action), so none of it can be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: React.ReactNode }) {
  let initialUnreadCount = 0;
  try {
    const result = await getNotifications();
    initialUnreadCount = result?.unreadCount ?? 0;
  } catch {
    initialUnreadCount = 0;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar initialUnreadCount={initialUnreadCount} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
        <Footer compact />
      </div>
    </div>
  );
}
