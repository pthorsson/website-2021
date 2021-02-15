<script lang="ts">
</script>

<a class="logo-wrapper" href="/" aria-label="Go to home page">
  <span class="bold">THOR</span>
  <span class="bold">SSON</span>
  <span class="italic">·DEV</span>
</a>

<style type="text/scss">
  :root {
    --link-font-size: 1em;
    --link-font-line-height: 1.3em;
  }

  .logo-wrapper {
    font-family: var(--font-mono);
    display: flex;
    flex-direction: column;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 3px;
    text-decoration: none;
    transition: opacity 200ms;

    &:hover {
      opacity: 0.5;
    }
  }

  span {
    display: block;
    user-select: none;
  }

  .bold {
    font-weight: 600;
  }

  .italic {
    font-style: italic;
  }
</style>
