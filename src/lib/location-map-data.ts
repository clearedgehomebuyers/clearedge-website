// Location map data for Google Maps integration
// Contains center coordinates, zoom levels, and service area polygon boundaries for all 21 locations

export interface LocationMapData {
  slug: string
  cityName: string
  latitude: number
  longitude: number
  zoomLevel: number
  boundaryCoords: { lat: number; lng: number }[]
}

// All 21 service locations with coordinates and approximate service area boundaries
export const locationMapData: Record<string, LocationMapData> = {
  // NEPA Locations
  'scranton': {
    slug: 'scranton',
    cityName: 'Scranton',
    latitude: 41.4090,
    longitude: -75.6624,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.4600, lng: -75.7400 },
      { lat: 41.4650, lng: -75.6800 },
      { lat: 41.4550, lng: -75.6100 },
      { lat: 41.4200, lng: -75.5700 },
      { lat: 41.3700, lng: -75.5800 },
      { lat: 41.3500, lng: -75.6300 },
      { lat: 41.3550, lng: -75.7100 },
      { lat: 41.3900, lng: -75.7500 },
      { lat: 41.4300, lng: -75.7550 },
    ]
  },
  'wilkes-barre': {
    slug: 'wilkes-barre',
    cityName: 'Wilkes-Barre',
    latitude: 41.2459,
    longitude: -75.8813,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.3000, lng: -75.9500 },
      { lat: 41.3050, lng: -75.8800 },
      { lat: 41.2900, lng: -75.8200 },
      { lat: 41.2500, lng: -75.8000 },
      { lat: 41.2000, lng: -75.8100 },
      { lat: 41.1800, lng: -75.8600 },
      { lat: 41.1900, lng: -75.9300 },
      { lat: 41.2300, lng: -75.9600 },
      { lat: 41.2700, lng: -75.9650 },
    ]
  },
  'hazleton': {
    slug: 'hazleton',
    cityName: 'Hazleton',
    latitude: 40.9584,
    longitude: -75.9746,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.0100, lng: -76.0500 },
      { lat: 41.0150, lng: -75.9800 },
      { lat: 41.0000, lng: -75.9100 },
      { lat: 40.9600, lng: -75.8900 },
      { lat: 40.9100, lng: -75.9000 },
      { lat: 40.8900, lng: -75.9500 },
      { lat: 40.9000, lng: -76.0200 },
      { lat: 40.9400, lng: -76.0600 },
      { lat: 40.9800, lng: -76.0650 },
    ]
  },
  'pittston': {
    slug: 'pittston',
    cityName: 'Pittston',
    latitude: 41.3259,
    longitude: -75.7891,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.3700, lng: -75.8400 },
      { lat: 41.3750, lng: -75.7900 },
      { lat: 41.3600, lng: -75.7400 },
      { lat: 41.3300, lng: -75.7200 },
      { lat: 41.2900, lng: -75.7300 },
      { lat: 41.2700, lng: -75.7700 },
      { lat: 41.2800, lng: -75.8200 },
      { lat: 41.3100, lng: -75.8500 },
      { lat: 41.3500, lng: -75.8550 },
    ]
  },
  'kingston': {
    slug: 'kingston',
    cityName: 'Kingston',
    latitude: 41.2618,
    longitude: -75.8910,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.3100, lng: -75.9400 },
      { lat: 41.3150, lng: -75.8900 },
      { lat: 41.3000, lng: -75.8400 },
      { lat: 41.2650, lng: -75.8250 },
      { lat: 41.2200, lng: -75.8350 },
      { lat: 41.2000, lng: -75.8800 },
      { lat: 41.2100, lng: -75.9300 },
      { lat: 41.2450, lng: -75.9550 },
      { lat: 41.2850, lng: -75.9550 },
    ]
  },
  'nanticoke': {
    slug: 'nanticoke',
    cityName: 'Nanticoke',
    latitude: 41.2054,
    longitude: -75.9874,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.2550, lng: -76.0400 },
      { lat: 41.2600, lng: -75.9900 },
      { lat: 41.2450, lng: -75.9400 },
      { lat: 41.2100, lng: -75.9200 },
      { lat: 41.1650, lng: -75.9300 },
      { lat: 41.1450, lng: -75.9750 },
      { lat: 41.1550, lng: -76.0250 },
      { lat: 41.1900, lng: -76.0550 },
      { lat: 41.2300, lng: -76.0550 },
    ]
  },
  'carbondale': {
    slug: 'carbondale',
    cityName: 'Carbondale',
    latitude: 41.5737,
    longitude: -75.5018,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.6200, lng: -75.5600 },
      { lat: 41.6250, lng: -75.5100 },
      { lat: 41.6100, lng: -75.4500 },
      { lat: 41.5750, lng: -75.4300 },
      { lat: 41.5300, lng: -75.4400 },
      { lat: 41.5100, lng: -75.4850 },
      { lat: 41.5200, lng: -75.5400 },
      { lat: 41.5550, lng: -75.5700 },
      { lat: 41.5950, lng: -75.5750 },
    ]
  },
  'dunmore': {
    slug: 'dunmore',
    cityName: 'Dunmore',
    latitude: 41.4198,
    longitude: -75.6327,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.4650, lng: -75.6800 },
      { lat: 41.4700, lng: -75.6350 },
      { lat: 41.4550, lng: -75.5850 },
      { lat: 41.4200, lng: -75.5650 },
      { lat: 41.3800, lng: -75.5750 },
      { lat: 41.3600, lng: -75.6150 },
      { lat: 41.3700, lng: -75.6650 },
      { lat: 41.4000, lng: -75.6950 },
      { lat: 41.4400, lng: -75.6950 },
    ]
  },
  'honesdale': {
    slug: 'honesdale',
    cityName: 'Honesdale',
    latitude: 41.5765,
    longitude: -75.2585,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.6250, lng: -75.3200 },
      { lat: 41.6300, lng: -75.2700 },
      { lat: 41.6150, lng: -75.2100 },
      { lat: 41.5800, lng: -75.1900 },
      { lat: 41.5350, lng: -75.2000 },
      { lat: 41.5150, lng: -75.2450 },
      { lat: 41.5250, lng: -75.3000 },
      { lat: 41.5600, lng: -75.3300 },
      { lat: 41.6000, lng: -75.3350 },
    ]
  },
  'bloomsburg': {
    slug: 'bloomsburg',
    cityName: 'Bloomsburg',
    latitude: 41.0037,
    longitude: -76.4549,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.0550, lng: -76.5200 },
      { lat: 41.0600, lng: -76.4650 },
      { lat: 41.0450, lng: -76.4000 },
      { lat: 41.0100, lng: -76.3800 },
      { lat: 40.9600, lng: -76.3900 },
      { lat: 40.9400, lng: -76.4400 },
      { lat: 40.9500, lng: -76.5000 },
      { lat: 40.9850, lng: -76.5350 },
      { lat: 41.0300, lng: -76.5350 },
    ]
  },

  // Lehigh Valley Locations
  'allentown': {
    slug: 'allentown',
    cityName: 'Allentown',
    latitude: 40.6084,
    longitude: -75.4902,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 40.6600, lng: -75.5700 },
      { lat: 40.6650, lng: -75.5100 },
      { lat: 40.6500, lng: -75.4400 },
      { lat: 40.6100, lng: -75.4100 },
      { lat: 40.5600, lng: -75.4200 },
      { lat: 40.5400, lng: -75.4700 },
      { lat: 40.5500, lng: -75.5400 },
      { lat: 40.5900, lng: -75.5800 },
      { lat: 40.6350, lng: -75.5850 },
    ]
  },
  'bethlehem': {
    slug: 'bethlehem',
    cityName: 'Bethlehem',
    latitude: 40.6259,
    longitude: -75.3705,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 40.6750, lng: -75.4400 },
      { lat: 40.6800, lng: -75.3850 },
      { lat: 40.6650, lng: -75.3200 },
      { lat: 40.6300, lng: -75.2950 },
      { lat: 40.5800, lng: -75.3050 },
      { lat: 40.5600, lng: -75.3550 },
      { lat: 40.5700, lng: -75.4200 },
      { lat: 40.6050, lng: -75.4550 },
      { lat: 40.6500, lng: -75.4550 },
    ]
  },
  'easton': {
    slug: 'easton',
    cityName: 'Easton',
    latitude: 40.6910,
    longitude: -75.2091,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 40.7400, lng: -75.2750 },
      { lat: 40.7450, lng: -75.2200 },
      { lat: 40.7300, lng: -75.1550 },
      { lat: 40.6950, lng: -75.1350 },
      { lat: 40.6450, lng: -75.1450 },
      { lat: 40.6250, lng: -75.1900 },
      { lat: 40.6350, lng: -75.2550 },
      { lat: 40.6700, lng: -75.2900 },
      { lat: 40.7150, lng: -75.2900 },
    ]
  },
  'reading': {
    slug: 'reading',
    cityName: 'Reading',
    latitude: 40.3356,
    longitude: -75.9269,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 40.3900, lng: -76.0000 },
      { lat: 40.3950, lng: -75.9400 },
      { lat: 40.3800, lng: -75.8700 },
      { lat: 40.3400, lng: -75.8450 },
      { lat: 40.2900, lng: -75.8550 },
      { lat: 40.2700, lng: -75.9100 },
      { lat: 40.2800, lng: -75.9800 },
      { lat: 40.3150, lng: -76.0150 },
      { lat: 40.3650, lng: -76.0150 },
    ]
  },
  'pottsville': {
    slug: 'pottsville',
    cityName: 'Pottsville',
    latitude: 40.6856,
    longitude: -76.1955,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 40.7350, lng: -76.2600 },
      { lat: 40.7400, lng: -76.2050 },
      { lat: 40.7250, lng: -76.1400 },
      { lat: 40.6900, lng: -76.1200 },
      { lat: 40.6400, lng: -76.1300 },
      { lat: 40.6200, lng: -76.1800 },
      { lat: 40.6300, lng: -76.2450 },
      { lat: 40.6650, lng: -76.2750 },
      { lat: 40.7100, lng: -76.2750 },
    ]
  },
  'lehigh-valley': {
    slug: 'lehigh-valley',
    cityName: 'Lehigh Valley',
    latitude: 40.6200,
    longitude: -75.4300,
    zoomLevel: 9,
    boundaryCoords: [
      { lat: 40.8000, lng: -75.6500 },
      { lat: 40.8100, lng: -75.4500 },
      { lat: 40.7800, lng: -75.2000 },
      { lat: 40.7000, lng: -75.1000 },
      { lat: 40.5500, lng: -75.1200 },
      { lat: 40.4500, lng: -75.2500 },
      { lat: 40.4200, lng: -75.5000 },
      { lat: 40.5000, lng: -75.7000 },
      { lat: 40.6500, lng: -75.7500 },
      { lat: 40.7500, lng: -75.7000 },
    ]
  },

  // Poconos Locations
  'stroudsburg': {
    slug: 'stroudsburg',
    cityName: 'Stroudsburg',
    latitude: 40.9862,
    longitude: -75.1946,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.0350, lng: -75.2550 },
      { lat: 41.0400, lng: -75.2000 },
      { lat: 41.0250, lng: -75.1400 },
      { lat: 40.9900, lng: -75.1200 },
      { lat: 40.9450, lng: -75.1300 },
      { lat: 40.9250, lng: -75.1750 },
      { lat: 40.9350, lng: -75.2400 },
      { lat: 40.9700, lng: -75.2700 },
      { lat: 41.0100, lng: -75.2700 },
    ]
  },
  'east-stroudsburg': {
    slug: 'east-stroudsburg',
    cityName: 'East Stroudsburg',
    latitude: 40.9995,
    longitude: -75.1810,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.0500, lng: -75.2400 },
      { lat: 41.0550, lng: -75.1850 },
      { lat: 41.0400, lng: -75.1250 },
      { lat: 41.0050, lng: -75.1050 },
      { lat: 40.9600, lng: -75.1150 },
      { lat: 40.9400, lng: -75.1600 },
      { lat: 40.9500, lng: -75.2250 },
      { lat: 40.9850, lng: -75.2550 },
      { lat: 41.0250, lng: -75.2550 },
    ]
  },
  'pocono-pines': {
    slug: 'pocono-pines',
    cityName: 'Pocono Pines',
    latitude: 41.1068,
    longitude: -75.4563,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.1600, lng: -75.5300 },
      { lat: 41.1650, lng: -75.4700 },
      { lat: 41.1500, lng: -75.4000 },
      { lat: 41.1100, lng: -75.3750 },
      { lat: 41.0600, lng: -75.3850 },
      { lat: 41.0400, lng: -75.4400 },
      { lat: 41.0500, lng: -75.5100 },
      { lat: 41.0850, lng: -75.5450 },
      { lat: 41.1350, lng: -75.5450 },
    ]
  },
  'tannersville': {
    slug: 'tannersville',
    cityName: 'Tannersville',
    latitude: 41.0401,
    longitude: -75.3208,
    zoomLevel: 11,
    boundaryCoords: [
      { lat: 41.0900, lng: -75.3850 },
      { lat: 41.0950, lng: -75.3300 },
      { lat: 41.0800, lng: -75.2650 },
      { lat: 41.0450, lng: -75.2450 },
      { lat: 41.0000, lng: -75.2550 },
      { lat: 40.9800, lng: -75.3050 },
      { lat: 40.9900, lng: -75.3700 },
      { lat: 41.0250, lng: -75.4000 },
      { lat: 41.0650, lng: -75.4000 },
    ]
  },
  'poconos': {
    slug: 'poconos',
    cityName: 'Poconos',
    latitude: 41.0500,
    longitude: -75.3500,
    zoomLevel: 9,
    boundaryCoords: [
      { lat: 41.3000, lng: -75.6000 },
      { lat: 41.3200, lng: -75.3500 },
      { lat: 41.2500, lng: -75.0500 },
      { lat: 41.1000, lng: -74.9000 },
      { lat: 40.9000, lng: -75.0000 },
      { lat: 40.8500, lng: -75.2500 },
      { lat: 40.9000, lng: -75.5500 },
      { lat: 41.0500, lng: -75.7000 },
      { lat: 41.2000, lng: -75.6500 },
    ]
  },
}

// Get all locations as an array for the coverage map
export const allLocations = Object.values(locationMapData)

// Map style for a clean, muted appearance that matches the site aesthetic
export const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ saturation: -30 }]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#c8d7d4' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e0e0e0' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }]
  },
]

// Sage green color matching the site's brand
export const SAGE_GREEN = '#008a29'
export const SAGE_GREEN_LIGHT = 'rgba(0, 138, 41, 0.15)'
export const SAGE_GREEN_STROKE = 'rgba(0, 138, 41, 0.6)'
