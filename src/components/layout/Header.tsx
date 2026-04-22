import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Bell, LogOut, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const publicNavItems = [
  { to: "/search", label: "Compare Prices" },
  { to: "/facilities", label: "Facilities" },
];

const authNavItems = [
  { to: "/search", label: "Compare Prices" },
  { to: "/facilities", label: "Facilities" },
  { to: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // User's initial for the avatar
  const userInitial = user?.first_name?.[0] || user?.username?.[0]?.toUpperCase() || "U";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-smooth",
        scrolled ? "glass shadow-soft" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary blur-md opacity-50 group-hover:opacity-80 transition-smooth" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
              <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex leading-none items-center">
            <span className="font-display text-lg font-bold tracking-tight">HealthPadi</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-smooth",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute inset-0 bg-accent rounded-full -z-10" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")} className="hidden sm:inline-flex" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-warning animate-pulse-soft" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Auth buttons */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 transition-smooth"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {userInitial}
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate">
                  {user?.first_name || user?.username}
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out" title="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex shadow-soft">
              <Link to="/login">Sign in</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border glass animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium",
                  location.pathname.startsWith(item.to) ? "bg-accent text-primary" : "hover:bg-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-border">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {userInitial}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{user?.first_name || user?.username}</div>
                    <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="mt-1 justify-start text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Log out
                </Button>
              </>
            ) : (
              <Button asChild className="mt-2">
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
