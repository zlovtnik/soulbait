import { A } from "@solidjs/router";
import { For, type ParentProps } from "solid-js";
import { navItems, siteConfig } from "~/content/site";

export default function Layout(props: ParentProps) {
  return (
    <div class="site-shell">
      <a class="skip-link" href="#main">
        Skip to content
      </a>
      <header class="site-header">
        <A class="brand-mark" href="/" aria-label={`${siteConfig.name} home`}>
          <span class="brand-name">{siteConfig.name}</span>
          <span class="brand-meta">
            {siteConfig.city}, {siteConfig.region} - {siteConfig.seasonLabel}
          </span>
        </A>
        <nav class="main-nav" aria-label="Primary navigation">
          <For each={navItems}>
            {item => (
              <A href={item.href} activeClass="is-active">
                {item.label}
              </A>
            )}
          </For>
        </nav>
        <A class="header-cta" href={siteConfig.ctas.primaryHref}>
          {siteConfig.ctas.primaryLabel}
        </A>
      </header>
      <main id="main">{props.children}</main>
      <footer class="site-footer">
        <div>
          <p class="footer-brand">{siteConfig.name}</p>
          <p class="footer-copy">
            {siteConfig.tagline} Serving {siteConfig.city}, {siteConfig.region}.
          </p>
        </div>
        <nav class="footer-links" aria-label="Footer navigation">
          <A href="/menu">Menu</A>
          <A href="/find-us">Find us</A>
          <A href="/catering">Catering</A>
          <a href={siteConfig.social.instagram.url} rel="noreferrer" target="_blank">
            Instagram
          </a>
          <a href={siteConfig.social.tiktok.url} rel="noreferrer" target="_blank">
            TikTok
          </a>
        </nav>
      </footer>
    </div>
  );
}
