import { scrollToSection } from "@/lib/utils";

const LINKS = [
  { label: "الرئيسية",     id: "hero"        },
  { label: "قائمة الطعام", id: "menu"        },
  { label: "من نحن",       id: "about"       },
  { label: "الحجز",        id: "reservation" },
  { label: "تواصل معنا",   id: "contact"     },
];

const SOCIAL = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    name: "X",
    href: "https://twitter.com",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-14 pb-8" style={{ background: "#2C1610" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/images/menu/amber-logo-transparent.png" alt="عنبر" className="h-20 w-auto object-contain" />
            </div>
            <p className="text-white/40 text-sm font-tajawal leading-relaxed max-w-xs">
              تجربة طعام استثنائية تجمع بين عراقة المطبخ العربي وأرقى أساليب الطهي العالمية
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/50 text-xs font-bold font-tajawal uppercase tracking-wider mb-4">روابط</h4>
            <ul className="space-y-2.5">
              {LINKS.map(l => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToSection(l.id)}
                    className="text-white/60 hover:text-white text-sm font-tajawal transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white/50 text-xs font-bold font-tajawal uppercase tracking-wider mb-4">أوقات العمل</h4>
            <div className="space-y-2 text-sm font-tajawal">
              <div className="flex justify-between gap-4">
                <span className="text-white/50">السبت – الخميس</span>
                <span className="text-white/70" dir="ltr">12:00 م – 11:00 م</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">الجمعة</span>
                <span className="text-white/70" dir="ltr">1:00 م – 11:30 م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-tajawal">
            © {new Date().getFullYear()} مطعم عنبر. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-3">
            {SOCIAL.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank" rel="noopener noreferrer"
                title={s.name}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
