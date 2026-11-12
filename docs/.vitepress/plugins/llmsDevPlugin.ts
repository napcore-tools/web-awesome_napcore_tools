import type { Plugin } from 'vite';

/**
 * Serves llms.txt, llms-full.txt and the plain-Markdown version of each page
 * ("/tools/motis.md") from the dev server.
 *
 * vitepress-plugin-llmstxt has a dev middleware of its own, but it compares request
 * paths with `path.join`, which gives backslashes on Windows, so it never matches there
 * and the request falls through to the HTML page. The plugin still runs its `transform`
 * under `npm run dev`, so config.ts records each finished file in `files` and this
 * serves them.
 *
 * Like the plugin, it does not watch for changes: restart the dev server to see edits.
 *
 * The bug is fixed upstream in PR #9
 * (https://github.com/angelespejo/vitepress-plugin-llmstxt/pull/9). Once a release
 * includes it, remove this plugin and run the e2e tests: they show whether the llms
 * files are still served and whether pages still load in dev.
 *
 * @param files - Finished files by URL path ("/llms.txt", "/tools/motis.md")
 */
export function llmsDevPlugin(files: ReadonlyMap<string, string>): Plugin {
  return {
    name: 'llms-dev',
    apply: 'serve',

    configureServer(server) {
      const base = server.config.base.replace(/\/+$/, '');

      server.middlewares.use((request, response, next) => {
        // VitePress imports the page component from the same path ("/tools/motis.md"),
        // as a script, sometimes with a query (?t=…, ?vue&type=style…). Leave those to Vite.
        const dest = request.headers['sec-fetch-dest'];
        if (dest && dest !== 'document' && dest !== 'empty') {
          next();
          return;
        }
        let url: URL;
        let pathname: string;
        try {
          url = new URL(request.url ?? '/', 'http://localhost');
          pathname = decodeURIComponent(url.pathname);
        } catch {
          next();
          return;
        }
        if (url.search) {
          next();
          return;
        }
        if (base && pathname.startsWith(`${base}/`)) pathname = pathname.slice(base.length);

        const contents = files.get(pathname);
        if (contents === undefined) {
          next();
          return;
        }

        // The content types GitHub Pages uses for these files
        const type = pathname.endsWith('.txt') ? 'text/plain' : 'text/markdown';
        response.setHeader('Content-Type', `${type}; charset=utf-8`);
        response.setHeader('Cache-Control', 'no-store');
        response.end(contents);
      });
    },
  };
}
