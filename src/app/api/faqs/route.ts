import { NextRequest, NextResponse } from 'next/server';

// Sample data
let faqs = [
  {
    id: '1',
    category: 'general',
    sortOrder: 1,
    featured: true,
    questionEn: 'What destinations do you offer tours to?',
    questionFr: 'Quelles destinations proposez-vous des visites?',
    questionId: 'Destinasi mana saja yang kalian tawarkan tur ke?',
    answerEn: 'We offer tours to over 25 ocean destinations worldwide, including the Maldives, Raja Ampat, Palawan, Fiji, Bora Bora, and Komodo.',
    answerFr: 'Nous proposons des visites dans plus de 25 destinations océaniques à travers le monde, y compris les Maldives, Raja Ampat, Palawan, Fidji, Bora Bora et Komodo.',
    answerId: 'Kami menawarkan tur ke lebih dari 25 destinasi laut di seluruh dunia, termasuk Maladewa, Raja Ampat, Palawan, Fiji, Bora Bora, dan Komodo.',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-15',
  },
  {
    id: '2',
    category: 'general',
    sortOrder: 2,
    featured: false,
    questionEn: 'Do I need previous diving experience?',
    questionFr: 'Ai-je besoin d\'une expérience préalable en plongée?',
    questionId: 'Apakah saya perlu pengalaman diving sebelumnya?',
    answerEn: 'No, many of our tours are suitable for beginners. We offer both snorkeling and diving options, with certified instructors.',
    answerFr: 'Non, beaucoup de nos visites sont adaptées aux débutants. Nous proposons des options de snorkeling et de plongée, avec des instructeurs certifiés.',
    answerId: 'Tidak, banyak tur kami yang cocok untuk pemula. Kami menawarkan pilihan snorkeling dan diving, dengan instruktur bersertifikat.',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-10',
  },
  {
    id: '3',
    category: 'booking',
    sortOrder: 1,
    featured: true,
    questionEn: 'How do I book a tour?',
    questionFr: 'Comment réserver une visite?',
    questionId: 'Bagaimana cara saya memesan tur?',
    answerEn: 'You can book through our website by selecting your desired tour and filling out the inquiry form. Our team will contact you within 24 hours.',
    answerFr: 'Vous pouvez réserver sur notre site web en sélectionnant la visite souhaitée et en remplissant le formulaire de demande. Notre équipe vous contactera dans les 24 heures.',
    answerId: 'Anda dapat memesan melalui website kami dengan memilih tur yang diinginkan dan mengisi formulir pertanyaan. Tim kami akan menghubungi Anda dalam 24 jam.',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-05',
  },
];

// GET all FAQs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let result = faqs;

    if (category) {
      result = result.filter(f => f.category === category);
    }

    // Sort by sortOrder
    result.sort((a, b) => a.sortOrder - b.sortOrder);

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.questionEn || !body.answerEn) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const newFAQ = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    faqs.push(newFAQ);

    return NextResponse.json({
      success: true,
      data: newFAQ,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
