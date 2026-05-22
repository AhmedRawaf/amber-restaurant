# عنبر | Amber Restaurant

A full-stack luxury restaurant website built with React + Aceternity UI + Django REST Framework.

## Tech Stack

**Frontend:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Aceternity UI

**Backend:** Django 4.2 · Django REST Framework · PostgreSQL (SQLite for dev)

**Design:** Dark elegant theme · Gold accents (#FFD700) · Tajawal Arabic font · RTL layout

---

## Project Structure

```
amber-restaurant/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/
│       │   ├── ui/    # Aceternity UI components
│       │   ├── Hero, Menu, About, Reviews
│       │   ├── Reservation, Contact, Footer, Navbar
│       ├── types/
│       └── lib/
└── backend/           # Django REST API
    ├── restaurant/    # App: models, views, serializers, admin
    └── amber_backend/ # Django project settings
```

---

## Quick Start

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Copy env file
copy .env.example .env   # Windows
cp .env.example .env     # macOS/Linux

# Run migrations & seed
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data

# Start server
python manage.py runserver
```

**Admin dashboard:** http://localhost:8000/admin/

**API endpoints:**
- `GET /api/menu/` — all menu items (filter: `?category=mains`)
- `GET /api/menu/?featured=true` — featured items only
- `POST /api/reservations/` — create a reservation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

**App:** http://localhost:5173

---

## PostgreSQL Setup (Production)

1. Create database: `createdb amber_restaurant`
2. In `.env`, set `USE_POSTGRESQL=True` and fill in DB credentials
3. Run `python manage.py migrate`

---

## API Reference

### `GET /api/menu/`
```json
[
  {
    "id": 1,
    "name": "Kabsa Al-Malek",
    "name_ar": "كبسة الملك",
    "description": "Royal spiced rice with slow-cooked whole lamb",
    "description_ar": "أرز بالبهارات الملكية مع الخروف المطهو ببطء",
    "price": "145.00",
    "category": "mains",
    "category_display": "الأطباق الرئيسية | Main Courses",
    "is_featured": true,
    "spice_level": 2,
    "calories": 980,
    "prep_time": 90
  }
]
```

### `POST /api/reservations/`
```json
{
  "name": "محمد العمري",
  "phone": "+966501234567",
  "email": "guest@example.com",
  "date": "2026-06-15",
  "time": "20:00",
  "guests": 4,
  "notes": "عيد ميلاد"
}
```

Response:
```json
{
  "success": true,
  "message": "تم تأكيد حجزك بنجاح! سنتواصل معك قريباً للتأكيد.",
  "reservation_id": 1
}
```

---

## Sections

| Section | Aceternity Component | Description |
|---------|---------------------|-------------|
| Hero | Background Beams + Spotlight | Full-screen animated hero |
| Menu | Card Hover Effect | 4-category interactive menu with live API |
| About | Wavy Background | Restaurant story + animated stats |
| Reviews | Infinite Moving Cards | Auto-scrolling customer testimonials |
| Reservation | Spotlight + Animated Tooltip | Full booking form → Django backend |
| Contact | — | Address, WhatsApp, social links |

---

## Customization

- **Restaurant name/info:** Update text in components + `backend/amber_backend/urls.py`
- **Menu items:** Use Django admin at `/admin/` or edit `seed_data.py`
- **WhatsApp number:** Search for `966112345678` across `Contact.tsx` and `Reservation.tsx`
- **Colors:** `frontend/tailwind.config.js` → `colors.gold`
- **PostgreSQL:** Set `USE_POSTGRESQL=True` in `.env`
