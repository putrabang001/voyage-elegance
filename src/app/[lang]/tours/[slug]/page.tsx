'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { MapPin, Clock, Users, ChevronLeft, Check, X as XIcon, Star } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';

const tour = {
  slug: 'maldives-5-day',
  name: 'Maldives 5-Day Island Hopping',
  destination: 'Maldives',
  duration: '5 Days / 4 Nights',
  price: 2499,
  currency: 'USD',
  groupSizeMin: 2,
  groupSizeMax: 8,
  difficulty: 'easy',
  rating: 4.9,
  reviews: 127,
  shortDesc: 'Explore pristine islands, snorkel with manta rays, and relax in luxury overwater bungalows.',
  description: `Embark on an unforgettable 5-day journey through the breathtaking islands of the Maldives. This carefully curated itinerary combines adventure with relaxation, offering you the best of what this tropical paradise has to offer.

From the moment you arrive, you'll be greeted by crystal-clear waters and pristine white beaches. Our expert guides will lead you through hidden lagoons, vibrant coral reefs, and secluded sandbars that few tourists ever discover.

Each day brings a new adventure - from diving with manta rays at cleaning stations to watching dolphins play at sunset. Evenings are spent in your private overwater bungalow, where you can fall asleep to the gentle sound of waves.`,
  images: [
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80',
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & Welcome',
      description: 'Arrive at Malé International Airport. Transfer to your overwater bungalow. Evening welcome dinner with sunset views.',
    },
    {
      day: 2,
      title: 'Manta Ray Snorkeling',
      description: 'Full-day excursion to Hanifaru Bay. Snorkel with majestic manta rays. Lunch on a secluded sandbar. Sunset dolphin cruise.',
    },
    {
      day: 3,
      title: 'Island Hopping',
      description: 'Visit three local islands. Explore traditional Maldivian villages. Snorkeling at pristine reefs. Beach BBQ dinner.',
    },
    {
      day: 4,
      title: 'Diving Adventure',
      description: 'Two-tank diving excursion. Explore vibrant coral gardens. Chance to spot reef sharks and sea turtles. Farewell dinner under the stars.',
    },
    {
      day: 5,
      title: 'Leisure & Departure',
      description: 'Morning yoga session. Free time for relaxation or water sports. Check-out and transfer to airport.',
    },
  ],
  includes: [
    '4 nights overwater bungalow accommodation',
    'All meals (breakfast, lunch, dinner)',
    'Certified diving instructor',
    'Diving/snorkeling equipment',
    'All island transfers by speedboat',
    'Welcome dinner and farewell dinner',
    'English-speaking guide',
    'Conservation fees',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses',
    'Alcoholic beverages',
    'Tipping for guide (optional)',
    'Equipment rental beyond standard kit',
  ],
};

export default function TourDetailPage() {
  const { t } = useI18n();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px]">
        <Image
          src={tour.images[0]}
          alt={tour.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container py-4">
            <Link
              href="/tours"
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
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="coral">{t('admin.form.featured')}</Badge>
              <Badge variant={tour.difficulty === 'easy' ? 'success' : 'warning'}>
                {t(`tours.${tour.difficulty}`)}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tour.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {tour.destination}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {tour.groupSizeMin}-{tour.groupSizeMax} {t('common.reviews')}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                {tour.rating} ({tour.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Thumbnail Strip */}
      <section className="py-4 bg-ocean-900/80">
        <div className="container">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {tour.images.map((img, index) => (
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
                <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  {tour.description.split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-300 mb-4">{para}</p>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t('tours.itinerary')}</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={day.day} className="relative pl-8 border-l-2 border-ocean-700">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-coral-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{day.day}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{day.title}</h3>
                      <p className="text-gray-400">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes/Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('tours.includes')}</h2>
                  <ul className="space-y-3">
                    {tour.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('tours.excludes')}</h2>
                  <ul className="space-y-3">
                    {tour.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <XIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-ocean-800/50 rounded-2xl border border-ocean-700/50 p-6">
                  <div className="mb-6">
                    <span className="text-coral-400 text-3xl font-bold">{formatPrice(tour.price, tour.currency)}</span>
                    <span className="text-gray-500 ml-2">{t('common.perPerson')}</span>
                  </div>

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
                    <input
                      type="tel"
                      placeholder={t('contact.form.phone')}
                      className="form-input"
                    />
                    <textarea
                      placeholder={t('contact.form.message')}
                      className="form-input min-h-[100px]"
                    />
                    <Button className="w-full" size="lg">
                      {t('tours.inquiry')}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-ocean-700/50">
                    <p className="text-gray-500 text-sm text-center">
                      No payment required now. We'll contact you within 24 hours.
                    </p>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
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
            <XIcon className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video mx-4">
            <Image
              src={tour.images[currentImageIndex]}
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
