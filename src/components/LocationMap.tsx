"use client"

import { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polygon, InfoWindow } from '@react-google-maps/api'
import { locationMapData, mapStyles, SAGE_GREEN, SAGE_GREEN_LIGHT, SAGE_GREEN_STROKE } from '@/lib/location-map-data'

interface LocationMapProps {
  slug: string
  cityName: string
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

export function LocationMap({ slug, cityName }: LocationMapProps) {
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const locationData = locationMapData[slug]

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // If no location data found, don't render the map
  if (!locationData) {
    return null
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div
        className="w-full h-[300px] md:h-[400px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center border border-[#1a1f1a]/5"
        aria-label={`Loading map of ${cityName} service area`}
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

  const center = {
    lat: locationData.latitude,
    lng: locationData.longitude,
  }

  const polygonOptions = {
    fillColor: SAGE_GREEN,
    fillOpacity: 0.15,
    strokeColor: SAGE_GREEN,
    strokeOpacity: 0.6,
    strokeWeight: 2,
  }

  return (
    <div
      className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#1a1f1a]/5"
      aria-label={`Map showing ClearEdge Home Buyers service area in ${cityName}, Pennsylvania`}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={locationData.zoomLevel}
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
        {/* Service area polygon */}
        {locationData.boundaryCoords.length > 0 && (
          <Polygon
            paths={locationData.boundaryCoords}
            options={polygonOptions}
          />
        )}

        {/* City center marker */}
        <Marker
          position={center}
          onClick={() => setShowInfoWindow(true)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: SAGE_GREEN,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          }}
        />

        {/* Info window on marker click */}
        {showInfoWindow && (
          <InfoWindow
            position={center}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div className="p-2 max-w-[200px]">
              <p className="font-semibold text-[#1a1f1a] mb-1">
                ClearEdge Home Buyers
              </p>
              <p className="text-[#1a1f1a]/70 text-sm mb-2">
                We buy houses in {cityName} and surrounding areas.
              </p>
              <a
                href="tel:+16109048526"
                className="text-[#008a29] font-medium text-sm hover:underline"
              >
                (610) 904-8526
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
