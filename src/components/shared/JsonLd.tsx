// JSON-LD structured data. The live Framer site doesn't emit any — this is
// an addition, flagged in FIDELITY-NOTES.md as the one place "better than
// the original" is explicitly allowed per the master prompt.
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Jordan Create",
        url: "https://www.jordancreate.com",
        logo: "https://www.jordancreate.com/assets/brand/logo.png",
        sameAs: ["https://www.instagram.com/jordancreateofficial/"],
      },
      {
        "@type": "Event",
        name: "Jordan Create",
        description:
          "A community-powered event bringing together musicians, influencers, content creators, and agencies from across the Kingdom, a creative explosion built to inspire generations.",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "Place", name: "Jordan" },
        organizer: {
          "@type": "Organization",
          name: "Jordan Create",
          url: "https://www.jordancreate.com",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
