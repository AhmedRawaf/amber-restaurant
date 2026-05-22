import { motion } from "framer-motion";

const VALUES = [
  { title: "الجودة أولاً",     desc: "أجود المكونات الطازجة يومياً من أفضل المصادر المحلية والعالمية" },
  { title: "الضيافة العربية",  desc: "نحمل قيم الكرم العربي الأصيل في كل تفصيل من تفاصيل الخدمة" },
  { title: "الابتكار المستمر", desc: "نجمع بين عراقة الوصفات التقليدية وإبداع الطهي العصري" },
  { title: "الاستدامة",        desc: "نلتزم بممارسات صديقة للبيئة في مصادرنا وعملياتنا اليومية" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function About() {
  return (
    <section id="about">

      {/* ── 2-col light section ── */}
      <div className="dot-pattern py-24 lg:py-32" style={{ backgroundColor: "#fff9ed" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Image side ── */}
            <motion.div
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Decorative bg shapes */}
              <div className="absolute -bottom-5 -right-5 w-56 h-56 rounded-3xl" style={{ background: "#f4e8bd", zIndex: 0 }} />
              <div className="absolute -top-5 -left-5 w-32 h-32 rounded-2xl" style={{ background: "rgba(254,183,0,0.2)", zIndex: 0 }} />

              {/* Rotated image */}
              <div
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  width: "380px", height: "460px", maxWidth: "100%",
                  transform: "rotate(-2.5deg)",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "rotate(-2.5deg)")}
              >
                <img
                  src="/images/menu/مشاوي%20مشكلة%20ملكية.jpg"
                  alt="مشاوي ملكية"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute bottom-8 z-20 rounded-2xl px-5 py-4 shadow-lg"
                style={{ background: "#a73a00", left: "0px" }}
              >
                <div className="font-black text-2xl text-white font-tajawal">+10</div>
                <div className="text-xs font-tajawal" style={{ color: "rgba(255,255,255,0.7)" }}>سنوات من التميّز</div>
              </div>
            </motion.div>

            {/* ── Text side ── */}
            <motion.div className="order-1 lg:order-2" {...fadeUp(0.1)}>
              <span className="pill-label">قصتنا</span>

              <h2 className="font-tajawal font-black text-4xl md:text-5xl mb-1" style={{ color: "#1a0a00", lineHeight: "1.2" }}>
                من قلب الموروث
              </h2>
              <h2 className="font-tajawal font-black text-4xl md:text-5xl mb-6" style={{ color: "#a73a00", lineHeight: "1.2" }}>
                إلى طاولتك
              </h2>

              <div className="gold-divider mb-6" />

              <p className="font-tajawal text-lg leading-relaxed mb-5" style={{ color: "#5a3020" }}>
                تأسّس مطعم <span className="font-bold" style={{ color: "#a73a00" }}>عنبر</span> قبل أكثر من عشر سنوات برؤية
                واحدة: تقديم المطبخ العربي الأصيل بمعايير عالمية، في أجواء تجمع بين الحنين والفخامة.
              </p>
              <p className="font-tajawal text-base leading-relaxed mb-10" style={{ color: "#7a5030" }}>
                طهاتنا تلقّوا تدريبهم على أيدي أمهر الأساتذة، ومكوّناتنا تُنتقى يومياً من أجود المصادر،
                لأن كل طبق عندنا هو وعد بتجربة لا تُنسى.
              </p>

              {/* Feature checklist */}
              <div className="flex flex-col gap-3 mb-10">
                {["مكوّنات طازجة من أجود المصادر يومياً", "وصفات أصيلة متوارثة عبر الأجيال", "خدمة فاخرة وأجواء استثنائية"].map(feat => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(167,58,0,0.12)" }}>
                      <svg className="w-4 h-4" fill="none" stroke="#a73a00" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="font-tajawal font-medium text-sm" style={{ color: "#3d1a06" }}>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary text-sm px-8 py-4"
              >
                احجز تجربتك الآن
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Values section ── */}
      <div className="section-gray py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div className="mb-12" {...fadeUp(0)}>
            <h3 className="font-tajawal font-black text-3xl md:text-4xl mb-3" style={{ color: "#1a0a00" }}>قيمنا</h3>
            <div className="gold-divider" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} className="group" {...fadeUp(i * 0.08)}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: "#a73a00" }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="font-tajawal font-bold text-lg mb-2" style={{ color: "#1a0a00" }}>{v.title}</h4>
                <p className="font-tajawal text-sm leading-relaxed" style={{ color: "#7a5030" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
