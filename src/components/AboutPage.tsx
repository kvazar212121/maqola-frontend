import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="app-container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', flexGrow: 1 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', color: 'var(--text-primary)', marginBottom: '24px' }}>
        Loyiha haqida
      </h1>
      <div style={{
        backgroundColor: 'var(--bg-panel)',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        lineHeight: '1.8',
        color: 'var(--text-secondary)',
        fontSize: '16px'
      }}>
        <p style={{ marginBottom: '16px' }}>
          <strong>METAMAQOLA</strong> - bu ilmiy maqolalar, nashrlar va ularning bibliografik ma'lumotlarini markazlashgan holda to'plash, saqlash va ulardan foydalanishni qulaylashtirish maqsadida yaratilgan ochiq platforma.
        </p>
        <p style={{ marginBottom: '16px' }}>
          Platforma tadqiqotchilar, talabalar va ilm-fan vakillari uchun kerakli ma'lumotlarni tez va oson topish, xalqaro DOI havolalari orqali original manbalarga o'tish imkoniyatini taqdim etadi. 
        </p>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>
          Bizning maqsadimiz
        </h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li>Ilmiy hamjamiyat uchun ishonchli ochiq ma'lumotlar bazasini yaratish</li>
          <li>O'zbekiston va xalqaro miqyosdagi ilmiy ishlarning ko'rinuvchanligini oshirish</li>
          <li>Ilmiy izlanishlar jarayonini raqamlashtirish va osonlashtirish</li>
        </ul>
        
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>
          Bog'lanish
        </h3>
        <p>
          Loyiha bo'yicha takliflar, hamkorlik masalalari yoki texnik yordam uchun biz bilan bog'laning:<br />
          <strong>Email:</strong> info@metamaqola.uz<br />
          <strong>Telefon:</strong> +998 90 123 45 67
        </p>
      </div>
    </div>
  );
};
