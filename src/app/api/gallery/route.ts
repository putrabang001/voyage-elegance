import { NextRequest, NextResponse } from 'next/server';

// Sample data
let galleryImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    category: 'beach',
    featured: true,
    sortOrder: 1,
    altEn: 'Crystal clear Maldives beach',
    altFr: 'Plage de Maldives aux eaux cristallines',
    altId: 'Pantai Maladewa yang jernih',
    captionEn: 'Paradise beach in Maldives',
    createdAt: '2026-06-01',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    category: 'underwater',
    featured: true,
    sortOrder: 2,
    altEn: 'Colorful coral reef',
    altFr: ' Récif corallien coloré',
    altId: 'Terumbu karang berwarna-warni',
    createdAt: '2026-06-01',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    category: 'beach',
    featured: false,
    sortOrder: 3,
    altEn: 'Beautiful sunset beach',
    altFr: 'Belle plage au coucher du soleil',
    altId: 'Pantai sunset yang indah',
    createdAt: '2026-06-01',
  },
];

// GET all gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let result = galleryImages;

    if (category) {
      result = result.filter(img => img.category === category);
    }

    if (featured === 'true') {
      result = result.filter(img => img.featured);
    }

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.url || !body.category) {
      return NextResponse.json(
        { error: 'URL and category are required' },
        { status: 400 }
      );
    }

    const newImage = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString(),
    };

    galleryImages.push(newImage);

    return NextResponse.json({
      success: true,
      data: newImage,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
