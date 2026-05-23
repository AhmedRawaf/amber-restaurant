import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden pt-16" style={{ background: "#fff9ed" }}>

      {/* ── Split layout ── */}
      <div className="flex-1 grid lg:grid-cols-2 min-h-[calc(100vh-64px)]">

        {/* ── Right column: text (RTL renders this first) ── */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-0 order-1 relative overflow-hidden">

          {/* ── Islamic geometric background rosette ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-[500px] h-[500px]" viewBox="-120 -120 240 240" fill="none" style={{ opacity: 0.07 }}>
              <circle r="110" stroke="#c9982a" strokeWidth="1.5"/>
              <circle r="88"  stroke="#c9982a" strokeWidth="0.5"/>
              <circle r="28"  stroke="#c9982a" strokeWidth="1"/>
              <circle r="9"   fill="#c9982a"/>
              {/* outer 8-pointed star */}
              <path fill="#c9982a" opacity="0.55"
                d="M 80,0 L 30.5,12.6 L 56.6,56.6 L 12.6,30.5 L 0,80
                   L -12.6,30.5 L -56.6,56.6 L -30.5,12.6 L -80,0
                   L -30.5,-12.6 L -56.6,-56.6 L -12.6,-30.5 L 0,-80
                   L 12.6,-30.5 L 56.6,-56.6 L 30.5,-12.6 Z"/>
              {/* inner star rotated 22.5° */}
              <path fill="#c9982a" opacity="0.35" transform="rotate(22.5)"
                d="M 50,0 L 19.1,7.9 L 35.4,35.4 L 7.9,19.1 L 0,50
                   L -7.9,19.1 L -35.4,35.4 L -19.1,7.9 L -50,0
                   L -19.1,-7.9 L -35.4,-35.4 L -7.9,-19.1 L 0,-50
                   L 7.9,-19.1 L 35.4,-35.4 L 19.1,-7.9 Z"/>
              {/* 16 radiating spokes */}
              {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((deg, i) => {
                const r = deg * Math.PI / 180;
                return <line key={i} x1={28*Math.cos(r)} y1={28*Math.sin(r)} x2={88*Math.cos(r)} y2={88*Math.sin(r)} stroke="#c9982a" strokeWidth="0.4"/>;
              })}
              {/* diamond accents at ring */}
              {[0,45,90,135,180,225,270,315].map((deg, i) => {
                const r = deg * Math.PI / 180;
                const cx = 88*Math.cos(r), cy = 88*Math.sin(r);
                return <polygon key={i} points={`${cx},${cy-5} ${cx+4},${cy} ${cx},${cy+5} ${cx-4},${cy}`} fill="#c9982a" opacity="0.8" transform={`rotate(${deg},${cx},${cy})`}/>;
              })}
            </svg>
          </div>

          {/* ── Top-right corner fan (mosque lattice) ── */}
          <div className="absolute top-0 right-0 pointer-events-none" style={{ opacity: 0.13 }}>
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              {/* concentric quarter-arcs centred at corner (180,0) */}
              <path d="M 0,0 A 180,180 0 0,0 180,180" stroke="#c9982a" strokeWidth="1.5"/>
              <path d="M 45,0 A 135,135 0 0,0 180,135" stroke="#c9982a" strokeWidth="1"/>
              <path d="M 90,0 A 90,90 0 0,0 180,90"   stroke="#c9982a" strokeWidth="0.8"/>
              <path d="M 135,0 A 45,45 0 0,0 180,45"  stroke="#c9982a" strokeWidth="0.6"/>
              {/* radial lines from corner */}
              <line x1="180" y1="0" x2="0"    y2="103.9" stroke="#c9982a" strokeWidth="0.5"/>
              <line x1="180" y1="0" x2="0"    y2="180"   stroke="#c9982a" strokeWidth="0.7"/>
              <line x1="180" y1="0" x2="76.1" y2="180"   stroke="#c9982a" strokeWidth="0.5"/>
              {/* accent dots at arc–radial intersections */}
              <circle cx="180"  cy="0"    r="5"   fill="#c9982a" opacity="0.8"/>
              <circle cx="116.4" cy="63.6" r="3"  fill="#c9982a" opacity="0.6"/>
              <circle cx="84.5"  cy="95.5" r="2.5" fill="#c9982a" opacity="0.4"/>
            </svg>
          </div>

          {/* ── Bottom-left corner fan ── */}
          <div className="absolute bottom-0 left-0 pointer-events-none" style={{ opacity: 0.09 }}>
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              {/* arcs centred at (0,140) */}
              <path d="M 0,0   A 140,140 0 0,1 140,140" stroke="#c9982a" strokeWidth="1.5"/>
              <path d="M 0,35  A 105,105 0 0,1 105,140" stroke="#c9982a" strokeWidth="1"/>
              <path d="M 0,70  A 70,70   0 0,1 70,140"  stroke="#c9982a" strokeWidth="0.8"/>
              <path d="M 0,105 A 35,35   0 0,1 35,140"  stroke="#c9982a" strokeWidth="0.6"/>
              <line x1="0" y1="140" x2="140"  y2="0"    stroke="#c9982a" strokeWidth="0.7"/>
              <line x1="0" y1="140" x2="140"  y2="59.2" stroke="#c9982a" strokeWidth="0.5"/>
              <line x1="0" y1="140" x2="80.8" y2="0"    stroke="#c9982a" strokeWidth="0.5"/>
              <circle cx="0"    cy="140" r="5"   fill="#c9982a" opacity="0.8"/>
              <circle cx="49.5" cy="90.5" r="3"  fill="#c9982a" opacity="0.5"/>
              <circle cx="74.2" cy="65.8" r="2"  fill="#c9982a" opacity="0.3"/>
            </svg>
          </div>

          {/* Headline */}
          <motion.h1
            className="font-noto font-bold text-5xl sm:text-6xl xl:text-7xl text-black mb-5"
            style={{ lineHeight: "1.25", overflow: "visible" }}
            {...fadeUp(0.1)}
          >
            تجربة طعام
            <span className="gold-gradient-text block" style={{ marginTop: "10px", lineHeight: "1.8" }}>لا تُنسى</span>
          </motion.h1>

          {/* Divider */}
          <motion.div className="gold-divider mb-6" {...fadeUp(0.18)} />

          {/* Subtitle */}
          <motion.p
            className="section-subtitle max-w-md mb-10"
            {...fadeUp(0.22)}
          >
            وصفات أصيلة تجمع بين عراقة المطبخ العربي وأرقى أساليب الطهي العالمية،
            في أجواء تنبض بالفخامة والأصالة
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.3)}>
            <button
              onClick={() => scrollToSection("menu")}
              className="btn-primary text-base px-8 py-4"
            >
              استكشف القائمة
            </button>
            <button
              onClick={() => scrollToSection("reservation")}
              className="btn-secondary text-base px-8 py-4"
            >
              احجز طاولتك
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-10 mt-14 pt-8 border-t border-uber-border"
            {...fadeUp(0.4)}
          >
            {[
              { value: "+10",  label: "سنوات خبرة" },
              { value: "+200", label: "طبق شهي" },
              { value: "+50K", label: "عميل سعيد" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black font-tajawal text-black">{s.value}</div>
                <div className="text-uber-gray4 text-sm font-tajawal mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Left column: hero image ── */}
        <motion.div
          className="relative order-first lg:order-2 h-64 sm:h-80 lg:h-full overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img
            src="/images/menu/كبسة الملك.jpg"
            alt="Amber Restaurant"
            className="w-full h-full object-cover"
          />
          {/* Subtle right-edge fade into cream (RTL: right = text side) */}
          <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to left, rgba(255,249,237,0.5), transparent)" }} />

          {/* Floating label */}
          <div className="absolute bottom-20 left-6 bg-white rounded-2xl px-5 py-3 shadow-lg hidden lg:block">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-black font-bold text-sm font-tajawal">4.9</span>
              <span className="text-uber-gray4 text-xs font-tajawal">• +2000 تقييم</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "64px", display: "block" }}>
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#feb700" fillOpacity="0.18"/>
          <path d="M0,48 C480,16 960,64 1440,32 L1440,64 L0,64 Z" fill="#fff9ed"/>
        </svg>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollToSection("menu")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-uber-gray4 hover:text-black transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-tajawal tracking-widest">تمرير للأسفل</span>
        <motion.svg
          className="w-4 h-4"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
    </section>
  );
}
