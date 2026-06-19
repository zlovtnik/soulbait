// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

const startHandler = createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#8b3a3a" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Zilla+Slab:wght@600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preload" href="/images/soulbait-waterfront-truck.png" as="image" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

function normalizeRequestUrl(request: Request) {
  if (!request.url.startsWith("/")) {
    return request;
  }

  return new Request(new URL(request.url, "http://localhost"), request);
}

export default {
  fetch(request: Request) {
    return startHandler.fetch(normalizeRequestUrl(request));
  }
};
