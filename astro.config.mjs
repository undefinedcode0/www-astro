// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import opengraphImage from 'astro-opengraph-image';
import cloudflare from '@astrojs/cloudflare';

import rehypeAnimationDelay from './plugins/rehypeAnimationDelay.js';
import linkToComponent from './plugins/linkToComponent.js';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

import tailwindcss from '@tailwindcss/vite';

import { execSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const commitHash = execSync('git rev-parse HEAD').toString().trim();
const commitDate = execSync('git log -1 --format=%cI').toString().trim();

/** @type {import('astro-opengraph-image').Options} */
const openGraphConfig = {
  // what color do you want your background to be?
  background: '#F7F5ED',

  // what size do you want your images to be?
  // 1200x630 is a good default across platforms,
  // and 3x scale is a convenient choice.
  width: 1200,
  height: 630,
  scale: 3,

  // the fonts you picked before. you will have to include the particular
  // weights and variants you want to use.
  fonts: [
    {
      name: 'Crimson Pro',
      data: await readFile('node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-400-normal.woff'),
      style: 'normal',
      weight: 400,
    },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://undefinedcode.pages.dev',
  integrations: [mdx(), sitemap(), opengraphImage(openGraphConfig), partytown()],
  markdown: {
    shikiConfig: {
      theme: 'ayu-dark',
    },
    rehypePlugins: [
      linkToComponent,
      rehypeAnimationDelay,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          headingProperties: {
            className: ['rehype-heading'],
          },
          properties: {
            className: ['rehype-heading-link'],
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      // These variables are replaced at build time.
      BUILD_COMMIT: JSON.stringify(commitHash.slice(0, 7)),
      BUILD_DATE: JSON.stringify(commitDate),
    },
    ssr: {
      // Don’t bundle these modules—leave them as runtime requires.
      external: [
        '@resvg/resvg-js',
        '@resvg/resvg-js-win32-x64-msvc',
        // plus any Node built-ins you saw warnings for:
        'fs',
        'path',
        'child_process',
      ],
      // If you had previously used noExternal, you can clear or adjust it here.
      noExternal: [],
    },
    // Exclude from dependency pre-bundling as well:
    optimizeDeps: {
      exclude: ['@resvg/resvg-js', '@resvg/resvg-js-win32-x64-msvc'],
    },
  },
  output: 'server',
  adapter: cloudflare(),
});
