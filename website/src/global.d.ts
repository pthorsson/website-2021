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

  export type PageChild = {
    id: string;
    path: string;
    heading: string;
    coverImage: ContentTypes.Image;
  };

  export type Page = {
    id: string;
    metaData: MetaData;
    coverImage: ContentTypes.Image;
    path: string;
    intro: string;
    heading: string;
    body: string;
    parent: string;
    children: PageChild[];
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

declare module '@data-file' {
  export const settings: Website.Settings;
  export const navItems: ContentTypes.Link[];
  export const pages: Website.Page[];
}
