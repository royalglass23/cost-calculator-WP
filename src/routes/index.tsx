import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ShieldCheck, Clock, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-balustrade.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Get an Estimate — Royal Glass Balustrades & Pool Fences" },
      {
        name: "description",
        content:
          "Get an indicative estimate in minutes for your frameless glass balustrade or pool fence from Royal Glass, Auckland's frameless glass experts.",
      },
      { property: "og:title", content: "Get an Estimate — Royal Glass" },
      { property: "og:description", content: "Indicative estimates for frameless glass balustrades and pool fences in Auckland." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Frameless glass balustrade overlooking native bush" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white/90 backdrop-blur">
            Auckland's frameless glass experts
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-white sm:text-6xl">
            Get an indicative estimate for your glass balustrade
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            A quick visual walk-through, then a starting price range for your project — followed by a tailored quote from our team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
              <Link to="/calculator">
                Start your estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <a href="tel:0800769254">Call 0800 769 254</a>
            </Button>
          </div>
          <ul className="mt-10 grid max-w-2xl gap-3 text-sm text-white/85 sm:grid-cols-3">
            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 2-minute visual wizard</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> No obligation</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Reviewed by Royal Glass</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Indicative, not final", body: "We give you a starting range. Final pricing is confirmed after a site visit and compliance check." },
            { icon: Clock, title: "Built for your project", body: "Tell us about your deck, balcony, stairs or pool — we tailor the estimate to your situation." },
            { icon: MapPin, title: "Auckland specialists", body: "We work right across the Auckland region. Some sites need a manual review — we'll flag those for you." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border bg-card p-6 shadow-[var(--shadow-soft)]">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-xl border bg-gradient-to-br from-accent/40 to-card p-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Ready to see your starting range?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Takes about 2 minutes. No surprises — just a clear indicative range.</p>
          <Button asChild size="lg" className="mt-6 gap-2">
            <Link to="/calculator">Start your estimate <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        © Royal Glass Limited · Indicative estimates only — final pricing confirmed by Royal Glass.
      </footer>
    </div>
  );
}
