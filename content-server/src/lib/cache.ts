const cache: any = {};

export const setCacheItem = (key: string, data: { [key: string]: any }) => {
  cache[key] = JSON.stringify(data);
};

export const getCacheItem = (key: string) => {
  return JSON.parse(cache[key]);
};
