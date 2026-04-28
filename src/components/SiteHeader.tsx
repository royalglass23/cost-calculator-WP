import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded border-2 border-primary">
            <div className="h-3 w-3 rotate-45 border border-primary/60" />
          </div>
          <div className="font-display text-lg leading-tight text-primary">
            Royal <span className="block text-xs tracking-wide">Glass</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <a href="https://royalglass.co.nz/" className="text-muted-foreground hover:text-primary">
            Main site
          </a>
          <Link to="/calculator" className="text-muted-foreground hover:text-primary">
            Estimate
          </Link>
        </nav>
        <Button asChild size="sm" variant="outline" className="gap-2">
          <a href="tel:0800769254">
            <Phone className="h-4 w-4" /> 0800 769 254
          </a>
        </Button>
      </div>
    </header>
  );
}