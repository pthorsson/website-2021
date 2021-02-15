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
  const rawPosts = await fetchPosts();
  const rawPages = await fetchPages();

  const siteSettings = {
    updatedAt: rawSiteSettings._updatedAt,
    baseTitle: rawSiteSettings.baseTitle,
    baseUrl: rawSiteSettings.baseUrl,
    metaData: copyMetaData(rawSiteSettings.metaData),
    navigation: rawSiteSettings.navigation || [],
  };

  const posts = rawPosts.map((rawPost) => ({
    id: rawPost._id,
    updatedAt: rawPost._updatedAt,
    createdAt: rawPost._createdAt,
    title: rawPost.title,
    slug: rawPost.slug.current,
    tags: (rawPost.tags || []).map((tag) => tag.toLowerCase().trim()),
    ...copyPageBase(rawPost.pageBase),
    metaData: copyMetaData(rawPost.metaData),
  }));

  const pages = rawPages.map((rawPage) => ({
    id: rawPage._id,
    updatedAt: rawPage._updatedAt,
    createdAt: rawPage._createdAt,
    title: rawPage.title,
    slug: rawPage.slug.current,
    ...copyPageBase(rawPage.pageBase),
    metaData: copyMetaData(rawPage.metaData),
    children:
      rawPage.displayPosts &&
      posts.map((post) => ({
        heading: post.heading,
        slug: post.slug,
      })),
  }));

  siteSettings.navigation = siteSettings.navigation.map((navItem) => {
    const page = [...pages, ...posts].find((page) => page.id === navItem._ref);

    return {
      text: page.heading || page.title,
      slug: page.slug,
    };
  });

  const dataFileContent = JSON.stringify(
    {
      siteSettings,
      pages: [...pages, ...posts],
    },
    null,
    2
  );

  log('Writing data to file ...');

  fs.writeFileSync(DATA_FILE, dataFileContent);

  log('Complete!');
})();

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
async function fetchPosts() {
  const data = await sanityFetch({
    type: 'query',
    query: `*[_type == 'post' && !(_id in path("drafts.**"))]`,
  });

  return data.result;
}
