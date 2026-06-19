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
        description="Book Soulbait food truck catering for Portland, Maine waterfront events, office lunches, festivals, corporate gigs, and private seasonal parties."
        path="/catering"
      />
      <section class="page-hero compact" aria-labelledby="catering-title">
        <p class="eyebrow">Catering and events</p>
        <h1 id="catering-title">Bring the Soulbait window to the party.</h1>
        <p>
          Private service is built for warm-weather gatherings, office lunches, festivals, and
          dockside events across Greater Portland.
        </p>
        <a class="button button-primary" href="#catering-form">
          {siteConfig.ctas.cateringLabel}
        </a>
      </section>

      <section class="section card-grid three-up" aria-label="Catering formats">
        <For each={cateringOptions}>
          {(option) => (
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
            Include the event date, service window, guest count, location, dietary needs, and
            whether you want truck service or a drop-off menu.
          </p>
        </div>
        <a class="button button-secondary" href={mailto()}>
          Email {siteConfig.email}
        </a>
      </section>

      <section class="section form-section" aria-labelledby="catering-form-title">
        <div class="form-intro">
          <p class="section-kicker">Catering request</p>
          <h2 id="catering-form-title">Tell us the basics.</h2>
          <p>
            This static form opens an email draft with your request details. If your device blocks
            email forms, use the direct email button below.
          </p>
        </div>
        <form
          id="catering-form"
          class="inquiry-form"
          action={mailto()}
          method="post"
          enctype="text/plain"
        >
          <label>
            Event date
            <input name="Event date" type="date" required />
          </label>
          <label>
            Service window
            <input
              name="Service window"
              type="text"
              placeholder="Example: 12:00 PM - 2:00 PM"
              required
            />
          </label>
          <label>
            Guest count
            <input
              name="Guest count"
              type="number"
              min="1"
              inputmode="numeric"
              placeholder="75"
              required
            />
          </label>
          <label>
            Event location
            <input
              name="Event location"
              type="text"
              placeholder="Venue, address, or neighborhood"
              required
            />
          </label>
          <label>
            Service type
            <select name="Service type" required>
              <option value="">Choose one</option>
              <For each={cateringOptions}>
                {(option) => <option value={option.name}>{option.name}</option>}
              </For>
            </select>
          </label>
          <label>
            Contact email
            <input name="Contact email" type="email" placeholder="you@example.com" required />
          </label>
          <label class="full-span">
            Dietary needs, menu goals, and notes
            <textarea
              name="Notes"
              rows="5"
              placeholder="Tell us about menu preferences, dietary needs, load-in details, and timing."
            />
          </label>
          <div class="form-actions full-span">
            <button class="button button-primary" type="submit">
              Open email request
            </button>
            <a class="button button-secondary" href={mailto()}>
              Email {siteConfig.email}
            </a>
          </div>
        </form>
      </section>
    </>
  );
}
