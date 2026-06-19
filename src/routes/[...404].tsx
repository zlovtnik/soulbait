import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { PageSeo } from "~/components/Seo";

export default function NotFound() {
  return (
    <>
      <PageSeo title="Page Not Found" path="/404" />
      <HttpStatusCode code={404} />
      <section class="page-hero compact" aria-labelledby="not-found-title">
        <p class="eyebrow">404</p>
        <h1 id="not-found-title">That stop is off the route.</h1>
        <p>Head back to the active menu or find the truck's next waterfront stop.</p>
        <div class="hero-actions">
          <A class="button button-primary" href="/find-us">
            Find the truck
          </A>
          <A class="button button-secondary" href="/menu">
            View menu
          </A>
        </div>
      </section>
    </>
  );
}
