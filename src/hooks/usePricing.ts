import { useState, useEffect } from 'react';
import type { PricingConfig } from '../lib/calculator/types';
import { DEFAULT_PRICING } from '../lib/calculator/config';

declare const rgCalculatorConfig: {
  restUrl: string;
  nonce: string;
  googleMapsKey: string;
  turnstileSiteKey: string;
  assetsUrl: string;
};

export function usePricing(): { pricing: PricingConfig; loading: boolean } {
  const [pricing, setPricing] = useState<PricingConfig>(DEFAULT_PRICING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restUrl =
      typeof rgCalculatorConfig !== 'undefined'
        ? rgCalculatorConfig.restUrl
        : '/wp-json/royal-glass/v1';

    fetch(`${restUrl}/pricing`)
      .then((r) => r.json())
      .then((data: Partial<PricingConfig>) => {
        // Merge with defaults so any missing keys still have values
        setPricing({ ...DEFAULT_PRICING, ...data });
      })
      .catch(() => {
        // Silently fall back to compiled defaults
      })
      .finally(() => setLoading(false));
  }, []);

  return { pricing, loading };
}

export function getConfig() {
  if (typeof rgCalculatorConfig !== 'undefined') return rgCalculatorConfig;
  return {
    restUrl: '/wp-json/royal-glass/v1',
    nonce: '',
    googleMapsKey: '',
    turnstileSiteKey: '',
  };
}
