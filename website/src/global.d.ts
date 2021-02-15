declare module Website {
  export type SiteSettings = {
    baseTitle?: string;
    baseUrl?: string;
    metaData?: MetaData;
    navigation?: Link[];
  };

  export type MetaData = {
    title?: string;
    keywords?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: ContentTypes.Image;
  };

  export type PageChild = {
    id: string;
    slug: string;
    heading?: string;
    coverImage?: ContentTypes.Image;
  };

  export type Page = {
    id: string;
    metaData: MetaData;
    coverImage?: ContentTypes.Image;
    slug: string;
    intro?: string;
    heading?: string;
    body?: string;
    parent?: string;
    children?: PageChild[];
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
  export const siteSettings: Website.SiteSettings;
  export const pages: Website.Page[];
}
