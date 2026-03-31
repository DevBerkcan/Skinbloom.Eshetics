import Link from "next/link";

export const metadata = {
  title: "Seite nicht gefunden | Skinbloom Aesthetics",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f9f6f3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        fontFamily: "Lato, sans-serif",
      }}
    >
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.8rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#C49994",
          marginBottom: "12px",
        }}
      >
        SKINBLOOM AESTHETICS
      </p>
      <h1
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(3rem, 10vw, 7rem)",
          color: "#1f2d3e",
          lineHeight: 1,
          marginBottom: "16px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          color: "#1f2d3e",
          fontWeight: 400,
          marginBottom: "12px",
        }}
      >
        Seite nicht gefunden
      </h2>
      <p style={{ color: "#5a6a7a", maxWidth: 440, lineHeight: 1.7, marginBottom: "36px" }}>
        Die gesuchte Seite existiert leider nicht. Vielleicht wurde sie verschoben oder
        der Link ist nicht mehr gültig.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            background: "#017374",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "4px",
            textDecoration: "none",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Zur Startseite
        </Link>
        <a
          href="https://skinbloombooking.gentlegroup.de/booking"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: "1.5px solid #C49994",
            color: "#C49994",
            padding: "12px 28px",
            borderRadius: "4px",
            textDecoration: "none",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Termin buchen
        </a>
      </div>
    </main>
  );
}
