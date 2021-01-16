<script lang="ts">
  import MetaTags from '../components/MetaTags.svelte';

  export let page: Website.Page;
</script>

<MetaTags pageMetaData={page.metaData} />

{#if page.heading}
  <h1>{page.heading}</h1>
{/if}

{#if page.slug}
  <small>{page.slug}</small>
{/if}

{#if page.body}
  <p>{@html page.body}</p>
{/if}

<style>
</style>
