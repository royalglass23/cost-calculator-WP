// ─── Drop-in replacement for the address field in LeadCapture.tsx ─────────────
// Uses Nominatim (OpenStreetMap) — free, no account, no credit card, no API key.
// Replaces the Google Places useEffect and the addressRef block entirely.
//
// To use: copy this component into LeadCapture.tsx and replace the address <Field>
// block with <NZAddressAutocomplete ... />

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface NZAddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  error?: string;
}

export function NZAddressAutocomplete({ value, onChange, error }: NZAddressAutocompleteProps) {
  const [query, setQuery]         = useState(value);
  const [results, setResults]     = useState<NominatimResult[]>([]);
  const [open, setOpen]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const debounceRef               = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef              = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const search = useCallback(async (q: string) => {
    if (q.length < 3) { setResults([]); setOpen(false); return; }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q:            q,
        countrycodes: 'nz',          // NZ only
        format:       'jsonv2',
        addressdetails: '1',
        limit:        '6',
      });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { 'Accept-Language': 'en-NZ,en' },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) throw new Error('Search failed');
      const data: NominatimResult[] = await res.json();

      // Clean up display names — Nominatim returns full comma-separated strings
      // e.g. "23 Example Street, Auckland, Auckland Region, New Zealand"
      // Strip the trailing ", New Zealand" for cleaner display
      const cleaned = data.map((r) => ({
        ...r,
        display_name: r.display_name.replace(/, New Zealand$/, '').replace(/, Aotearoa$/, ''),
      }));

      setResults(cleaned);
      setOpen(true);
    } catch {
      setResults([]);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onChange(q); // keep parent in sync even before selection

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(q), 350);
  }

  function handleSelect(result: NominatimResult) {
    const address = result.display_name;
    setQuery(address);
    onChange(address);
    setResults([]);
    setOpen(false);
  }

  const inputClass = error
    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
    : 'border-gray-300 bg-white focus:border-[#1a3c5e] focus:ring-1 focus:ring-[#1a3c5e]';

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          autoComplete="off"
          placeholder="23 Example Street, Auckland"
          value={query}
          onChange={handleInput}
          onFocus={() => results.length > 0 && setOpen(true)}
          className={`w-full rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition-colors ${inputClass}`}
          aria-label="Project address"
          aria-autocomplete="list"
          aria-expanded={open}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <svg className="h-4 w-4 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden"
        >
          {results.map((r) => (
            <li
              key={r.place_id}
              role="option"
              aria-selected={false}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(r); }}
              className="flex cursor-pointer items-start gap-2 px-3 py-2.5 text-sm hover:bg-blue-50 transition-colors"
            >
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700 leading-snug">{r.display_name}</span>
            </li>
          ))}
          {!loading && results.length === 0 && (
            <li className="px-3 py-2.5 text-sm text-gray-500">
              No NZ address suggestions found. Keep typing a fuller address.
            </li>
          )}
        </ul>
      )}

      {/* Hints */}
      {!error && (
        <p className="mt-1 text-xs text-gray-400">Start typing your NZ address — suggestions will appear</p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
