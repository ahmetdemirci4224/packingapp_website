import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/urunler?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-28 md:h-36 gap-4 md:gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1">
            <img src="/dempa-logo.jpeg" alt="Dempa Ambalaj Logo" className="h-20 md:h-28 w-auto object-contain" />
          </Link>

          {/* Search Bar - Middle */}
          <div className="hidden md:flex flex-grow max-w-3xl relative">
            <form onSubmit={handleSearch} className="w-full relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Aradığınız ürün, kategori veya markayı yazınız" 
                className="w-full bg-gray-100 text-gray-800 rounded-md py-2.5 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/50 focus:bg-white border border-transparent focus:border-[#1e3a8a] transition-all"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 text-[#1e3a8a]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </form>
          </div>

          {/* Right Menu Icons */}
          <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
            <Link to="/urunler" className="hidden md:flex flex-col items-center text-gray-600 hover:text-[#1e3a8a] transition-colors group">
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              <span className="text-xs font-semibold">Tüm Ürünler</span>
            </Link>

            {isAdmin ? (
              <div className="flex gap-2 md:gap-6 items-center">
                <Link to="/admin" className="flex flex-col items-center text-gray-600 hover:text-[#1e3a8a] transition-colors group">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span className="text-xs font-semibold hidden md:block">Admin Paneli</span>
                </Link>
                <button onClick={handleLogout} className="flex flex-col items-center text-red-600 hover:text-red-800 transition-colors group">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  <span className="text-xs font-semibold hidden md:block">Çıkış Yap</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col items-center text-gray-600 hover:text-[#1e3a8a] transition-colors group">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <span className="text-xs font-semibold hidden md:block">Giriş Yap</span>
              </Link>
            )}
          </div>

        </div>

        {/* Mobile Search Bar (Visible only on small screens) */}
        <div className="md:hidden pb-3 relative">
          <form onSubmit={handleSearch} className="w-full relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün, kategori veya marka ara" 
              className="w-full bg-gray-100 text-gray-800 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] text-sm border border-transparent"
            />
            <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 text-[#1e3a8a]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;