'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users, ArrowRight, Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button, Badge } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';

const tours = [
  {
    slug: 'maldives-5-day',
    name: { en: 'Maldives 5-Day Island Hopping', fr: 'Escapade de 5 Jours aux Maldives', id: 'Island Hopping Maldives 5 Hari' },
    shortDesc: { en: 'Explore pristine islands, snorkel with manta rays', fr: 'Explorez des îles immaculées, snorkeling avec des raies manta', id: 'Jelajahi pulau-pulau pristine, snorkel dengan pari manta' },
    destination: { en: 'Maldives', fr: 'Maldives', id: 'Maladewa' },
    duration: '5 Days / 4 Nights',
    price: 2499,
    currency: 'USD',
    rating: 4.9,
    reviews: 127,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    featured: true,
  },
  {
    slug: 'raja-ampat-diving',
    name: { en: 'Raja Ampat Diving Expedition', fr: 'Expédition de Plongée à Raja Ampat', id: 'Ekspedisi Diving Raja Ampat' },
    shortDesc: { en: 'World-class diving in marine biodiversity hotspot', fr: 'Plongée de classe mondiale dans un hotspot de biodiversité marine', id: 'Diving kelas dunia di hotspot biodiversitas laut' },
    destination: { en: 'Raja Ampat, Indonesia', fr: 'Raja Ampat, Indonésie', id: 'Raja Ampat, Indonesia' },
    duration: '7 Days / 6 Nights',
    price: 2899,
    currency: 'USD',
    rating: 4.8,
    reviews: 89,
    difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    featured: true,
  },
  {
    slug: 'palawan-adventure',
    name: { en: 'Palawan Underground River', fr: 'Rivière Souterraine de Palawan', id: 'Sungai Bawah Tanah Palawan' },
    shortDesc: { en: 'UNESCO World Heritage Site adventure', fr: 'Aventure dans un site du patrimoine mondial de l\'UNESCO', id: 'Petualangan Situs Warisan Dunia UNESCO' },
    destination: { en: 'Palawan, Philippines', fr: 'Palawan, Philippines', id: 'Palawan, Filipina' },
    duration: '4 Days / 3 Nights',
    price: 1299,
    currency: 'USD',
    rating: 4.7,
    reviews: 156,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1562077772-3bd305261897?w=800&q=80',
    featured: false,
  },
  {
    slug: 'fiji-snorkeling',
    name: { en: 'Fiji Snorkeling & Cultural Tour', fr: 'Tour de Snorkeling et Culturel aux Fidji', id: 'Tur Snorkeling & Budaya Fiji' },
    shortDesc: { en: 'Crystal clear waters and authentic Fijian culture', fr: 'Eaux cristallines et culture fidjienne authentique', id: 'Air jernih dan budaya Fiji yang autentik' },
    destination: { en: 'Fiji Islands', fr: 'Îles Fidji', id: 'Kepulauan Fiji' },
    duration: '6 Days / 5 Nights',
    price: 2799,
    currency: 'USD',
    rating: 4.9,
    reviews: 98,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    featured: true,
  },
  {
    slug: 'bora-bora-luxury',
    name: { en: 'Bora Bora Luxury Overwater Stay', fr: 'Séjour de Luxe sur l\'Eau à Bora Bora', id: 'Menginap Mewah di Atas Air Bora Bora' },
    shortDesc: { en: 'Ultimate luxury in French Polynesia', fr: 'Luxe ultime en Polynésie française', id: 'Kemewahan ultimate di Polinesia Prancis' },
    destination: { en: 'Bora Bora', fr: 'Bora Bora', id: 'Bora Bora' },
    duration: '5 Days / 4 Nights',
    price: 4299,
    currency: 'USD',
    rating: 5.0,
    reviews: 64,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    featured: true,
  },
  {
    slug: 'komodo-adventure',
    name: { en: 'Komodo Dragon & Pink Beach Adventure', fr: 'Aventure Dragons de Komodo et Plage Rose', id: 'Petualangan Naga Komodo & Pantai Pink' },
    shortDesc: { en: 'Meet the legendary dragons and pink sands', fr: 'Rencontrez les dragons légendaires et les sables roses', id: 'Temui naga legendaris dan pasir pink' },
    destination: { en: 'Komodo, Indonesia', fr: 'Komodo, Indonésie', id: 'Komodo, Indonesia' },
    duration: '4 Days / 3 Nights',
    price: 1799,
    currency: 'USD',
    rating: 4.8,
    reviews: 112,
    difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80',
    featured: false,
  },
];

const difficulties = [
  { value: 'all', label: { en: 'All Levels', fr: 'Tous les Niveaux', id: 'Semua Level' } },
  { value: 'easy', label: { en: 'Easy', fr: 'Facile', id: 'Mudah' } },
  { value: 'moderate', label: { en: 'Moderate', fr: 'Modéré', id: 'Sedang' } },
  { value: 'challenging', label: { en: 'Challenging', fr: 'Challenging', id: 'Menantang' } },
];

export default function ToursPage() {
  const { t, language } = useI18n();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating');

  const lang = language as 'en' | 'fr' | 'id';

  const filteredTours = tours
    .filter((tour) => {
      if (showFeatured && !tour.featured) return false;
      if (selectedDifficulty !== 'all' && tour.difficulty !== selectedDifficulty) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80"
            alt="Tours"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            {t('tours.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('tours.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 p-4 bg-ocean-800/50 rounded-2xl border border-ocean-700/50">
            <div className="flex flex-wrap items-center gap-3">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedDifficulty === diff.value
                      ? 'bg-ocean-600 text-white'
                      : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
                  )}
                >
                  {diff.label[lang]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-ocean-800 border border-ocean-700 rounded-lg text-sm text-white focus:outline-none focus:border-ocean-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFeatured(!showFeatured)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  showFeatured
                    ? 'bg-coral-500/20 text-coral-400 border border-coral-500/30'
                    : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
                )}
              >
                {t('destinations.featured')}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group bg-ocean-800/50 rounded-2xl overflow-hidden border border-ocean-700/50 hover:border-ocean-600/50 transition-all card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name[lang]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {tour.featured && <Badge variant="coral">{t('admin.form.featured')}</Badge>}
                    <Badge variant={tour.difficulty === 'easy' ? 'success' : tour.difficulty === 'moderate' ? 'warning' : 'error'}>
                      {t(`tours.${tour.difficulty}`)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-ocean-900/80 rounded-full text-sm text-white flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {tour.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-ocean-400 text-sm font-medium mb-2">{tour.destination[lang]}</p>
                  <h3 className="text-xl font-semibold text-white mb-2">{tour.name[lang]}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tour.shortDesc[lang]}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tour.reviews} {t('common.reviews')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-ocean-700/50">
                    <div>
                      <span className="text-coral-400 text-2xl font-bold">
                        {formatPrice(tour.price, tour.currency)}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">{t('common.perPerson')}</span>
                    </div>
                    <span className="text-ocean-400 text-sm group-hover:text-ocean-300 transition-colors">
                      {t('tours.viewDetails')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No tours found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedDifficulty('all');
                  setShowFeatured(false);
                }}
              >
                {t('common.showAll')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
