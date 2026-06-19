import { For } from "solid-js";
import { PageSeo } from "~/components/Seo";
import { siteConfig, storyHighlights } from "~/content/site";

export default function Story() {
  return (
    <>
      <PageSeo
        title="Our Story"
        description="Soulbait brings Maine seafood, Haitian seasoning, and Latin street-food structure together for a seasonal Portland food truck."
        path="/story"
      />
      <section class="page-hero story-hero" aria-labelledby="story-title">
        <div>
          <p class="eyebrow">Our story</p>
          <h1 id="story-title">A summer food truck with three roots.</h1>
          <p>
            Soulbait is built for Portland's short warm season: briny seafood, real heat, bright
            citrus, and a menu tight enough to serve a moving line.
          </p>
        </div>
        <picture class="story-picture">
          <source srcset={siteConfig.heroImage.avif} type="image/avif" />
          <source srcset={siteConfig.heroImage.webp} type="image/webp" />
          <img
            src={siteConfig.heroImage.jpeg}
            width={siteConfig.heroImage.width}
            height={siteConfig.heroImage.height}
            alt="Soulbait waterfront food truck with customers during golden hour"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
      </section>

      <section class="section card-grid three-up" aria-label="Soulbait story highlights">
        <For each={storyHighlights}>
          {(highlight) => (
            <article class="story-card">
              <h2>{highlight.title}</h2>
              <p>{highlight.body}</p>
            </article>
          )}
        </For>
      </section>

      <section class="section text-feature" aria-labelledby="seasonal-marketing-title">
        <p class="section-kicker">Seasonal by design</p>
        <h2 id="seasonal-marketing-title">The marketing follows the season.</h2>
        <p>
          The public site keeps search traffic, menu intent, location intent, and catering intent in
          one place. The editable content file lets the business swap dishes, stops, CTAs, and
          summer messaging quickly without changing the component structure.
        </p>
      </section>
    </>
  );
}
