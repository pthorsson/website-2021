<script context="module" lang="ts">
  export async function preload() {
    const page = await this.fetch('portfolio-index.json').then((res) =>
      res.json()
    );
    const items = await this.fetch('portfolio/items.json').then((res) =>
      res.json()
    );

    return { page, items };
  }
</script>

<script lang="ts">
  export let page: { heading: string; body: any };
  export let items: { slug: string; heading: string; body: any }[];
</script>

<svelte:head>
  <title>{page.heading}</title>
</svelte:head>

<h1>{page.heading}</h1>

<p>{@html page.body}</p>

<ul>
  {#each items as item}
    <li><a rel="prefetch" href="portfolio/{item.slug}">{item.heading}</a></li>
  {/each}
</ul>

<style>
</style>
