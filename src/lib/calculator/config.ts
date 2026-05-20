import type { PricingConfig } from './types';

export const DEFAULT_PRICING: PricingConfig = {
  scenarios: {
    deck_pool_fence:    { ratePerMetre: 280, gatePrice: 680 },
    balcony_balustrade: { ratePerMetre: 320, gatePrice: null },
    premium_pool_fence: { ratePerMetre: 380, gatePrice: 680 },
    stair_balustrade:   { ratePerMetre: 330, gatePrice: 750 },
  },
  minimumLength: 5,
  cornerSurcharge: 85,
  hardwareFinishSurcharge: {
    standard_chrome: 0,
    matte_black:     15,
    brushed_chrome:  12,
    brass:           22,
    custom:          0,
    not_sure:        0,
  },
  rangeLowPercent: 90,
  rangeHighPercent: 120,
};

// Detect the plugin's asset URL.
// Primary: use the URL injected by wp_localize_script — works even when caching
// plugins rename or combine scripts.
// Fallback: parse it from the script tag src, then hardcoded default.
function getPluginBase(): string {
  if (typeof document === 'undefined') return '/wp-content/plugins/rg-calculator/assets/';

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/wordpress-plugin/rg-calculator/assets/';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cfg = (window as any).rgCalculatorConfig;
  if (cfg?.assetsUrl) return cfg.assetsUrl;

  const script = document.querySelector('script[src*="rg-calculator.js"]') as HTMLScriptElement | null;
  if (script?.src) {
    try {
      const url = new URL(script.src, window.location.origin);
      const base = url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1);
      return `${url.origin}${base}`;
    } catch {
      // fall through
    }
  }

  return '/wp-content/plugins/rg-calculator/assets/';
}

const BASE = getPluginBase();
const img = (name: string) => BASE + name;

// These filenames are from the existing assets folder in the plugin
// D:\Royal Glass Dev\cost-calculator-WP\wordpress-plugin\rg-calculator\assets\
export const IMAGES = {
  // Scenario cards
  deck: img('use-deck.jpg'),
  pool: img('use-pool.jpg'),

  // Corners helper
  corners: img('feature-corner.jpg'),

  // Gates helper
  gates: img('feature-gate.jpg'),

  // Fixing method
  spigots:       img('fix-spigots.jpg'),
  standoff:      img('fix-standoff.jpg'),
  hiddenChannel: img('fix-channel.jpg'),

  // Hardware finish
  chrome:        img('finish-chrome.jpg'),
  matteBlack:    img('finish-black.jpg'),
  brushedChrome: img('finish-brushed.jpg'),
  brass:         img('finish-brass.jpg'),
  finishCustom:  img('finish-custom.jpg'),
  notSure:       img('not-sure.jpg'),
};
