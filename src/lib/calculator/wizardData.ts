import heroBalustrade from "@/assets/hero-balustrade.jpg";
import usePool from "@/assets/use-pool.jpg";
import useDeck from "@/assets/use-deck.jpg";
import useStairs from "@/assets/use-stairs.jpg";
import useBalcony from "@/assets/use-balcony.jpg";
import fixSpigots from "@/assets/fix-spigots.jpg";
import fixStandoff from "@/assets/fix-standoff.jpg";
import fixChannel from "@/assets/fix-channel.jpg";
import featureGate from "@/assets/feature-gate.jpg";
import featureCorner from "@/assets/feature-corner.jpg";
import featureHandrail from "@/assets/feature-handrail.jpg";
import featureGlass from "@/assets/feature-glass.jpg";
import subConcrete from "@/assets/sub-concrete.jpg";
import subTimber from "@/assets/sub-timber.jpg";
import subTiles from "@/assets/sub-tiles.jpg";
import subSteel from "@/assets/sub-steel.jpg";

export const images = {
  hero: heroBalustrade,
  pool: usePool,
  deck: useDeck,
  stairs: useStairs,
  balcony: useBalcony,
  spigots: fixSpigots,
  standoff: fixStandoff,
  channel: fixChannel,
  gate: featureGate,
  corner: featureCorner,
  handrail: featureHandrail,
  glass: featureGlass,
  concrete: subConcrete,
  timber: subTimber,
  tiles: subTiles,
  steel: subSteel,
};

export interface VisualOption<V extends string> {
  value: V;
  label: string;
  description?: string;
  image?: string;
  notSure?: boolean;
}

export const projectTypeOptions: VisualOption<
  "balustrade_deck" | "balustrade_balcony" | "stairs" | "pool_fence"
>[] = [
  { value: "balustrade_deck", label: "Deck balustrade", description: "Frameless glass on a deck or patio edge", image: useDeck },
  { value: "balustrade_balcony", label: "Balcony balustrade", description: "Upper-floor balcony or terrace", image: useBalcony },
  { value: "stairs", label: "Stairs", description: "Internal or external staircase", image: useStairs },
  { value: "pool_fence", label: "Pool fence", description: "Compliant frameless pool fencing", image: usePool },
];

export const heightOptions: VisualOption<"1.0m" | "1.1m" | "1.2m" | "custom" | "not_sure">[] = [
  { value: "1.0m", label: "1.0 m", description: "Standard residential balustrade" },
  { value: "1.1m", label: "1.1 m", description: "Required for upper-floor decks" },
  { value: "1.2m", label: "1.2 m", description: "Pool fence (NZ compliance)" },
  { value: "custom", label: "Custom height", description: "Different height required" },
  { value: "not_sure", label: "Not sure", description: "We'll confirm on site", notSure: true },
];

export const glassThicknessOptions: VisualOption<
  "10mm" | "12mm" | "13.52mm" | "15mm" | "not_sure"
>[] = [
  { value: "10mm", label: "10 mm" },
  { value: "12mm", label: "12 mm", description: "Most common — recommended" },
  { value: "13.52mm", label: "13.52 mm laminated" },
  { value: "15mm", label: "15 mm or thicker" },
  { value: "not_sure", label: "Not sure", description: "We'll recommend the right glass", notSure: true },
];

export const glassTypeOptions: VisualOption<
  "toughened" | "laminated" | "sgp_laminated" | "not_sure"
>[] = [
  { value: "toughened", label: "Toughened", description: "Standard frameless glass" },
  { value: "laminated", label: "Laminated", description: "Extra strength and acoustic benefits" },
  { value: "sgp_laminated", label: "SGP laminated", description: "High-performance — engineering review" },
  { value: "not_sure", label: "Not sure", description: "We'll recommend the right type", notSure: true },
];

export const glassClarityOptions: VisualOption<"standard" | "low_iron" | "tinted" | "not_sure">[] = [
  { value: "standard", label: "Standard clear", description: "Slight green edge tint" },
  { value: "low_iron", label: "Ultra-clear (low-iron)", description: "Crystal-clear premium glass" },
  { value: "tinted", label: "Tinted / coloured", description: "For privacy or design" },
  { value: "not_sure", label: "Not sure", notSure: true },
];

export const glassShapeOptions: VisualOption<"straight" | "curved" | "not_sure">[] = [
  { value: "straight", label: "Straight panels only", description: "Standard installation" },
  { value: "curved", label: "Curved or custom-bent", description: "Architectural feature" },
  { value: "not_sure", label: "Not sure", notSure: true },
];

export const fixingOptions: VisualOption<"spigots" | "standoff" | "channel" | "not_sure">[] = [
  { value: "spigots", label: "Spigots", description: "Stainless mini-posts — most popular", image: fixSpigots },
  { value: "standoff", label: "Stand-off posts", description: "Side-mounted hardware", image: fixStandoff },
  { value: "channel", label: "Hidden channel", description: "Sleek, fully recessed look", image: fixChannel },
  { value: "not_sure", label: "Not sure", description: "Royal Glass to recommend", notSure: true },
];

export const handrailOptions: VisualOption<
  "none" | "stainless" | "timber" | "glass" | "not_sure"
>[] = [
  { value: "none", label: "No handrail" },
  { value: "stainless", label: "Stainless steel", image: featureHandrail },
  { value: "timber", label: "Timber" },
  { value: "glass", label: "Glass top rail" },
  { value: "not_sure", label: "Not sure", notSure: true },
];

export const finishOptions: VisualOption<
  "standard" | "matte_black" | "brushed" | "brass" | "custom" | "not_sure"
>[] = [
  { value: "standard", label: "Standard chrome" },
  { value: "matte_black", label: "Matte black" },
  { value: "brushed", label: "Brushed chrome" },
  { value: "brass", label: "Brass" },
  { value: "custom", label: "Custom" },
  { value: "not_sure", label: "Not sure", notSure: true },
];

export const accessOptions: VisualOption<
  "easy" | "stairs" | "highrise" | "scaffold" | "not_sure"
>[] = [
  { value: "easy", label: "Easy ground access", description: "Vehicle can park nearby" },
  { value: "stairs", label: "Up stairs / through house" },
  { value: "highrise", label: "High-rise apartment" },
  { value: "scaffold", label: "Scaffold required" },
  { value: "not_sure", label: "Not sure", notSure: true },
];

export const workingHeightOptions: VisualOption<
  "ground" | "1-2_storeys" | "3plus_storeys"
>[] = [
  { value: "ground", label: "Ground floor" },
  { value: "1-2_storeys", label: "1–2 storeys up" },
  { value: "3plus_storeys", label: "3+ storeys" },
];

export const substrateOptions: VisualOption<
  "timber" | "concrete" | "tiles" | "steel" | "not_sure"
>[] = [
  { value: "timber", label: "Timber deck", image: subTimber },
  { value: "concrete", label: "Concrete", image: subConcrete },
  { value: "tiles", label: "Tiles over concrete", image: subTiles },
  { value: "steel", label: "Steel", image: subSteel },
  { value: "not_sure", label: "Not sure", description: "Royal Glass to confirm on site", notSure: true },
];

export const substrateConditionOptions: VisualOption<
  "new" | "good" | "uneven" | "deteriorated" | "not_sure"
>[] = [
  { value: "new", label: "Brand new" },
  { value: "good", label: "Good condition" },
  { value: "uneven", label: "Uneven / sloped" },
  { value: "deteriorated", label: "Deteriorated" },
  { value: "not_sure", label: "Not sure", notSure: true },
];

export const roleOptions: VisualOption<"homeowner" | "builder" | "architect" | "developer" | "other">[] = [
  { value: "homeowner", label: "Homeowner" },
  { value: "builder", label: "Builder" },
  { value: "architect", label: "Architect / designer" },
  { value: "developer", label: "Developer" },
  { value: "other", label: "Other" },
];

export const timeframeOptions: VisualOption<
  "asap" | "1-3_months" | "3-6_months" | "6plus_months" | "planning"
>[] = [
  { value: "asap", label: "ASAP" },
  { value: "1-3_months", label: "1–3 months" },
  { value: "3-6_months", label: "3–6 months" },
  { value: "6plus_months", label: "6+ months" },
  { value: "planning", label: "Just planning / budgeting" },
];

export const featureImages = {
  gate: featureGate,
  corner: featureCorner,
  handrail: featureHandrail,
  glass: featureGlass,
};