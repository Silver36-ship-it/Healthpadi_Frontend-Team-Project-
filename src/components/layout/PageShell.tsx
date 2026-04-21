import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children, withMesh = false }: { children: React.ReactNode; withMesh?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {withMesh && (
        <div className="fixed inset-0 mesh-bg pointer-events-none -z-10" aria-hidden />
      )}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
