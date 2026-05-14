import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://2ndsaturdays.org', // CHANGE THIS to your actual domain when deploying
  build: {
    format: 'directory',
  },
});
