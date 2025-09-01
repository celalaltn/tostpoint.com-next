'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    const branchesButton = document.getElementById('branches-button');
    const branchesSection = document.getElementById('branches-section');
    
    if (branchesButton && branchesSection) {
      branchesButton.addEventListener('click', function(e) {
        e.preventDefault();
        branchesSection.hidden = false;
        branchesSection.classList.toggle('active');
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>TostPoint - Türkiye&apos;nin En Lezzetli Tost Franchise&apos;ı | Samsun&apos;dan Tüm Türkiye&apos;ye</title>
        <meta name="title" content="TostPoint - Türkiye'nin En Lezzetli Tost Franchise'ı | Samsun'dan Tüm Türkiye'ye" />
        <meta name="description" content="2016'dan beri kaliteli ve farklı tostlar üretiyoruz. Samsun, İzmir, Ankara, Ordu ve Rize'de 8 franchise noktamızla hizmet veriyoruz. TostPoint franchise fırsatları için iletişime geçin." />
        <meta name="keywords" content="tostpoint, tost, franchise, samsun, türkiye, lezzet, kaliteli tost, franchise fırsatları, tost franchise, restoran franchise" />
        <meta name="author" content="TostPoint" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tostpoint.com/" />
        <meta property="og:title" content="TostPoint - Türkiye'nin En Lezzetli Tost Franchise'ı" />
        <meta property="og:description" content="2016'dan beri kaliteli ve farklı tostlar üretiyoruz. Samsun, İzmir, Ankara, Ordu ve Rize'de 8 franchise noktamızla hizmet veriyoruz." />
        <meta property="og:image" content="https://tostpoint.com/tostpoint.png" />
        <meta property="og:image:alt" content="TostPoint Logo" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="TostPoint" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tostpoint.com/" />
        <meta property="twitter:title" content="TostPoint - Türkiye'nin En Lezzetli Tost Franchise'ı" />
        <meta property="twitter:description" content="2016'dan beri kaliteli ve farklı tostlar üretiyoruz. Samsun, İzmir, Ankara, Ordu ve Rize'de 8 franchise noktamızla hizmet veriyoruz." />
        <meta property="twitter:image" content="https://tostpoint.com/tostpoint.png" />
        
        <link rel="icon" type="image/png" href="/tostpoint.png" />
        <link rel="apple-touch-icon" href="/tostpoint.png" />
        
        <link rel="preload" href="/fonts/fonnts.com-Capitana_Bold.otf" as="font" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/tostpoint.png" as="image" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "TostPoint",
              "description": "Türkiye'nin en lezzetli tost franchise'ı. 2016'dan beri kaliteli ve farklı tostlar üretiyoruz.",
              "url": "https://tostpoint.com",
              "logo": "https://tostpoint.com/tostpoint.png",
              "foundingDate": "2016",
              "founder": {
                "@type": "Organization",
                "name": "TostPoint"
              },
              "servesCuisine": "Turkish",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "TR",
                "addressRegion": "Türkiye"
              },
              "areaServed": [
                { "@type": "City", "name": "Samsun" },
                { "@type": "City", "name": "İzmir" },
                { "@type": "City", "name": "Ankara" },
                { "@type": "City", "name": "Ordu" },
                { "@type": "City", "name": "Rize" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Franchise Fırsatları",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "TostPoint Franchise"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="container">
        <header className="logo-section">
          <Image src="/tostpoint.png" alt="TostPoint - Türkiye'nin En Lezzetli Tost Franchise'ı Logo" className="logo" width={120} height={120} priority />
        </header>
        
        <main className="description" role="main">
          <p>2016&apos;da Samsun&apos;da kaliteli ve farklı tostlar üretme hedefiyle çıktığımız yolda, en büyük gücümüz siz oldunuz. Yoğun ilginiz sayesinde TostPoint lezzetini franchise sistemiyle yeni şehirlere taşıyoruz.</p>
          <p>Samsun, İzmir, Ankara, Ordu ve Rize&apos;deki toplam 8 franchise noktamızla, bu tadı tüm Türkiye ile buluşturmak için sabırsızlanıyoruz.</p>
        </main>
        
        <nav className="navigation" role="navigation" aria-label="Ana Menü">
          <a href="https://tostpoint.dijital10.com/" className="nav-button" aria-label="Menümüzü görüntüle">Menü</a>
          <a href="https://tostpoint.com/" className="nav-button" aria-label="Web sitemizi ziyaret et">Web Sitesi</a>
          <a href="tel:+908507551919" className="nav-button" aria-label="İletişim bilgilerimiz">İletişim</a>
          <a href="https://instagram.com/tostpoint" className="nav-button" aria-label="Instagram sayfamızı ziyaret et" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@tostpoint" className="nav-button" aria-label="TikTok sayfamızı ziyaret et" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.facebook.com/share/19w2hDJJix/?mibextid=wwXIfr" className="nav-button" aria-label="Facebook sayfamızı ziyaret et" target="_blank" rel="noopener noreferrer">Facebook</a>
          <div className="branches-container">
            <a href="#" id="branches-button" className="nav-button" aria-label="Şubelerimizi görüntüle">Şubeler</a>
            <section id="branches-section" className="branches-section" aria-labelledby="branches-heading" hidden>
              <h2 id="branches-heading" className="visually-hidden">Şubelerimiz</h2>
              <ul>
                <li>Samsun/Atakent</li>
                <li>Samsun/56&apos;lar</li>
                <li>İzmir/Bayraklı</li>
                <li>İzmir/Menemen</li>
                <li>İzmir/Karşıyaka</li>
                <li>Ankara/Bahçeli</li>
                <li>Ordu/Durugöl</li>
                <li>Rize/Merkez</li>
              </ul>
            </section>
          </div>
          <a href="/franchise-viewer" className="nav-button" aria-label="Franchise dosyasını görüntüle">Franchise Dosyası</a>
        </nav>
      </div>
    </>
  );
}
