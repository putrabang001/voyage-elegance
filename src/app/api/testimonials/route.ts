import { NextRequest, NextResponse } from 'next/server';

// Sample data
let testimonials = [
  {
    id: '1',
    tourId: '1',
    name: 'Marie Dubois',
    location: 'Marseille, France',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    featured: true,
    quoteEn: 'An absolutely magical experience! The underwater world in Maldives exceeded all my expectations. The team at Voyage Elegance made everything perfect.',
    quoteFr: 'Une expérience absolument magique! Le monde sous-marin aux Maldives a dépassé toutes mes attentes.',
    quoteId: 'Pengalaman yang benar-benar ajaib! Dunia bawah laut di Maladewa melampaui semua ekspektasi saya.',
    createdAt: '2026-06-15',
  },
  {
    id: '2',
    tourId: '2',
    name: 'James Wilson',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    featured: true,
    quoteEn: 'Raja Ampat was a dream come true. Professional guides, amazing wildlife, and pristine waters. Highly recommend!',
    quoteFr: "Raja Ampat était un rêve devenu réalité. Des guides professionnels, une faune incroyable et des eaux immaculées.",
    quoteId: 'Raja Ampat adalah mimpi yang menjadi kenyataan. Pemandu profesional, satwa liar yang menakjubkan, dan air yang pristine.',
    createdAt: '2026-06-14',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    featured: false,
    quoteEn: 'Best ocean adventure I have ever experienced. The attention to detail and customer service was exceptional.',
    quoteFr: 'La meilleure aventure océanique que j\'ai jamais vécue. L\'attention aux détails et le service client étaient exceptionnels.',
    quoteId: 'Petualangan laut terbaik yang pernah saya alami. Perhatian terhadap detail dan layanan pelanggan sangat luar biasa.',
    createdAt: '2026-06-10',
  },
];

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get('tourId');
    const featured = searchParams.get('featured');

    let result = testimonials;

    if (tourId) {
      result = result.filter(t => t.tourId === tourId);
    }

    if (featured === 'true') {
      result = result.filter(t => t.featured);
    }

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.quoteEn) {
      return NextResponse.json(
        { error: 'Name and quote are required' },
        { status: 400 }
      );
    }

    const newTestimonial = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString(),
    };

    testimonials.push(newTestimonial);

    return NextResponse.json({
      success: true,
      data: newTestimonial,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
