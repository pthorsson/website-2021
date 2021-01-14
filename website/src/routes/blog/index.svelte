<script context="module" lang="ts">
  export async function preload() {
    const page = await this.fetch('blog-index.json').then((res) => res.json());
    const posts = await this.fetch('blog/posts.json').then((res) => res.json());

    return { page, posts };
  }
</script>

<script lang="ts">
  export let page: { heading: string; body: any };
  export let posts: { slug: string; heading: string; body: any }[];
</script>

<svelte:head>
  <title>{page.heading}</title>
</svelte:head>

<h1>{page.heading}</h1>

<p>{@html page.body}</p>

<ul>
  {#each posts as post}
    <li><a rel="prefetch" href="blog/{post.slug}">{post.heading}</a></li>
  {/each}
</ul>

<style>
</style>
