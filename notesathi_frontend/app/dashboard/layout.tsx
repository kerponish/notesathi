import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import Footer from "@/app/_components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
        <Footer compact />
      </div>
    </div>
  );
}
