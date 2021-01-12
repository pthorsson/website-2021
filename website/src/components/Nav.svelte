<script>
  import navigation from "../../data/navigation.json";

  export let links = navigation.links;
</script>

<nav>
  <ul>
    {#each links as link}
      <li>
        <a class="nav-link" rel="prefetch" href={link.href}>
          {link.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
    background: salmon;
    padding: 30px;
  }

  li {
    border: var(--border-width) solid var(--color-fg);
  }
</style>
