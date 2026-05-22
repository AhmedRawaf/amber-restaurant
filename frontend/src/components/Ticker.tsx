const ITEMS = [
  "كبسة الملك الفاخرة",
  "مندي اللحم الأصيل",
  "مشاوي مشكلة ملكية",
  "كنافة الزعفران الذهبية",
  "قهوة عربية أصيلة",
  "أوزي الضيافة",
  "أم علي الشرقية",
  "احجز طاولتك الآن",
];

function TickerRow() {
  return (
    <div className="ticker-items" style={{ display: "flex", flexShrink: 0, pointerEvents: "none" }}>
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="font-tajawal text-sm font-bold text-white whitespace-nowrap"
          style={{ padding: "0 2rem", cursor: "default" }}
        >
          <span style={{ color: "#feb700", marginLeft: "1rem" }}>✦</span>
          {" "}{item}
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div style={{ background: "#a73a00", overflow: "hidden", padding: "14px 0", direction: "ltr" }}>
      <style>{`
        @keyframes ticker-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: ticker-loop 18s linear infinite;
        }
      `}</style>
      <div className="ticker-track">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
