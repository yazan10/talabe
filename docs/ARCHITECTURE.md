# معمارية مشروع طلبي | Talabe Architecture

## الرؤية العامة

مشروع **طلبي** مصمم ليكون:
- **ويب** (React + TypeScript) → جاهز الآن
- **موبايل** (Flutter + Dart) → سيتم إضافته لاحقاً
- **مشترك** في الـ API والـ Design Tokens والأنواع

---

## هيكل المجلدات المستهدف (Monorepo)

```
talabe/
├── web/                    # React + Vite + Tailwind (الحالي)
├── mobile/                 # Flutter app (قادم)
├── shared/                 # أنواع + منطق أعمال مشترك
│   ├── types/              # نفس الـ types الموجودة في web/src/types
│   └── design-tokens/      # الألوان، الخطوط، المسافات
├── docs/                   # التوثيق
└── README.md
```

---

## نظام الألوان (Design Tokens)

| Token | Hex | الاستخدام |
|-------|-----|----------|
| brand-500 | `#F97316` | اللون الأساسي (برتقالي) |
| brand-600 | `#EA580C` | Hover |
| surface-50 | `#FAFAFA` | خلفية عامة |
| surface-900 | `#171717` | نصوص رئيسية |

الخطوط:
- **عربي**: Cairo
- **إنجليزي**: Inter

---

## أنواع الحسابات والاشتراكات

| الدور | الاشتراك الشهري |
|-------|----------------|
| user | مجاني |
| driver (مستقل) | 35 ₪ |
| company | 30 ₪ + 15 ₪ لكل موظف |

---

## خطة الربط مع Flutter

1. نقل الـ types إلى مجلد `shared/`
2. إنشاء Design Tokens package مشتركة
3. بناء API layer موحد (REST أو GraphQL)
4. استخدام نفس الـ Auth flow
5. مشاركة منطق الاشتراكات والحسابات

---

## الخطوات التالية المقترحة

- [ ] ربط Backend حقيقي (Firebase / Supabase / NestJS)
- [ ] نظام دفع (Stripe / HyperPay / بوابة محلية)
- [ ] إشعارات فورية (FCM)
- [ ] خرائط وتتبع حي (Google Maps / Mapbox)
- [ ] تطبيق Flutter
