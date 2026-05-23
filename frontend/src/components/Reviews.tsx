import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  { quote: "تجربة طعام لا تُنسى! المندي كان استثنائياً بمعنى الكلمة، والخدمة رفيعة المستوى جداً. يستحق كل ريال. سأعود مع عائلتي قريباً.", name: "محمد العتيبي",   title: "رجل أعمال، الرياض",   rating: 5 },
  { quote: "أجواء فاخرة ومميزة، والكبسة فاقت كل توقعاتي. أفضل مطعم زرته في الرياض خلال السنوات الأخيرة.",                                   name: "نورة السلطان",   title: "مديرة تسويق",         rating: 5 },
  { quote: "احتفلنا بعيد ميلادنا هنا وكانت الليلة مثالية. الديكور رائع والطعام شهي والخدمة ممتازة.",                                          name: "أحمد الغامدي",   title: "مهندس، جدة",          rating: 5 },
  { quote: "المأكولات البحرية كانت طازجة ومذاقها رائع. الأجواء هادئة ومناسبة لعشاء رومانسي. ننصح به بشدة.",                                   name: "سارة القحطاني",  title: "طبيبة، الدمام",       rating: 5 },
  { quote: "زيارتي الأولى لمطعم عنبر كانت تجربة استثنائية. القهوة العربية مع التمر مقدمة بأسلوب فاخر جداً.",                                  name: "عبدالله الحربي", title: "محامٍ، الرياض",        rating: 4 },
  { quote: "أفضل كنافة تذوقتها في حياتي! الأم علي كانت دافئة ومثالية. المطعم يستحق كل الثناء.",                                              name: "فاطمة الزهراني", title: "كاتبة، مكة المكرمة",  rating: 5 },
  { quote: "عشاء عمل رائع مع شركائي. الأجواء احترافية والطعام لا يُضاهى. المشاوي الملكية المفضلة لدينا.",                                     name: "خالد المالكي",   title: "رئيس تنفيذي",         rating: 5 },
  { quote: "مطعم يعكس الهوية السعودية الأصيلة بأسلوب عصري رائع. الطعام شهي جداً والخدمة لا تقل عن خمس نجوم.",                               name: "ريم العنزي",     title: "مصممة أزياء، الرياض", rating: 5 },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
};

function ArrowButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-105 active:scale-95"
      style={{ background: "#fff9ed", borderColor: "#e8d9b0", color: "#a73a00" }}
    >
      {children}
    </button>
  );
}

export default function Reviews() {
  const [[current, dir], setPage] = useState([0, 0]);
  const [timerKey, setTimerKey] = useState(0);

  const go = useCallback((newDir: number) => {
    setPage(([cur]) => [(cur + newDir + REVIEWS.length) % REVIEWS.length, newDir]);
  }, []);

  const handleArrow = (newDir: number) => {
    go(newDir);
    setTimerKey(k => k + 1); // reset auto-advance timer
  };

  // Auto-advance every 4 seconds; resets when user clicks an arrow
  useEffect(() => {
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [timerKey, go]);

  const item = REVIEWS[current];

  return (
    <section id="reviews" className="section-light py-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="pill-label">آراء عملائنا</span>
            <h2 className="section-title mb-2">ماذا يقولون عنا</h2>
            <p className="section-subtitle">رأي عملائنا هو مصدر فخرنا وإلهامنا</p>
          </div>

          {/* Google rating */}
          <div className="flex items-center gap-3 text-white rounded-2xl px-6 py-4 shrink-0" style={{ background: "#a73a00" }}>
            <div className="flex gap-0.5" dir="ltr">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <div>
              <div className="text-white font-black font-tajawal text-lg leading-none">4.9</div>
              <div className="text-white/50 text-xs font-tajawal">+2000 تقييم</div>
            </div>
          </div>
        </motion.div>

        {/* Slider row */}
        <div className="flex items-center gap-4">

          {/* Right arrow — next */}
          <ArrowButton onClick={() => handleArrow(1)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </ArrowButton>

          {/* Card */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="rounded-2xl px-8 py-8"
                style={{ background: "#fff9ed", border: "1px solid #e8d9b0" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4" dir="ltr">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill={i < item.rating ? "#feb700" : "#e8d9b0"} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-tajawal text-base leading-relaxed mb-6" style={{ color: "#2C1610" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t pt-5" style={{ borderColor: "#e8d9b0" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#a73a00" }}>
                    <span className="text-white text-sm font-bold font-tajawal">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-tajawal font-bold text-sm" style={{ color: "#1C0E08" }}>{item.name}</p>
                    <p className="font-tajawal text-xs" style={{ color: "#9a8070" }}>{item.title}</p>
                  </div>
                  <span className="mr-auto font-tajawal text-xs" style={{ color: "#c9a96e" }}>
                    {current + 1} / {REVIEWS.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left arrow — previous */}
          <ArrowButton onClick={() => handleArrow(-1)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </ArrowButton>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage(([cur]) => [i, i > cur ? 1 : -1]);
                setTimerKey(k => k + 1);
              }}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                background: i === current ? "#a73a00" : "#e8d9b0",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
