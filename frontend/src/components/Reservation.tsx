import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReservationForm } from "@/types";

const TIME_SLOTS = [
  { value: "12:00", label: "12:00 ظهراً" }, { value: "12:30", label: "12:30 ظهراً" },
  { value: "13:00", label: "01:00 مساءً" }, { value: "13:30", label: "01:30 مساءً" },
  { value: "14:00", label: "02:00 مساءً" }, { value: "18:00", label: "06:00 مساءً" },
  { value: "18:30", label: "06:30 مساءً" }, { value: "19:00", label: "07:00 مساءً" },
  { value: "19:30", label: "07:30 مساءً" }, { value: "20:00", label: "08:00 مساءً" },
  { value: "20:30", label: "08:30 مساءً" }, { value: "21:00", label: "09:00 مساءً" },
  { value: "21:30", label: "09:30 مساءً" }, { value: "22:00", label: "10:00 مساءً" },
  { value: "22:30", label: "10:30 مساءً" }, { value: "23:00", label: "11:00 مساءً" },
];

const INIT: ReservationForm = { name: "", phone: "", email: "", date: "", time: "", guests: 2, notes: "" };

type State = "idle" | "loading" | "success" | "error";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Reservation() {
  const [form,    setForm]    = useState<ReservationForm>(INIT);
  const [state,   setState]   = useState<State>("idle");
  const [errMsg,  setErrMsg]  = useState("");
  const [resId,   setResId]   = useState<number | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: name === "guests" ? Number(value) : value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => {
      setResId(Math.floor(1000 + Math.random() * 9000));
      setState("success");
      setForm(INIT);
    }, 900);
  };

  // Shared input class — Uber underline style
  const inp = "w-full bg-transparent border-0 border-b-2 border-uber-border text-black font-tajawal text-base py-3 placeholder-uber-gray3 focus:outline-none focus:border-black transition-colors duration-200";
  const lbl = "block text-xs font-bold font-tajawal text-uber-gray4 mb-1 uppercase tracking-wider";

  return (
    <section id="reservation" className="section-gray py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div className="mb-16" {...fadeUp(0)}>
          <span className="pill-label">الحجز</span>
          <h2 className="section-title">احجز طاولتك</h2>
          <p className="section-subtitle max-w-lg">
            احجز الآن واستمتع بتجربة طعام لا تُنسى مع أحبائك
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ── Info panel ── */}
          <motion.div className="lg:col-span-2 space-y-6" {...fadeUp(0.1)}>
            {[
              { icon: "🕐", title: "أوقات العمل",    body: "يومياً · 12:00 ظهراً – 11:00 مساءً" },
              { icon: "📍", title: "الموقع",          body: "طريق الملك فهد، حي العليا، الرياض" },
              { icon: "📞", title: "الهاتف",          body: "+966 11 234 5678"                  },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-base" style={{ background: "#a73a00" }}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-bold font-tajawal text-uber-gray4 uppercase tracking-wider mb-0.5">
                    {item.title}
                  </div>
                  <div className="text-black font-tajawal text-sm">{item.body}</div>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/966112345678?text=أرغب في حجز طاولة في مطعم عنبر"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 w-full text-white rounded-2xl px-6 py-4 hover:opacity-85 transition-opacity"
              style={{ background: "#a73a00" }}
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-tajawal font-bold text-sm">احجز عبر الواتساب</span>
            </a>
          </motion.div>

          {/* ── Form ── */}
          <motion.div className="lg:col-span-3" {...fadeUp(0.15)}>
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl p-12 text-center"
                  style={{ background: "#a73a00" }}
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-black font-tajawal text-2xl mb-2">تم الحجز بنجاح!</h3>
                  <p className="text-white/60 font-tajawal text-sm mb-1">سنتواصل معك قريباً لتأكيد حجزك</p>
                  {resId && <p className="text-white/30 text-xs font-tajawal">رقم الحجز: #{resId}</p>}
                  <button onClick={() => setState("idle")} className="btn-white mt-8 text-sm">
                    حجز جديد
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="rounded-3xl p-8 sm:p-10 border"
                  style={{ background: "#fff9ed", borderColor: "#e8d9b0" }}
                >
                  <h3 className="font-tajawal font-black text-xl text-black mb-8">تفاصيل الحجز</h3>

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
                    <div>
                      <label className={lbl}>الاسم الكامل *</label>
                      <input type="text" name="name" value={form.name} onChange={onChange}
                             required placeholder="محمد العمري" className={inp} />
                    </div>
                    <div>
                      <label className={lbl}>رقم الجوال *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={onChange}
                             required placeholder="+966 5X XXX XXXX" className={inp} dir="ltr" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={lbl}>البريد الإلكتروني</label>
                      <input type="email" name="email" value={form.email} onChange={onChange}
                             placeholder="example@email.com" className={inp} dir="ltr" />
                    </div>
                    <div>
                      <label className={lbl}>التاريخ *</label>
                      <input type="date" name="date" value={form.date} onChange={onChange}
                             required min={today} className={inp} dir="ltr" />
                    </div>
                    <div>
                      <label className={lbl}>الوقت *</label>
                      <select name="time" value={form.time} onChange={onChange} required className={inp}>
                        <option value="" disabled>اختر الوقت</option>
                        {TIME_SLOTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>عدد الأشخاص *</label>
                      <select name="guests" value={form.guests} onChange={onChange} required className={inp}>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? "شخص" : "أشخاص"}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={lbl}>ملاحظات</label>
                      <textarea name="notes" value={form.notes} onChange={onChange} rows={2}
                                placeholder="مناسبة خاصة؟ تفضيلات معينة؟"
                                className={`${inp} resize-none`} />
                    </div>
                  </div>

                  {state === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-5 text-red-500 text-sm font-tajawal bg-red-50 rounded-xl px-4 py-3"
                    >
                      {errMsg}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="btn-primary w-full mt-8 py-4 text-base disabled:opacity-50"
                  >
                    {state === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        جاري الإرسال...
                      </span>
                    ) : "تأكيد الحجز"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
