'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Accordion, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

const faqCategories = [
  { key: 'all', label: { en: 'All', fr: 'Tout', id: 'Semua' } },
  { key: 'general', label: { en: 'General', fr: 'Général', id: 'Umum' } },
  { key: 'booking', label: { en: 'Booking & Payment', fr: 'Réservation & Paiement', id: 'Pemesanan & Pembayaran' } },
  { key: 'trip', label: { en: 'On the Trip', fr: 'Pendant le Voyage', id: 'Durante Perjalanan' } },
  { key: 'safety', label: { en: 'Safety & Health', fr: 'Sécurité & Santé', id: 'Keamanan & Kesehatan' } },
];

const faqs = {
  general: [
    {
      question: { en: 'What destinations do you offer tours to?', fr: 'Vers quelles destinations proposez-vous des circuits?', id: 'Destinasi apa saja yang ditawarkan tour ini?' },
      answer: { en: 'We offer tours to over 25 ocean destinations worldwide, including the Maldives, Raja Ampat, Palawan, Fiji, Bora Bora, and Komodo. Our destinations span across the Indian Ocean, Southeast Asia, and the Pacific.', fr: 'Nous proposons des circuits vers plus de 25 destinations océaniques dans le monde entier.', id: 'Kami menawarkan tour ke lebih dari 25 destinasi laut di seluruh dunia.' },
    },
    {
      question: { en: 'Do I need previous diving experience?', fr: 'Ai-je besoin d\'une expérience préalable en plongée?', id: 'Apakah saya perlu pengalaman diving sebelumnya?' },
      answer: { en: 'No, many of our tours are suitable for beginners. We offer both snorkeling and diving options, with certified instructors who will provide all necessary training. However, some advanced expeditions require diving certification.', fr: 'Non, beaucoup de nos circuits sont adaptés aux débutants.', id: 'Tidak, banyak tour kami cocok untuk pemula.' },
    },
    {
      question: { en: 'What is the best time to visit?', fr: 'Quelle est la meilleure période pour visiter?', id: 'Kapan waktu terbaik untuk berkunjung?' },
      answer: { en: 'The best time depends on your destination. Generally, the dry season (November to April) offers the best weather for most ocean destinations. We can help you choose the perfect timing based on your preferred destination.', fr: 'La meilleure période dépend de votre destination.', id: 'Waktu terbaik tergantung pada destinasi Anda.' },
    },
  ],
  booking: [
    {
      question: { en: 'How do I book a tour?', fr: 'Comment réserver un circuit?', id: 'Bagaimana cara memesan tour?' },
      answer: { en: 'You can book through our website by selecting your desired tour and filling out the inquiry form. Our team will then contact you to confirm availability and provide payment instructions. Alternatively, you can contact us directly via email or WhatsApp.', fr: 'Vous pouvez réserver via notre site web ou nous contacter directement.', id: 'Anda dapat memesan melalui website kami atau menghubungi kami langsung.' },
    },
    {
      question: { en: 'What payment methods do you accept?', fr: 'Quels modes de paiement acceptez-vous?', id: 'Metode pembayaran apa yang diterima?' },
      answer: { en: 'We accept credit cards (Visa, Mastercard), bank transfers, and PayPal. For groups of 6 or more, we offer flexible payment plans. Currency options include USD, EUR, and IDR.', fr: 'Nous acceptons les cartes de crédit, les virements bancaires et PayPal.', id: 'Kami menerima kartu kredit, transfer bank, dan PayPal.' },
    },
    {
      question: { en: 'What is your cancellation policy?', fr: 'Quelle est votre politique d\'annulation?', id: 'Apa kebijakan pembatalan Anda?' },
      answer: { en: 'Our cancellation policy varies by tour: Full refund if cancelled 30+ days before departure, 50% refund if cancelled 15-29 days before, and no refund for cancellations within 14 days. We recommend purchasing travel insurance.', fr: 'Notre politique d\'annulation varie selon le circuit.', id: 'Kebijakan pembatalan kami bervariasi sesuai tour.' },
    },
    {
      question: { en: 'Is there a minimum group size?', fr: 'Y a-t-il une taille de groupe minimale?', id: 'Apakah ada ukuran grup minimum?' },
      answer: { en: 'Most of our group tours require a minimum of 2 participants. Private tours are available for solo travelers or families who prefer exclusive experiences. Contact us for custom arrangements.', fr: 'La plupart de nos circuits en groupe nécessitent un minimum de 2 participants.', id: 'Sebagian besar tour grup kami memerlukan minimum 2 peserta.' },
    },
  ],
  trip: [
    {
      question: { en: 'What should I pack for an ocean tour?', fr: 'Que dois-je emporter pour un circuit océanique?', id: 'Apa yang harus saya bawa untuk tour laut?' },
      answer: { en: 'We recommend bringing sunscreen, swimwear, light clothing, a hat, sunglasses, and any personal medications. Dive equipment is provided, but you can bring your own if preferred. A detailed packing list is sent after booking.', fr: 'Nous recommandons d\'apporter un écran solaire, des maillots de bain, des vêtements légers.', id: 'Kami merekomendasikan membawa sunscreen, pakaian renang, dan pakaian ringan.' },
    },
    {
      question: { en: 'Will I have free time during the tour?', fr: 'Aurai-je du temps libre pendant le circuit?', id: 'Apakah saya akan punya waktu bebas selama tour?' },
      answer: { en: 'Yes! Our itineraries balance structured activities with free time. You can relax on the beach, explore independently, or participate in optional activities. Your guide will provide recommendations.', fr: 'Oui! Nos itinéraires équilibrent les activités structurées avec du temps libre.', id: 'Ya! Itinerary kami menyeimbangkan aktivitas terstruktur dengan waktu bebas.' },
    },
    {
      question: { en: 'Can I customize my tour itinerary?', fr: 'Puis-je personnaliser mon itinéraire?', id: 'Bisakah saya menyesuaikan itinerary tour?' },
      answer: { en: 'Absolutely! We specialize in creating bespoke experiences. Contact our team with your preferences, and we\'ll design a customized itinerary that matches your interests, schedule, and budget.', fr: 'Absolument! Nous sommes spécialisés dans la création d\'expériences sur mesure.', id: 'Tentu! Kami mengkhususkan diri dalam menciptakan pengalaman kustom.' },
    },
  ],
  safety: [
    {
      question: { en: 'Is it safe to swim with marine life?', fr: 'Est-il sûr de nager avec la vie marine?', id: 'Apakah aman berenang dengan satwa laut?' },
      answer: { en: 'Yes, when following safety guidelines. Our guides are trained in marine wildlife interaction protocols. We maintain safe distances, never touch or feed marine animals, and follow all environmental regulations.', fr: 'Oui, lorsqu\'on respecte les consignes de sécurité.', id: 'Ya, jika mengikuti pedoman keselamatan.' },
    },
    {
      question: { en: 'What safety measures are in place?', fr: 'Quelles mesures de sécurité sont en place?', id: 'Langkah-langkah keamanan apa yang diterapkan?' },
      answer: { en: 'All our tours include certified guides, safety briefings, first aid kits, and emergency communication devices. Our boats are regularly inspected and equipped with life jackets. We also have partnerships with local medical facilities.', fr: 'Tous nos circuits incluent des guides certifiés, des briefings de sécurité.', id: 'Semua tour kami mencakup pemandu bersertifikat dan briefing keselamatan.' },
    },
    {
      question: { en: 'Do I need travel insurance?', fr: 'Ai-je besoin d\'une assurance voyage?', id: 'Apakah saya butuh asuransi perjalanan?' },
      answer: { en: 'Yes, we strongly recommend travel insurance that covers medical emergencies, trip cancellation, and diving activities. Proof of insurance may be required for certain tours. We can recommend trusted providers.', fr: 'Oui, nous recommandons fortement une assurance voyage.', id: 'Ya, kami sangat merekomendasikan asuransi perjalanan.' },
    },
  ],
};

export default function FAQPage() {
  const { t, language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const lang = language as 'en' | 'fr' | 'id';

  const filteredFaqs = Object.entries(faqs)
    .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
    .map(([category, items]) => ({
      category,
      items: items.filter((faq) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          faq.question[lang].toLowerCase().includes(query) ||
          faq.answer[lang].toLowerCase().includes(query)
        );
      }),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="FAQ"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('faq.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-ocean-800 border border-ocean-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-ocean-500 transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {faqCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedCategory === cat.key
                      ? 'bg-coral-500 text-white'
                      : 'bg-ocean-800 text-gray-300 hover:bg-ocean-700'
                  )}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">{t('faq.noResults')}</p>
              </div>
            ) : (
              filteredFaqs.map((group) => (
                <div key={group.category} className="mb-12">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    {t(`faq.categories.${group.category}`)}
                  </h2>
                  <div className="bg-ocean-800/50 rounded-2xl border border-ocean-700/50 p-6">
                    <Accordion
                      items={group.items.map((faq) => ({
                        title: faq.question[lang],
                        content: faq.answer[lang],
                      }))}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-ocean-800/30">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our team is here to help with any questions about our tours and services.
          </p>
          <a href="/contact">
            <button className="px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-xl font-medium transition-colors">
              Contact Us
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
