export default function Ticker() {
  return (
    <div style={{ background: "#a73a00", position: "relative" }}>

      {/* Top double-line border */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #feb700 15%, #feb700 85%, transparent)" }} />
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #feb70055 15%, #feb70055 85%, transparent)", margin: "3px 0" }} />

      {/* Main band */}
      <div style={{ display: "flex", alignItems: "center", height: "72px", position: "relative" }}>

        {/* Tiled Islamic 8-pointed star background */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs>
            <pattern id="zellij" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M40,24 L30.1,21.5 L35.3,12.7 L26.5,17.9 L24,8 L21.5,17.9 L12.7,12.7 L17.9,21.5
                   L8,24 L17.9,26.5 L12.7,35.3 L21.5,30.1 L24,40 L26.5,30.1 L35.3,35.3 L30.1,26.5 Z"
                fill="#feb700" opacity="0.12"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zellij)" />
        </svg>

        {/* Left arm: fading line → small diamond → large diamond → small diamond → short line */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: "40px", paddingRight: "20px", gap: "8px", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #feb700)" }} />
          <svg width="8"  height="8"  viewBox="0 0 8 8" ><polygon points="4,0 8,4 4,8 0,4" fill="#feb700" opacity="0.7" /></svg>
          <svg width="13" height="13" viewBox="0 0 13 13"><polygon points="6.5,0 13,6.5 6.5,13 0,6.5" fill="#feb700" /></svg>
          <svg width="8"  height="8"  viewBox="0 0 8 8" ><polygon points="4,0 8,4 4,8 0,4" fill="#feb700" opacity="0.7" /></svg>
          <div style={{ width: "28px", height: "1px", background: "#feb700", opacity: 0.6 }} />
        </div>

        {/* Center medallion */}
        <div style={{
          flexShrink: 0, position: "relative", zIndex: 2,
          width: "72px", height: "72px", borderRadius: "50%",
          background: "#fff9ed",
          border: "2px solid #feb700",
          boxShadow: "0 0 0 4px #a73a00, 0 0 0 5.5px #feb70050",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Inner decorative ring with 4 dot accents */}
          <svg style={{ position: "absolute", inset: 0 }} viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="30" stroke="#feb700" strokeWidth="0.7" opacity="0.35" />
            {[0, 90, 180, 270].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return <circle key={i} cx={36 + 30 * Math.cos(rad)} cy={36 + 30 * Math.sin(rad)} r="2.5" fill="#feb700" opacity="0.55" />;
            })}
          </svg>
          <img
            src="/images/menu/amber-logo-transparent.png"
            alt="عنبر"
            style={{ width: "44px", height: "44px", objectFit: "contain", position: "relative", zIndex: 1 }}
          />
        </div>

        {/* Right arm: mirror of left */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingRight: "40px", paddingLeft: "20px", gap: "8px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "28px", height: "1px", background: "#feb700", opacity: 0.6 }} />
          <svg width="8"  height="8"  viewBox="0 0 8 8" ><polygon points="4,0 8,4 4,8 0,4" fill="#feb700" opacity="0.7" /></svg>
          <svg width="13" height="13" viewBox="0 0 13 13"><polygon points="6.5,0 13,6.5 6.5,13 0,6.5" fill="#feb700" /></svg>
          <svg width="8"  height="8"  viewBox="0 0 8 8" ><polygon points="4,0 8,4 4,8 0,4" fill="#feb700" opacity="0.7" /></svg>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #feb700)" }} />
        </div>

      </div>

      {/* Bottom double-line border */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #feb70055 15%, #feb70055 85%, transparent)", margin: "3px 0" }} />
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #feb700 15%, #feb700 85%, transparent)" }} />

    </div>
  );
}
