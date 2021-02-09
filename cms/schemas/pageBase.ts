export default {
  name: 'pageBase',
  title: 'Page base',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
  ],
};
