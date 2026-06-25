'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Share2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';

const post = {
  slug: 'top-10-underwater-destinations-2026',
  title: 'Top 10 Underwater Destinations for 2026',
  author: 'Captain James Chen',
  authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  date: '2026-06-15',
  readTime: 8,
  category: 'Travel Guide',
  image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80',
  content: `
The underwater world offers some of the most breathtaking experiences on our planet. From crystal-clear waters teeming with colorful coral reefs to encounters with majestic marine creatures, these destinations promise unforgettable adventures beneath the waves.

## 1. Raja Ampat, Indonesia

Often called the "Amazon of the seas," Raja Ampat boasts the highest marine biodiversity on Earth. With over 1,500 species of fish and 600 species of coral, this Indonesian paradise offers world-class diving and snorkeling experiences.

## 2. The Maldives

The Maldives needs no introduction. This archipelago of 26 atolls offers pristine dive sites where you can swim with manta rays, whale sharks, and countless tropical fish species.

## 3. Great Barrier Reef, Australia

The world's largest coral reef system is a UNESCO World Heritage Site and offers unparalleled diving experiences across its 2,300 kilometers of reef.

## 4. Palawan, Philippines

Hidden within Palawan's limestone cliffs are pristine underwater gardens and the famous Puerto Princesa Underground River, making it a must-visit for nature lovers.

## 5. Bora Bora, French Polynesia

Known as the "Pearl of the Pacific," Bora Bora's lagoon offers crystal-clear waters perfect for snorkeling with rays and sharks.

## 6. Komodo National Park, Indonesia

Beyond the famous dragons, Komodo offers world-class diving with regular encounters with manta rays, sharks, and vibrant coral formations.

## 7. Galápagos Islands, Ecuador

This unique ecosystem offers once-in-a-lifetime encounters with marine iguanas, sea lions, and hammerhead sharks.

## 8. Bonaire, Caribbean Netherlands

As a marine sanctuary, Bonaire offers pristine diving with excellent visibility and diverse marine life.

## 9. Red Sea, Egypt

The Red Sea's coral reefs are among the healthiest in the world, with excellent visibility and year-round diving conditions.

## 10. Silfra, Iceland

For a unique experience, dive or snorkel in Silfra's glacial fissure, where you can see over 100 meters of visibility in crystal-clear water.

---

## Tips for Your Underwater Adventure

Whether you're a seasoned diver or a first-time snorkeler, these destinations offer something for everyone. Remember to always practice responsible tourism by:

- Not touching or standing on coral reefs
- Using reef-safe sunscreen
- Respecting marine life and their habitats
- Supporting local conservation efforts

Start planning your underwater adventure today and discover why these destinations should be on every ocean lover's bucket list!
  `.trim(),
};

const relatedPosts = [
  {
    slug: 'diving-packing-list',
    title: 'Essential Packing List for Your First Diving Trip',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80',
    category: 'Tips',
    date: '2026-06-10',
  },
  {
    slug: 'sustainable-tourism-ocean',
    title: 'Sustainable Tourism: Protecting Ocean Treasures',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=80',
    category: 'Conservation',
    date: '2026-06-05',
  },
  {
    slug: 'maldives-vs-seychelles',
    title: 'Maldives vs Seychelles: Which is Right for You?',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
    category: 'Travel Guide',
    date: '2026-05-28',
  },
];

export default function BlogPostPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('common.back')}
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container">
        <div className="max-w-3xl mx-auto -mt-32 relative z-10">
          {/* Article Header */}
          <div className="bg-ocean-800/90 rounded-2xl p-8 md:p-12 mb-8 backdrop-blur-sm">
            <span className="text-coral-400 font-medium text-sm">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-400">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white">{post.author}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>
          </div>

          {/* Article Content */}
          <article className="bg-ocean-800/50 rounded-2xl p-8 md:p-12 border border-ocean-700/50">
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside text-gray-300 space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="my-8 border-ocean-700" />;
                }
                return (
                  <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-ocean-700/50">
              <span className="text-gray-400 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share:
              </span>
              <button className="p-2 bg-ocean-700 rounded-lg text-white/70 hover:text-white hover:bg-ocean-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 bg-ocean-700 rounded-lg text-white/70 hover:text-white hover:bg-ocean-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-2 bg-ocean-700 rounded-lg text-white/70 hover:text-white hover:bg-ocean-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.172-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="container mt-16">
        <h2 className="text-2xl font-bold text-white mb-8">{t('blog.relatedPosts')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.slug}
              href={`/blog/${relatedPost.slug}`}
              className="group bg-ocean-800/50 rounded-2xl overflow-hidden border border-ocean-700/50 hover:border-ocean-600/50 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="text-coral-400 text-sm font-medium">{relatedPost.category}</span>
                <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-ocean-300 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{formatDate(relatedPost.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
