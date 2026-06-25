'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button, Badge } from '@/components/ui';
import { cn, formatDate } from '@/lib/utils';

const blogPosts = [
  {
    slug: 'top-10-underwater-destinations-2026',
    title: { en: 'Top 10 Underwater Destinations for 2026', fr: 'Top 10 Destinations Sous-marines pour 2026', id: 'Top 10 Destinasi Bawah Laut untuk 2026' },
    excerpt: { en: 'Discover the most breathtaking dive sites around the world, from the crystal-clear waters of the Maldives to the vibrant reefs of Raja Ampat.', fr: 'Découvrez les sites de plongée les plus époustouflants au monde.', id: 'Temukan situs selam paling menakjubkan di dunia.' },
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    category: 'Travel Guide',
    author: 'Captain James Chen',
    date: '2026-06-15',
    readTime: 8,
    featured: true,
  },
  {
    slug: 'diving-packing-list',
    title: { en: 'Essential Packing List for Your First Diving Trip', fr: 'Liste d\'Essentiels pour Votre Premier Voyage de Plongée', id: 'Daftar Perlengkapan untuk Trip Diving Pertama' },
    excerpt: { en: 'Everything you need to pack for an unforgettable diving adventure, from essential gear to the little luxuries that make a big difference.', fr: 'Tout ce que vous devez emporter pour une aventure de plongée inoubliable.', id: 'Semua yang perlu Anda bawa untuk petualangan diving yang tak terlupakan.' },
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
    category: 'Tips',
    author: 'Dr. Maya Santos',
    date: '2026-06-10',
    readTime: 6,
    featured: false,
  },
  {
    slug: 'sustainable-tourism-ocean',
    title: { en: 'Sustainable Tourism: Protecting Ocean Treasures', fr: 'Tourisme Durable: Protéger les Trésors Océaniques', id: 'Pariwisata Berkelanjutan: Melindungi Harta Karun Laut' },
    excerpt: { en: 'How we can travel responsibly and protect marine ecosystems while still enjoying the beauty of our oceans.', fr: 'Comment voyager de manière responsable et protéger les écosystèmes marins.', id: 'Bagaimana kita bisa bepergian secara bertanggung jawab.' },
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    category: 'Conservation',
    author: 'Dr. Maya Santos',
    date: '2026-06-05',
    readTime: 10,
    featured: false,
  },
  {
    slug: 'maldives-vs-seychelles',
    title: { en: 'Maldives vs Seychelles: Which Island Paradise is Right for You?', fr: 'Maldives vs Seychelles: Quel Paradis Insulaire vous Convient?', id: 'Maldives vs Seychelles: Surga Pulau Mana yang Tepat untuk Anda?' },
    excerpt: { en: 'A comprehensive comparison of two of the Indian Ocean\'s most coveted destinations.', fr: 'Une comparaison complète de deux des destinations les plus convoitées de l\'océan Indien.', id: 'Perbandingan komprehensif dua destinasi paling diinginkan di Samudra Hindia.' },
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    category: 'Travel Guide',
    author: 'Captain James Chen',
    date: '2026-05-28',
    readTime: 7,
    featured: true,
  },
  {
    slug: 'beginners-guide-snorkeling',
    title: { en: 'Beginner\'s Guide to Snorkeling: Everything You Need to Know', fr: 'Guide du Débutant en Snorkeling: Tout ce que Vous Devez Savoir', id: 'Panduan Pemula Snorkeling: Yang Perlu Anda Ketahui' },
    excerpt: { en: 'Learn the basics of snorkeling, from choosing the right equipment to finding the best spots for beginners.', fr: 'Apprenez les bases du snorkeling.', id: 'Pelajari dasar-dasar snorkeling.' },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    category: 'Tips',
    author: 'Ahmad Rahman',
    date: '2026-05-20',
    readTime: 5,
    featured: false,
  },
  {
    slug: 'raja-ampat-marine-life',
    title: { en: 'Exploring Raja Ampat: A Marine Biodiversity Hotspot', fr: 'Explorer Raja Ampat: Un Hotspot de Biodiversité Marine', id: 'Menjelajahi Raja Ampat: Hotspot Biodiversitas Laut' },
    excerpt: { en: 'Dive into the world\'s most biodiverse marine ecosystem and discover what makes Raja Ampat so special.', fr: 'Plongez dans l\'écosystème marin le plus biodiversifié au monde.', id: 'Selami ekosistem laut paling biodiverse di dunia.' },
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80',
    category: 'Destinations',
    author: 'Dr. Maya Santos',
    date: '2026-05-15',
    readTime: 9,
    featured: false,
  },
];

const categories = [
  { value: 'all', label: { en: 'All Posts', fr: 'Tous les Articles', id: 'Semua Artikel' } },
  { value: 'Travel Guide', label: { en: 'Travel Guide', fr: 'Guide de Voyage', id: 'Panduan Travel' } },
  { value: 'Tips', label: { en: 'Tips', fr: 'Conseils', id: 'Tips' } },
  { value: 'Conservation', label: { en: 'Conservation', fr: 'Conservation', id: 'Konservasi' } },
  { value: 'Destinations', label: { en: 'Destinations', fr: 'Destinations', id: 'Destinasi' } },
];

export default function BlogPage() {
  const { t, language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const lang = language as 'en' | 'fr' | 'id';

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'all');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80"
            alt="Blog"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && (
        <section className="py-12 md:py-16">
          <div className="container">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-ocean-800/50 rounded-2xl overflow-hidden border border-ocean-700/50 hover:border-ocean-600/50 transition-all"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title[lang]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge variant="coral" className="absolute top-4 left-4">
                  {featuredPost.category}
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-coral-400 font-medium mb-2">{t('blog.featured') || 'Featured'}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-ocean-300 transition-colors">
                  {featuredPost.title[lang]}
                </h2>
                <p className="text-gray-400 mb-6">{featuredPost.excerpt[lang]}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} min
                  </span>
                </div>
                <span className="text-ocean-400 group-hover:text-ocean-300 transition-colors flex items-center gap-2">
                  {t('blog.readMore')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
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
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-ocean-800/50 rounded-2xl overflow-hidden border border-ocean-700/50 hover:border-ocean-600/50 transition-all card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title[lang]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge variant="primary" className="absolute top-4 left-4">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-ocean-300 transition-colors">
                    {post.title[lang]}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt[lang]}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
