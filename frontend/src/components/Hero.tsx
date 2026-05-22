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
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-0 order-1">

          {/* Eyebrow */}
          <motion.span className="pill-label" {...fadeUp(0)}>
            <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
            مطعم فاخر في الرياض
          </motion.span>

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
