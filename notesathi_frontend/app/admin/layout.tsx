import Navbar from "./_components/Navbar";
import Footer from "@/app/_components/footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <section className="mx-auto mt-6 w-[95%]">{children}</section>

      <Footer compact />
    </main>
  );
}
