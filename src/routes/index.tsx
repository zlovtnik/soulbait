import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { LocalBusinessJsonLd, PageSeo } from "~/components/Seo";
import {
  culturePillars,
  locationSlots,
  menuItems,
  reviewLinks,
  siteConfig,
  socialUpdates
} from "~/content/site";

export default function Home() {
  const featuredItems = menuItems.filter(item => item.featured);
  const activeLocations = locationSlots.filter(location => location.status === "active");
  const configuredReviewLinks = reviewLinks.filter(link => link.enabled && link.url);
  const configuredSocialUpdates = socialUpdates.filter(update => update.enabled && update.url);

  return (
    <>
      <PageSeo title={siteConfig.seo.defaultTitle} path="/" />
      <LocalBusinessJsonLd />

      <section class="hero" aria-labelledby="home-title">
        <img
          class="hero-image"
          src={siteConfig.heroImage}
          alt="Soulbait food truck serving customers on the Portland waterfront"
        />
        <div class="hero-shade" aria-hidden="true" />
        <div class="hero-content">
          <p class="eyebrow">Open seasonally on the Portland waterfront</p>
          <h1 id="home-title">{siteConfig.tagline}</h1>
          <p class="hero-copy">
            Fresh Maine seafood, Haitian epis heat, and Latin street-food energy from one summer truck.
            Check the board, find the window, and catch us before the sun drops.
          </p>
          <div class="hero-actions">
            <A class="button button-primary" href={siteConfig.ctas.primaryHref}>
              {siteConfig.ctas.primaryLabel}
            </A>
            <A class="button button-secondary" href={siteConfig.ctas.secondaryHref}>
              {siteConfig.ctas.secondaryLabel}
            </A>
            <A class="button button-secondary" href={siteConfig.ctas.cateringHref}>
              {siteConfig.ctas.cateringLabel}
            </A>
          </div>
        </div>
      </section>

      <section class="quick-actions" aria-label="Fast Soulbait actions">
        <A class="quick-action" href="/find-us">
          <span>Find Us Today</span>
          <strong>Waterfront stops, hours, and map links</strong>
        </A>
        <A class="quick-action" href="/menu">
          <span>View Menu</span>
          <strong>Full descriptions, prices, and seasonal tags</strong>
        </A>
        <A class="quick-action" href="/catering">
          <span>Book Catering</span>
          <strong>Private events, offices, festivals, and docks</strong>
        </A>
      </section>

      <section class="culture-strip" aria-label="Soulbait food influences">
        <For each={culturePillars}>
          {pillar => (
            <article>
              <p class="culture-marker">{pillar.marker}</p>
              <h2>{pillar.label}</h2>
              <p>{pillar.description}</p>
            </article>
          )}
        </For>
      </section>

      <section class="section section-tight" aria-labelledby="featured-menu-title">
        <div class="section-heading">
          <p class="section-kicker">What's on the window</p>
          <h2 id="featured-menu-title">Today's Soulbait lineup</h2>
          <A href="/menu">View full menu</A>
        </div>
        <div class="card-grid three-up">
          <For each={featuredItems}>
            {item => (
              <article class={`menu-card origin-${item.origin.toLowerCase()}`}>
                <p class="menu-origin">{item.origin}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div class="menu-footer">
                  <span>{item.price}</span>
                  <Show when={item.tags[0]}>{tag => <span>{tag()}</span>}</Show>
                </div>
              </article>
            )}
          </For>
        </div>
      </section>

      <section class="find-panel" aria-labelledby="find-panel-title">
        <div>
          <p class="section-kicker">Updated for {siteConfig.seasonLabel}</p>
          <h2 id="find-panel-title">Find us before the sun goes down.</h2>
          <p>
            Primary service is built around waterfront foot traffic, lunch breaks, and warm evening
            lines. Daily changes move through social until live ordering links are added.
          </p>
        </div>
        <div class="location-stack">
          <For each={activeLocations}>
            {location => (
              <a class="location-card" href={location.mapUrl} target="_blank" rel="noreferrer">
                <span aria-hidden="true">Map</span>
                <span>
                  <strong>{location.venue}</strong>
                  <small>
                    {location.schedule} - {location.hours}
                  </small>
                  <small>{location.address}</small>
                </span>
              </a>
            )}
          </For>
        </div>
      </section>

      <section class="section social-band" aria-labelledby="home-social-title">
        <div>
          <p class="section-kicker">Same-day updates</p>
          <h2 id="home-social-title">Check social before you walk over.</h2>
          <p>
            The site keeps the stable menu, schedule, and catering details. Weather moves, sellouts,
            and bonus stops are posted through our social profiles.
          </p>
        </div>
        <div class="social-actions">
          <a
            class="button button-primary"
            href={siteConfig.social.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            {siteConfig.social.instagram.handle}
          </a>
          <a
            class="button button-secondary"
            href={siteConfig.social.tiktok.url}
            target="_blank"
            rel="noreferrer"
          >
            {siteConfig.social.tiktok.handle}
          </a>
        </div>
        <Show when={configuredSocialUpdates.length > 0}>
          <div class="social-feed-preview" aria-label="Recent social update links">
            <For each={configuredSocialUpdates}>
              {update => (
                <a href={update.url} target="_blank" rel="noreferrer">
                  <span>{update.platform}</span>
                  <strong>{update.title}</strong>
                  <small>{update.detail}</small>
                </a>
              )}
            </For>
          </div>
        </Show>
      </section>

      <Show when={configuredReviewLinks.length > 0}>
        <section class="section review-links" aria-labelledby="reviews-title">
          <div>
            <p class="section-kicker">Reviews</p>
            <h2 id="reviews-title">See what Portland diners are saying.</h2>
          </div>
          <div class="review-link-list">
            <For each={configuredReviewLinks}>
              {link => (
                <a href={link.url} target="_blank" rel="noreferrer">
                  <span>{link.platform}</span>
                  <strong>{link.label}</strong>
                </a>
              )}
            </For>
          </div>
        </section>
      </Show>
    </>
  );
}
