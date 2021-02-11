import fetch from 'node-fetch';
import { SANITY_URL, SANITY_DATASET, SANITY_TOKEN } from './config';

type SanityFetchOptions = {
  type: 'doc' | 'query';
  id?: string;
  query?: string;
};

export async function sanityFetch({ type, id, query }: SanityFetchOptions) {
  let url = `${SANITY_URL}/v1/data/${type}/${SANITY_DATASET}`;

  if (type === 'doc' && id) {
    url += `/${id}`;
  }

  if (type === 'query' && query) {
    query = query.replace(/\s+/g, ' ');
    url += `?query=${encodeURIComponent(query)}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
  });

  return await res.json();
}
