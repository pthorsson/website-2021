<script lang="ts">
  import settings from '../../data/settings.json';

  export let siteSettings = settings as Partial<Website.Settings>;
  export let pageMetaData: Partial<Website.MetaData>;

  const defaultMetaData = settings.defaultMetaData as Partial<Website.MetaData>;

  $: pageTitle = pageMetaData?.title || defaultMetaData?.title || null;
  $: siteTitle = `${siteSettings?.baseTitle}${
    pageTitle ? ` | ${pageTitle}` : ''
  }`;

  let siteDescription =
    pageMetaData?.description || defaultMetaData?.description;
  let siteKeywords = pageMetaData?.keywords || defaultMetaData?.keywords;

  let ogTitle = defaultMetaData?.ogTitle || pageMetaData?.ogTitle;
  let ogDesc = defaultMetaData?.ogDescription || pageMetaData?.ogDescription;
  let ogImage = defaultMetaData?.ogImage || pageMetaData?.ogImage;
</script>

<svelte:head>
  <title>{siteTitle}</title>
  <meta name="description" content={siteDescription} />
  <meta name="keywords" content={siteKeywords} />

  <meta name="twitter:card" content="summary" />

  <meta property="og:title" content={ogTitle || siteTitle} />
  <meta property="og:description" content={ogDesc || siteDescription} />
  <meta property="og:type" content="website" />

  {#if ogImage}
    <meta property="og:image" content={ogImage.src} />

    {#if ogImage.alt}
      <meta property="og:image:alt" content={ogImage.alt} />
    {/if}

    {#if ogImage.mimeType}
      <meta property="og:image:type" content={ogImage.mimeType} />
    {/if}

    {#if ogImage.width && ogImage.height}
      <meta property="og:image:width" content={ogImage.width.toString()} />
      <meta property="og:image:height" content={ogImage.height.toString()} />
    {/if}
  {/if}
</svelte:head>
