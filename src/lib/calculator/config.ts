import type { PricingConfig } from './types';

export const DEFAULT_PRICING: PricingConfig = {
  ratePerMetre: 500,
  minimumLength: 5,
  gatePrice: 1100,
  cornerSurcharge: 150,
  hardwareSurchargePerMetre: 50,
  hardwareMinimumSurcharge: 250,
  rangeLowPercent: 90,
  rangeHighPercent: 120,
};

// Detect the plugin's asset URL from the script tag — works regardless of WP install path
function getPluginBase(): string {
  if (typeof document === 'undefined') return '/wp-content/plugins/rg-calculator/assets/';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local Vite dev serves files from workspace root.
    return '/wordpress-plugin/rg-calculator/assets/';
  }
  const script = document.querySelector('script[src*="rg-calculator.js"]') as HTMLScriptElement | null;
  if (script?.src) {
    try {
      const url = new URL(script.src, window.location.origin);
      const path = url.pathname;
      const basePath = path.slice(0, path.lastIndexOf('/') + 1);
      return `${url.origin}${basePath}`;
    } catch {
      // Fall through to default.
    }
  }
  return '/wp-content/plugins/rg-calculator/assets/';
}

const BASE = getPluginBase();
const img = (name: string) => BASE + name;

// These filenames are from the existing assets folder in the plugin
// D:\Royal Glass Dev\cost-calculator-WP\wordpress-plugin\rg-calculator\assets\
export const IMAGES = {
  // Step 1 — project type (from original Cloudflare Workers build)
  deck:      img('use-deck.jpg'),
  pool:      img('use-pool.jpg'),

  // Step 3 — height context
  heightBalustrade: img('height-1-0.jpg'),
  heightPoolFence:  img('height-1-2.jpg'),

  // Step 4 — corners
  corners: img('feature-corner.jpg'),

  // Step 5 — gates
  gates: img('feature-gate.jpg'),

  // Step 6 — fixing method
  spigots:      img('fix-spigots.jpg'),
  standoff:     img('fix-standoff.jpg'),
  hiddenChannel: img('fix-channel.jpg'),

  // Step 7 — hardware finish
  chrome:        img('finish-chrome.jpg'),
  matteBlack:    img('finish-black.jpg'),
  brushedChrome: img('finish-brushed.jpg'),
  brass:         img('finish-brass.jpg'),
  finishCustom:  img('finish-custom.jpg'),
  notSure:       img('not-sure.jpg'),
};
