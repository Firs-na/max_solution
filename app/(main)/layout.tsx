import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import AuthGuard from "@/components/AuthGuard";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 pb-28 md:pb-16">{children}</main>
      <BottomNav />
    </AuthGuard>
  );
}
