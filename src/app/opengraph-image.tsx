import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Terminated PFP — layoffhedge-style stamp";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/** layoffhedge.com palette */
const BG = "#faf8f4";
const CARD = "#ffffff";
const BORDER = "#e8e4de";
const TEXT = "#2c2a26";
const MUTED = "#8a857b";
const ACCENT = "#d94040";

export default async function Image() {
  const stampPath = join(
    process.cwd(),
    "public",
    "terminated-transparent.png",
  );
  const stampBuf = await readFile(stampPath);
  const stampSrc = `data:image/png;base64,${stampBuf.toString("base64")}`;

  let serifFont: ArrayBuffer | undefined;
  try {
    const res = await fetch(
      "https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2K_c.ttf",
    );
    if (res.ok) serifFont = await res.arrayBuffer();
  } catch {
    serifFont = undefined;
  }

  let sansFont: ArrayBuffer | undefined;
  try {
    const res = await fetch(
      "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf",
    );
    if (res.ok) sansFont = await res.arrayBuffer();
  } catch {
    sansFont = undefined;
  }

  const fonts =
    serifFont || sansFont
      ? [
          ...(serifFont
            ? [
                {
                  name: "DM Serif Display",
                  data: serifFont,
                  style: "normal" as const,
                  weight: 400 as const,
                },
              ]
            : []),
          ...(sansFont
            ? [
                {
                  name: "DM Sans",
                  data: sansFont,
                  style: "normal" as const,
                  weight: 500 as const,
                },
              ]
            : []),
        ]
      : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "36px 48px",
            background: CARD,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            boxShadow: "0 12px 40px rgba(44, 42, 38, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginRight: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 56,
                  color: ACCENT,
                  fontFamily: serifFont
                    ? "DM Serif Display"
                    : "Georgia, ui-serif, serif",
                  letterSpacing: -1,
                }}
              >
                Terminated
              </span>
              <span
                style={{
                  fontSize: 56,
                  color: TEXT,
                  fontFamily: serifFont
                    ? "DM Serif Display"
                    : "Georgia, ui-serif, serif",
                  letterSpacing: -1,
                  marginLeft: 10,
                }}
              >
                PFP
              </span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: MUTED,
                fontFamily: sansFont ? "DM Sans" : "ui-sans-serif, system-ui",
                lineHeight: 1.35,
                maxWidth: 420,
              }}
            >
              Stamp your photo with the seal. Download and share — all in your
              browser.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={stampSrc}
              alt=""
              height={380}
              width={284}
              style={{
                height: 380,
                width: 284,
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
