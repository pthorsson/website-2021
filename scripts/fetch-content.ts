import * as fs from 'fs';
import markdown from './lib/markdown';
import { sanityFetch } from './lib/sanity-fetch';
import { DATA_FILE } from './lib/config';
import { logger } from './lib/logger';

const log = logger('fetch-content');

// Run script
(async () => {
  log('Fetching data ...');

  const rawSiteSettings = await fetchSiteSettings();
  const rawPages = await fetchPages();
  const rawSubPages = await fetchSubPages();

  const siteSettings = {
    _rev: rawSiteSettings._rev,
    _updatedAt: rawSiteSettings._updatedAt,
    baseTitle: rawSiteSettings.baseTitle,
    baseUrl: rawSiteSettings.baseUrl,
    metaData: copyMetaData(rawSiteSettings.metaData),
    navigation: rawSiteSettings.navigation || [],
  };

  const pages = rawPages.map((page) => ({
    _id: page._id,
    _rev: page._rev,
    _updatedAt: page._updatedAt,
    _createdAt: page._createdAt,
    title: page.title,
    path: `/${page.slug.current}`,
    ...copyPageBase(page.pageBase),
    metaData: copyMetaData(page.metaData),
  }));

  const subPages = rawSubPages.map((subPage) => ({
    _id: subPage._id,
    _rev: subPage._rev,
    _updatedAt: subPage._updatedAt,
    _createdAt: subPage._createdAt,
    title: subPage.title,
    path: makeSubPagePath(pages, subPage.parent._ref, subPage.slug.current),
    tags: (subPage.tags || []).map((tag) => tag.toLowerCase().trim()),
    ...copyPageBase(subPage.pageBase),
    metaData: copyMetaData(subPage.metaData),
  }));

  siteSettings.navigation = siteSettings.navigation.map((navItem) => {
    const page = [...pages, ...subPages].find(
      (page) => page._id === navItem._ref
    );

    return {
      text: page.heading || page.title,
      href: page.path,
    };
  });

  const dataFileContent = JSON.stringify(
    {
      siteSettings,
      pages: [...pages, ...subPages],
    },
    null,
    2
  );

  log('Writing data to file ...');

  fs.writeFileSync(DATA_FILE, dataFileContent);

  log('Complete!');
})();

function makeSubPagePath(pages, parentId, path) {
  return pages.find((page) => page._id === parentId).path + `/${path}`;
}

function copyMetaData(metaData: any = {}) {
  return {
    title: metaData?.title,
    description: metaData?.description,
    keywords: metaData?.keywords,
    ogTitle: metaData?.ogTitle,
    ogDescription: metaData?.ogDescription,
    ogImage: metaData?.ogImage,
  };
}

function copyPageBase(pageBase: any = {}) {
  return {
    heading: pageBase?.heading,
    intro: pageBase?.intro,
    body: pageBase?.body && markdown(pageBase.body),
  };
}

/**
 * Fetch site settings
 */
async function fetchSiteSettings() {
  const data = await sanityFetch({
    type: 'doc',
    id: 'siteSettings',
  });

  return data.documents[0];
}

/**
 * Fetch pages
 */
async function fetchPages() {
  const data = await sanityFetch({
    type: 'query',
    query: `*[_type == 'page' && !(_id in path("drafts.**"))]`,
  });

  return data.result;
}

/**
 * Fetch pages
 */
async function fetchSubPages() {
  const data = await sanityFetch({
    type: 'query',
    query: `*[_type == 'subPage' && !(_id in path("drafts.**"))]`,
  });

  return data.result;
}
