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
    max-width: calc(100% - (var(--baseline) * 20));
    padding: 2em;
    margin: 0 auto;
    padding: 25vh calc(var(--baseline) * 10) 10vh calc(var(--baseline) * 10);
    background: salmon;
  }
</style>
