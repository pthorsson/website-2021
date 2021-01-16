declare module Website {
  export type Settings = {
    baseTitle: string;
    baseUrl: string;
    defaultMetaData: MetaData;
  };

  export type MetaData = {
    title: string;
    keywords: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: ContentTypes.Image;
  };

  export type Page = {
    metaData: MetaData;
    slug: string;
    heading: string;
    body: string;
  };
}

declare module ContentTypes {
  export type Image = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    mimeType?:
      | 'image/gif'
      | 'image/apng'
      | 'image/flif'
      | 'image/webp'
      | 'image/x-mng'
      | 'image/jpeg'
      | 'image/png;';
  };

  export type Link = {
    href: string;
    text?: string;
    description?: string;
    target?: string;
  };
}
