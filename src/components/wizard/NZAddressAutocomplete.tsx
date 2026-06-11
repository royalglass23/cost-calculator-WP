import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getConfig } from '../../hooks/usePricing';

interface NZAddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  error?: string;
}

interface PlacesPrediction {
  place_id: string;
  description: string;
}

type PlacesSessionToken = {
  readonly __placesSessionTokenBrand?: unique symbol;
};

interface PlacePrediction {
  placeId: string;
  text: {
    toString: () => string;
  };
}

interface AutocompleteSuggestion {
  placePrediction?: PlacePrediction;
}

interface PlacesLibrary {
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (request: {
      input: string;
      sessionToken?: PlacesSessionToken;
      includedRegionCodes?: string[];
      language?: string;
      region?: string;
    }) => Promise<{ suggestions: AutocompleteSuggestion[] }>;
  };
  AutocompleteSessionToken: new () => PlacesSessionToken;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: PlacesLibrary;
        importLibrary?: (library: 'places') => Promise<PlacesLibrary>;
      };
    };
  }
}

let googleMapsScriptPromise: Promise<void> | null = null;

function loadGooglePlacesScript(apiKey: string): Promise<void> {
  if (window.google?.maps) return Promise.resolve();
  if (googleMapsScriptPromise) return googleMapsScriptPromise;

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-rg-google-places="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Google Maps failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    const params = new URLSearchParams({
      key: apiKey,
      libraries: 'places',
      v: 'weekly',
    });

    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    script.defer = true;
    script.dataset.rgGooglePlaces = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
}

export function NZAddressAutocomplete({ value, onChange, error }: NZAddressAutocompleteProps) {
  const [query, setQuery]             = useState(value);
  const [results, setResults]         = useState<PlacesPrediction[]>([]);
  const [open, setOpen]               = useState(false);
  const [loading, setLoading]         = useState(false);
  const [placesReady, setPlacesReady] = useState(false);
  const [hoveredId, setHoveredId]     = useState<string | null>(null);
  const debounceRef                   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef                  = useRef<HTMLDivElement>(null);
  const placesRef                     = useRef<PlacesLibrary | null>(null);
  const sessionTokenRef               = useRef<PlacesSessionToken | null>(null);
  const searchIdRef                   = useRef(0);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const apiKey = getConfig().googleMapsKey?.trim();
    if (!apiKey) return;

    let cancelled = false;
    loadGooglePlacesScript(apiKey)
      .then(async () => {
        const places = window.google?.maps?.importLibrary
          ? await window.google.maps.importLibrary('places')
          : window.google?.maps?.places;
        if (!places || cancelled) return;
        placesRef.current = places;
        setPlacesReady(true);
      })
      .catch(() => {
        if (!cancelled) setPlacesReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const search = useCallback(async (q: string) => {
    const places = placesRef.current;
    if (!placesReady || !places || q.length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new places.AutocompleteSessionToken();
    }

    const searchId = searchIdRef.current + 1;
    searchIdRef.current = searchId;
    setLoading(true);

    try {
      const response = await Promise.race([
        places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: q,
          sessionToken: sessionTokenRef.current,
          includedRegionCodes: ['nz'],
          language: 'en-NZ',
          region: 'nz',
        }),
        new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 7000)),
      ]);

      if (searchId !== searchIdRef.current) return;
      setLoading(false);

      if (!response) {
        setResults([]);
        setOpen(true);
        return;
      }

      const predictions = response.suggestions
        .map((suggestion) => suggestion.placePrediction)
        .filter((prediction): prediction is PlacePrediction => Boolean(prediction))
        .map((prediction) => ({
          place_id: prediction.placeId,
          description: prediction.text.toString(),
        }))
        .slice(0, 6);

      setResults(predictions);
      setOpen(true);
    } catch {
      if (searchId !== searchIdRef.current) return;
      setLoading(false);
      setResults([]);
      setOpen(true);
    }
  }, [placesReady]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onChange(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!placesReady) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => search(q), 350);
  }

  function handleSelect(result: PlacesPrediction) {
    setQuery(result.description);
    onChange(result.description);
    setResults([]);
    setOpen(false);
    sessionTokenRef.current = null;
  }

  const showSuggestions = open && placesReady;

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          autoComplete="off"
          placeholder="23 Example Street, Auckland"
          value={query}
          onChange={handleInput}
          onFocus={() => results.length > 0 && setOpen(true)}
          aria-label="Project address"
          aria-autocomplete={placesReady ? 'list' : 'none'}
          aria-expanded={showSuggestions}
          style={{
            width: '100%',
            padding: '10px 36px 10px 12px',
            border: `1px solid ${error ? '#f87171' : '#d1d5db'}`,
            background: error ? '#fef2f2' : 'white',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {loading && (
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <svg
              style={{ width: '16px', height: '16px', color: '#9ca3af', animation: 'rg-spin 1s linear infinite' }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {showSuggestions && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            background: 'white',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {results.map((r) => (
            <li
              key={r.place_id}
              role="option"
              aria-selected={false}
              onMouseEnter={() => setHoveredId(r.place_id)}
              onMouseLeave={() => setHoveredId(null)}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(r); }}
              style={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '10px 12px',
                fontSize: '14px',
                background: hoveredId === r.place_id ? '#eff6ff' : 'white',
              }}
            >
              <svg
                style={{ marginTop: '2px', width: '16px', height: '16px', flexShrink: 0, color: '#9ca3af' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span style={{ color: '#374151', lineHeight: 1.4 }}>{r.description}</span>
            </li>
          ))}
          {!loading && results.length === 0 && (
            <li style={{ padding: '10px 12px', fontSize: '14px', color: '#6b7280' }}>
              No NZ address suggestions found. Keep typing a fuller address.
            </li>
          )}
        </ul>
      )}

      {!error && (
        <p style={{ marginTop: '4px', fontSize: '12px', color: '#9ca3af' }}>
          Start typing your NZ address{placesReady ? ' - suggestions will appear' : ''}
        </p>
      )}
      {error && <p style={{ marginTop: '4px', fontSize: '12px', color: '#dc2626' }}>{error}</p>}
    </div>
  );
}
