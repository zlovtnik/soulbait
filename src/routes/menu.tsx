import { A } from "@solidjs/router";
import { For } from "solid-js";
import { PageSeo } from "~/components/Seo";
import { menuItems, originOrder, siteConfig } from "~/content/site";

export default function Menu() {
  const sections = originOrder.map(origin => ({
    origin,
    items: menuItems.filter(item => item.origin === origin)
  }));

  return (
    <>
      <PageSeo
        title="Menu"
        description="Explore the full Soulbait seasonal food truck menu in Portland, Maine: Maine seafood, Haitian heat, Latin soul, descriptions, prices, and summer specials."
        path="/menu"
      />
      <section class="page-hero compact" aria-labelledby="menu-title">
        <p class="eyebrow">Seasonal menu</p>
        <h1 id="menu-title">Seafood, heat, citrus, and crunch.</h1>
        <p>
          Read the full truck board before you get in line. Every item includes a description,
          price, and seasonal context for fast mobile ordering.
        </p>
        <div class="hero-actions page-actions">
          <A class="button button-primary" href="/find-us">
            Find today's truck
          </A>
          <A class="button button-secondary" href="/catering">
            Book catering
          </A>
        </div>
      </section>

      <section class="section menu-sections" aria-label="Soulbait menu categories">
        <For each={sections}>
          {section => (
            <div class="menu-section-group">
              <div class="section-heading inline">
                <p class="section-kicker">{section.origin}</p>
                <h2>{section.origin === "Soulbait" ? "Truck specials" : `${section.origin} influence`}</h2>
              </div>
              <div class="card-grid two-up">
                <For each={section.items}>
                  {item => (
                    <article class={`menu-card origin-${item.origin.toLowerCase()}`}>
                      <p class="menu-origin">{item.origin}</p>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div class="menu-tags" aria-label={`${item.name} tags`}>
                        <For each={item.tags}>{tag => <span>{tag}</span>}</For>
                      </div>
                      <div class="menu-footer">
                        <span>{item.price}</span>
                        <span>{item.seasonal ? siteConfig.seasonLabel : "All season"}</span>
                      </div>
                    </article>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </section>

      <section class="section inquiry-panel menu-cta" aria-labelledby="menu-cta-title">
        <div>
          <p class="section-kicker">Need the truck?</p>
          <h2 id="menu-cta-title">Lunch line or private event, start with the menu.</h2>
          <p>
            Check today's stop before heading out, or send the menu to your team before booking
            Soulbait for a Portland-area event.
          </p>
        </div>
        <div class="social-actions">
          <A class="button button-primary" href={siteConfig.ctas.primaryHref}>
            {siteConfig.ctas.primaryLabel}
          </A>
          <A class="button button-secondary" href={siteConfig.ctas.cateringHref}>
            {siteConfig.ctas.cateringLabel}
          </A>
        </div>
      </section>
    </>
  );
}
