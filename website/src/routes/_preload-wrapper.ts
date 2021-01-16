const preloadWrapper = (staticSlug?: string) =>
  async function ({ params, query }) {
    const res = await this.fetch(`${staticSlug || params.slug.join('/')}.json`);
    const page = await res.json();

    return { page };
  };

export default preloadWrapper;
