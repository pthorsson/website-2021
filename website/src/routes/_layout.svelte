<script lang="ts">
  import Nav from '../components/Nav.svelte';
  // export let segment: string;
</script>

<div class="root-container">
  <Nav />
  <main>
    <slot />
  </main>
</div>

<style>
  .root-container {
    position: relative;
    border: var(--border-width) solid var(--color-fg);
    height: 100%;
  }

  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
