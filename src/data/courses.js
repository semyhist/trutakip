export const courses = {
  math: { 
    name: 'Matematik I', 
    weeklyHours: 4, 
    totalHours: 60, 
    limit: 18,
    credit: 4.0,
    schedule: [
      { day: 'tuesday', time: '10:00-12:00', hours: 2 },
      { day: 'wednesday', time: '10:00-12:00', hours: 2 }
    ]
  },
  physics: { 
    name: 'Genel Fizik', 
    weeklyHours: 4, 
    totalHours: 60, 
    limit: 18,
    credit: 3.5,
    schedule: [
      { day: 'tuesday', time: '08:00-10:00', hours: 2 },
      { day: 'wednesday', time: '15:00-17:00', hours: 2 }
    ]
  },
  safety: { 
    name: 'İş Sağlığı Güvenliği', 
    weeklyHours: 2, 
    totalHours: 30, 
    limit: 9,
    credit: 2.0,
    schedule: [
      { day: 'tuesday', time: '15:00-17:00', hours: 2 }
    ]
  },
  intro: { 
    name: 'Bilgisayar Mühendisliğine Giriş', 
    weeklyHours: 2, 
    totalHours: 30, 
    limit: 9,
    credit: 2.0,
    schedule: [
      { day: 'thursday', time: '13:00-15:00', hours: 2 }
    ]
  },
  english: { 
    name: 'İngilizce I', 
    weeklyHours: 2, 
    totalHours: 30, 
    limit: 9,
    credit: 2.0,
    schedule: [
      { day: 'thursday', time: '15:00-17:00', hours: 2 }
    ]
  },
  basics: { 
    name: 'Bilgisayarın Temelleri', 
    weeklyHours: 3, 
    totalHours: 45, 
    limit: 14,
    credit: 3.0,
    schedule: [
      { day: 'friday', time: '09:00-12:00', hours: 3 }
    ]
  },
  programming: { 
    name: 'Yapısal Programlama', 
    weeklyHours: 3, 
    totalHours: 45, 
    limit: 9,
    credit: 2.5,
    schedule: [
      { day: 'friday', time: '13:00-16:00', hours: 3 }
    ]
  },
  turkish: {
    name: 'Türk Dili I',
    weeklyHours: 0,
    totalHours: 0,
    limit: 0,
    credit: 2.0,
    schedule: [],
    isOnline: true
  },
  ataturk: {
    name: 'Atatürk İlkeleri ve İnkılap Tarihi I',
    weeklyHours: 0,
    totalHours: 0,
    limit: 0,
    credit: 2.0,
    schedule: [],
    isOnline: true
  }
};

export const dayNames = {
  monday: 'Pazartesi',
  tuesday: 'Salı',
  wednesday: 'Çarşamba', 
  thursday: 'Perşembe',
  friday: 'Cuma'
};

export const onlineCourses = ['turkish', 'ataturk'];

export const semesterStart = new Date('2025-09-22');
export const semesterEnd = new Date('2026-01-02');
