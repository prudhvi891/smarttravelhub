export const ALL_TRIPS_QUERY = `
  *[_type == "trip"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    location,
    duration,
    status,
    featured,
    pricing,
    heroImage
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteTitle,
    heroTitle,
    heroSubtitle,
    heroImage,
    siteLogo,
    phoneNumber,
    altPhoneNumber,
    whatsappNumber,
    instagramUrl,
    email,
    footerText,
    numberOfTravellers,
    numberOfTrips,
    numberOfDestinations,
    yearsOfService,
    teamImage
  }
`;

export const TRIP_BY_SLUG_QUERY = `
  *[_type == "trip" && slug.current == $slug][0] {
    title,
    location,
    duration,
    shortDescription,
    heroImage,
    gallery,
    pricing
  }
`;

export const ALL_TRIPS_LISTING_QUERY = `
*[_type == "trip"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  location,
  duration,
  tripGroup,
  status,
  bulkSize,
  featured,
  heroImage,
  pricing,
  hasOffer,
  offerText
}
`;

export const TRIP_DETAIL_QUERY = `
*[_type == "trip" && slug.current == $slug][0]{
  title,
  location,
  duration,
  shortDescription,
  heroImage,
  pricing,
  overview,
  itinerary,
  inclusions,
  exclusions,
  additionalInfo
}
`;

export const GALLERY_QUERY = `
  *[_type == "gallery"][0] {
    images[]{
      asset,
      alt
    }
  }
`

