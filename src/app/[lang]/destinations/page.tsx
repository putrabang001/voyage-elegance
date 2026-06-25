'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

// Sample data - will be replaced with real data from database
const destinations = [
  {
    slug: 'maldives',
    name: { en: 'Maldives', fr: 'Maldives', id: 'Maladewa' },
    location: { en: 'Indian Ocean', fr: 'Océan Indien', id: 'Samudra Hindia' },
    shortDesc: { en: 'Iconic overwater bungalows and pristine beaches', fr: 'Bungalows sur l\'eau et plages immaculées', id: 'Bungalow di atas air dan pantai pristine' },
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    region: 'Indian Ocean',
    featured: true,
    price: 2499,
  },
  {
    slug: 'raja-ampat',
    name: { en: 'Raja Ampat', fr: 'Raja Ampat', id: 'Raja Ampat' },
    location: { en: 'Indonesia', fr: 'Indonésie', id: 'Indonesia' },
    shortDesc: { en: 'The world\'s most biodiverse marine ecosystem', fr: 'L\'écosystème marin le plus biodiversifié au monde', id: 'Ekosistem laut paling biodiverse di dunia' },
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80',
    region: 'Southeast Asia',
    featured: true,
    price: 1899,
  },
  {
    slug: 'palawan',
    name: { en: 'Palawan', fr: 'Palawan', id: 'Palawan' },
    location: { en: 'Philippines', fr: 'Philippines', id: 'Filipina' },
    shortDesc: { en: 'The Philippines\' last frontier of wild beauty', fr: 'La dernière frontière de beauté sauvage des Philippines', id: 'Terakhirnya keindahan liar Filipina' },
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
    region: 'Southeast Asia',
    featured: true,
    price: 1599,
  },
  {
    slug: 'fiji',
    name: { en: 'Fiji Islands', fr: 'Îles Fidji', id: 'Kepulauan Fiji' },
    location: { en: 'South Pacific', fr: 'Pacifique Sud', id: 'Pasifik Selatan' },
    shortDesc: { en: 'South Pacific jewel with pristine waters', fr: 'Joyau du Pacifique Sud avec des eaux immaculées', id: 'Permata Pasifik Selatan dengan air yang pristine' },
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    region: 'Pacific',
    featured: false,
    price: 2799,
  },
  {
    slug: 'bora-bora',
    name: { en: 'Bora Bora', fr: 'Bora Bora', id: 'Bora Bora' },
    location: { en: 'French Polynesia', fr: 'Polynésie française', id: 'Polinesia Prancis' },
    shortDesc: { en: 'French Polynesia\'s gem of the Pacific', fr: 'Le joyau du Pacifique de la Polynésie française', id: 'Permata Pasifik Polinesia Prancis' },
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    region: 'Pacific',
    featured: true,
    price: 3299,
  },
  {
    slug: 'komodo',
    name: { en: 'Komodo National Park', fr: 'Parc National de Komodo', id: 'Taman Nasional Komodo' },
    location: { en: 'Indonesia', fr: 'Indonésie', id: 'Indonesia' },
    shortDesc: { en: 'Home to legendary dragons and pink beaches', fr: 'Maison des dragons légendaires et des plages roses', id: 'Rumah naga legendaris dan pantai pink' },
    image: 'https://images.unsplash.com/photo-1562077772-3bd305261897?w=800&q=80',
    region: 'Southeast Asia',
    featured: false,
    price: 1799,
  },
];

const regions = [
  { value: 'all', label: { en: 'All Regions', fr: 'Toutes les Régions', id: 'Semua Wilayah' } },
  { value: 'indian-ocean', label: { en: 'Indian Ocean', fr: 'Océan Indien', id: 'Samudra Hindia' } },
  { value: 'southeast-asia', label: { en: 'Southeast Asia', fr: 'Asie du Sud-Est', id: 'Asia Tenggara' } },
  { value: 'pacific', label: { en: 'Pacific', fr: 'Pacifique', id: 'Pasifik' } },
];

export default function DestinationsPage() {
  const { t, language } = useI18n();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);

  const filteredDestinations = destinations.filter((dest) => {
    if (showFeatured && !dest.featured) return false;
    if (selectedRegion !== 'all' && dest.region.toLowerCase().replace(' ', '-') !== selectedRegion) return false;
    return true;
  });

  const lang = language as 'en' | 'fr' | 'id';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1920&q=80"
            alt="Destinations"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            {t('destinations.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('destinations.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 p-4 bg-ocean-800/50 rounded-2xl border border-ocean-700/50">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSelectedRegion('all')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedRegion === 'all'
                    ? 'bg-ocean-600 text-white'
                    : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
                )}
              >
                {t('common.showAll')}
              </button>
              {regions.filter(r => r.value !== 'all').map((region) => (
                <button
                  key={region.value}
                  onClick={() => setSelectedRegion(region.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedRegion === region.value
                      ? 'bg-ocean-600 text-white'
                      : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
                  )}
                >
                  {region.label[lang as keyof typeof region.label] || region.value}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFeatured(!showFeatured)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                showFeatured
                  ? 'bg-coral-500/20 text-coral-400 border border-coral-500/30'
                  : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
              )}
            >
              <Filter className="w-4 h-4" />
              {t('destinations.featured')}
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Image
                  src={destination.image}
                  alt={destination.name[lang]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent" />

                {/* Featured Badge */}
                {destination.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="coral">{t('admin.form.featured')}</Badge>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-ocean-300 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {destination.location[lang]}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {destination.name[lang]}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {destination.shortDesc[lang]}
                  </p>
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

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No destinations found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedRegion('all');
                  setShowFeatured(false);
                }}
              >
                {t('common.showAll')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-coral-500/10 to-ocean-600/10">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <Button size="lg" className="group">
            {t('common.contactUs')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
}
