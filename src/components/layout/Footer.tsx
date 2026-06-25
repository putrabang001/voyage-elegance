'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Custom Social Icons as SVG components
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
];

const quickLinks = [
  { key: 'destinations', href: '/destinations' },
  { key: 'tours', href: '/tours' },
  { key: 'gallery', href: '/gallery' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

const supportLinks = [
  { key: 'faq', href: '/faq' },
  { key: 'terms', href: '/terms' },
  { key: 'privacy', href: '/privacy' },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-ocean-900">
      {/* Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
            fill="currentColor"
            className="text-ocean-900"
          />
        </svg>
      </div>

      <div className="pt-24 pb-12">
        <div className="container">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-ocean-400" />
                    <path
                      d="M10 20C10 20 15 14 20 14C25 14 30 20 30 20C30 20 25 26 20 26C15 26 10 20 10 20Z"
                      fill="currentColor"
                      className="text-coral-400"
                    />
                    <circle cx="20" cy="20" r="3" fill="currentColor" className="text-ocean-300" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">{t('common.brandName')}</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('footer.about.description')}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-ocean-800 text-gray-400 hover:text-white hover:bg-ocean-700 transition-all"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">{t('footer.quickLinks.title')}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-ocean-300 transition-colors text-sm"
                    >
                      {t(`footer.quickLinks.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-6">{t('footer.support.title')}</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-ocean-300 transition-colors text-sm"
                    >
                      {t(`footer.support.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-ocean-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">hello@voyageelegance.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-ocean-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">+62 812 3456 7890</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-ocean-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">Singapore</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-6">{t('newsletter.title')}</h3>
              <p className="text-gray-400 text-sm mb-4">{t('newsletter.subtitle')}</p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="w-full px-4 py-3 bg-ocean-800 border border-ocean-700 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-ocean-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-xl font-medium transition-colors"
                >
                  {t('newsletter.button')}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-ocean-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex items-center gap-6">
                <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                  {t('footer.support.terms')}
                </Link>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                  {t('footer.support.privacy')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-full mr-3 px-3 py-2 bg-ocean-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us
        </span>
      </a>
    </footer>
  );
}
