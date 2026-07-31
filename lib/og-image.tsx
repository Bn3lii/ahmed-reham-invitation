import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogAlt = "Ahmed & Reham Wedding — August 2, 2026";
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const PRIMARY = "#5C2018";
const CREAM = "#FAF8F5";
const GOLD = "#D9B26A";

const asset = (file: string) => readFile(join(process.cwd(), "assets", file));

export async function renderOgImage() {
  const [script, display, displayBold, arabic] = await Promise.all([
    asset("GreatVibes-Regular.ttf"),
    asset("CormorantGaramond-Regular.ttf"),
    asset("CormorantGaramond-SemiBold.ttf"),
    asset("Cairo-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PRIMARY,
          backgroundImage: `radial-gradient(circle at 50% 32%, #7A2C21 0%, ${PRIMARY} 55%, #3F1610 100%)`,
        }}
      >
        {/* Outer gold frame */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            border: `2px solid ${GOLD}`,
            opacity: 0.75,
          }}
        />
        {/* Inner hairline frame */}
        <div
          style={{
            position: "absolute",
            top: 38,
            left: 38,
            right: 38,
            bottom: 38,
            border: `1px solid ${GOLD}`,
            opacity: 0.4,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 90px",
          }}
        >
          <div
            style={{
              fontFamily: "Display",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 12,
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Wedding Invitation
          </div>

          <div
            style={{
              fontFamily: "Script",
              fontSize: 136,
              lineHeight: 1.15,
              color: CREAM,
              marginTop: 18,
            }}
          >
            Ahmed &amp; Reham
          </div>

          {/* Ornamental divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 14,
              marginBottom: 26,
            }}
          >
            <div
              style={{ width: 150, height: 2, flexShrink: 0, backgroundColor: GOLD, opacity: 0.7 }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                backgroundColor: GOLD,
                transform: "rotate(45deg)",
                margin: "0 18px",
              }}
            />
            <div
              style={{ width: 150, height: 2, flexShrink: 0, backgroundColor: GOLD, opacity: 0.7 }}
            />
          </div>

          <div
            style={{
              fontFamily: "Display",
              fontWeight: 600,
              fontSize: 40,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: CREAM,
            }}
          >
            August 2, 2026
          </div>

          <div
            style={{
              fontFamily: "Display",
              fontSize: 30,
              letterSpacing: 3,
              color: CREAM,
              opacity: 0.85,
              marginTop: 12,
            }}
          >
            Al Loaloaa Village — Faiyum, Egypt
          </div>

          <div
            style={{
              fontFamily: "Arabic",
              fontSize: 34,
              color: GOLD,
              marginTop: 26,
            }}
          >
            حضوركم شرف لنا
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Script", data: script, style: "normal", weight: 400 },
        { name: "Display", data: display, style: "normal", weight: 400 },
        { name: "Display", data: displayBold, style: "normal", weight: 600 },
        { name: "Arabic", data: arabic, style: "normal", weight: 400 },
      ],
    }
  );
}
