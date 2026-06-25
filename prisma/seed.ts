import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@voyageelegance.com' },
    update: {},
    create: {
      email: 'admin@voyageelegance.com',
      passwordHash: hashedPassword,
      name: 'Admin',
      role: 'superadmin',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create sample destinations
  const destinations = await Promise.all([
    prisma.destination.upsert({
      where: { slug: 'maldives' },
      update: {},
      create: {
        slug: 'maldives',
        region: 'Indian Ocean',
        featured: true,
        nameEn: 'Maldives',
        nameFr: 'Maldives',
        nameId: 'Maladewa',
        locationEn: 'Indian Ocean',
        locationFr: 'Océan Indien',
        locationId: 'Samudra Hindia',
        shortDescEn: 'Iconic overwater bungalows and pristine beaches',
        shortDescFr: "Bungalows sur l'eau et plages immaculées",
        shortDescId: 'Bungalow di atas air dan pantai pristine',
        descriptionEn: 'The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls...',
        descriptionFr: 'Les Maldives sont une nation tropicale de locéan Indien...',
        descriptionId: 'Maladewa adalah negara kepulauan di Samudra Hindia...',
        highlightsEn: JSON.stringify(['Overwater bungalows', 'World-class diving', 'Manta ray encounters']),
        highlightsFr: JSON.stringify(["Bungalows sur l'eau", 'Plongée de classe mondiale', 'Rencontres avec des raies manta']),
        highlightsId: JSON.stringify(['Bungalow di atas air', 'Diving kelas dunia', 'Pertemuan pari manta']),
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'raja-ampat' },
      update: {},
      create: {
        slug: 'raja-ampat',
        region: 'Southeast Asia',
        featured: true,
        nameEn: 'Raja Ampat',
        nameFr: 'Raja Ampat',
        nameId: 'Raja Ampat',
        locationEn: 'Indonesia',
        locationFr: 'Indonésie',
        locationId: 'Indonesia',
        shortDescEn: "The world's most biodiverse marine ecosystem",
        shortDescFr: "L'écosystème marin le plus biodiversifié au monde",
        shortDescId: 'Ekosistem laut paling biodiverse di dunia',
        descriptionEn: 'Raja Ampat is a regency of Southwest Papua...',
        descriptionFr: 'Raja Ampat est une régence de Papua occidental...',
        descriptionId: 'Raja Ampat adalah kabupten di Papua Barat...',
        highlightsEn: JSON.stringify(['Marine biodiversity', 'Pristine reefs', 'Rare species']),
        highlightsFr: JSON.stringify(['Biodiversité marine', ' Récifs immaculés', 'Espèces rares']),
        highlightsId: JSON.stringify(['Biodiversitas laut', 'Terumbu karang pristine', 'Spesies langka']),
      },
    }),
  ]);
  console.log('✅ Created', destinations.length, 'destinations');

  // Create sample tours
  const tours = await Promise.all([
    prisma.tour.upsert({
      where: { slug: 'maldives-5-day' },
      update: {},
      create: {
        slug: 'maldives-5-day',
        destinationId: destinations[0].id,
        featured: true,
        duration: '5 Days / 4 Nights',
        price: 2499,
        currency: 'USD',
        difficulty: 'easy',
        nameEn: 'Maldives 5-Day Island Hopping',
        nameFr: "Escapade de 5 Jours aux Maldives",
        nameId: 'Island Hopping Maldives 5 Hari',
        shortDescEn: 'Explore pristine islands, snorkel with manta rays',
        shortDescFr: 'Explorez des îles immaculées, snorkeling avec des raies manta',
        shortDescId: 'Jelajahi pulau-pulau pristine, snorkel dengan pari manta',
        descriptionEn: 'Embark on an unforgettable 5-day journey through the breathtaking islands...',
        descriptionFr: 'Embarquez pour un voyage inoubliable de 5 jours à travers les îles...',
        descriptionId: 'Mulailah perjalanan 5 hari yang tak terlupakan melalui pulau-pulau yang menakjubkan...',
        itineraryEn: JSON.stringify([
          { day: 1, title: 'Arrival & Welcome', description: 'Arrive at Malé International Airport...' },
          { day: 2, title: 'Manta Ray Snorkeling', description: 'Full-day excursion to Hanifaru Bay...' },
        ]),
        itineraryFr: JSON.stringify([]),
        itineraryId: JSON.stringify([]),
        includesEn: JSON.stringify(['4 nights overwater bungalow', 'All meals', 'Diving equipment']),
        includesFr: JSON.stringify([]),
        includesId: JSON.stringify([]),
        excludesEn: JSON.stringify(['International flights', 'Travel insurance']),
        excludesFr: JSON.stringify([]),
        excludesId: JSON.stringify([]),
      },
    }),
  ]);
  console.log('✅ Created', tours.length, 'tours');

  // Create sample FAQs
  const faqs = await Promise.all([
    prisma.fAQ.upsert({
      where: { id: 'faq-1' },
      update: {},
      create: {
        id: 'faq-1',
        category: 'general',
        questionEn: 'What destinations do you offer tours to?',
        questionFr: 'Vers quelles destinations proposez-vous des circuits?',
        questionId: 'Destinasi apa saja yang ditawarkan tour ini?',
        answerEn: 'We offer tours to over 25 ocean destinations worldwide...',
        answerFr: 'Nous proposons des circuits vers plus de 25 destinations océaniques...',
        answerId: 'Kami menawarkan tour ke lebih dari 25 destinasi laut di seluruh dunia...',
      },
    }),
  ]);
  console.log('✅ Created', faqs.length, 'FAQs');

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { key: 'hero_title' },
    update: {},
    create: {
      key: 'hero_title',
      valueEn: "Discover the Ocean's Finest Treasures",
      valueFr: 'Découvrez les Trésors les Plus Fins de lOcéan',
      valueId: 'Temukan Harta Karun Laut Terbaik',
    },
  });
  console.log('✅ Created site settings');

  console.log('\n🎉 Database seeding completed!');
  console.log('\n📋 Admin Login Credentials:');
  console.log('   Email: admin@voyageelegance.com');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
