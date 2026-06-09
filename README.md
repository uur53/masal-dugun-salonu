# Masal Düğün Salonu - Tanıtım ve Randevu Takip Sistemi

Bu proje, Masal Düğün Salonu için hazırlanmış bir tanıtım ve randevu takip sistemidir. Proje Next.js (JavaScript), Tailwind CSS, SQLite ve Prisma ORM kullanılarak geliştirilmiştir.

## Özellikler
- Giriş sayfası (tanıtım)
- Kullanıcı kayıt, giriş, çıkış, profil yönetimi
- Rol tabanlı erişim (Admin & Normal Kullanıcı)
- Admin paneli (kullanıcı yönetimi, özel işlemler)
- Mesajlaşma sistemi
- En az 5 ilişkili tablo (kullanıcı, salon, rezervasyon, mesaj, etkinlik)

## Kurulum
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Teknolojiler
- Next.js (App Router, JavaScript)
- Tailwind CSS
- SQLite
- Prisma ORM

## Notlar
- Proje gereksinimlerine uygun olarak middleware ile rol tabanlı erişim sağlanacaktır.
- Tüm kullanıcı işlemleri ve admin paneli güvenli şekilde tasarlanacaktır.

