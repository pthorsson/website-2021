<script lang="ts">
  import Logo from '../components/Logo.svelte';
  import Nav from '../components/Nav.svelte';
</script>

<div class="root-container">
  <div class="fixed-logo-wrapper">
    <Logo />
  </div>
  <div class="fixed-nav-wrapper">
    <Nav />
  </div>
  <main>
    <slot />
  </main>
</div>

<style>
  .root-container {
    position: relative;
    border: var(--border-width) solid var(--color-fg);
    height: 100%;
    overflow-x: auto;
  }

  .fixed-logo-wrapper {
    position: fixed;
    padding: calc(var(--baseline) * 2);
    top: var(--baseline);
    left: calc(var(--baseline) * 1.5);
    z-index: 999;
  }

  .fixed-nav-wrapper {
    position: fixed;
    padding: calc(var(--baseline) * 2);
    top: var(--baseline);
    right: calc(var(--baseline) * 1.5);
    z-index: 999;
  }

  main {
    position: relative;
    max-width: calc(100% - (var(--baseline) * 20));
    padding: 2em;
    margin: 0 auto;
    padding: 25vh calc(var(--baseline) * 10) 10vh calc(var(--baseline) * 10);
  }
</style>
