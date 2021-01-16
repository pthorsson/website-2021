<script lang="ts">
  export let page: Website.Page;
</script>

<svelte:head>
  <title>thorsson.dev | {page.slug}</title>
</svelte:head>

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
