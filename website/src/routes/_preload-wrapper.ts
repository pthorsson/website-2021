const preloadWrapper = (staticSlug?: string) =>
  async function ({ params, query }) {
    const res = await this.fetch(`${staticSlug || params.slug}.json`);
    const page = await res.json();

    if (res.status === 200) {
      return { page };
    }

    this.error(404, 'Not found');
  };

export default preloadWrapper;
