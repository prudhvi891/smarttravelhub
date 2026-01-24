// schemas/gallery.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Gallery Title",
      type: "string",
      initialValue: "Main Gallery",
      readOnly: true,
    }),

    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Optional description for accessibility",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
