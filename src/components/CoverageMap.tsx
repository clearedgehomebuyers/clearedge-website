"use client"

import { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { allLocations, mapStyles, SAGE_GREEN } from '@/lib/location-map-data'
import Link from 'next/link'

const containerStyle = {
  width: '100%',
  height: '100%',
}

// Center of Eastern PA coverage area (between NEPA and Lehigh Valley)
const centerCoords = {
  lat: 41.0,
  lng: -75.6,
}

interface ActiveMarker {
  slug: string
  cityName: string
  position: { lat: number; lng: number }
}

export function CoverageMap() {
  const [activeMarker, setActiveMarker] = useState<ActiveMarker | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
    // Zoom out one level on mobile
    if (window.innerWidth < 768) {
      map.setZoom(7)
    }
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (location: typeof allLocations[0]) => {
    setActiveMarker({
      slug: location.slug,
      cityName: location.cityName,
      position: { lat: location.latitude, lng: location.longitude },
    })
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div
        className="w-full h-[280px] md:h-[500px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center border border-[#1a1f1a]/5"
        aria-label="Loading coverage map"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#008a29] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-[#1a1f1a]/50 text-sm">Loading map...</p>
        </div>
      </div>
    )
  }

  // Handle load error gracefully
  if (loadError) {
    return null
  }

  return (
    <div
      className="w-full h-[280px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-[#1a1f1a]/5"
      aria-label="Map showing all ClearEdge Home Buyers service locations across Eastern Pennsylvania"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerCoords}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {/* Markers for all 21 locations */}
        {allLocations.map((location) => (
          <Marker
            key={location.slug}
            position={{ lat: location.latitude, lng: location.longitude }}
            onClick={() => handleMarkerClick(location)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: SAGE_GREEN,
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
            title={location.cityName}
          />
        ))}

        {/* Info window for active marker */}
        {activeMarker && (
          <InfoWindow
            position={activeMarker.position}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-2 max-w-[220px]">
              <p className="font-semibold text-[#1a1f1a] mb-1">
                {activeMarker.cityName}
              </p>
              <p className="text-[#1a1f1a]/70 text-sm mb-2">
                We buy houses for cash in {activeMarker.cityName} and surrounding areas.
              </p>
              <Link
                href={`/locations/${activeMarker.slug}`}
                className="text-[#008a29] font-medium text-sm hover:underline inline-block"
              >
                Learn more &rarr;
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
