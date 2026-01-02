import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'd78o4wq2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})