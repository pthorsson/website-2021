import * as path from 'path';

require('dotenv').config({ path: path.join(__filename, '../../../.env') });

export const CONTENT_SERVER_PORT = process.env.CONTENT_SERVER_PORT;
export const CONTENT_SERVER_TOKEN = process.env.CONTENT_SERVER_TOKEN;
export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
export const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
export const DATA_FILE = path.join(
  __filename,
  '../../../data',
  process.env.CONTENT_SERVER_OUTPUT
);
