import { Link } from "react-router-dom";
import { Activity, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-24">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">HealthPadi</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              Bringing radical price transparency to Nigerian healthcare. Find, compare, and verify medical procedure prices across the country.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-secondary hover:bg-accent flex items-center justify-center transition-smooth">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-foreground transition-smooth">Compare Prices</Link></li>
              <li><Link to="/facilities" className="hover:text-foreground transition-smooth">Facilities</Link></li>
              <li><Link to="/report" className="hover:text-foreground transition-smooth">Report a price</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">For Providers</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HealthPadi. Built with care in Lagos.</p>
          <p>Prices listed are user/provider submitted. Always confirm with facility.</p>
        </div>
      </div>
    </footer>
  );
}
