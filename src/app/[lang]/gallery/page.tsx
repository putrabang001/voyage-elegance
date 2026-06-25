'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    category: 'beach',
    alt: 'Maldives Overwater Bungalow',
    caption: { en: 'Luxury overwater bungalow in Maldives', fr: 'Bungalow de luxe sur l\'eau aux Maldives', id: 'Bungalow mewah di atas air Maladewa' },
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    category: 'underwater',
    alt: 'Colorful Coral Reef',
    caption: { en: 'Vibrant coral reef in Raja Ampat', fr: ' Récif corallien vibrant à Raja Ampat', id: 'Terumbu karang berwarna di Raja Ampat' },
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    category: 'beach',
    alt: 'White Sand Beach',
    caption: { en: 'Pristine white sand beach', fr: 'Plage de sable blanc immaculée', id: 'Pantai pasir putih pristine' },
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    category: 'sunset',
    alt: 'Tropical Sunset',
    caption: { en: 'Breathtaking tropical sunset', fr: 'Coucher de soleil tropical à couper le souffle', id: 'Matahari terbenam tropis yang memukau' },
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80',
    category: 'underwater',
    alt: 'Sea Turtle',
    caption: { en: 'Majestic sea turtle swimming', fr: 'Tortue de mer majestueuse', id: 'Penyu laut yang megah' },
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1562077772-3bd305261897?w=1200&q=80',
    category: 'beach',
    alt: 'Pink Beach Indonesia',
    caption: { en: 'Famous pink beach in Komodo', fr: 'Plage rose célèbre à Komodo', id: 'Pantai pink terkenal di Komodo' },
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=80',
    category: 'beach',
    alt: 'Fiji Islands',
    caption: { en: 'Crystal clear waters of Fiji', fr: 'Eaux cristallines des Fidji', id: 'Air jernih Fiji' },
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
    category: 'beach',
    alt: 'Bora Bora Lagoon',
    caption: { en: 'Stunning lagoon in Bora Bora', fr: 'Lagon époustouflant à Bora Bora', id: 'Laguna menakjubkan di Bora Bora' },
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?w=1200&q=80',
    category: 'underwater',
    alt: 'Manta Ray',
    caption: { en: 'Gentle manta rays in the ocean', fr: 'Raies manta douces dans l\'océan', id: 'Pari manta lembut di laut' },
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200&q=80',
    category: 'beach',
    alt: 'Palawan El Nido',
    caption: { en: 'El Nido lagoons in Palawan', fr: 'Lagons d\'El Nido à Palawan', id: 'Laguna El Nido di Palawan' },
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1503214777413-35c4c9c8e8e2?w=1200&q=80',
    category: 'sunset',
    alt: 'Beach Sunset',
    caption: { en: 'Golden sunset over the ocean', fr: 'Coucher de soleil doré sur l\'océan', id: 'Matahari terbenam emas di atas laut' },
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=1200&q=80',
    category: 'underwater',
    alt: 'Tropical Fish',
    caption: { en: 'Colorful tropical fish', fr: 'Poissons tropicaux colorés', id: 'Ikan tropis berwarna' },
  },
];

const categories = [
  { value: 'all', label: { en: 'All', fr: 'Tout', id: 'Semua' } },
  { value: 'underwater', label: { en: 'Underwater', fr: 'Sous-marin', id: 'Bawah Laut' } },
  { value: 'beach', label: { en: 'Beach', fr: 'Plage', id: 'Pantai' } },
  { value: 'sunset', label: { en: 'Sunset', fr: 'Coucher de Soleil', id: 'Matahari Terbenam' } },
];

export default function GalleryPage() {
  const { t, language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lang = language as 'en' | 'fr' | 'id';

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Gallery"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            {t('gallery.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium transition-all',
                  selectedCategory === cat.value
                    ? 'bg-coral-500 text-white'
                    : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
                )}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-xl group',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ocean-900/0 group-hover:bg-ocean-900/40 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-ocean-900/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] mx-4">
            <div className="relative aspect-video">
              <Image
                src={filteredImages[currentImageIndex].url}
                alt={filteredImages[currentImageIndex].alt}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            {filteredImages[currentImageIndex].caption && (
              <p className="text-center text-white/80 mt-4">
                {filteredImages[currentImageIndex].caption[lang]}
              </p>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {filteredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
