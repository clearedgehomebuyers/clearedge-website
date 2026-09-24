import { cityToHub } from '@/lib/regional-hub-data'

// One record per existing purchase photo keeps its location and closing-time
// claims consistent wherever it is reused. Source metadata for the Lehigh
// Valley and NEPA photos supports only a region, not a city or closing time.
export const purchasePhotos = {
  scranton: {
    src: '/properties/scranton-pa-cash-home-buyers-clearedge-1.jpg',
    city: 'Scranton', region: 'nepa', days: 14,
  },
  wilkesBarre: {
    src: '/properties/wilkes-barre-pa-inherited-property-sale-3.jpg',
    city: 'Wilkes-Barre', region: 'nepa', days: 12,
  },
  allentown: {
    src: '/properties/allentown-pa-sell-house-fast-as-is-2.jpg',
    city: 'Allentown', region: 'lehigh-valley', days: 10,
  },
  lehighValley: {
    src: '/properties/lehigh-valley-real-estate-investors-4.jpg',
    region: 'lehigh-valley',
  },
  nepa: {
    src: '/properties/nepa-distressed-house-cleanout-service-5.jpg',
    region: 'nepa',
  },
} as const

type PhotoKey = keyof typeof purchasePhotos

export const locationPhotoKeys: Record<string, PhotoKey> = {
  scranton: 'scranton',
  stroudsburg: 'scranton',
  pittston: 'scranton',
  bloomsburg: 'scranton',
  reading: 'lehighValley',
  'wilkes-barre': 'wilkesBarre',
  'east-stroudsburg': 'wilkesBarre',
  kingston: 'wilkesBarre',
  'lehigh-valley': 'lehighValley',
  allentown: 'allentown',
  hazleton: 'nepa',
  dunmore: 'scranton',
  poconos: 'nepa',
  bethlehem: 'lehighValley',
  easton: 'lehighValley', // Regional purchase, not a fabricated Easton closing.
  pottsville: 'nepa',
  nanticoke: 'wilkesBarre',
  'pocono-pines': 'nepa',
  carbondale: 'nepa',
  honesdale: 'nepa',
  tannersville: 'nepa',
}

export const situationPhotoKeys: Record<string, PhotoKey> = {
  foreclosure: 'allentown',
  'inherited-property': 'wilkesBarre',
  divorce: 'lehighValley',
  'job-relocation': 'nepa',
  'major-repairs': 'allentown',
  'tax-liens-code-violations': 'wilkesBarre',
  'tired-landlord': 'lehighValley',
  'vacant-property': 'nepa',
  'foundation-structural-issues': 'wilkesBarre',
}

const regionLabels: Record<string, string> = {
  nepa: 'Northeastern Pennsylvania',
  'lehigh-valley': 'Lehigh Valley, PA',
}

function photoCity(photo: typeof purchasePhotos[PhotoKey]): string | undefined {
  return 'city' in photo ? photo.city : undefined
}

function photoDays(photo: typeof purchasePhotos[PhotoKey]): number | undefined {
  return 'days' in photo ? photo.days : undefined
}

export function getLocationHeroProof(slug: string, city: string, state: string) {
  const photo = purchasePhotos[locationPhotoKeys[slug] || 'scranton']
  const actualCity = photoCity(photo)
  const days = photoDays(photo)
  const isCityMatch = actualCity?.toLowerCase() === city.trim().toLowerCase() && state.trim().toUpperCase() === 'PA'
  const isRegionMatch = photo.region === cityToHub[slug]
  const place = isCityMatch
    ? `${actualCity}, PA`
    : isRegionMatch
      ? regionLabels[photo.region]
      : 'Eastern Pennsylvania'

  return {
    src: photo.src,
    alt: `Home purchased by ClearEdge in ${place}`,
    place,
    detail: isCityMatch && days ? `Closed in ${days} Days, As-Is` : 'Purchased As-Is',
  }
}

export function getSituationHeroProof(slug: string) {
  const photo = purchasePhotos[situationPhotoKeys[slug] || 'allentown']
  const actualCity = photoCity(photo)
  const days = photoDays(photo)
  const place = actualCity ? `${actualCity}, PA` : regionLabels[photo.region]

  return {
    src: photo.src,
    alt: `Home purchased by ClearEdge in ${place}`,
    place,
    detail: days ? `${days} Days to Close` : 'Purchased As-Is',
  }
}
