import { describe, expect, it } from 'vitest'
import {
  getLocationHeroProof,
  getSituationHeroProof,
  locationPhotoKeys,
  purchasePhotos,
  situationPhotoKeys,
} from './purchase-proof'

describe('purchase photo proof', () => {
  it('uses nearby Lehigh Valley proof on Easton without claiming an Easton closing', () => {
    const proof = getLocationHeroProof('easton', 'Easton', 'PA')
    expect(proof.src).toBe(purchasePhotos.lehighValley.src)
    expect(proof.place).toBe('Lehigh Valley, PA')
    expect(proof.detail).toBe('Purchased As-Is')
    expect(`${proof.alt} ${proof.place} ${proof.detail}`).not.toMatch(/Hazleton|Bethlehem|8 Days|11 Days/)
  })

  it('keeps existing city-specific captions on matching pages', () => {
    expect(getLocationHeroProof('scranton', 'Scranton', 'PA')).toMatchObject({
      place: 'Scranton, PA',
      detail: 'Closed in 14 Days, As-Is',
    })
    expect(getLocationHeroProof('allentown', 'Allentown', 'PA')).toMatchObject({
      place: 'Allentown, PA',
      detail: 'Closed in 10 Days, As-Is',
    })
  })

  it('uses only regional claims for the Lehigh Valley photo wherever it appears', () => {
    for (const slug of ['bethlehem', 'easton']) {
      const proof = getLocationHeroProof(slug, slug, 'PA')
      expect(proof.place).toBe('Lehigh Valley, PA')
      expect(proof.detail).toBe('Purchased As-Is')
    }
    for (const slug of ['divorce', 'tired-landlord']) {
      const proof = getSituationHeroProof(slug)
      expect(proof.place).toBe('Lehigh Valley, PA')
      expect(proof.detail).toBe('Purchased As-Is')
    }
  })

  it('never presents another city or its closing time as page-local proof', () => {
    for (const slug of Object.keys(locationPhotoKeys)) {
      const city = slug === 'wilkes-barre' ? 'Wilkes-Barre' : slug.replaceAll('-', ' ')
      const proof = getLocationHeroProof(slug, city, 'PA')
      expect(proof.src).toMatch(/^\/properties\//)
      if (proof.place.toLowerCase() !== `${city}, PA`.toLowerCase()) {
        expect(proof.place).toMatch(/^(Northeastern Pennsylvania|Lehigh Valley, PA|Eastern Pennsylvania)$/)
        expect(proof.detail).toBe('Purchased As-Is')
      }
    }
    expect(Object.keys(locationPhotoKeys)).toHaveLength(21)
  })

  it('uses one consistent description for the NEPA photo across both templates', () => {
    for (const [slug, key] of Object.entries(locationPhotoKeys)) {
      if (key !== 'nepa') continue
      const proof = getLocationHeroProof(slug, slug.replaceAll('-', ' '), 'PA')
      expect(proof.detail).toBe('Purchased As-Is')
      expect(`${proof.alt} ${proof.place}`).not.toMatch(/Hazleton|\d+ Days/)
    }
    for (const [slug, key] of Object.entries(situationPhotoKeys)) {
      if (key !== 'nepa') continue
      const proof = getSituationHeroProof(slug)
      expect(proof.place).toBe('Northeastern Pennsylvania')
      expect(proof.detail).toBe('Purchased As-Is')
    }
    expect(Object.keys(situationPhotoKeys)).toHaveLength(9)
  })
})
