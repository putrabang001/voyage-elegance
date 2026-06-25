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
];

// GET single destination
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const destination = destinations.find(d => d.id === id || d.slug === id);

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update destination
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const index = destinations.findIndex(d => d.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Check if slug already exists (excluding current)
    if (body.slug && destinations.some(d => d.slug === body.slug && d.id !== id)) {
      return NextResponse.json(
        { error: 'A destination with this slug already exists' },
        { status: 400 }
      );
    }

    destinations[index] = {
      ...destinations[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: destinations[index],
    });
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE destination
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const index = destinations.findIndex(d => d.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    destinations.splice(index, 1);

    return NextResponse.json({
      success: true,
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
