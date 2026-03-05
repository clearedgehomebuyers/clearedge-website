"use client"

import { useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

// ─── Types ───
export interface ParsedAddress {
  street: string
  city: string
  state: string
  zip: string
  fullAddress: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onPlaceSelect: (place: ParsedAddress) => void
  placeholder?: string
  className?: string
  id?: string
  autoComplete?: string
}

// ─── Lazy script loader ───
// Loads the Google Maps JS API with Places library on first use.
// Deduplicates across multiple component instances.
let loadPromise: Promise<void> | null = null

function loadGooglePlaces(): Promise<void> {
  if (loadPromise) return loadPromise

  // Already loaded (e.g., by a map component)
  if (typeof google !== 'undefined' && google.maps?.places) {
    return Promise.resolve()
  }

  loadPromise = new Promise((resolve, reject) => {
    // Check if a Google Maps script is already on the page (from map components)
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]') as HTMLScriptElement | null

    if (existingScript) {
      // Script exists but Places may not be loaded — wait for it then load Places via importLibrary
      const waitForGoogle = () => {
        if (typeof google !== 'undefined' && google.maps) {
          google.maps.importLibrary('places').then(() => resolve()).catch(reject)
        } else {
          setTimeout(waitForGoogle, 100)
        }
      }
      waitForGoogle()
      return
    }

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key) {
      reject(new Error('Google Maps API key not configured'))
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      loadPromise = null
      reject(new Error('Failed to load Google Maps script'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

// ─── Parse address_components from a Place result ───
function parsePlaceResult(place: google.maps.places.PlaceResult): ParsedAddress {
  const components = place.address_components || []

  let streetNumber = ''
  let route = ''
  let city = ''
  let state = ''
  let zip = ''

  for (const component of components) {
    const types = component.types
    if (types.includes('street_number')) {
      streetNumber = component.long_name
    } else if (types.includes('route')) {
      route = component.long_name
    } else if (types.includes('locality')) {
      city = component.long_name
    } else if (types.includes('sublocality_level_1') && !city) {
      city = component.long_name
    } else if (types.includes('administrative_area_level_1')) {
      state = component.short_name
    } else if (types.includes('postal_code')) {
      zip = component.long_name
    }
  }

  const street = streetNumber && route
    ? `${streetNumber} ${route}`
    : route || streetNumber

  return {
    street,
    city,
    state,
    zip,
    fullAddress: place.formatted_address || `${street}, ${city}, ${state} ${zip}`.trim(),
  }
}

// ─── PA bounding box to bias results ───
const PA_BOUNDS = {
  south: 39.72,
  west: -80.52,
  north: 42.27,
  east: -74.69,
}

// ─── Component ───
export function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = '123 Main Street',
  className,
  id,
  autoComplete = 'off',
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const isLoadedRef = useRef(false)

  const onPlaceSelectRef = useRef(onPlaceSelect)
  onPlaceSelectRef.current = onPlaceSelect

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || autocompleteRef.current || !isLoadedRef.current) return

    try {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
        bounds: new google.maps.LatLngBounds(
          { lat: PA_BOUNDS.south, lng: PA_BOUNDS.west },
          { lat: PA_BOUNDS.north, lng: PA_BOUNDS.east },
        ),
        fields: ['address_components', 'formatted_address'],
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.address_components) {
          const parsed = parsePlaceResult(place)
          onPlaceSelectRef.current(parsed)
        }
      })

      autocompleteRef.current = autocomplete
    } catch {
      // Graceful fallback — input still works as a normal text field
    }
  }, [])

  // Load the Places library on first focus (lazy)
  const handleFocus = useCallback(() => {
    if (isLoadedRef.current) return
    loadGooglePlaces()
      .then(() => {
        isLoadedRef.current = true
        initAutocomplete()
      })
      .catch(() => {
        // Silently fail — input works as normal text field
      })
  }, [initAutocomplete])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
        autocompleteRef.current = null
      }
    }
  }, [])

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={handleFocus}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-ce-ink/10 h-14 w-full min-w-0 rounded-xl border bg-surface-cream/50 px-4 py-2 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:border-ce-ink/20',
        'focus-visible:border-ce-green focus-visible:ring-ce-green/20 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className,
      )}
    />
  )
}
