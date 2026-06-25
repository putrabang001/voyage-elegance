import { NextRequest, NextResponse } from 'next/server';

// Sample data
let tours = [
  {
    id: '1',
    slug: 'maldives-5-day',
    destinationId: '1',
    featured: true,
    sortOrder: 1,
    duration: '5 Days / 4 Nights',
    price: 2499,
    currency: 'USD',
    groupSizeMin: 2,
    groupSizeMax: 8,
    difficulty: 'easy',
    nameEn: 'Maldives 5-Day Island Hopping',
    nameFr: 'Escapade de 5 jours aux Maldives',
    nameId: 'Island Hopping Maldives 5 Hari',
    shortDescEn: 'Explore the beautiful islands of Maldives',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-20',
  },
  {
    id: '2',
    slug: 'raja-ampat-diving',
    destinationId: '2',
    featured: true,
    sortOrder: 2,
    duration: '7 Days / 6 Nights',
    price: 2899,
    currency: 'USD',
    groupSizeMin: 1,
    groupSizeMax: 6,
    difficulty: 'moderate',
    nameEn: 'Raja Ampat Diving Expedition',
    nameFr: 'Expédition de plongée à Raja Ampat',
    nameId: 'Ekspedisi Diving Raja Ampat',
    shortDescEn: 'Discover the underwater paradise of Raja Ampat',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-18',
  },
];

// GET all tours
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destinationId = searchParams.get('destinationId');
    const featured = searchParams.get('featured');

    let result = tours;

    if (destinationId) {
      result = result.filter(t => t.destinationId === destinationId);
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
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new tour
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.nameEn || !body.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    if (tours.some(t => t.slug === body.slug)) {
      return NextResponse.json(
        { error: 'A tour with this slug already exists' },
        { status: 400 }
      );
    }

    const newTour = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tours.push(newTour);

    return NextResponse.json({
      success: true,
      data: newTour,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
