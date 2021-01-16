<script lang="ts">
  import navigation from '../../data/navigation.json';

  let links: ContentTypes.Link[] = navigation.links;
</script>

<nav>
  <ul>
    {#each links as link}
      {#if link.href && link.text}
        <li>
          <a class="nav-link" rel="prefetch" href={link.href}>
            {link.text}
          </a>
        </li>
      {/if}
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
