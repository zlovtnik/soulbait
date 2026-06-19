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
        description="Explore the Soulbait seasonal menu: Maine seafood, Haitian heat, Latin soul, and summer food-truck specials in Portland, Maine."
        path="/menu"
      />
      <section class="page-hero compact" aria-labelledby="menu-title">
        <p class="eyebrow">Seasonal menu</p>
        <h1 id="menu-title">Seafood, heat, citrus, and crunch.</h1>
        <p>
          This is the code-managed launch board. Prices and dishes can change with the catch, weather,
          and event schedule from one typed content file.
        </p>
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
    </>
  );
}
