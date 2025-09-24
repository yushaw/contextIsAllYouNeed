import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.pop();
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && repoName;

let hasCustomDomain = false;
try {
  const cnamePath = join(process.cwd(), 'CNAME');
  if (existsSync(cnamePath)) {
    hasCustomDomain = readFileSync(cnamePath, 'utf8').trim().length > 0;
  }
} catch (error) {
  hasCustomDomain = false;
}

const basePath = hasCustomDomain ? '/' : isGitHubPages ? `/${repoName}/` : '/';

export default defineConfig({
  base: basePath,
  plugins: [react()],
});
