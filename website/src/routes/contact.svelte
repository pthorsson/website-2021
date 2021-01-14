<script context="module" lang="ts">
  export async function preload({ params, query }) {
    const res = await this.fetch('contact.json');
    const page = await res.json();

    return { page };
  }
</script>

<script lang="ts">
  export let page: { heading: string; body: any };
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>{page.heading}</h1>
<p>{@html page.body}</p>

<style>
</style>
