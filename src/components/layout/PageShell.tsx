import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children, withMesh = false }: { children: React.ReactNode; withMesh?: boolean }) {
  return (
    <div className="relative isolate min-h-screen flex flex-col bg-background">
      {withMesh && (
        <div className="absolute inset-x-0 top-0 h-screen mesh-bg pointer-events-none z-0" aria-hidden />
      )}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
