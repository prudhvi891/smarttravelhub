import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'sodt63ch',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // fast, read-only
})
