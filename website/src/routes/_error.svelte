<script lang="ts">
  import MetaTags from '../components/MetaTags.svelte';

  export let status: number;
  export let error: Error;

  const dev = process.env.NODE_ENV === 'development';

  const content = {
    _404: {
      heading: 'Page not found ☹️',
      message: "There doesn't seem to be a page like that.",
      cta: {
        href: '/',
        text: 'Back to the homepage',
      },
    },
    default: {
      heading: 'An error occured :(',
      message: 'This is so sad!',
      cta: {
        href: '/',
        text: 'Back to the homepage',
      },
    },
  };

  const heading = content[`_${status}`]?.heading || content.default.heading;
  const message = content[`_${status}`]?.message || content.default.message;
  const cta = content[`_${status}`]?.cta || content.default.cta;
</script>

<MetaTags pageMetaData={{ title: heading }} />

<h1>{heading}</h1>
<p>{message}</p>
<a href={cta.href}>{cta.text}</a>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}

<style>
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.25em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 2.25em;
    }
  }
</style>
