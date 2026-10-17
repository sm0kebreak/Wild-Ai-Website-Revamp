import { renderToString } from 'react-dom/server';
import { QueryClient } from '@tanstack/react-query';
import App from './App';

const clock = globalThis as typeof globalThis & { __WILD_PATH__?: string };

/** Render one route to HTML and collect its head tags. No browser. */
export const render = (url: string) => {
  clock.__WILD_PATH__ = url;
  const helmetContext = {} as { helmet?: { title: { toString(): string }; meta: { toString(): string }; link: { toString(): string }; script: { toString(): string } } };
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const html = renderToString(<App helmetContext={helmetContext} queryClient={queryClient} location={url} />);
  if (!helmetContext.helmet) throw new Error(`${url} did not render head tags`);
  return { html, helmet: helmetContext.helmet };
};
