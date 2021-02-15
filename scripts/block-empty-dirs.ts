import * as fs from 'fs';
import * as path from 'path';
import { ROOT } from './lib/config';
import { logger } from './lib/logger';

const EXPORT_ROOT = path.join(ROOT, 'website/__sapper__/export');
const FILE_404 = path.join(EXPORT_ROOT, '404.html');
const FILE_CONTENT_404 = fs.readFileSync(FILE_404, 'utf8');

const log = logger('block-empty-dirs');

log('Checking __sapper__/export/ for directories without index.html');

recursiveCheckDir(EXPORT_ROOT);

function recursiveCheckDir(dir: string) {
  const files = fs.readdirSync(dir);

  if (!files.includes('index.html')) {
    log(`Adding index.html to ${dir.split('__sapper__/export/')[1]}/`);
    fs.writeFileSync(path.join(dir, 'index.html'), FILE_CONTENT_404);
  }

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      recursiveCheckDir(filePath);
    }
  });
}
