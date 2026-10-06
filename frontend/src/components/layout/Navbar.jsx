import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { Menu, X, Bookmark, Search } from 'lucide-react';

export default function Navbar() {
  const { t } = useLanguage();
  const { bookmarks } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/fighters', label: t('nav.fighters') },
    { to: '/archive', label: t('nav.archive') },
    { to: '/timeline', label: t('nav.timeline') },
    { to: '/articles', label: t('nav.stories') },
    { to: '/about', label: t('nav.about') },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#D6CFC7] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-13">
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-1 lg:space-x-3 overflow-x-auto py-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 font-ntr text-sm lg:text-base font-medium tracking-wide transition-colors whitespace-nowrap border-b-2 ${
                    isActive
                      ? 'text-[#781D22] border-[#781D22] bg-[#F4EFE6]/60 font-semibold'
                      : 'text-[#2E2A27] border-transparent hover:text-[#781D22] hover:border-[#D6CFC7]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Quick Search & Saved Items */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <Link
              to="/fighters"
              className="p-1.5 text-[#57524C] hover:text-[#781D22] rounded-xs hover:bg-[#F4EFE6] transition-colors"
              title={t('nav.search')}
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              to="/fighters?saved=true"
              className="relative p-1.5 text-[#57524C] hover:text-[#781D22] rounded-xs hover:bg-[#F4EFE6] transition-colors flex items-center gap-1 font-ntr text-xs"
              title={t('nav.saved')}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="bg-[#781D22] text-[#FAF7F0] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#1C1917] hover:text-[#781D22] rounded-xs hover:bg-[#F4EFE6] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D6CFC7] bg-[#FDFBF7] px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xs font-ntr text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#781D22] text-[#FAF7F0] font-semibold'
                    : 'text-[#1C1917] hover:bg-[#F4EFE6] hover:text-[#781D22]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
