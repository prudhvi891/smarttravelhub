import {defineType, defineField} from 'sanity'

export const trip = defineType({
  name: 'trip',
  title: 'Trip',
  type: 'document',

  fields: [
    /* ================= BASIC INFO ================= */

    defineField({
      name: 'title',
      title: 'Trip Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Shown on trip cards and previews',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),

    /* ================= BUSINESS GROUPING ================= */

    defineField({
      name: 'tripGroup',
      title: 'Trip Group',
      type: 'string',
      options: {
        list: [
          {title: 'Weekend Getaways', value: 'weekend'},
          {title: 'Bulk Trips', value: 'bulk'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    /* ================= STATUS ================= */

    defineField({
      name: 'status',
      title: 'Trip Status',
      type: 'string',
      initialValue: 'upcoming',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Sold Out', value: 'soldout'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),

    /* ================= IMAGES ================= */

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}],
    }),

    /* ================= OVERVIEW ================= */

    defineField({
      name: 'overview',
      title: 'Trip Overview',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Main description shown in Overview tab',
    }),

    /* ================= ITINERARY ================= */

    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Day-wise itinerary details',
    }),

    /* ================= INCLUSIONS / EXCLUSIONS ================= */

    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [{type: 'string'}],
    }),

    /* ================= ADDITIONAL INFO ================= */

    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
      rows: 4,
      description: 'Terms, notes, safety info, cancellation summary',
    }),

    /* ================= PRICING ================= */

    defineField({
      name: 'pricing',
      title: 'Pricing Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'groupSize',
              title: 'Group Size',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Price (per person)',
              type: 'number',
            },
            {
              name: 'note',
              title: 'Note',
              type: 'string',
            },
          ],
        },
      ],
    }),

    /* ================= SPECIAL OFFER ================= */

    defineField({
      name: 'hasOffer',
      title: 'Special Offer',
      type: 'boolean',
      initialValue: false,
      description: 'Enable special offer banner on trip card',
    }),

    defineField({
      name: 'offerText',
      title: 'Offer Text',
      type: 'string',
      hidden: ({parent}) => !parent?.hasOffer,
      description: 'Example: New Year Offer, Early Bird, ₹2000 OFF',
    }),

    /* ================= BULK TRIP SPECIFIC ================= */

    defineField({
      name: 'bulkSize',
      title: 'Bulk Group Size',
      type: 'string',
      hidden: ({parent}) => parent?.tripGroup !== 'bulk',
      description: 'Example: 150–200 Members',
    }),

    /* ================= MARKETING ================= */

    defineField({
      name: 'featured',
      title: 'Featured Trip',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
