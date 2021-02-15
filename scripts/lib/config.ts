import * as path from 'path';

require('dotenv').config({ path: path.join(__filename, '../../../.env') });

const dataFileName = 'fetched-data.json';

export const SANITY_DATASET = process.env.SANITY_DATASET;
export const SANITY_URL = process.env.SANITY_URL?.replace(/\/+$/, '');
export const SANITY_TOKEN = process.env.SANITY_TOKEN;

export const ROOT = path.join(__filename, '../../../');
export const DATA_FILE = path.join(__filename, '../../../data', dataFileName);
