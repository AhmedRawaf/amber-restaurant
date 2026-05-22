import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

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

export default function Reviews() {
  return (
    <section id="reviews" className="section-light py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

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
      </div>

      {/* Moving cards — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-5"
      >
        <InfiniteMovingCards items={REVIEWS.slice(0, 5)} direction="left"  speed="normal" />
        <InfiniteMovingCards items={REVIEWS.slice(3)}    direction="right" speed="slow"   />
      </motion.div>
    </section>
  );
}
