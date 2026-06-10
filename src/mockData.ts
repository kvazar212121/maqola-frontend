import type { Article, Author } from './types';

export const mockAuthors: Record<string, Author> = {
  'anvar-sodiqov': {
    id: 'anvar-sodiqov',
    name: 'Dr. Anvar Sodiqov',
    avatar: 'AS',
    bio: 'Toshkent Axborot Texnologiyalari Universiteti professori, sun\'iy intellekt va mashinali o\'rganish bo\'yicha 15 yillik tajribaga ega tadqiqotchi.',
    role: 'Katta Ilmiy Xodim',
    institution: 'Toshkent Axborot Texnologiyalari Universiteti (TATU)',
    socialLinks: {
      github: 'https://github.com/anvarsodiqov',
      linkedin: 'https://linkedin.com/in/anvar-sodiqov',
      website: 'https://sodiqov.uz',
      email: 'a.sodiqov@tuit.uz'
    }
  },
  'shahlo-karimova': {
    id: 'shahlo-karimova',
    name: 'Shahlo Karimova',
    avatar: 'SK',
    bio: 'Iqtisodiy tadqiqotlar va islohotlar markazi tahlilchisi. Global makroiqtisodiyot va raqamli transformatsiya yo\'nalishida maqolalar muallifi.',
    role: 'Bosh Tahlilchi',
    institution: 'Iqtisodiy Tadqiqotlar Markazi',
    socialLinks: {
      twitter: 'https://twitter.com/sh_karimova',
      linkedin: 'https://linkedin.com/in/shahlo-karimova',
      email: 's.karimova@cer.uz'
    }
  },
  'nodir-alimov': {
    id: 'nodir-alimov',
    name: 'Nodir Alimov',
    avatar: 'NA',
    bio: 'Bioinformatika va gen muhandisligi laboratoriyasi mudiri. O\'zbekiston Milliy Universiteti dotsenti.',
    role: 'Laboratoriya Mudiri',
    institution: 'O\'zbekiston Milliy Universiteti (O\'zMU)',
    socialLinks: {
      github: 'https://github.com/nalimov-bio',
      website: 'https://bioinformatics.uz',
      email: 'nodir.alimov@nuu.uz'
    }
  },
  'diyor-rustamov': {
    id: 'diyor-rustamov',
    name: 'Diyor Rustamov',
    avatar: 'DR',
    bio: 'Mustaqil texnologik jurnalist va dasturiy ta\'minot arxitektori. Bulutli texnologiyalar va kiberxavfsizlik bo\'yicha maqolalar yozadi.',
    role: 'Texnologik Bloger',
    institution: 'TechReview O\'zbekiston',
    socialLinks: {
      github: 'https://github.com/diyor-rustamov',
      twitter: 'https://twitter.com/diyor_tech',
      website: 'https://techreview.uz'
    }
  }
};

export const mockArticles: Article[] = [
  {
    id: 'suniy-intellekt-tibbiyotda',
    title: 'Sun\'iy Intellekt Tizimlarining Tibbiy Diagnostikada Qo\'llanilishi va Istiqbollari',
    summary: 'Ushbu tadqiqotda neyron tarmoqlarning tibbiy rentgen va MRT tasvirlarini tahlil qilishdagi samaradorligi hamda shifokorlar ishini osonlashtirishdagi roli ko\'rib chiqiladi.',
    content: `### Kirish

So'nggi yillarda sun'iy intellekt (SI) va mashinali o'rganish texnologiyalari tibbiyot sohasida, xususan, diagnostikada keskin burilish yasadi. Tasvirlarni tanib olish algoritmlari (Convolutional Neural Networks - CNN) yordamida shifokorlarning rentgen, kompyuter tomografiyasi (KT) va MRT tasvirlarini tahlil qilish tezligi va aniqligi sezilarli darajada oshdi.

### Asosiy Qism

Tadqiqotlar shuni ko'rsatadiki, chuqur o'rganish (Deep Learning) modellari o'pka saratoni, ko'z to'r pardasi patologiyalari va pnevmoniyani 92% dan yuqori aniqlikda aniqlay oladi. Bu ko'rsatkich tajribali rentgenologlarning o'rtacha aniqlik ko'rsatkichi (89%) bilan deyarli teng yoki undan yuqori.

#### Neyron tarmoqlarning afzalliklari:
1. **Tezlik:** Bir necha soniya ichida minglab tasvirlarni skanerlash va shubhali zonalarni belgilash.
2. **Charchoqning yo'qligi:** Algoritmlar kun davomida bir xil diqqat va aniqlik bilan ishlaydi.
3. **Erta diagnostika:** Inson ko'ziga ko'rinmas bo'lgan mayda o'zgarishlarni aniqlash qobiliyati.

#### Muammolar va Cheklovlar:
* **Ma'lumotlar tanqisligi:** Sifatli, markirovka qilingan tibbiy ma'lumotlar bazasining yetishmasligi.
* **Huquqiy mas'uliyat:** Algoritm xato qilgan taqdirda yakuniy qaror va mas'uliyat shifokor zimmasida qolishi shartligi.
* **"Qora quti" effekti:** Neyron tarmoqning qanday qarorga kelganini tushuntirib bera olmasligi (Explainable AI muammosi).

### Xulosa

Sun'iy intellekt shifokorlarni butunlay almashtirmaydi, balki ularning ajralmas yordamchisiga aylanadi. Kelajakda shifokorlar va SI tizimlarining hamkorligi (human-in-the-loop) tibbiyot xizmatining sifatini yangi bosqichga olib chiqadi.`,
    author: mockAuthors['anvar-sodiqov'],
    publishedAt: '2026-05-15',
    readTime: 8,
    category: 'Ilmiy',
    tags: ['Sun\'iy Intellekt', 'Tibbiyot', 'Deep Learning', 'Sog\'liqni Saqlash'],
    views: 1420,
    likes: 312,
    featured: true,
    doi: '10.31219/osf.io/med-diag-ai-2026',
    publisher: 'O\'zbekiston Tibbiyot Jurnali',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    downloadUrl: 'https://example.com/files/ai-medicine-paper.pdf',
    externalUrl: 'https://journal.tma.uz/article/view/1234',
    citationsCount: 24
  },
  {
    id: 'raqamli-som-istiqbollari',
    title: 'Raqamli Valyutalar va O\'zbekiston Iqtisodiyotida "Raqamli So\'m" Loyihasining Iqtisodiy Tahlili',
    summary: 'Markaziy banklar raqamli valyutalari (CBDC) joriy etilishining pul-kredit siyosati, bank tizimi barqarorligi va tranzaksiya xarajatlarini kamaytirishga ta\'siri.',
    content: `### Kirish

Bugungi kunda butun dunyoda naqdsiz hisob-kitoblar ulushi ortib bormoqda. Ko'plab davlatlar o'z milliy valyutalarining raqamli versiyasini (Central Bank Digital Currency - CBDC) ishlab chiqish ustida ishlamoqda. O'zbekistonda ham "Raqamli So'm" konsepsiyasi faol muhokama qilinmoqda.

### Iqtisodiy Zaruriyat va Samara

Raqamli so'm - bu nafaqat elektron pul tizimi, balki yangi moliyaviy texnologiyalar platformasidir. Uning an'anaviy bank o'tkazmalaridan asosiy farqi - Markaziy bank tomonidan to'g'ridan-to'g'ri kafolatlanishi va "aqlli shartnomalar" (smart contracts) bilan ishlay olishidir.

#### Kutilayotgan ijobiy ta'sirlar:
* **Yashirin iqtisodiyotni qisqartirish:** Barcha tranzaksiyalarning shaffofligini oshirish va nazorat qilish imkoniyati.
* **Tranzaksiya xarajatlarini kamaytirish:** Banklararo va shaxslararo to'lovlardagi komissiyalarni minimallashtirish.
* **Moliyaviy inkluzivlik:** Internet yoki an'anaviy bank filiallari yo'q chekka hududlarda ham offline rejimda to'lovlarni amalga oshirish imkoni.

#### Xavf-xatarlar:
* **Tijorat banklarining disintermediatsiyasi:** Aholining depozitlarini tijorat banklaridan Markaziy bankdagi raqamli hamyonlarga o'tkazishi natijasida tijorat banklarida likvidlik yetishmovchiligi yuzaga kelishi.
* **Kiberxavfsizlik:** Tizimning buzib kirilishi yoki texnik nosozliklar oqibatida butun iqtisodiy to'lov tizimining to'xtab qolishi.

### Xulosa

Raqamli so'mni joriy etish bosqichma-bosqich va tijorat banklari manfaatlarini hisobga olgan holda amalga oshirilishi lozim. Bu texnologiya mamlakat moliyaviy infratuzilmasini modernizatsiya qilish va xalqaro iqtisodiy aloqalarni osonlashtirish uchun katta imkoniyatdir.`,
    author: mockAuthors['shahlo-karimova'],
    publishedAt: '2026-05-28',
    readTime: 6,
    category: 'Iqtisodiyot',
    tags: ['Fintech', 'Raqamli So\'m', 'Iqtisodiyot', 'Markaziy Bank', 'CBDC'],
    views: 890,
    likes: 145,
    featured: false,
    doi: '10.5393/cer.cbdc-uzbekistan.2026',
    publisher: 'Iqtisodiy Sharh Jurnali',
    externalUrl: 'https://review.uz/post/raqamli-som-tahlili',
    citationsCount: 8
  },
  {
    id: 'crispr-genom-tahrirlash',
    title: 'CRISPR-Cas9 Texnologiyasi Yordamida Qishloq Xo\'jaligi Ekinlarini Qurg\'oqchilikka Chidamli Qilish',
    summary: 'Genom tahrirlash texnologiyasining o\'simliklar biologiyasidagi yutuqlari va O\'zbekiston iqlim sharoitida g\'oza hamda bug\'doy hosildorligini oshirishdagi o\'rni.',
    content: `### Genom Tahrirlashning Yangi Davri

CRISPR-Cas9 - bu molekulyar biologiyadagi eng inqilobiy kashfiyotlardan biri bo'lib, olimlarga DNK zanjirining aniq joylariga o'zgartirish kiritish imkonini beradi. Global iqlim o'zgarishi va O'zbekistondagi suv tanqisligi sharoitida, ushbu texnologiya yordamida qurg'oqchilik va sho'rlanishga chidamli ekin navlarini yaratish o'ta muhim ahamiyat kasb etmoqda.

### Tadqiqot Metodologiyasi

Laboratoriyamizda bug'doyning *TaDREB2* va *TaERF1* genlarini CRISPR yordamida faollashtirish orqali o'simlikning suv yetishmovchiligiga chidamlilik darajasi 35% ga oshirilishiga erishildi. Bunda o'simlik genomiga begona gen (transgen) kiritilmaydi, faqat uning o'z genlarining ekspressiyasi boshqariladi. Bu esa olingan mahsulotlarni xavfsiz va GMO hisoblanmasligini ta'minlaydi.

#### Afzalliklari:
1. **Seleksiya tezligi:** An'anaviy chatishtirish usullari bilan 10-12 yil talab qilinadigan jarayonni 2-3 yilda bajarish.
2. **Ekologik toza:** Kimyoviy o'g'itlar va pestitsidlarga bo'lgan ehtiyojning kamayishi.
3. **Yuqori hosildorlik:** Ekstremal iqlim sharoitida ham hosil nobud bo'lishining oldini olish.

### Xulosa va Muammolar
Mamlakatimizda genom tahrirlash texnologiyalarini rivojlantirish uchun laboratoriya infratuzilmasini yaxshilash va kadrlarni tayyorlash zarur. Shuningdek, bioxavfsizlik va bioetika qoidalarini tartibga soluvchi qonunchilik bazasini yaratish dolzarb masalalardan hisoblanadi.`,
    author: mockAuthors['nodir-alimov'],
    publishedAt: '2026-06-02',
    readTime: 10,
    category: 'Ilmiy',
    tags: ['CRISPR', 'Genomika', 'Biologiya', 'Qishloq Xo\'jaligi', 'Iqlim O\'zgarishi'],
    views: 1150,
    likes: 289,
    featured: true,
    doi: '10.1016/j.plant-sci.2026.111928',
    publisher: 'O\'zbekiston Biologiya Jurnali',
    downloadUrl: 'https://example.com/files/crispr-agriculture-paper.pdf',
    citationsCount: 19
  },
  {
    id: 'bulutli-provayderlar-taqdimoti',
    title: 'Mahalliy Bulutli Infratuzilma (Cloud Providers) Rivojlanishi va Ma\'lumotlar Xavfsizligi',
    summary: 'O\'zbekistonda shaxsiy ma\'lumotlarni saqlash to\'g\'risidagi qonunchilik talablari sharoitida mahalliy bulutli xizmat ko\'rsatuvchilarning tahlili.',
    content: `### Mahalliy Bulutlar Nima Uchun Kerak?

O'zbekiston Respublikasining "Shaxsga doir ma'lumotlar to'g'risida"gi qonunining 27-1-moddasiga binoan, O'zbekiston fuqarolarining shaxsiy ma'lumotlari jismoniy jihatdan mamlakat hududida joylashgan serverlarda saqlanishi majburiydir. Bu talab ko'plab xalqaro kompaniyalar va mahalliy bizneslar uchun mustaqil, yuqori darajada himoyalangan mahalliy bulutli infratuzilmadan foydalanishni taqozo etdi.

### Bozordagi Mahalliy Yechimlar va Ularning Imkoniyatlari

So'nggi 2 yilda Uzcloud, Ucell Cloud va bir qator xususiy Tier-III ma'lumotlar markazlari faoliyatini boshladi. Ular IaaS (Infratuzilma xizmat sifatida) va PaaS (Platforma xizmat sifatida) modellarini taklif qilmoqda.

#### Solishtirma tahlil (Mahalliy vs Global):
* **Kechikish (Latency):** Mahalliy provayderlarda ping vaqti 2-5ms (AWS yoki Google Cloud'da esa 60-120ms). Bu real vaqt rejimida ishlaydigan dasturlar uchun juda muhim.
* **To'lov usuli:** Xizmatlar uchun to'lovlar milliy valyutada amalga oshiriladi, bu esa valyuta kursining o'zgarishi xavfidan (FX risk) himoya qiladi.
* **SLA (Xizmat darajasi shartnomasi):** Mahalliy texnik yordam va muammolarni joyida hal qilish tezligi yuqori.

#### Kamchiliklari:
* **Xizmatlar xilma-xilligi:** AWS yoki Azure kabi tayyor serverless yoki murakkab ma'lumotlar bazasi boshqaruvi (Managed Databases) kabi PaaS yechimlarining hali to'liq shakllanmaganligi.
* **Narx-navo:** Kichik hajmda mahalliy bulut xizmatlari global provayderlarga qaraganda qimmatroqqa tushishi mumkin.

### Xulosa

Mahalliy bulutli provayderlar jadal rivojlanmoqda va yaqin yillarda ularning sifati va taklif etayotgan xizmatlari xalqaro standartlarga yetib boradi. Bu esa mamlakatning raqamli suverenitetini ta'minlashda muhim qadamdir.`,
    author: mockAuthors['diyor-rustamov'],
    publishedAt: '2026-04-10',
    readTime: 5,
    category: 'Texnologiya',
    tags: ['Bulutli Texnologiyalar', 'Kiberxavfsizlik', 'Shaxsiy Ma\'lumotlar', 'IaaS'],
    views: 730,
    likes: 98,
    featured: false,
    publisher: 'TechReview UZ',
    externalUrl: 'https://techreview.uz/local-clouds',
    citationsCount: 1
  },
  {
    id: 'kiber-gigiyena-tavsiyalar',
    title: 'Tashkilotlarda Kiber-Gigiyena Qoidalari va Fishing Hujumlaridan Himoyalanish Usullari',
    summary: 'Zamonaviy fishing hujumlarining turlari, ularning ijtimoiy injeneriya bilan bog\'liqligi va xodimlarning xavfsizlik madaniyatini oshirish choralari.',
    content: `### Kirish

Bugungi kunda har qanday tashkilotning axborot xavfsizligi tizimidagi eng zaif bo'g'in bu — inson (xodim) omilidir. Texnik himoya vositalari qanchalik mukammal bo'lmasin, ijtimoiy injeneriya va fishing (phishing) hujumlari orqali tajovuzkorlar ichki tarmoqqa osongina kirib olishmoqda.

### Fishing Hujumlarining Zamonaviy Turlari

Hozirgi fishing hujumlari oddiy imlo xatolariga to'la xatlar emas, balki sun'iy intellekt yordamida yozilgan, aniq bir maqsadga yo'naltirilgan xabarlardir (Spear Phishing). Ular ko'pincha rahbar yoki bank nomidan keladi.

#### Fishing usullari:
1. **Email Fishing:** Soxta havolalar yoki yuklamalar yuborish.
2. **Smishing:** SMS orqali bank hisobini bloklash bilan qo'rqitib, ma'lumotlarni o'g'irlash.
3. **Vishing:** Telefon orqali o'zini xavfsizlik xodimi deb tanishtirib, SMS kodni so'rash.

### Tashkilotlar Uchun Tavsiyalar
* **Doimiy treninglar:** Xodimlarni muntazam ravishda soxta fishing hujumlari orqali tekshirish va o'qitish.
* **Multi-Faktorli Autentifikatsiya (MFA):** Parollar o'g'irlangan taqdirda ham, MFA tizimi tizimga kirishni to'xtatib qoladi.
* **Xavfsiz Pochta Shlyuzlari (SEG):** Kelayotgan xatlarni filtrlovchi intellektual tizimlardan foydalanish.

### Xulosa

Kiberxavfsizlik — bu bir martalik loyiha emas, balki doimiy jarayondir. Tashkilot xodimlarining kiber-gigiyena qoidalariga rioya qilishi hujumlar xavfini 80% gacha kamaytiradi.`,
    author: mockAuthors['diyor-rustamov'],
    publishedAt: '2026-05-10',
    readTime: 4,
    category: 'Texnologiya',
    tags: ['Kiberxavfsizlik', 'Fishing', 'MFA', 'Xavfsizlik Madaniyati'],
    views: 620,
    likes: 76,
    featured: false,
    publisher: 'Kiberxavfsizlik Markazi nashri',
    externalUrl: 'https://cyber.uz/phishing-prevention',
    citationsCount: 0
  }
];
