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
import height10 from "@/assets/height-1-0.jpg";
import height11 from "@/assets/height-1-1.jpg";
import height12 from "@/assets/height-1-2.jpg";
import heightCustom from "@/assets/height-custom.jpg";
import notSureImg from "@/assets/not-sure.jpg";
import glass12 from "@/assets/glass-12mm.jpg";
import glass1352 from "@/assets/glass-1352.jpg";
import glass15 from "@/assets/glass-15mm.jpg";
import glassToughened from "@/assets/glass-toughened.jpg";
import glassLaminated from "@/assets/glass-laminated.jpg";
import glassSgp from "@/assets/glass-sgp.jpg";
import clarityStandard from "@/assets/clarity-standard.jpg";
import clarityLowiron from "@/assets/clarity-lowiron.jpg";
import clarityTinted from "@/assets/clarity-tinted.jpg";
import shapeStraight from "@/assets/shape-straight.jpg";
import shapeCurved from "@/assets/shape-curved.jpg";
import handrailNone from "@/assets/handrail-none.jpg";
import handrailStainless from "@/assets/handrail-stainless.jpg";
import handrailTimber from "@/assets/handrail-timber.jpg";
import handrailGlassImg from "@/assets/handrail-glass.jpg";
import finishChrome from "@/assets/finish-chrome.jpg";
import finishBlack from "@/assets/finish-black.jpg";
import finishBrushed from "@/assets/finish-brushed.jpg";
import finishBrass from "@/assets/finish-brass.jpg";
import finishCustom from "@/assets/finish-custom.jpg";
import accessEasy from "@/assets/access-easy.jpg";
import accessStairsImg from "@/assets/access-stairs.jpg";
import accessHighrise from "@/assets/access-highrise.jpg";
import accessScaffold from "@/assets/access-scaffold.jpg";
import whGround from "@/assets/wh-ground.jpg";
import wh2storey from "@/assets/wh-2storey.jpg";
import wh3plus from "@/assets/wh-3plus.jpg";
import condNew from "@/assets/cond-new.jpg";
import condGood from "@/assets/cond-good.jpg";
import condUneven from "@/assets/cond-uneven.jpg";
import condDeteriorated from "@/assets/cond-deteriorated.jpg";

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
  { value: "1.0m", label: "1.0 m", description: "Standard residential balustrade", image: height10 },
  { value: "1.1m", label: "1.1 m", description: "Required for upper-floor decks", image: height11 },
  { value: "1.2m", label: "1.2 m", description: "Pool fence (NZ compliance)", image: height12 },
  { value: "custom", label: "Custom height", description: "Different height required", image: heightCustom },
  { value: "not_sure", label: "Not sure", description: "We'll confirm on site", image: notSureImg, notSure: true },
];

export const glassThicknessOptions: VisualOption<
  "10mm" | "12mm" | "13.52mm" | "15mm" | "not_sure"
>[] = [
  { value: "10mm", label: "10 mm", image: glass12 },
  { value: "12mm", label: "12 mm", description: "Most common — recommended", image: glass12 },
  { value: "13.52mm", label: "13.52 mm laminated", image: glass1352 },
  { value: "15mm", label: "15 mm or thicker", image: glass15 },
  { value: "not_sure", label: "Not sure", description: "We'll recommend the right glass", image: notSureImg, notSure: true },
];

export const glassTypeOptions: VisualOption<
  "toughened" | "laminated" | "sgp_laminated" | "not_sure"
>[] = [
  { value: "toughened", label: "Toughened", description: "Standard frameless glass", image: glassToughened },
  { value: "laminated", label: "Laminated", description: "Extra strength and acoustic benefits", image: glassLaminated },
  { value: "sgp_laminated", label: "SGP laminated", description: "High-performance — engineering review", image: glassSgp },
  { value: "not_sure", label: "Not sure", description: "We'll recommend the right type", image: notSureImg, notSure: true },
];

export const glassClarityOptions: VisualOption<"standard" | "low_iron" | "tinted" | "not_sure">[] = [
  { value: "standard", label: "Standard clear", description: "Slight green edge tint", image: clarityStandard },
  { value: "low_iron", label: "Ultra-clear (low-iron)", description: "Crystal-clear premium glass", image: clarityLowiron },
  { value: "tinted", label: "Tinted / coloured", description: "For privacy or design", image: clarityTinted },
  { value: "not_sure", label: "Not sure", image: notSureImg, notSure: true },
];

export const glassShapeOptions: VisualOption<"straight" | "curved" | "not_sure">[] = [
  { value: "straight", label: "Straight panels only", description: "Standard installation", image: shapeStraight },
  { value: "curved", label: "Curved or custom-bent", description: "Architectural feature", image: shapeCurved },
  { value: "not_sure", label: "Not sure", image: notSureImg, notSure: true },
];

export const fixingOptions: VisualOption<"spigots" | "standoff" | "channel" | "not_sure">[] = [
  { value: "spigots", label: "Spigots", description: "Stainless mini-posts — most popular", image: fixSpigots },
  { value: "standoff", label: "Stand-off posts", description: "Side-mounted hardware", image: fixStandoff },
  { value: "channel", label: "Hidden channel", description: "Sleek, fully recessed look", image: fixChannel },
  { value: "not_sure", label: "Not sure", description: "Royal Glass to recommend", image: notSureImg, notSure: true },
];

export const handrailOptions: VisualOption<
  "none" | "stainless" | "timber" | "glass" | "not_sure"
>[] = [
  { value: "none", label: "No handrail", image: handrailNone },
  { value: "stainless", label: "Stainless steel", image: handrailStainless },
  { value: "timber", label: "Timber", image: handrailTimber },
  { value: "glass", label: "Glass top rail", image: handrailGlassImg },
  { value: "not_sure", label: "Not sure", image: notSureImg, notSure: true },
];

export const finishOptions: VisualOption<
  "standard" | "matte_black" | "brushed" | "brass" | "custom" | "not_sure"
>[] = [
  { value: "standard", label: "Standard chrome", image: finishChrome },
  { value: "matte_black", label: "Matte black", image: finishBlack },
  { value: "brushed", label: "Brushed chrome", image: finishBrushed },
  { value: "brass", label: "Brass", image: finishBrass },
  { value: "custom", label: "Custom", image: finishCustom },
  { value: "not_sure", label: "Not sure", image: notSureImg, notSure: true },
];

export const accessOptions: VisualOption<
  "easy" | "stairs" | "highrise" | "scaffold" | "not_sure"
>[] = [
  { value: "easy", label: "Easy ground access", description: "Vehicle can park nearby", image: accessEasy },
  { value: "stairs", label: "Up stairs / through house", image: accessStairsImg },
  { value: "highrise", label: "High-rise apartment", image: accessHighrise },
  { value: "scaffold", label: "Scaffold required", image: accessScaffold },
  { value: "not_sure", label: "Not sure", image: notSureImg, notSure: true },
];

export const workingHeightOptions: VisualOption<
  "ground" | "1-2_storeys" | "3plus_storeys"
>[] = [
  { value: "ground", label: "Ground floor", image: whGround },
  { value: "1-2_storeys", label: "1–2 storeys up", image: wh2storey },
  { value: "3plus_storeys", label: "3+ storeys", image: wh3plus },
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
  { value: "new", label: "Brand new", image: condNew },
  { value: "good", label: "Good condition", image: condGood },
  { value: "uneven", label: "Uneven / sloped", image: condUneven },
  { value: "deteriorated", label: "Deteriorated", image: condDeteriorated },
  { value: "not_sure", label: "Not sure", image: notSureImg, notSure: true },
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