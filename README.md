# طلبي | Talabe

**منصة توصيل ذكية** للمطاعم والمحلات والسائقين في فلسطين.

Smart delivery platform for restaurants, shops, and independent drivers.

---

## 🎯 عن المشروع

طلبي هي منصة شاملة تربط بين:
- **العملاء** (مستخدمين يطلبون توصيل)
- **السائقين** (شوفيرين مستقلين أو تابعين لشركات)
- **الشركات / المصالح** (مطاعم، سوبرماركت، محلات، معارض سيارات...)

### أنواع الحسابات
| النوع | الوصف | الاشتراك الشهري |
|-------|-------|----------------|
| **مستخدم** | يطلب خدمات التوصيل | مجاني |
| **سائق مستقل** | يعمل لحسابه الخاص | 35 ₪ |
| **شركة / مصلحة** | تدير موظفين وسائقين | 30 ₪ + 15 ₪ لكل موظف |

---

## 🏗️ البنية التقنية

```
talabe/
├── web/                 # React + Vite + TypeScript (الويب)
├── mobile/              # Flutter (سيتم إضافته لاحقاً)
├── shared/              # أنواع مشتركة و منطق أعمال (جاهز للربط)
└── docs/                # توثيق المعمارية
```

### الويب (الحالي)
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** للتصميم
- **React Router** للتنقل
- **Zustand** لإدارة الحالة
- تصميم **RTL** كامل
- نظام ألوان برتقالي حديث

### الموبايل (قادم)
- Flutter + Dart
- مشاركة نفس الـ API والـ Design Tokens
- دعم iOS و Android

---

## 🎨 نظام التصميم

**اللون الأساسي:** برتقالي `#F97316`  
**الخلفيات:** أبيض + درجات رمادية ناعمة  
**الخطوط:** Cairo (عربي) + Inter (إنجليزي)

---

## 🚀 التشغيل المحلي

```bash
npm install
cd web
npm install
npm run dev
```

## Backend

- API: `api/[...route].ts` (Vercel serverless)
- Database: Neon PostgreSQL project `talabe` (separate from Wasla)
- Required server-only environment variables: `TALABE_DATABASE_URL`, `TALABE_ADMIN_KEY`
- API details and current limitations: [docs/API_BACKEND.md](docs/API_BACKEND.md)

Authentication and order/address/driver data now use the database. Payment processing, subscription billing, push delivery, and public admin UI are not connected yet.

---

## 🌐 النشر على Vercel

المشروع جاهز للنشر على Vercel مباشرة.

### الطريقة السريعة:

1. ادخل على [vercel.com](https://vercel.com) وسجّل دخول بحساب GitHub
2. اضغط **Add New Project**
3. اختر مستودع `talabe`
4. في إعدادات المشروع:
   - **Framework Preset**: Other
   - **Root Directory**: اتركه فارغ (أو ضع `.`)
   - Vercel سيقرأ ملف `vercel.json` تلقائياً
5. اضغط **Deploy**

بعد النشر، أي تحديث تدفعه على `main` سيتم نشره تلقائياً.

---

## 📋 الميزات المخططة

- [x] بنية المشروع الأساسية
- [x] نظام تصميم كامل (ألوان + خطوط + مكونات)
- [x] صفحات الهبوط + تسجيل الدخول + التسجيل
- [x] لوحات تحكم منفصلة (مستخدم / سائق / شركة)
- [x] جاهزية Vercel
- [x] قاعدة Neon PostgreSQL مستقلة
- [x] تسجيل ودخول بجلسات HTTP-only وتشفير كلمات المرور
- [x] طلبات توصيل حقيقية وحالات الطلب
- [x] بيانات السائقين والتوفر وGPS
- [x] العناوين المحفوظة، الإشعارات، التفضيلات، المتابعة والتقييم
- [x] حسابات الشركات والموظفين
- [ ] مزود دفع واشتراكات حقيقية
- [ ] إشعارات Push
- [ ] تطبيق Flutter
- [ ] لوحة إدارة عامة

---

صُنع بـ ❤️ في فلسطين
