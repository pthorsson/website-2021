import fetch from 'node-fetch';
import * as fs from 'fs';
import markdown from './lib/markdown';
import { DATA_FILE, STRAPI_BASE_URL, STRAPI_TOKEN } from './config';

if (process.argv.slice(2)[0] === '--run') {
  (async () => {
    console.log('Fetching data ...');
    const content = await fetchContent();

    console.log('Writing to file ...');
    fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2));

    console.log('Fetching content complete!');
  })();
}

export async function fetchContent() {
  const rawPages = await fetchPages();
  const rawNavigation = await fetchNavigation();
  const rawSiteSettings = await fetchSiteSettings();

  let pages = rawPages.map((rawPage: any) => {
    const slugs = [rawPage.slug];

    if (rawPage.parent) {
      slugs.unshift(rawPage.parent.slug);
    }

    return {
      metaData: cleanMetaData(rawPage.metaData),
      id: rawPage._id,
      path: `/${slugs.join('/')}`,
      title: rawPage.title,
      heading: rawPage.heading,
      intro: rawPage.intro,
      body: rawPage.body && markdown(rawPage.body),
      parent: rawPage.parent?._id,
      children:
        rawPage.displayChildren &&
        rawPage.children?.map((child: any) => child._id),
    };
  });

  pages = pages.map((page: any) => {
    if (page.children) {
      page.children = page.children.map((childId: string) => {
        const childPage = pages.find((p: any) => p.id === childId);

        return {
          id: childId,
          path: childPage.path,
          heading: childPage.heading,
          coverImage: childPage.coverImage,
        };
      });
    }

    return page;
  });

  const navItems = (rawNavigation.pages || []).map((rawNavItem: any) => {
    const page = pages.find((page: any) => page.id === rawNavItem._id);

    return {
      text: page.heading,
      href: page.path,
    };
  });

  const settings = {
    baseTitle: rawSiteSettings.baseTitle,
    baseUrl: rawSiteSettings.baseUrl,
    defaultMetaData: cleanMetaData(rawSiteSettings.metaData),
  };

  return {
    settings,
    navItems,
    pages,
  };
}

function strapiUrl(contentType: string) {
  return `${STRAPI_BASE_URL}/${contentType}?token=${STRAPI_TOKEN}`;
}

async function fetchPages() {
  const res = await fetch(strapiUrl('pages'));
  const pages = await res.json();

  return pages;
}

async function fetchNavigation() {
  const res = await fetch(strapiUrl('navigation'));
  const navigation = await res.json();

  return navigation;
}

async function fetchSiteSettings() {
  const res = await fetch(strapiUrl('site-settings'));
  const siteSettings = await res.json();

  return siteSettings;
}

function cleanMetaData(metaData: any) {
  metaData = metaData || {};

  const metaKeys = [
    'title',
    'keywords',
    'description',
    'ogTitle',
    'ogDescription',
    'ogImage',
  ];

  const cleanedMetaData: any = {};

  Object.keys(metaData).forEach((key) => {
    if (metaKeys.find((k) => k === key && metaData[key])) {
      cleanedMetaData[key] = metaData[key];
    }
  });

  return cleanedMetaData;
}
