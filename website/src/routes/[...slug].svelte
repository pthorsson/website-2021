<script context="module" lang="ts">
  import preloadWrapper from './_preload-wrapper';
  export const preload = preloadWrapper();
</script>

<script lang="ts">
  import PageWrapper from './_page-wrapper.svelte';
  export let page: Website.Page;
</script>

<PageWrapper {page} />
