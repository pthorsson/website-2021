import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config({ path: path.join(__filename, '../../../.env') });

const BASE_URL = process.env.STRAPI_BASE_URL;
const TOKEN = process.env.STRAPI_TOKEN;
const DATA_FILE = path.join(
  __filename,
  '../../../data',
  process.env.CONTENT_SERVER_OUTPUT
);

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

  const pages = rawPages.map((rawPage: any) => {
    const slugs = [rawPage.slug];

    if (rawPage.parent) {
      slugs.unshift(rawPage.parent.slug);
    }

    return {
      metaData: cleanMetaData(rawPage.metaData),
      _id: rawPage._id,
      path: `/${slugs.join('/')}`,
      title: rawPage.title,
      heading: rawPage.heading,
      intro: rawPage.intro,
      body: rawPage.body,
      parent: rawPage.parent?._id,
      children:
        rawPage.displayChildren &&
        rawPage.children?.map((child: any) => child._id),
    };
  });

  const navItems = (rawNavigation.pages || []).map((rawNavItem: any) => {
    const page = pages.find((page: any) => page._id === rawNavItem._id);

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

async function fetchPages() {
  const res = await fetch(`${BASE_URL}/pages?token=${TOKEN}`);
  const pages = await res.json();

  return pages;
}

async function fetchNavigation() {
  const res = await fetch(`${BASE_URL}/navigation?token=${TOKEN}`);
  const navigation = await res.json();

  return navigation;
}

async function fetchSiteSettings() {
  const res = await fetch(`${BASE_URL}/site-settings?token=${TOKEN}`);
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
