import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

/**
 * Next.js's file-based convention: a file named `opengraph-image.tsx`
 * inside a route automatically becomes that route's OG image — no
 * manual <meta property="og:image"> needed, and no static asset to
 * keep in sync with copy changes. This is the placeholder version;
 * swap the JSX below for real brand art whenever that's ready, the
 * wiring stays the same.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#221E25",
        position: "relative",
      }}
    >
      {/*
          Satori (the renderer behind next/og) only supports a subset of
          CSS — repeating-linear-gradient is NOT supported and fails the
          build silently producing a broken image route. Keep this
          layout to simple flex/solid-color/border primitives only.
        */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 8,
          backgroundColor: "#C9A227",
        }}
      />
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#C9A227",
          letterSpacing: "-0.02em",
        }}
      >
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 32, color: "#FAF9F7", marginTop: 16 }}>
        {siteConfig.tagline}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 8,
          backgroundColor: "#1C4E63",
        }}
      />
    </div>,
    { ...size },
  );
}
