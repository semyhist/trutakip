# TRÜ Devamsızlık Takip

Bilgisayar mühendisliği öğrencileri için devamsızlık ve not takip uygulaması.

## Kurulum

Gerekli paketleri yükle:
```bash
npm install
```

Firebase ayarlarını `src/firebase.js` dosyasından düzenle.

Uygulamayı başlat:
```bash
npm start
```

## Özellikler

- Devamsızlık takibi (%30 hakkı)
- Not hesaplama (Vize %40 + Final %60)
- Haftalık ders programı
- GPA hesaplama
- Dark/Light tema

## Ders Programı

| Gün | Ders | Saat |
|-----|------|------|
| Salı | Matematik I | 10:00-12:00 |
| Salı | İş Sağlığı | 15:00-17:00 |
| Çarşamba | Matematik I | 10:00-12:00 |
| Çarşamba | Genel Fizik | 15:00-17:00 |
| Perşembe | Bilg. Müh. Giriş | 13:00-15:00 |
| Perşembe | İngilizce I | 15:00-17:00 |
| Cuma | Bilgisayarın Temelleri | 09:00-12:00 |
| Cuma | Yapısal Programlama | 13:00-16:00 |

## Kullanım

1. Kayıt ol veya giriş yap
2. İlk kayıtta mevcut devamsızlıklarını gir
3. Devamsızlık ekle/çıkar
4. Notlarını gir ve ortalamanı gör

## Teknolojiler

- React 18
- Material-UI
- Firebase
- Emotion

## Not Sistemi

```
Ortalama = (Vize × 0.4) + (Final × 0.6)
```

Harf notları:
- AA: 90-100 (4.0)
- BA: 85-89 (3.5)
- BB: 80-84 (3.0)
- CB: 75-79 (2.5)
- CC: 70-74 (2.0)
- DC: 65-69 (1.5)
- DD: 60-64 (1.0)
- FD: 50-59 (0.5)
- FF: 0-49 (0.0)

## Devamsızlık Hesabı

```
Toplam Saat = Haftalık Saat × 14 hafta
Devamsızlık Hakkı = Toplam Saat × 0.30
```

Örnek:
- Matematik I: 4 saat/hafta × 14 = 56 saat
- Hak: 56 × 0.30 = 17 saat

## Lisans

MIT

---

TRÜ resmi yönetmeliklerine uygun olarak hazırlanmıştır.
