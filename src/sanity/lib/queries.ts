import { client } from './client'

export async function getLocations() {
  return client.fetch(`*[_type == "location"] | order(city asc)`)
}

export async function getLocationBySlug(slug: string) {
  return client.fetch(
    `*[_type == "location" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`)
}