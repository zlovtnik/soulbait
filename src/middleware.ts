import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest(event) {
    if (event.request.url.startsWith("/")) {
      event.request = new Request(new URL(event.request.url, "http://localhost"), event.request);
    }
  }
});
