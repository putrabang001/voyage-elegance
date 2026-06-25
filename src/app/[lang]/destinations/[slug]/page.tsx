'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Users, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button, Badge, Accordion } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';

const destination = {
  slug: 'maldives',
  name: { en: 'Maldives', fr: 'Maldives', id: 'Maladewa' },
  location: { en: 'Indian Ocean', fr: 'Océan Indien', id: 'Samudra Hindia' },
  shortDesc: { en: 'Iconic overwater bungalows and pristine beaches', fr: "Bungalows sur l'eau et plages immaculées", id: 'Bungalow di atas air dan pantai pristine' },
  description: {
    en: `The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It is known for its beaches, blue lagoons and extensive reefs.

Home to some of the world's most diverse marine life, the Maldives offers an unparalleled underwater experience. Crystal-clear waters, vibrant coral reefs, and luxurious overwater accommodations make it the perfect destination for honeymooners, families, and adventure seekers alike.

Whether you're looking to snorkel with manta rays, dive among whale sharks, or simply relax in a private overwater villa while watching dolphins play in the distance, the Maldives delivers an unforgettable experience.`,
    fr: `Les Maldives sont une nation tropicale de l'océan Indien composée de 26 atolls en forme d'anneau, constitués de plus de 1 000 îles coralliennes. Elles sont connues pour leurs plages, leurs lagons bleus et leurs récifs extensifs.

Hébergement de certaines des vies marines les plus diverses au monde, les Maldives offrent une expérience sous-marine incomparable.`,
    id: `Maladewa adalah negara kepulauan di Samudra Hindia yang terdiri dari 26 atoll berbentuk cincin, yang terbuat dari lebih dari 1.000 pulau karang. Terkenal dengan pantainya yang indah, laguna biru, dan terumbu karang yang luas.

Rumah bagi beberapa kehidupan laut paling beragam di dunia, Maladewa menawarkan pengalaman bawah laut yang tak tertandingi.`,
  },
  highlights: {
    en: ['Overwater bungalows', 'World-class diving', 'Manta ray encounters', 'Pristine beaches', 'Luxury spa experiences', 'Sunset cruises'],
    fr: ['Bungalows sur l\'eau', 'Plongée de classe mondiale', 'Rencontres avec des raies manta', 'Plages immaculées', 'Expériences de spa de luxe', 'Croisières au coucher du soleil'],
    id: ['Bungalow di atas air', 'Diving kelas dunia', 'Pertemuan pari manta', 'Pantai pristine', 'Pengalaman spa mewah', 'Pesiar matahari terbenam'],
  },
  images: [
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80',
    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=80',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
  ],
};

const relatedTours = [
  {
    slug: 'maldives-5-day',
    name: 'Maldives 5-Day Island Hopping',
    duration: '5 Days / 4 Nights',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80',
  },
  {
    slug: 'maldives-diving',
    name: 'Maldives Diving Safari',
    duration: '7 Days / 6 Nights',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  },
];

const faqs = [
  {
    question: { en: 'What is the best time to visit Maldives?', fr: 'Quelle est la meilleure période pour visiter les Maldives?', id: 'Kapan waktu terbaik untuk mengunjungi Maladewa?' },
    answer: { en: 'The best time to visit the Maldives is between November and April during the dry season. This period offers clear skies, calm seas, and excellent visibility for diving and snorkeling.', fr: 'La meilleure période pour visiter les Maldives est entre novembre et avril.', id: 'Waktu terbaik untuk mengunjungi Maladewa adalah antara November dan April.' },
  },
  {
    question: { en: 'Do I need a visa for the Maldives?', fr: 'Ai-je besoin d\'un visa pour les Maldives?', id: 'Apakah saya membutuhkan visa untuk Maladewa?' },
    answer: { en: 'Most nationalities receive a free 30-day tourist visa upon arrival. Your passport must be valid for at least 6 months from your arrival date.', fr: 'La plupart des nationalités reçoivent un visa touristique gratuit de 30 jours à l\'arrivée.', id: 'Sebagian besar kewarganegaraan mendapatkan visa wisata gratis 30 hari saat tiba.' },
  },
  {
    question: { en: 'What currency is used in the Maldives?', fr: 'Quelle monnaie est utilisée aux Maldives?', id: 'Mata uang apa yang digunakan di Maladewa?' },
    answer: { en: 'The Maldivian Rufiyaa (MVR) is the local currency, but US dollars are widely accepted at resorts. Credit cards are also accepted at most establishments.', fr: 'Le Rufiyaa maldivien (MVR) est la monnaie locale, mais le dollar américain est largement accepté.', id: 'Rupee Maladewa (MVR) adalah mata uang lokal, tapi dolar AS diterima secara luas.' },
  },
];

export default function DestinationDetailPage() {
  const { t, language } = useI18n();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lang = language as 'en' | 'fr' | 'id';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={destination.images[0]}
          alt={destination.name[lang]}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container py-4">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              {t('common.back')}
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container pb-12">
            <div className="flex items-center gap-2 text-ocean-300 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              {destination.location[lang]}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {destination.name[lang]}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {destination.shortDesc[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Thumbnail Strip */}
      <section className="py-4 bg-ocean-900/80">
        <div className="container">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {destination.images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setLightboxOpen(true);
                }}
                className={cn(
                  'relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all',
                  index === currentImageIndex
                    ? 'border-coral-400'
                    : 'border-transparent hover:border-ocean-500'
                )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">About</h2>
                <div className="prose prose-invert max-w-none">
                  {destination.description[lang].split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-300 mb-4">{para}</p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t('destinations.highlights')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.highlights[lang].map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-ocean-800/50 rounded-xl">
                      <span className="text-coral-400">✦</span>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t('destinations.gallery')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setLightboxOpen(true);
                      }}
                      className="relative aspect-square rounded-xl overflow-hidden group"
                    >
                      <Image src={img} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t('destinations.faq')}</h2>
                <div className="bg-ocean-800/50 rounded-2xl border border-ocean-700/50 p-6">
                  <Accordion
                    items={faqs.map((faq) => ({
                      title: faq.question[lang],
                      content: faq.answer[lang],
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Related Tours */}
                <div className="bg-ocean-800/50 rounded-2xl border border-ocean-700/50 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{t('destinations.relatedTours')}</h3>
                  <div className="space-y-4">
                    {relatedTours.map((tour) => (
                      <Link
                        key={tour.slug}
                        href={`/tours/${tour.slug}`}
                        className="flex gap-4 group"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={tour.image} alt="" fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium group-hover:text-ocean-300 transition-colors">
                            {tour.name}
                          </h4>
                          <p className="text-gray-500 text-sm">{tour.duration}</p>
                          <p className="text-coral-400 font-semibold">${tour.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Inquiry Form */}
                <div className="bg-ocean-800/50 rounded-2xl border border-ocean-700/50 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{t('inquiry.title')}</h3>
                  <p className="text-gray-400 text-sm mb-4">{t('inquiry.subtitle')}</p>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder={t('contact.form.name')}
                      className="form-input"
                    />
                    <input
                      type="email"
                      placeholder={t('contact.form.email')}
                      className="form-input"
                    />
                    <textarea
                      placeholder={t('contact.form.message')}
                      className="form-input min-h-[100px]"
                    />
                    <Button className="w-full">{t('common.send')}</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-ocean-900/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length)}
            className="absolute left-4 p-2 text-white/60 hover:text-white"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % destination.images.length)}
            className="absolute right-4 p-2 text-white/60 hover:text-white"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video mx-4">
            <Image
              src={destination.images[currentImageIndex]}
              alt=""
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
