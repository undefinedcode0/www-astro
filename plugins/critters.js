// plugins/critters.js  (ESM version)
import fs from 'fs/promises';
import path from 'path';

const DIST = path.resolve(process.cwd(), 'dist');

async function findHtmlFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await findHtmlFiles(full)));
    } else if (e.isFile() && e.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

(async () => {
  try {
    // dynamic-import Critters and support both ESM and CommonJS default export shapes
    const mod = await import('critters').catch(err => {
      console.error('Failed to import critters:', err);
      throw err;
    });
    const Critters = mod.default ?? mod;

    const crit = new Critters({
      path: DIST,
      publicPath: '/',
      compress: true,
      preload: 'swap',
      pruneSource: true,
      inlineFonts: false,
      logLevel: 'info'
    });

    const files = await findHtmlFiles(DIST);
    if (!files.length) {
      console.log('No HTML files found in', DIST);
      return;
    }

    for (const file of files) {
      const html = await fs.readFile(file, 'utf8');
      const out = await crit.process(html);
      await fs.writeFile(file, out, 'utf8');
      console.log('Critters processed:', path.relative(DIST, file));
    }
    console.log('Critters finished.');
  } catch (err) {
    console.error('Critters error:', err);
    process.exit(1);
  }
})();
