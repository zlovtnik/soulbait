import { For } from "solid-js";
import { PageSeo } from "~/components/Seo";
import { locationSlots, siteConfig } from "~/content/site";

export default function FindUs() {
  return (
    <>
      <PageSeo
        title="Find Us"
        description="Find Soulbait's seasonal food truck locations, Portland waterfront hours, map links, and private event availability."
        path="/find-us"
      />
      <section class="page-hero compact" aria-labelledby="find-title">
        <p class="eyebrow">Where we are</p>
        <h1 id="find-title">Follow the line to the waterfront.</h1>
        <p>
          Soulbait is seasonal and weather-aware. These are the anchor stops for {siteConfig.seasonLabel};
          social links carry same-day changes when the harbor schedule shifts.
        </p>
      </section>

      <section class="section location-list" aria-label="Soulbait locations and hours">
        <For each={locationSlots}>
          {location => (
            <article class="location-row">
              <div>
                <p class="section-kicker">{location.status === "private" ? "Booking" : "Truck stop"}</p>
                <h2>{location.venue}</h2>
                <p>{location.area}</p>
              </div>
              <div class="schedule-block">
                <strong>{location.schedule}</strong>
                <span>{location.hours}</span>
                <a href={location.mapUrl} target={location.status === "private" ? undefined : "_blank"} rel="noreferrer">
                  {location.status === "private" ? "Start a catering request" : "Open map"}
                </a>
              </div>
            </article>
          )}
        </For>
      </section>

      <section class="section social-band" aria-labelledby="daily-updates-title">
        <div>
          <p class="section-kicker">Daily updates</p>
          <h2 id="daily-updates-title">Seasonal businesses need fast signals.</h2>
          <p>
            The site is the stable SEO hub. Same-day sellouts, weather moves, and bonus stops should
            publish through social until order-ahead links are ready.
          </p>
        </div>
        <div class="social-actions">
          <a class="button button-primary" href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
            Instagram updates
          </a>
          <a class="button button-secondary" href={siteConfig.social.tiktok} target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </section>
    </>
  );
}
