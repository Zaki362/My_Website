import { ImageResponse } from "next/og";

export const alt = "Guohua Zheng | AI Builder";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f7f5f0",
          color: "#171717",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          padding: "56px",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(86,72,56,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(86,72,56,0.055) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
            inset: 0,
            position: "absolute"
          }}
        />

        <div
          style={{
            border: "1px solid rgba(23,23,23,0.12)",
            display: "flex",
            flex: 1,
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "58px 62px"
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.16em"
              }}
            >
              <span
                style={{
                  background: "#6d5bd0",
                  borderRadius: 99,
                  display: "flex",
                  height: 10,
                  marginRight: 14,
                  width: 10
                }}
              />
              AI BUILDER
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1 }}>
                GUOHUA ZHENG
              </div>
              <div
                style={{
                  borderLeft: "5px solid #6d5bd0",
                  color: "#3f3d39",
                  display: "flex",
                  fontSize: 30,
                  lineHeight: 1.35,
                  marginTop: 32,
                  maxWidth: 650,
                  paddingLeft: 22
                }}
              >
                Expanding product boundaries with AI to create incremental value.
              </div>
            </div>

            <div style={{ color: "#625f58", display: "flex", fontSize: 17, letterSpacing: "0.1em" }}>
              PRODUCT · STRATEGY · BUILD · VALUE
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              background: "#efede7",
              borderLeft: "1px solid rgba(23,23,23,0.1)",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              width: 330
            }}
          >
            <div
              style={{
                border: "1px solid rgba(109,91,208,0.28)",
                borderRadius: 999,
                display: "flex",
                height: 244,
                position: "absolute",
                width: 244
              }}
            />
            <div
              style={{
                border: "1px solid rgba(84,113,210,0.24)",
                borderRadius: 999,
                display: "flex",
                height: 166,
                position: "absolute",
                width: 166
              }}
            />
            <div
              style={{
                background: "linear-gradient(135deg, #6d5bd0, #5471d2)",
                borderRadius: 30,
                boxShadow: "0 26px 54px rgba(109,91,208,0.24)",
                display: "flex",
                height: 102,
                transform: "rotate(12deg)",
                width: 102
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
