/** نظام المناطق — فلسطين فقط حالياً */

export type LocationLevel = {
  id: string
  name: string
  neighborhoods?: string[]
}

export type GovernorateLocations = {
  id: string
  name: string
  cities: LocationLevel[]
}

export const COUNTRY = { id: 'palestine', name: 'فلسطين' }

export const locations: GovernorateLocations[] = [
  {
    id: 'ramallah',
    name: 'رام الله والبيرة',
    cities: [
      {
        id: 'ramallah-city',
        name: 'رام الله',
        neighborhoods: [
          'رام الله التحتا',
          'حارة القديرة',
          'حارة جريس',
          'حارة الشقرة',
          'عين مصباح',
          'الطيرة',
          'الماصيون',
          'الإرسال',
          'البالوع',
          'عين منجد',
          'أم الشرايط',
          'الطيرة الجديدة',
          'شارع القدس',
          'الكولونية',
        ],
      },
      {
        id: 'bireh',
        name: 'البيرة',
        neighborhoods: [
          'وسط البلد',
          'الأمعري',
          'الجلزون',
          'أم الشرايط',
          'البالوع',
          'عين يبرود',
          'شارع نابلس',
        ],
      },
      {
        id: 'beitunia',
        name: 'بيتونيا',
        neighborhoods: ['وسط بيتونيا', 'الحي الشرقي', 'الحي الغربي', 'قرب الجامعة'],
      },
      {
        id: 'birzeit',
        name: 'بيرزيت',
        neighborhoods: ['وسط بيرزيت', 'قرب الجامعة', 'الحي القديم'],
      },
      { id: 'silwad', name: 'سلواد', neighborhoods: ['وسط سلواد', 'الحي الشرقي'] },
      { id: 'deir-dibwan', name: 'دير دبوان', neighborhoods: ['وسط البلد'] },
      { id: 'abu-qash', name: 'أبو قش', neighborhoods: ['وسط القرية'] },
      { id: 'surda', name: 'سردا', neighborhoods: ['وسط سردا'] },
      { id: 'jifna', name: 'جفنا', neighborhoods: ['وسط جفنا'] },
      { id: 'abud', name: 'عابود', neighborhoods: ['وسط عابود'] },
    ],
  },
  {
    id: 'nablus',
    name: 'نابلس',
    cities: [
      {
        id: 'nablus-city',
        name: 'نابلس',
        neighborhoods: [
          'البلدة القديمة',
          'راس العين',
          'الجبل الشمالي',
          'الجبل الجنوبي',
          'المخفية',
          'رفيديا',
          'العين',
          'حي المأمون',
          'شارع فيصل',
          'دوار الساعة',
          'بلاطة',
          'عسكر',
        ],
      },
      { id: 'huwara', name: 'حوارا', neighborhoods: ['وسط حوارا', 'الشارع الرئيسي'] },
      { id: 'beita', name: 'بيتا', neighborhoods: ['وسط بيتا'] },
      { id: 'asira', name: 'عصيرة الشمالية', neighborhoods: ['وسط عصيرة'] },
      { id: 'beit-furik', name: 'بيت فوريك', neighborhoods: ['وسط البلد'] },
    ],
  },
  {
    id: 'hebron',
    name: 'الخليل',
    cities: [
      {
        id: 'hebron-city',
        name: 'الخليل',
        neighborhoods: [
          'البلدة القديمة',
          'الحرم الإبراهيمي',
          'عين سارة',
          'الحي الجديد',
          'واد التفاح',
          'رأس الجورة',
          'باب الزاوية',
          'الجلدة',
          'الشفاء',
        ],
      },
      { id: 'yatta', name: 'يطا', neighborhoods: ['وسط يطا', 'الحي الشرقي'] },
      { id: 'dura', name: 'دورا', neighborhoods: ['وسط دورا'] },
      { id: 'halhul', name: 'حلحول', neighborhoods: ['وسط حلحول'] },
      { id: 'sair', name: 'سعير', neighborhoods: ['وسط سعير'] },
      { id: 'bani-naim', name: 'بني نعيم', neighborhoods: ['وسط بني نعيم'] },
      { id: 'dhahiriya', name: 'الظاهرية', neighborhoods: ['وسط الظاهرية'] },
    ],
  },
  {
    id: 'jenin',
    name: 'جنين',
    cities: [
      {
        id: 'jenin-city',
        name: 'جنين',
        neighborhoods: ['وسط جنين', 'مخيم جنين', 'الحي الشرقي', 'الحي الغربي', 'الشارع الرئيسي'],
      },
      { id: 'qabatiya', name: 'قباطية', neighborhoods: ['وسط قباطية'] },
      { id: 'yaabad', name: 'يعبد', neighborhoods: ['وسط يعبد'] },
      { id: 'yamun', name: 'اليامون', neighborhoods: ['وسط اليامون'] },
    ],
  },
  {
    id: 'bethlehem',
    name: 'بيت لحم',
    cities: [
      {
        id: 'bethlehem-city',
        name: 'بيت لحم',
        neighborhoods: ['البلدة القديمة', 'المهد', 'بيت جالا', 'بيت ساحور', 'الدوحة'],
      },
      { id: 'beit-jala', name: 'بيت جالا', neighborhoods: ['وسط بيت جالا'] },
      { id: 'beit-sahour', name: 'بيت ساحور', neighborhoods: ['وسط بيت ساحور'] },
      { id: 'doha', name: 'الدوحة', neighborhoods: ['وسط الدوحة'] },
    ],
  },
  {
    id: 'tulkarm',
    name: 'طولكرم',
    cities: [
      {
        id: 'tulkarm-city',
        name: 'طولكرم',
        neighborhoods: ['وسط طولكرم', 'الحي الشرقي', 'الحي الغربي', 'شارع نابلس'],
      },
      { id: 'anabta', name: 'عنبتا', neighborhoods: ['وسط عنبتا'] },
      { id: 'balaa', name: 'بلعا', neighborhoods: ['وسط بلعا'] },
    ],
  },
  {
    id: 'qalqilya',
    name: 'قلقيلية',
    cities: [
      {
        id: 'qalqilya-city',
        name: 'قلقيلية',
        neighborhoods: ['وسط قلقيلية', 'الحي الشرقي'],
      },
    ],
  },
  {
    id: 'salfit',
    name: 'سلفيت',
    cities: [
      { id: 'salfit-city', name: 'سلفيت', neighborhoods: ['وسط سلفيت'] },
      { id: 'bidya', name: 'بديا', neighborhoods: ['وسط بديا'] },
    ],
  },
  {
    id: 'jericho',
    name: 'أريحا والأغوار',
    cities: [
      {
        id: 'jericho-city',
        name: 'أريحا',
        neighborhoods: ['وسط أريحا', 'عقبة جبر', 'عين السلطان'],
      },
    ],
  },
  {
    id: 'tubas',
    name: 'طوباس',
    cities: [
      { id: 'tubas-city', name: 'طوباس', neighborhoods: ['وسط طوباس'] },
      { id: 'tammun', name: 'طمون', neighborhoods: ['وسط طمون'] },
    ],
  },
  {
    id: 'jerusalem',
    name: 'القدس',
    cities: [
      {
        id: 'abu-dis',
        name: 'أبو ديس',
        neighborhoods: ['وسط أبو ديس', 'قرب الجامعة'],
      },
      {
        id: 'al-eizariya',
        name: 'العيزرية',
        neighborhoods: ['وسط العيزرية'],
      },
      { id: 'biddu', name: 'بدو', neighborhoods: ['وسط بدو'] },
      { id: 'beit-hanina', name: 'بيت حنينا', neighborhoods: ['بيت حنينا البلد', 'الحي الجديد'] },
    ],
  },
]

export function getCities(govId: string) {
  return locations.find((g) => g.id === govId)?.cities || []
}

export function getNeighborhoods(govId: string, cityId: string) {
  const city = getCities(govId).find((c) => c.id === cityId)
  return city?.neighborhoods || []
}
