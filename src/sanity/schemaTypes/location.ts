import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'PA',
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      description: 'e.g., Lackawanna County',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'city' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'nearbyTowns',
      title: 'Nearby Towns (Trust Bar)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Towns to display in the trust bar, e.g., Dunmore, Old Forge',
    }),
    defineField({
      name: 'problemStatement',
      title: 'Local Problem Statement',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Paragraphs about local market challenges',
    }),
    defineField({
      name: 'neighborhoods',
      title: 'Neighborhoods',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Local neighborhoods you serve',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    }),
  ],
})