<script context="module" lang="ts">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte

		console.log("SLUG:", params.slug);
		console.log("--");

		const res = await this.fetch(`${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { page: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script lang="ts">
	export let page: { slug: string; heading: string; body: any };
</script>

<svelte:head>
	<title>{page.heading}</title>
</svelte:head>

<h1>{page.heading}</h1>

<div class="content">
	{@html page.body}
</div>

<style>
</style>
