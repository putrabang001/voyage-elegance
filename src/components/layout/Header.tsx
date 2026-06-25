'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n, languages, Language } from '@/lib/i18n';
import { Button } from '@/components/ui';

const navigation = [
  { key: 'home', href: '/' },
  { key: 'destinations', href: '/destinations' },
  { key: 'tours', href: '/tours' },
  { key: 'gallery', href: '/gallery' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { t, language, setLanguage } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-ocean-900/95 backdrop-blur-lg shadow-lg py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-ocean-400" />
                  <path
                    d="M10 20C10 20 15 14 20 14C25 14 30 20 30 20C30 20 25 26 20 26C15 26 10 20 10 20Z"
                    fill="currentColor"
                    className="text-coral-400"
                  />
                  <circle cx="20" cy="20" r="3" fill="currentColor" className="text-ocean-300" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-ocean-300 transition-colors hidden sm:block">
                {t('common.brandName')}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-coral-400 bg-coral-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLang?.flag}</span>
                  <span className="hidden sm:inline">{currentLang?.code.toUpperCase()}</span>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', isLangOpen && 'rotate-180')} />
                </button>

                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-ocean-800 rounded-xl shadow-xl border border-ocean-700/50 z-20 animate-fade-in">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as Language);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors',
                            language === lang.code && 'text-coral-400'
                          )}
                        >
                          <span>{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <Button size="sm" className="hidden md:flex">
                {t('nav.bookNow')}
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ocean-900/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className="absolute top-20 left-0 right-0 bottom-0 p-6 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-lg font-medium transition-all',
                      'animate-fade-in-up',
                      isActive
                        ? 'text-coral-400 bg-coral-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5',
                      `stagger-${index + 1}`
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-ocean-700/50">
              <Button className="w-full">{t('nav.bookNow')}</Button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="mt-8">
              <p className="px-4 text-sm text-gray-500 mb-3">{t('common.language') || 'Language'}</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                      language === lang.code
                        ? 'bg-ocean-600 text-white'
                        : 'bg-ocean-800/50 text-gray-300 hover:bg-ocean-700'
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
