<script lang="ts">
  import MetaTags from '../components/MetaTags.svelte';

  export let page: Website.Page;
</script>

<MetaTags pageMetaData={page.metaData} />

<div class="inner-small">
  {#if page.heading}
    <h1>{page.heading}</h1>
  {/if}

  {#if page.intro}
    <p class="intro">{page.intro}</p>
  {/if}

  {#if page.body}
    <div class="content-body">
      {@html page.body}
    </div>
  {/if}
</div>

{#if page.children}
  <div class="children">
    {#each page.children as child}
      <div class="child">
        <a class="child-link" href={child.path}>
          {child.heading}
        </a>
      </div>
    {/each}
  </div>
{/if}

<style type="text/scss">
  .inner-small {
    max-width: calc(max(650px, 50vw));
  }

  .intro {
    font-size: 1.25em;
    font-family: var(--font-mono);
    font-weight: 300;
    max-width: 550px;
  }

  .content-body {
    margin-top: calc(var(--baseline) * 8);
  }

  .children {
    margin-top: calc(var(--baseline) * 10);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: calc(var(--baseline) * 3);
    row-gap: calc(var(--baseline) * 3);
    width: 100%;
  }

  .child {
    background: whitesmoke;
    padding-bottom: 75%;
    position: relative;

    &:first-child {
      padding-bottom: 0;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }

  .child-link {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    &:after {
      position: absolute;
      content: '';
      opacity: 0;
      transition: opacity 300ms;
      left: 0;
      top: 0;
      width: calc(100% + var(--border-width) * 4);
      height: calc(100% + var(--border-width) * 4);
      margin: calc(var(--border-width) * -2);
      border: var(--border-width) solid var(--color-fg);
    }

    &:hover:after {
      opacity: 1;
    }
  }
</style>
