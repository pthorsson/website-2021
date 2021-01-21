<script lang="ts">
  import { navItems } from '@data-file';

  $: isOpen = false;

  function toggle(open: boolean) {
    isOpen = open;
  }
</script>

<nav>
  {#if !isOpen}
    <button class="open-menu" on:click={() => toggle(true)} />
  {/if}
  <ul class={isOpen ? 'is-open' : ''}>
    {#each navItems as link}
      {#if link.href && link.text}
        <li>
          <a rel="prefetch" href={link.href} on:click={() => toggle(false)}>
            {link.text}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
  {#if isOpen}
    <button class="close-menu" on:click={() => toggle(false)}>Close</button>
  {/if}
</nav>

<style type="text/scss">
  :root {
    --link-font-size: 1em;
    --link-font-line-height: 1.3em;
  }

  nav {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: flex-end;
    top: 0;
    right: 0;
    z-index: 9999;
    padding: calc(var(--baseline) * 2);
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0;
    margin: 0;
    padding: var(--baseline);
    height: calc(19px + (var(--baseline) * 2));
    width: calc(26px + (var(--baseline) * 2));
    cursor: pointer;
    transition: opacity 200ms;
    box-sizing: border-box;
    pointer-events: none;

    &.is-open {
      cursor: default;
      height: auto;
      width: auto;
      pointer-events: initial;

      li::after {
        width: 100%;
        opacity: 1;
      }

      a {
        height: var(--link-font-line-height);
        opacity: 1;
      }
    }
  }

  li {
    display: block;
    position: relative;
    margin-top: 5px;
    transition: padding-right 200ms, opacity 200ms;
    border-bottom: var(--border-width) solid transparent;

    &:first-child {
      margin-top: 0;
    }

    &:nth-child(n + 4)::after {
      opacity: 0;
    }

    &::after {
      position: absolute;
      content: '';
      width: 26px;
      right: 0;
      bottom: -3px;
      border-bottom: var(--border-width) solid var(--color-fg);
      transition: width 400ms, opacity 400ms;
    }
  }

  a {
    display: block;
    position: relative;
    font-size: var(--link-font-size);
    font-family: var(--font-mono);
    line-height: var(--link-font-line-height);
    height: 0px;
    opacity: 0;
    text-decoration: none;
    overflow: hidden;
    transition: height 400ms, opacity 400ms, padding-right 200ms;
    flex: 0 0 auto;
    color: var(--color-fg);
    white-space: nowrap;
    background: var(--color-bg);

    &:hover {
      padding-right: 5px;
    }
  }

  .close-menu {
    position: relative;
    outline: 0;
    border: 0;
    padding: 0;
    margin: var(--baseline);
    background: transparent;
    color: var(--color-fg);
    transition: opacity 200ms;
    cursor: pointer;
    font-size: 12px;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .open-menu {
    height: calc(19px + (var(--baseline) * 2));
    width: calc(26px + (var(--baseline) * 2));
    border: 0;
    padding: 0;
    outline: 0;
    background: transparent;
    position: absolute;
    z-index: 99;
    cursor: pointer;

    &:hover ~ ul {
      opacity: 0.5;
    }
  }
</style>
