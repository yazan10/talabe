import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import {
  Truck,
  Store,
  Users,
  Smartphone,
  Shield,
  Zap,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'
import { PRICING } from '@/types'

export function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">
              <Zap className="h-4 w-4" />
              منصة التوصيل الأذكى في فلسطين
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-surface-900 sm:text-5xl lg:text-6xl">
              وصّل طلباتك بسهولة
              <span className="block text-brand-500">مع طلبي</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-surface-600">
              منصة واحدة تربط العملاء والسائقين والشركات. إدارة ذكية، اشتراكات
              مرنة، ولوحات تحكم منفصلة لكل طرف.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button size="lg" className="min-w-[180px]">
                  ابدأ مجاناً
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/#features">
                <Button variant="secondary" size="lg">
                  كيف يعمل؟
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { label: 'سائق نشط', value: '+1,200' },
                { label: 'شركة مسجلة', value: '+340' },
                { label: 'طلب يومي', value: '+8,500' },
                { label: 'تقييم متوسط', value: '4.9' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-brand-600 sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-surface-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-surface-900">لماذا طلبي؟</h2>
            <p className="mt-3 text-surface-600">
              حلول مصممة خصيصاً لسوق التوصيل المحلي
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Truck className="h-6 w-6" />,
                title: 'سائقين مستقلين وشركات',
                desc: 'اختر العمل لحسابك الخاص أو انضم لشركة. اشتراك شهري واضح بدون عمولات خفية.',
              },
              {
                icon: <Store className="h-6 w-6" />,
                title: 'لوحة تحكم للشركات',
                desc: 'أضف موظفينك، تابع الطلبات، وادفع اشتراكاً واحداً يغطي الجميع.',
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: 'ثلاث أنواع حسابات',
                desc: 'مستخدم، سائق، وشركة — كل واحد له تجربة ولوحة تحكم مخصصة.',
              },
              {
                icon: <Smartphone className="h-6 w-6" />,
                title: 'ويب + موبايل',
                desc: 'استخدم المنصة من المتصفح أو من تطبيق iOS و Android قريباً.',
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'دفع آمن واشتراكات',
                desc: 'نظام اشتراكات شهري بسيط: 35 ₪ للسائق، 30 ₪ للشركة + 15 ₪ لكل موظف.',
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: 'سرعة وكفاءة',
                desc: 'واجهة سريعة، تصميم نظيف، وتجربة مستخدم مريحة باللغة العربية.',
              },
            ].map((f) => (
              <div key={f.title} className="card group hover:border-brand-200 transition-all hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-surface-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-surface-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-surface-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-surface-900">أسعار واضحة</h2>
            <p className="mt-3 text-surface-600">بدون عمولات مخفية. ادفع شهرياً واستمتع.</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {/* User - Free */}
            <div className="card relative transition-all hover:-translate-y-1">
              <div className="badge-brand absolute -top-3 left-1/2 -translate-x-1/2">
                مجاني
              </div>
              <h3 className="mt-2 text-xl font-bold">مستخدم</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">0</span>
                <span className="text-surface-500"> ₪ / شهر</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-surface-600">
                {['طلب توصيل سهل', 'تتبع الطلب مباشرة', 'تقييم السائق', 'دعم فني'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-500" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Link to="/register?role=user" className="mt-8 block">
                <Button variant="secondary" className="w-full">
                  سجّل كمستخدم
                </Button>
              </Link>
            </div>

            {/* Driver */}
            <div className="card relative border-2 border-brand-400 shadow-brand transition-all hover:-translate-y-1">
              <div className="badge-brand absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white">
                الأكثر طلباً
              </div>
              <h3 className="mt-2 text-xl font-bold">سائق مستقل</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-brand-600">
                  {PRICING.DRIVER_INDEPENDENT}
                </span>
                <span className="text-surface-500"> ₪ / شهر</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-surface-600">
                {[
                  'استلام طلبات مباشرة',
                  'خريطة حية',
                  'محفظة إلكترونية',
                  'تقارير أرباح',
                  'دعم أولوية',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register?role=driver" className="mt-8 block">
                <Button className="w-full">انضم كسائق</Button>
              </Link>
            </div>

            {/* Company */}
            <div className="card relative transition-all hover:-translate-y-1">
              <h3 className="mt-2 text-xl font-bold">شركة / مصلحة</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">{PRICING.COMPANY_BASE}</span>
                <span className="text-surface-500"> ₪ / شهر</span>
                <p className="mt-1 text-sm text-surface-500">
                  + {PRICING.COMPANY_PER_EMPLOYEE} ₪ لكل موظف
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-surface-600">
                {[
                  'إدارة موظفين وسائقين',
                  'لوحة تحكم متقدمة',
                  'تقارير مبيعات',
                  'فوترة مركزية',
                  'دعم مخصص',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register?role=company" className="mt-8 block">
                <Button variant="secondary" className="w-full">
                  سجّل شركتك
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - FIXED BUTTON */}
      <section className="bg-brand-500 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-3xl font-bold">جاهز تبدأ؟</h2>
          <p className="mt-3 text-brand-100">
            انضم لآلاف السائقين والشركات اللي بيثقوا بطلبي
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button size="lg" variant="white">
              سجّل حسابك الآن
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-surface-500">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
              ط
            </div>
            <span className="font-bold text-surface-800">طلبي</span>
          </div>
          <p>© 2026 طلبي. جميع الحقوق محفوظة. صُنع في فلسطين 🇵🇸</p>
        </div>
      </footer>
    </div>
  )
}
