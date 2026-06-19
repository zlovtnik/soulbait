import { For, Show } from "solid-js";
import { PageSeo } from "~/components/Seo";
import { locationSlots, reviewLinks, siteConfig, socialUpdates } from "~/content/site";

export default function FindUs() {
  const configuredReviewLinks = reviewLinks.filter((link) => link.enabled && link.url);
  const configuredSocialUpdates = socialUpdates.filter((update) => update.enabled && update.url);

  return (
    <>
      <PageSeo
        title="Find Us"
        description="Find Soulbait's seasonal Portland, Maine food truck stops, waterfront hours, addresses, Google Maps links, and private event availability."
        path="/find-us"
      />
      <section class="page-hero compact" aria-labelledby="find-title">
        <p class="eyebrow">Where we are</p>
        <h1 id="find-title">Follow the line to the waterfront.</h1>
        <p>
          Soulbait is seasonal and weather-aware. These are the anchor stops for{" "}
          {siteConfig.seasonLabel}; social profiles carry same-day sellouts, weather moves, and
          bonus stops.
        </p>
        <div class="hero-actions page-actions">
          <a
            class="button button-primary"
            href={siteConfig.social.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            Same-day updates
          </a>
          <a class="button button-secondary" href="/menu">
            View full menu
          </a>
        </div>
      </section>

      <section class="section location-list" aria-label="Soulbait locations and hours">
        <For each={locationSlots}>
          {(location) => (
            <article class={`location-row${location.embedMapUrl ? " has-map" : ""}`}>
              <div class="location-copy">
                <p class="section-kicker">
                  {location.status === "private" ? "Booking" : "Truck stop"}
                </p>
                <h2>{location.venue}</h2>
                <p>{location.area}</p>
                <address>{location.address}</address>
              </div>
              <div class="schedule-block">
                <strong>{location.schedule}</strong>
                <span>{location.hours}</span>
                <a
                  href={location.mapUrl}
                  target={location.status === "private" ? undefined : "_blank"}
                  rel={location.status === "private" ? undefined : "noreferrer"}
                >
                  {location.status === "private" ? "Start a catering request" : "Open map"}
                </a>
              </div>
              <Show when={location.embedMapUrl}>
                {(embedMapUrl) => (
                  <iframe
                    class="location-map"
                    src={embedMapUrl()}
                    title={`${location.venue} map`}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </Show>
            </article>
          )}
        </For>
      </section>

      <section class="section social-band" aria-labelledby="daily-updates-title">
        <div>
          <p class="section-kicker">Daily updates</p>
          <h2 id="daily-updates-title">Seasonal trucks need fast signals.</h2>
          <p>
            The site is the stable SEO hub. Same-day sellouts, weather moves, and bonus stops post
            through social; manually selected post links can be added here when they are available.
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
              {(update) => (
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
        <section class="section review-links" aria-labelledby="find-reviews-title">
          <div>
            <p class="section-kicker">Review platforms</p>
            <h2 id="find-reviews-title">Social proof for the lunch line.</h2>
          </div>
          <div class="review-link-list">
            <For each={configuredReviewLinks}>
              {(link) => (
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
