import fetch from 'node-fetch';
import { SANITY_BASE_URL, SANITY_DATASET, SANITY_TOKEN } from './config';

type SanityFetchOptions = {
  type: 'doc' | 'query';
  id?: string;
  query?: string;
};

export async function sanityFetch({ type, id, query }: SanityFetchOptions) {
  let URL = `${SANITY_BASE_URL}/${type}/${SANITY_DATASET}`;

  if (type === 'doc' && id) {
    URL += `/${id}`;
  }

  if (type === 'query' && query) {
    query = query.replace(/\s+/g, ' ');
    URL += `?query=${encodeURIComponent(query)}`;
  }

  const res = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
  });

  return await res.json();
}
