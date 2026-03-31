import Link from "next/link";

export default function Breadcrumb({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `https://www.skinbloom-aesthetics.ch${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          {items.map((item, i) => (
            <li key={i} className="breadcrumb-item">
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current">{item.label}</span>
              )}
              {i < items.length - 1 && (
                <span className="breadcrumb-sep" aria-hidden="true">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
