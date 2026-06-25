'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Users, Globe, Heart } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui';

const stats = [
  { icon: Award, value: '15+', label: { en: 'Years Experience', fr: "Années d'Expérience", id: 'Tahun Pengalaman' } },
  { icon: Globe, value: '25+', label: { en: 'Destinations', fr: 'Destinations', id: 'Destinasi' } },
  { icon: Users, value: '5000+', label: { en: 'Happy Travelers', fr: 'Voyageurs Satisfaits', id: 'Pelancong Bahagia' } },
  { icon: Heart, value: '200+', label: { en: 'Tours Completed', fr: 'Circuits Complétés', id: 'Tour Selesai' } },
];

const team = [
  {
    name: 'Captain James Chen',
    role: { en: 'Founder & Ocean Expert', fr: 'Fondateur & Expert Océanique', id: 'Pendiri & Pakar Laut' },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: { en: 'With over 20 years of sailing experience across the Pacific and Indian Oceans.', fr: 'Avec plus de 20 ans d\'expérience en navigation dans les océans Pacifique et Indien.', id: 'Dengan lebih dari 20 tahun pengalaman berlayar di Samudra Pasifik dan Hindia.' },
  },
  {
    name: 'Dr. Maya Santos',
    role: { en: 'Marine Biologist', fr: 'Biologiste Marine', id: 'Biolog Laut' },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: { en: 'PhD in Marine Conservation, dedicated to protecting ocean ecosystems.', fr: 'Doctorat en Conservation Marine, dédiée à la protection des écosystèmes océaniques.', id: 'Doktor dalam Konservasi Laut, berdedikasi melindungi ekosistem laut.' },
  },
  {
    name: 'Ahmad Rahman',
    role: { en: 'Operations Manager', fr: 'Responsable des Opérations', id: 'Manajer Operasional' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: { en: 'Ensures every tour runs smoothly and exceeds expectations.', fr: 'S\'assure que chaque circuit se déroule sans accroc et dépasse les attentes.', id: 'Memastikan setiap tour berjalan lancar dan melampaui ekspektasi.' },
  },
];

export default function AboutPage() {
  const { t, language } = useI18n();
  const lang = language as 'en' | 'fr' | 'id';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
            alt="About Us"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-ocean-800/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-ocean-800/50 border border-ocean-700/50"
              >
                <stat.icon className="w-10 h-10 text-coral-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coral-400 font-medium mb-4 block">{t('about.story')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Journey Through the Oceans
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2010 by a group of passionate ocean enthusiasts, Voyage Elegance began
                  with a simple mission: to share the magic of marine exploration with the world.
                </p>
                <p>
                  What started as a small sailing operation in the Indonesian archipelago has grown
                  into one of the most respected ocean adventure companies in Asia-Pacific.
                </p>
                <p>
                  Today, we operate across 25+ destinations, from the pristine waters of the Maldives
                  to the hidden gems of Raja Ampat, always guided by our commitment to sustainable
                  tourism and environmental conservation.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-ocean-800/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-ocean-800/50 border border-ocean-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">{t('about.mission')}</h3>
              <p className="text-gray-300 leading-relaxed">
                To provide extraordinary ocean experiences while fostering deep respect for marine
                ecosystems. We believe that by connecting people with the ocean's beauty, we inspire
                the next generation of ocean stewards.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-ocean-800/50 border border-ocean-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">{t('about.vision')}</h3>
              <p className="text-gray-300 leading-relaxed">
                A world where every ocean destination thrives with life, where communities benefit
                from sustainable tourism, and where travelers carry home memories that last a lifetime
                alongside a newfound commitment to marine conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-coral-400 font-medium mb-4 block">{t('about.team')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Meet the Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-ocean-800/50 border border-ocean-700/50"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-coral-400 text-sm mb-4">{member.role[lang]}</p>
                <p className="text-gray-400 text-sm">{member.bio[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-coral-500/10 to-ocean-600/10">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Let us help you plan the perfect ocean adventure. Our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations">
              <Button size="lg" className="group">
                Explore Destinations
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
