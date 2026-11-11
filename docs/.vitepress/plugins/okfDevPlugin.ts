import type { Plugin } from 'vite';
import { OKF_ARCHIVE, okfBundle } from '../core/okf/okfBundle';
import { zipArchive } from '../core/okf/zipArchive';

/**
 * Serves the OKF bundle from the dev server.
 *
 * The build writes the bundle in `buildEnd`, which never runs under `npm run dev`, so
 * links to `/okf/…` and the zip would be dead there. This builds the bundle on each
 * request instead of writing files into the source tree, so an edited tool, standard
 * or category shows up on reload.
 *
 * Markdown is served as text/plain so that a browser shows it instead of downloading it.
 *
 * @param siteUrl - Site origin for the absolute URLs inside the bundle
 */
export function okfDevPlugin(siteUrl: string): Plugin {
  return {
    name: 'okf-bundle-dev',
    apply: 'serve',

    configureServer(server) {
      const base = server.config.base.replace(/\/+$/, '');

      server.middlewares.use((request, response, next) => {
        let pathname: string;
        try {
          pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
        } catch {
          next();
          return;
        }
        if (base && pathname.startsWith(`${base}/`)) pathname = pathname.slice(base.length);

        if (pathname === `/${OKF_ARCHIVE}.zip`) {
          response.setHeader('Content-Type', 'application/zip');
          response.setHeader('Cache-Control', 'no-store');
          response.end(zipArchive(okfBundle(siteUrl)));
          return;
        }

        const file = /^\/okf\/(.*)$/.exec(pathname)?.[1];
        // A directory asks for its listing
        const contents =
          file === undefined
            ? undefined
            : okfBundle(siteUrl).get(file === '' || file.endsWith('/') ? `${file}index.md` : file);
        if (contents === undefined) {
          next();
          return;
        }

        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.setHeader('Cache-Control', 'no-store');
        response.end(contents);
      });
    },
  };
}
