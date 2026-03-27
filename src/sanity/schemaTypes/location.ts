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

    // --- Enhanced Sections (optional — for expanded location pages) ---

    defineField({
      name: 'enhancedContent',
      title: 'Enhanced Local Context',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Extended local market context with pain points, regulatory info, and neighborhood details. Replaces the default problem statement when present.',
      group: 'enhanced',
    }),
    defineField({
      name: 'netProceedsComparison',
      title: 'Net Proceeds Comparison ("The Real Math")',
      type: 'object',
      description: 'Side-by-side comparison of traditional sale vs. cash offer net proceeds.',
      group: 'enhanced',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'The Real Math: What You Actually Walk Away With',
        }),
        defineField({
          name: 'introText',
          title: 'Intro Text',
          type: 'text',
          rows: 4,
          description: 'Paragraph before the comparison columns.',
        }),
        defineField({
          name: 'salePrice',
          title: 'Example Sale Price',
          type: 'number',
          description: 'e.g., 200000',
        }),
        defineField({
          name: 'agentCommission',
          title: 'Agent Commission (%)',
          type: 'number',
          description: 'e.g., 6',
        }),
        defineField({
          name: 'transferTaxRate',
          title: 'Total Transfer Tax Rate (%)',
          type: 'number',
          description: 'e.g., 5 (total for buyer + seller)',
        }),
        defineField({
          name: 'sellerTransferTaxShare',
          title: "Seller's Transfer Tax Share (%)",
          type: 'number',
          description: "e.g., 2.5 (seller's half)",
        }),
        defineField({
          name: 'closingCosts',
          title: 'Closing Costs ($)',
          type: 'number',
          description: 'Dollar amount, e.g., 5000',
        }),
        defineField({
          name: 'repairsToList',
          title: 'Repairs to List ($)',
          type: 'number',
          description: 'Dollar amount, e.g., 15000',
        }),
        defineField({
          name: 'carryingCosts',
          title: 'Carrying Costs ($)',
          type: 'number',
          description: 'Dollar amount for ~3 months mortgage/taxes/insurance, e.g., 6000',
        }),
        defineField({
          name: 'cashOffer',
          title: 'Cash Offer Amount ($)',
          type: 'number',
          description: 'e.g., 170000',
        }),
        defineField({
          name: 'followUpText',
          title: 'Follow-Up Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Paragraph(s) after the comparison explaining nuance (e.g., repair escalation scenario).',
        }),
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies ("Real Stories")',
      type: 'array',
      description: 'Anonymized case studies from local homeowners.',
      group: 'enhanced',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g., "The Row Home in South Reading"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'caseStudiesDisclaimer',
      title: 'Case Studies Disclaimer',
      type: 'string',
      description: 'Disclaimer shown below case studies.',
      initialValue: 'These scenarios represent the types of situations we handle regularly across the county.',
      group: 'enhanced',
    }),
    defineField({
      name: 'trustSignals',
      title: 'Trust Signals ("Red Flags")',
      type: 'object',
      description: 'Red flags / trust signals section to help sellers vet cash buyers.',
      group: 'enhanced',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'How to Spot a Trustworthy Cash Buyer',
        }),
        defineField({
          name: 'introText',
          title: 'Intro Paragraph',
          type: 'string',
          description: 'Intro text before the list of signals.',
        }),
        defineField({
          name: 'signals',
          title: 'Signals',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  description: 'e.g., "They can\'t show proof of funds."',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                }),
              ],
              preview: {
                select: { title: 'title' },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'showSituationCards',
      title: 'Show Situation Cards',
      type: 'boolean',
      description: 'When enabled, renders the 8-card "We Help" grid linking to /situations/* pages.',
      initialValue: false,
      group: 'enhanced',
    }),
  ],
  groups: [
    {
      name: 'enhanced',
      title: 'Enhanced Sections',
      default: false,
    },
  ],
})
