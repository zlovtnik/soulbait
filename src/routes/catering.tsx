import { For } from "solid-js";
import { PageSeo } from "~/components/Seo";
import { cateringOptions, siteConfig } from "~/content/site";

export default function Catering() {
  const mailto = () =>
    `mailto:${siteConfig.email}?subject=${encodeURIComponent("Soulbait catering inquiry")}`;

  return (
    <>
      <PageSeo
        title="Catering"
        description="Book Soulbait for Portland, Maine waterfront events, office lunches, festivals, and private seasonal catering."
        path="/catering"
      />
      <section class="page-hero compact" aria-labelledby="catering-title">
        <p class="eyebrow">Catering and events</p>
        <h1 id="catering-title">Bring the Soulbait window to the party.</h1>
        <p>
          Private service is built for warm-weather gatherings, office lunches, festivals, and dockside
          events across Greater Portland.
        </p>
        <a class="button button-primary" href={mailto()}>
          {siteConfig.ctas.cateringLabel}
        </a>
      </section>

      <section class="section card-grid three-up" aria-label="Catering formats">
        <For each={cateringOptions}>
          {option => (
            <article class="story-card">
              <h2>{option.name}</h2>
              <p>{option.detail}</p>
            </article>
          )}
        </For>
      </section>

      <section class="section inquiry-panel" aria-labelledby="inquiry-title">
        <div>
          <p class="section-kicker">What to send</p>
          <h2 id="inquiry-title">Date, headcount, location, and appetite.</h2>
          <p>
            Include the event date, service window, guest count, location, dietary needs, and whether
            you want truck service or a drop-off menu.
          </p>
        </div>
        <a class="button button-secondary" href={mailto()}>
          Email {siteConfig.email}
        </a>
      </section>
    </>
  );
}
