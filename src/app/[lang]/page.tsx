'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Users, MapPin, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// Sample data - will be replaced with real data from database
const featuredDestinations = [
  {
    slug: 'maldives',
    name: 'Maldives',
    location: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    price: 2499,
  },
  {
    slug: 'raja-ampat',
    name: 'Raja Ampat',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80',
    price: 1899,
  },
  {
    slug: 'palawan',
    name: 'Palawan',
    location: 'Philippines',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
    price: 1599,
  },
];

const featuredTours = [
  {
    slug: 'maldives-5-day',
    name: 'Maldives 5-Day Island Hopping',
    duration: '5 Days / 4 Nights',
    price: 2499,
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  },
  {
    slug: 'raja-ampat-diving',
    name: 'Raja Ampat Diving Expedition',
    duration: '7 Days / 6 Nights',
    price: 2899,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    slug: 'palawan-adventure',
    name: 'Palawan Underground River',
    duration: '4 Days / 3 Nights',
    price: 1299,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1562077772-3bd305261897?w=800&q=80',
  },
];

const testimonials = [
  {
    name: 'Marie Dubois',
    location: 'Marseille, France',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    quote: {
      en: 'An absolutely magical experience! The underwater world in Maldives exceeded all my expectations. The team at Voyage Elegance made everything perfect.',
      fr: 'Une expérience absolument magique! Le monde sous-marin aux Maldives a dépassé toutes mes attentes.',
      id: 'Pengalaman yang benar-benar ajaib! Dunia bawah laut di Maladewa melampaui semua ekspektasi saya.',
    },
  },
  {
    name: 'James Wilson',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    quote: {
      en: 'Raja Ampat was a dream come true. Professional guides, amazing wildlife, and pristine waters. Highly recommend!',
      fr: "Raja Ampat était un rêve devenu réalité. Des guides professionnels, une faune incroyable et des eaux immaculées.",
      id: 'Raja Ampat adalah mimpi yang menjadi kenyataan. Pemandu profesional, satwa liar yang menakjubkan, dan air yang pristine.',
    },
  },
  {
    name: 'Sarah Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    quote: {
      en: 'Best ocean adventure I have ever experienced. The attention to detail and customer service was exceptional.',
      fr: 'La meilleure aventure océanique que j\'ai jamais vécue. L\'attention aux détails et le service client étaient exceptionnels.',
      id: 'Petualangan laut terbaik yang pernah saya alami. Perhatian terhadap detail dan layanan pelanggan sangat luar biasa.',
    },
  },
];

const blogPosts = [
  {
    slug: 'top-10-underwater-destinations',
    title: {
      en: 'Top 10 Underwater Destinations for 2026',
      fr: 'Top 10 Destinations Sous-marines pour 2026',
      id: 'Top 10 Destinasi Bawah Laut untuk 2026',
    },
    excerpt: {
      en: 'Discover the most breathtaking dive sites around the world...',
      fr: 'Découvrez les sites de plongée les plus époustouflants au monde...',
      id: 'Temukan situs selam paling menakjubkan di dunia...',
    },
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    category: 'Travel Guide',
    date: '2026-06-15',
  },
  {
    slug: 'diving-packing-list',
    title: {
      en: 'Essential Packing List for Your First Diving Trip',
      fr: 'Liste d\'Essentiels pour Votre Premier Voyage de Plongée',
      id: 'Daftar Perlengkapan Penting untuk Trip Diving Pertama',
    },
    excerpt: {
      en: 'Everything you need to pack for an unforgettable diving adventure...',
      fr: 'Tout ce que vous devez emporter pour une aventure de plongée inoubliable...',
      id: 'Semua yang perlu Anda bawa untuk petualangan diving yang tak terlupakan...',
    },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
    category: 'Tips',
    date: '2026-06-10',
  },
  {
    slug: 'sustainable-tourism',
    title: {
      en: 'Sustainable Tourism: Protecting Ocean Treasures',
      fr: 'Tourisme Durable: Protéger les Trésors Océaniques',
      id: 'Pariwisata Berkelanjutan: Melindungi Harta Karun Laut',
    },
    excerpt: {
      en: 'How we can travel responsibly and protect marine ecosystems...',
      fr: 'Comment voyager de manière responsable et protéger les écosystèmes marins...',
      id: 'Bagaimana kita bisa bepergian secara bertanggung jawab dan melindungi ekosistem laut...',
    },
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    category: 'Conservation',
    date: '2026-06-05',
  },
];

const features = [
  {
    icon: '🌊',
    title: { en: 'Ocean Expertise', fr: 'Expertise Océanique', id: 'Keahlian Laut' },
    description: {
      en: 'Over 15 years of experience in marine adventures',
      fr: 'Plus de 15 ans d\'expérience dans les aventures marines',
      id: 'Lebih dari 15 tahun pengalaman dalam petualangan laut',
    },
  },
  {
    icon: '🛡️',
    title: { en: 'Safety First', fr: 'La Sécurité Avant Tout', id: 'Keamanan Utama' },
    description: {
      en: 'Certified guides and top-tier safety equipment',
      fr: 'Guides certifiés et équipements de sécurité haut de gamme',
      id: 'Pemandu bersertifikat dan peralatan keamanan terbaik',
    },
  },
  {
    icon: '✨',
    title: { en: 'Bespoke Experiences', fr: 'Expériences Sur Mesure', id: 'Pengalaman Kustom' },
    description: {
      en: 'Tailored itineraries for your perfect adventure',
      fr: 'Itinéraires personnalisés pour votre aventure parfaite',
      id: 'Itinerary yang disesuaikan untuk petualangan sempurna Anda',
    },
  },
  {
    icon: '💬',
    title: { en: '24/7 Support', fr: 'Support 24/7', id: 'Dukung 24/7' },
    description: {
      en: 'Always here to help, wherever you are',
      fr: 'Toujours là pour aider, où que vous soyez',
      id: 'Selalu siap membantu, di mana pun Anda berada',
    },
  },
];

export default function HomePage() {
  const { t, language } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        const opacity = Math.max(0, 1 - scrolled / 500);
        heroRef.current.style.opacity = String(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Ocean Paradise"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center px-4">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-coral-500/20 border border-coral-500/30 rounded-full text-coral-300 text-sm font-medium mb-6">
              🌊 {t('common.tagline')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" onClick={scrollToDestinations}>
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                {t('nav.tours')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToDestinations}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-ocean-800/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-ocean-800/50 border border-ocean-700/50 hover:border-ocean-600/50 transition-all card-hover"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-white font-semibold mb-2">
                  {feature.title[language as keyof typeof feature.title]}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description[language as keyof typeof feature.description]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-coral-400 font-medium mb-4 block">{t('destinations.featured')}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('destinations.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('destinations.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl aspect-[4/5]',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 gradient-card" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-transparent to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-ocean-300 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {destination.location}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-coral-400 font-semibold">
                      {t('common.from')} ${destination.price}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('destinations.viewDetails')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group">
              {t('common.showAll')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tours */}
      <section className="py-20 md:py-28 bg-ocean-800/30">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-coral-400 font-medium mb-4 block">{t('tours.featured')}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('tours.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('tours.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, index) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group bg-ocean-800/50 rounded-2xl overflow-hidden border border-ocean-700/50 hover:border-ocean-600/50 transition-all card-hover"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-ocean-900/80 rounded-full text-sm text-white flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {tour.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tour.reviews} {t('common.reviews')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{tour.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-coral-400 font-bold text-lg">
                      ${tour.price}
                      <span className="text-sm text-gray-500 font-normal ml-1">
                        {t('common.perPerson')}
                      </span>
                    </span>
                    <span className="text-sm text-ocean-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('tours.viewDetails')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-coral-400 font-medium mb-4 block">{t('testimonials.title')}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('testimonials.subtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-ocean-800/50 rounded-2xl p-8 border border-ocean-700/50"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-300 mb-6 leading-relaxed">
                  &quot;{testimonial.quote[language as keyof typeof testimonial.quote]}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 md:py-28 bg-ocean-800/30">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-coral-400 font-medium mb-4 block">{t('blog.latestPosts')}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('blog.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-ocean-800/50 rounded-2xl overflow-hidden border border-ocean-700/50 hover:border-ocean-600/50 transition-all card-hover"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title[language as keyof typeof post.title]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-coral-400 text-sm font-medium">{post.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                    {post.title[language as keyof typeof post.title]}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {post.excerpt[language as keyof typeof post.excerpt]}
                  </p>
                  <span className="text-ocean-400 text-sm group-hover:text-ocean-300 transition-colors">
                    {t('blog.readMore')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
                alt="Newsletter Background"
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-900 via-ocean-900/95 to-ocean-900/80" />
            </div>

            <div className="relative p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('newsletter.title')}
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                {t('newsletter.subtitle')}
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-ocean-400 transition-colors"
                />
                <Button size="lg">{t('newsletter.button')}</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
