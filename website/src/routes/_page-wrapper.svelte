<script lang="ts">
  import MetaTags from '../components/MetaTags.svelte';

  export let page: Website.Page;
</script>

<MetaTags pageMetaData={page.metaData} />

<div class="inner-small">
  {#if page.heading}
    <h1>{page.heading}</h1>
  {/if}

  {#if page.slug}
    <small>{page.slug}</small>
  {/if}

  {#if page.intro}
    <p class="intro">{page.intro}</p>
  {/if}

  {#if page.body}
    <p>{@html page.body}</p>
  {/if}
</div>

<style>
  .inner-small {
    max-width: max(650px, 50vw);
    background: green;
  }

  .intro {
    font-size: 2em;
  }
</style>
