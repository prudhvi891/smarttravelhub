import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Travel club / brand name',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline on homepage',
    }),

    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtext below hero title',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Include country code, e.g. +91XXXXXXXXXX',
    }),

    defineField({
      name: 'altPhoneNumber',
      title: 'Alternative Phone Number',
      type: 'string',
      description: 'Include country code, e.g. +91XXXXXXXXXX',
    }),

    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code, e.g. +91XXXXXXXXXX',
    }),

    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),

    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
    }),

    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Copyright or tagline',
    }),

    defineField({
      name: 'numberOfTravellers',
      title: 'Number of Travellers',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'numberOfTrips',
      title: 'Number of Trips',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'numberOfDestinations',
      title: 'Number of Destinations',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'yearsOfService',
      title: 'Years of Service',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'teamImage',
      title: 'About Us – Team Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
