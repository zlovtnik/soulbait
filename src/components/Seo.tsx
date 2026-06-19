import { Link, Meta, Title } from "@solidjs/meta";
import { locationSlots, reviewLinks, siteConfig } from "~/content/site";

interface PageSeoProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
}

export function PageSeo(props: PageSeoProps) {
  const pageTitle = () =>
    props.title === siteConfig.seo.defaultTitle
      ? props.title
      : `${props.title} | ${siteConfig.name}`;
  const description = () => props.description ?? siteConfig.seo.description;
  const canonical = () => new URL(props.path, siteConfig.siteUrl).toString();
  const image = () => new URL(props.image ?? siteConfig.seo.ogImage, siteConfig.siteUrl).toString();

  return (
    <>
      <Title>{pageTitle()}</Title>
      <Meta name="description" content={description()} />
      <Meta name="keywords" content={siteConfig.seo.keywords.join(", ")} />
      <Link rel="canonical" href={canonical()} />
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content={siteConfig.name} />
      <Meta property="og:title" content={pageTitle()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:url" content={canonical()} />
      <Meta property="og:image" content={image()} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={pageTitle()} />
      <Meta name="twitter:description" content={description()} />
      <Meta name="twitter:image" content={image()} />
    </>
  );
}

export function LocalBusinessJsonLd() {
  const activeStops = () => locationSlots.filter((location) => location.status === "active");
  const sameAs = () =>
    [
      siteConfig.social.instagram.url,
      siteConfig.social.tiktok.url,
      ...reviewLinks.filter((link) => link.enabled && link.url).map((link) => link.url)
    ].filter(Boolean);
  const json = () => ({
    "@context": "https://schema.org",
    "@type": ["FoodEstablishment", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.seo.description,
    image: new URL(siteConfig.heroImage.jpeg, siteConfig.siteUrl).toString(),
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    servesCuisine: ["Maine seafood", "Haitian", "Latin"],
    hasMenu: new URL("/menu", siteConfig.siteUrl).toString(),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: "ME",
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: `${siteConfig.city}, ${siteConfig.region}`
    },
    location: activeStops().map((location) => ({
      "@type": "Place",
      name: location.venue,
      address: location.address,
      url: location.mapUrl,
      geo: location.coordinates
        ? {
            "@type": "GeoCoordinates",
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude
          }
        : undefined
    })),
    sameAs: sameAs()
  });

  // eslint-disable-next-line solid/no-innerhtml -- JSON-LD is generated from typed static site content.
  return <script type="application/ld+json" innerHTML={JSON.stringify(json())} />;
}
