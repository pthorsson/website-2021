export default {
  name: 'metaData',
  title: 'Meta data',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
    },
    {
      name: 'ogTitle',
      title: 'OpenGraph Title',
      type: 'string',
    },
    {
      name: 'ogDescription',
      title: 'OpenGraph Description',
      type: 'string',
    },
    {
      name: 'ogImage',
      title: 'OpenGraph Image',
      type: 'image',
    },
  ],
};
