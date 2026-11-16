/**
 * مناطق الضفة الغربية - محافظات + مدن + قرى رئيسية
 * للاستخدام في اختيار المنطقة و"وجهتي"
 */

export type Region = {
  id: string
  name: string
  nameEn: string
  type: 'governorate' | 'city' | 'village'
  parentId?: string // للمحافظة
}

export const governorates: Region[] = [
  { id: 'jenin', name: 'جنين', nameEn: 'Jenin', type: 'governorate' },
  { id: 'tubas', name: 'طوباس', nameEn: 'Tubas', type: 'governorate' },
  { id: 'tulkarm', name: 'طولكرم', nameEn: 'Tulkarm', type: 'governorate' },
  { id: 'nablus', name: 'نابلس', nameEn: 'Nablus', type: 'governorate' },
  { id: 'qalqilya', name: 'قلقيلية', nameEn: 'Qalqilya', type: 'governorate' },
  { id: 'salfit', name: 'سلفيت', nameEn: 'Salfit', type: 'governorate' },
  { id: 'ramallah', name: 'رام الله والبيرة', nameEn: 'Ramallah & Al-Bireh', type: 'governorate' },
  { id: 'jericho', name: 'أريحا والأغوار', nameEn: 'Jericho', type: 'governorate' },
  { id: 'jerusalem', name: 'القدس', nameEn: 'Jerusalem', type: 'governorate' },
  { id: 'bethlehem', name: 'بيت لحم', nameEn: 'Bethlehem', type: 'governorate' },
  { id: 'hebron', name: 'الخليل', nameEn: 'Hebron', type: 'governorate' },
]

export const citiesAndVillages: Region[] = [
  // جنين
  { id: 'jenin-city', name: 'جنين', nameEn: 'Jenin', type: 'city', parentId: 'jenin' },
  { id: 'qabatiya', name: 'قباطية', nameEn: 'Qabatiya', type: 'city', parentId: 'jenin' },
  { id: 'yaabad', name: 'يعبد', nameEn: "Ya'bad", type: 'city', parentId: 'jenin' },
  { id: 'yamun', name: 'اليامون', nameEn: 'Al-Yamun', type: 'city', parentId: 'jenin' },
  { id: 'burqin', name: 'برقين', nameEn: 'Burqin', type: 'village', parentId: 'jenin' },
  { id: 'silat-harithiya', name: 'سيلة الحارثية', nameEn: 'Silat al-Harithiya', type: 'village', parentId: 'jenin' },
  { id: 'meithalun', name: 'ميثلون', nameEn: 'Meithalun', type: 'village', parentId: 'jenin' },

  // طوباس
  { id: 'tubas-city', name: 'طوباس', nameEn: 'Tubas', type: 'city', parentId: 'tubas' },
  { id: 'tammun', name: 'طمون', nameEn: 'Tammun', type: 'city', parentId: 'tubas' },
  { id: 'aqaba', name: 'عقبة', nameEn: 'Aqaba', type: 'village', parentId: 'tubas' },

  // طولكرم
  { id: 'tulkarm-city', name: 'طولكرم', nameEn: 'Tulkarm', type: 'city', parentId: 'tulkarm' },
  { id: 'anabta', name: 'عنبتا', nameEn: 'Anabta', type: 'city', parentId: 'tulkarm' },
  { id: 'balaa', name: 'بلعا', nameEn: "Bala'a", type: 'city', parentId: 'tulkarm' },
  { id: 'beit-lid', name: 'بيت ليد', nameEn: 'Beit Lid', type: 'village', parentId: 'tulkarm' },
  { id: 'deir-ghusun', name: 'دير الغصون', nameEn: 'Deir al-Ghusun', type: 'village', parentId: 'tulkarm' },

  // نابلس
  { id: 'nablus-city', name: 'نابلس', nameEn: 'Nablus', type: 'city', parentId: 'nablus' },
  { id: 'huwara', name: 'حوارا', nameEn: 'Huwara', type: 'city', parentId: 'nablus' },
  { id: 'beita', name: 'بيتا', nameEn: 'Beita', type: 'city', parentId: 'nablus' },
  { id: 'asira', name: 'عصيرة الشمالية', nameEn: 'Asira al-Shamaliya', type: 'city', parentId: 'nablus' },
  { id: 'beir-furik', name: 'بيت فوريك', nameEn: 'Beit Furik', type: 'village', parentId: 'nablus' },
  { id: 'aqraba', name: 'عقربا', nameEn: 'Aqraba', type: 'village', parentId: 'nablus' },

  // قلقيلية
  { id: 'qalqilya-city', name: 'قلقيلية', nameEn: 'Qalqilya', type: 'city', parentId: 'qalqilya' },
  { id: 'habla', name: 'حبلة', nameEn: 'Habla', type: 'village', parentId: 'qalqilya' },
  { id: 'jayyus', name: 'جيوس', nameEn: 'Jayyus', type: 'village', parentId: 'qalqilya' },

  // سلفيت
  { id: 'salfit-city', name: 'سلفيت', nameEn: 'Salfit', type: 'city', parentId: 'salfit' },
  { id: 'bidya', name: 'بديا', nameEn: 'Bidya', type: 'city', parentId: 'salfit' },
  { id: 'kafr-dik', name: 'كفر الديك', nameEn: 'Kafr ad-Dik', type: 'village', parentId: 'salfit' },

  // رام الله والبيرة
  { id: 'ramallah-city', name: 'رام الله', nameEn: 'Ramallah', type: 'city', parentId: 'ramallah' },
  { id: 'bireh', name: 'البيرة', nameEn: 'Al-Bireh', type: 'city', parentId: 'ramallah' },
  { id: 'beitunia', name: 'بيتونيا', nameEn: 'Beitunia', type: 'city', parentId: 'ramallah' },
  { id: 'birzeit', name: 'بيرزيت', nameEn: 'Birzeit', type: 'city', parentId: 'ramallah' },
  { id: 'silwad', name: 'سلواد', nameEn: 'Silwad', type: 'village', parentId: 'ramallah' },
  { id: 'deir-dibwan', name: 'دير دبوان', nameEn: 'Deir Dibwan', type: 'village', parentId: 'ramallah' },
  { id: 'abu-qash', name: 'أبو قش', nameEn: 'Abu Qash', type: 'village', parentId: 'ramallah' },

  // أريحا
  { id: 'jericho-city', name: 'أريحا', nameEn: 'Jericho', type: 'city', parentId: 'jericho' },
  { id: 'aqbat-jaber', name: 'عقبة جبر', nameEn: 'Aqbat Jaber', type: 'village', parentId: 'jericho' },

  // القدس
  { id: 'abu-dis', name: 'أبو ديس', nameEn: 'Abu Dis', type: 'city', parentId: 'jerusalem' },
  { id: 'al-eizariya', name: 'العيزرية', nameEn: 'Al-Eizariya', type: 'city', parentId: 'jerusalem' },
  { id: 'biddu', name: 'بدو', nameEn: 'Biddu', type: 'village', parentId: 'jerusalem' },
  { id: 'beit-hanina', name: 'بيت حنينا', nameEn: 'Beit Hanina', type: 'village', parentId: 'jerusalem' },
  { id: 'qalandiya', name: 'قلنديا', nameEn: 'Qalandiya', type: 'village', parentId: 'jerusalem' },

  // بيت لحم
  { id: 'bethlehem-city', name: 'بيت لحم', nameEn: 'Bethlehem', type: 'city', parentId: 'bethlehem' },
  { id: 'beit-jala', name: 'بيت جالا', nameEn: 'Beit Jala', type: 'city', parentId: 'bethlehem' },
  { id: 'beit-sahour', name: 'بيت ساحور', nameEn: 'Beit Sahour', type: 'city', parentId: 'bethlehem' },
  { id: 'doha', name: 'الدوحة', nameEn: 'Al-Dawha', type: 'city', parentId: 'bethlehem' },
  { id: 'al-khader', name: 'الخضر', nameEn: 'Al-Khader', type: 'village', parentId: 'bethlehem' },
  { id: 'battir', name: 'بتير', nameEn: 'Battir', type: 'village', parentId: 'bethlehem' },

  // الخليل
  { id: 'hebron-city', name: 'الخليل', nameEn: 'Hebron', type: 'city', parentId: 'hebron' },
  { id: 'yatta', name: 'يطا', nameEn: 'Yatta', type: 'city', parentId: 'hebron' },
  { id: 'dura', name: 'دورا', nameEn: 'Dura', type: 'city', parentId: 'hebron' },
  { id: 'halhul', name: 'حلحول', nameEn: 'Halhul', type: 'city', parentId: 'hebron' },
  { id: 'dhahiriya', name: 'الظاهرية', nameEn: 'Ad-Dhahiriya', type: 'city', parentId: 'hebron' },
  { id: 'sair', name: 'سعير', nameEn: "Sa'ir", type: 'city', parentId: 'hebron' },
  { id: 'bani-naim', name: 'بني نعيم', nameEn: "Bani Na'im", type: 'city', parentId: 'hebron' },
  { id: 'idna', name: 'إذنا', nameEn: 'Idhna', type: 'village', parentId: 'hebron' },
  { id: 'surif', name: 'صوريف', nameEn: 'Surif', type: 'village', parentId: 'hebron' },
  { id: 'tarqumiya', name: 'ترقوميا', nameEn: 'Tarqumiyah', type: 'village', parentId: 'hebron' },
]

export const allRegions = [...governorates, ...citiesAndVillages]

export function getCitiesByGovernorate(govId: string) {
  return citiesAndVillages.filter((r) => r.parentId === govId)
}

export function getGovernorateName(id: string) {
  return governorates.find((g) => g.id === id)?.name || ''
}
