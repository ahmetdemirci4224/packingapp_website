import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner Bölümü */}
      <div className="relative w-full h-[400px] bg-gray-900">
        <img 
          src="/dempa-arkaplan.jpeg" 
          alt="Dempa Ambalaj Dükkan" 
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      
      {/* Geleceğin Ambalaj Çözümleri Bölümü */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Geleceğin Ambalaj Çözümleri
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            İşletmeniz için doğa dostu, dayanıklı ve size özel tasarlanmış karton kutular, kargo poşetleri ve ambalaj malzemeleri üretiyoruz.
          </p>
          <Link 
            to="/urunler" 
            className="inline-block bg-[#1e3a8a] hover:bg-[#1e40af] transition-colors text-white font-bold text-lg px-8 py-4 rounded-md shadow-lg"
          >
            Ürünlerimizi İnceleyin
          </Link>
        </div>
      </div>

      {/* Hakkımızda / Kurumsal Bölümü */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Biz Kimiz?</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Dempa Ambalaj olarak 20 yılı aşkın süredir Türkiye'nin dört bir yanındaki e-ticaret sitelerine, kargo şirketlerine ve perakende markalarına yüksek kaliteli ambalaj hizmeti sunuyoruz.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Modern üretim tesislerimizde geri dönüştürülebilir malzemeler kullanarak doğayı koruyor, aynı zamanda işletmelerin maliyetlerini düşüren akılcı çözümler üretiyoruz. Güvenilir, hızlı ve sağlam teslimat en büyük ilkemizdir.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <span className="block text-3xl font-bold text-[#1e3a8a] mb-1">50M+</span>
                <span className="text-gray-500 text-sm font-medium">Üretilen Kutu</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <span className="block text-3xl font-bold text-[#1e3a8a] mb-1">10K+</span>
                <span className="text-gray-500 text-sm font-medium">Mutlu Müşteri</span>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <img 
              src="/dempa-arkaplan.jpeg" 
              alt="Dempa Ambalaj Mağaza" 
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* İletişim Bölümü */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">İletişime Geçin</h2>
            <p className="text-gray-500 mt-3">Sorularınız ve toplu siparişleriniz için bize ulaşın.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#1e3a8a] bg-opacity-10 text-[#1e3a8a] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adres</h3>
              <p className="text-gray-600">Hanaybaşı Mahallesi Alemdar Caddesi No:83/a</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#1e3a8a] bg-opacity-10 text-[#1e3a8a] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-gray-600">0538 031 62 80<br />Hafta içi 09:00 - 18:00</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#1e3a8a] bg-opacity-10 text-[#1e3a8a] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">E-Posta</h3>
              <p className="text-gray-600">info@dempaambalaj.com<br />satis@dempaambalaj.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;