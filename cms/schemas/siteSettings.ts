export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site settings',
  fields: [
    {
      name: 'baseTitle',
      title: 'Base title',
      type: 'string',
    },
    {
      name: 'baseUrl',
      title: 'Base url',
      type: 'string',
    },
    {
      name: 'metaData',
      title: 'Meta data',
      type: 'metaData',
    },
  ],
};
