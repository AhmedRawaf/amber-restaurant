import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { MenuItem, MenuCategory } from "@/types";

const STATIC_MENU: MenuItem[] = [
  { id: 1,  name: "Hummus Beiruti",        name_ar: "حمص بيروتي",             description: "Creamy chickpea dip",            description_ar: "حمص كريمي مع زيت الزيتون والأعشاب الطازجة",                           price: "25",  category: "appetizers", category_display: "المقبلات",          image: null, image_url: "/images/menu/حمص%20بيروتي.jpg",                is_featured: true,  is_available: true, spice_level: 0, calories: 320,  prep_time: 10  },
  { id: 2,  name: "Fattoush Salad",        name_ar: "سلطة فتوش",              description: "Fresh garden salad",             description_ar: "خضروات طازجة مع خبز محمص وصلصة السماق",                               price: "22",  category: "appetizers", category_display: "المقبلات",          image: null, image_url: "/images/menu/سلطة%20فتوش.jpg",                 is_featured: false, is_available: true, spice_level: 0, calories: 180,  prep_time: 10  },
  { id: 3,  name: "Kibbeh",                name_ar: "كبة مقلية",              description: "Crispy fried bulgur",            description_ar: "قشرة مقرمشة من البرغل محشوة باللحم المفروم المتبل",                  price: "30",  category: "appetizers", category_display: "المقبلات",          image: null, image_url: "/images/menu/كبة%20مقلية.jpg",                 is_featured: true,  is_available: true, spice_level: 1, calories: 420,  prep_time: 20  },
  { id: 4,  name: "Sambousek",             name_ar: "سمبوسك",                 description: "Golden cheese pastry",           description_ar: "معجنات ذهبية محشوة بالجبن والأعشاب",                                   price: "30",  category: "appetizers", category_display: "المقبلات",          image: null, image_url: "/images/menu/سمبوسك.jpg",                      is_featured: false, is_available: true, spice_level: 0, calories: 380,  prep_time: 15  },
  { id: 5,  name: "Mutabbaq",              name_ar: "مطبق",                   description: "Spiced meat pastry",             description_ar: "لحم مفروم متبل وبيض في عجينة رفيعة مقرمشة",                           price: "15",  category: "appetizers", category_display: "المقبلات",          image: null, image_url: "/images/menu/مطبق.jpg",                        is_featured: false, is_available: true, spice_level: 1, calories: 450,  prep_time: 20  },
  { id: 6,  name: "Kabsa Al-Malek",        name_ar: "كبسة الملك",             description: "Royal spiced rice with lamb",    description_ar: "أرز بالبهارات الملكية مع الخروف المطهو ببطء والمكسرات المحمصة",     price: "640", category: "mains",      category_display: "الأطباق الرئيسية",  image: null, image_url: "/images/menu/كبسة%20الملك.jpg",                is_featured: true,  is_available: true, spice_level: 2, calories: 980,  prep_time: 90  },
  { id: 7,  name: "Lamb Mandi",            name_ar: "مندي لحم",               description: "Slow-smoked lamb over rice",     description_ar: "لحم الخروف الطري المدخن على أرز البسمتي العطري في التندور التقليدي", price: "580", category: "mains",      category_display: "الأطباق الرئيسية",  image: null, image_url: "/images/menu/مندي%20لحم.jpg",                  is_featured: true,  is_available: true, spice_level: 1, calories: 1100, prep_time: 120 },
  { id: 8,  name: "Mixed Royal Grill",     name_ar: "مشاوي مشكلة ملكية",     description: "Premium mixed grill selection",  description_ar: "تشكيلة من أضلاع الخروف وشيش طاووق والكفتة والروبيان المشوي",         price: "220", category: "mains",      category_display: "الأطباق الرئيسية",  image: null, image_url: "/images/menu/مشاوي%20مشكلة%20ملكية.jpg",      is_featured: true,  is_available: true, spice_level: 1, calories: 1350, prep_time: 35  },
  { id: 9,  name: "Seafood Platter",       name_ar: "طبق المأكولات البحرية",  description: "Daily catch seafood feast",      description_ar: "صيد اليوم من السمك المشوي وجراد البحر والروبيان مع أرز الزعفران",    price: "480", category: "mains",      category_display: "الأطباق الرئيسية",  image: null, image_url: "/images/menu/طبق%20المأكولات%20البحرية.jpg",   is_featured: true,  is_available: true, spice_level: 0, calories: 850,  prep_time: 40  },
  { id: 10, name: "Ouzi",                  name_ar: "أوزي",                   description: "Whole baby lamb over rice",      description_ar: "خروف حجل محشو بالأرز المتبل، محمص ببطء على درجة الكمال",             price: "350", category: "mains",      category_display: "الأطباق الرئيسية",  image: null, image_url: "/images/menu/أوزي.jpg",                        is_featured: false, is_available: true, spice_level: 2, calories: 1500, prep_time: 180 },
  { id: 11, name: "Umm Ali",               name_ar: "أم علي",                 description: "Warm bread pudding with cream",  description_ar: "بودينج الخبز الدافئ التقليدي بالكريمة والمكسرات المشكلة والقرفة",   price: "38",  category: "desserts",   category_display: "الحلويات",          image: null, image_url: "/images/menu/أم%20علي.jpg",                    is_featured: true,  is_available: true, spice_level: 0, calories: 560,  prep_time: 20  },
  { id: 12, name: "Saffron Kunafa",        name_ar: "كنافة الزعفران",         description: "Classic shredded pastry",        description_ar: "كنافة كلاسيكية بالقشطة وشراب ماء الزهر",                               price: "35",  category: "desserts",   category_display: "الحلويات",          image: null, image_url: "/images/menu/كنافة%20الزعفران.jpg",            is_featured: true,  is_available: true, spice_level: 0, calories: 480,  prep_time: 15  },
  { id: 13, name: "Baklava Royale",        name_ar: "بقلاوة ملكية",           description: "Crispy filo with pistachio",     description_ar: "طبقات من العجين المقرمش بالفستق الحلبي والعسل وماء الورد",           price: "28",  category: "desserts",   category_display: "الحلويات",          image: null, image_url: "/images/menu/بقلاوة%20ملكية.jpg",              is_featured: false, is_available: true, spice_level: 0, calories: 380,  prep_time: 10  },
  { id: 14, name: "Muhalabiya",            name_ar: "مهلبية",                 description: "Rosewater milk pudding",         description_ar: "حلوى الحليب الحريرية بماء الورد والفستق وورق الذهب",                 price: "32",  category: "desserts",   category_display: "الحلويات",          image: null, image_url: "/images/menu/مهلبية.jpg",                      is_featured: false, is_available: true, spice_level: 0, calories: 290,  prep_time: 5   },
  { id: 15, name: "Arabic Coffee",         name_ar: "قهوة عربية",             description: "Traditional Saudi coffee",       description_ar: "قهوة سعودية تقليدية بالهيل والزعفران، تقدم مع التمر",               price: "18",  category: "drinks",     category_display: "المشروبات",         image: null, image_url: "/images/menu/قهوة%20عربية.jpg",                is_featured: true,  is_available: true, spice_level: 0, calories: 45,   prep_time: 5   },
  { id: 16, name: "Moroccan Mint Tea",     name_ar: "شاي مغربي بالنعناع",    description: "Fresh brewed green tea",         description_ar: "شاي أخضر طازج بالنعناع وقصب السكر",                                   price: "25",  category: "drinks",     category_display: "المشروبات",         image: null, image_url: "/images/menu/شاي%20مغربي%20بالنعناع.jpg",      is_featured: false, is_available: true, spice_level: 0, calories: 60,   prep_time: 5   },
  { id: 17, name: "Fresh Pomegranate Juice", name_ar: "عصير رمان طازج",      description: "Cold-pressed pomegranate",       description_ar: "رمان معصور على البارد مع لمسة من ماء الورد",                         price: "22",  category: "drinks",     category_display: "المشروبات",         image: null, image_url: "/images/menu/عصير%20رمان%20طازج.jpg",          is_featured: true,  is_available: true, spice_level: 0, calories: 135,  prep_time: 5   },
  { id: 18, name: "Jallab",                name_ar: "جلاب",                   description: "Classic Levantine drink",        description_ar: "مشروب شامي كلاسيكي بعصير العنب وماء الورد وحبوب الصنوبر",           price: "20",  category: "drinks",     category_display: "المشروبات",         image: null, image_url: "/images/menu/جلاب.jpg",                        is_featured: false, is_available: true, spice_level: 0, calories: 180,  prep_time: 5   },
];

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "all",        label: "الكل"              },
  { id: "appetizers", label: "المقبلات"          },
  { id: "mains",      label: "الأطباق الرئيسية" },
  { id: "desserts",   label: "الحلويات"          },
  { id: "drinks",     label: "المشروبات"         },
];

export default function Menu() {
  const [active,    setActive]    = useState<MenuCategory>("all");
  const [menuItems] = useState<MenuItem[]>(STATIC_MENU);
  const loading = false;

  const filtered = active === "all" ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <section id="menu" className="section-gray py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill-label">قائمة الطعام</span>
          <h2 className="section-title">اكتشف نكهاتنا</h2>
          <p className="section-subtitle max-w-xl">
            وصفات أصيلة تجمع بين عراقة المطبخ العربي وابتكار الطهي العصري
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-tajawal font-bold transition-all duration-200 ${
                active === cat.id
                  ? "text-white"
                  : "bg-white text-[#1C0E08] border border-uber-border hover:border-[#a73a00]"
              }`}
              style={active === cat.id ? { background: "#a73a00" } : {}}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="uber-card h-72 bg-uber-gray2 animate-pulse" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <HoverEffect items={filtered} />
            ) : (
              <p className="text-center py-20 text-uber-gray4 font-tajawal">
                لا توجد أصناف في هذه الفئة حالياً
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-xs text-uber-gray4 font-tajawal mt-12">
          جميع أطباقنا محضرة يومياً من أجود المكونات الطازجة · الأسعار شاملة ضريبة القيمة المضافة
        </p>
      </div>
    </section>
  );
}
