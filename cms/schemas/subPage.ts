export default {
  name: 'subPage',
  title: 'Sub-pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageBase',
      title: 'Page base',
      type: 'pageBase',
    },
    {
      name: 'metaData',
      title: 'Meta data',
      type: 'metaData',
    },
  ],
};
