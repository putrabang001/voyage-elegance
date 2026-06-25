import { NextRequest, NextResponse } from 'next/server';

// Sample data - in production, this would come from Prisma/database
let destinations = [
  {
    id: '1',
    slug: 'maldives',
    region: 'Indian Ocean',
    featured: true,
    sortOrder: 1,
    nameEn: 'Maldives',
    nameFr: 'Maldives',
    nameId: 'Maladewa',
    locationEn: 'Indian Ocean',
    locationFr: 'Océan Indien',
    locationId: 'Samudra Hindia',
    shortDescEn: 'A tropical paradise with crystal-clear waters',
    shortDescFr: 'Un paradis tropical aux eaux cristallines',
    shortDescId: 'Surga tropis dengan air laut yang jernih',
    descriptionEn: 'The Maldives is a nation...',
    descriptionFr: 'Les Maldives est une nation...',
    descriptionId: 'Maladewa adalah sebuah negara...',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-15',
  },
  {
    id: '2',
    slug: 'raja-ampat',
    region: 'Indonesia',
    featured: true,
    sortOrder: 2,
    nameEn: 'Raja Ampat',
    nameFr: 'Raja Ampat',
    nameId: 'Raja Ampat',
    locationEn: 'West Papua, Indonesia',
    locationFr: 'Papouasie occidentale, Indonésie',
    locationId: 'Papua Barat, Indonesia',
    shortDescEn: 'The crown jewel of marine biodiversity',
    shortDescFr: 'Le joyau de la biodiversité marine',
    shortDescId: 'Mahkota keanekaragaman hayati laut',
    createdAt: '2026-06-01',
    updatedAt: '2026-06-14',
  },
];

// GET all destinations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const region = searchParams.get('region');

    let result = destinations;

    if (featured === 'true') {
      result = result.filter(d => d.featured);
    }

    if (region) {
      result = result.filter(d => d.region.toLowerCase() === region.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new destination
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.nameEn || !body.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    if (destinations.some(d => d.slug === body.slug)) {
      return NextResponse.json(
        { error: 'A destination with this slug already exists' },
        { status: 400 }
      );
    }

    const newDestination = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    destinations.push(newDestination);

    return NextResponse.json({
      success: true,
      data: newDestination,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
