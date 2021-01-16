<script lang="ts">
  import Nav from '../components/Nav.svelte';
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
    padding: 2em;
    margin: 0 auto;
  }
</style>
