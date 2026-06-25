import { NextRequest, NextResponse } from 'next/server';

// Sample data
let blogPosts = [
  {
    id: '1',
    slug: 'top-10-underwater-destinations-2026',
    category: 'travel-guide',
    featured: true,
    published: true,
    author: 'Captain James Chen',
    publishedAt: '2026-06-15',
    titleEn: 'Top 10 Underwater Destinations for 2026',
    titleFr: 'Top 10 Destinations Sous-marines pour 2026',
    titleId: 'Top 10 Destinasi Bawah Laut untuk 2026',
    excerptEn: 'Discover the most breathtaking dive sites around the world...',
    excerptFr: 'Découvrez les sites de plongée les plus époustouflants au monde...',
    excerptId: 'Temukan situs selam paling menakjubkan di dunia...',
    contentEn: 'Full content here...',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    createdAt: '2026-06-15',
    updatedAt: '2026-06-15',
  },
  {
    id: '2',
    slug: 'essential-packing-list-diving',
    category: 'tips',
    featured: false,
    published: true,
    author: 'Dr. Maya Santos',
    publishedAt: '2026-06-10',
    titleEn: 'Essential Packing List for Your First Diving Trip',
    titleFr: 'Liste d\'Essentiels pour Votre Premier Voyage de Plongée',
    titleId: 'Daftar Perlengkapan Penting untuk Trip Diving Pertama',
    excerptEn: 'Everything you need to pack for an unforgettable diving adventure...',
    excerptFr: 'Tout ce que vous devez emporter pour une aventure de plongée inoubliable...',
    excerptId: 'Semua yang perlu Anda bawa untuk petualangan diving yang tak terlupakan...',
    contentEn: 'Full content here...',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
    createdAt: '2026-06-10',
    updatedAt: '2026-06-10',
  },
];

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');

    let result = blogPosts;

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (published === 'true') {
      result = result.filter(p => p.published);
    }

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.titleEn || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    if (blogPosts.some(p => p.slug === body.slug)) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const newPost = {
      id: String(Date.now()),
      ...body,
      publishedAt: body.published ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogPosts.push(newPost);

    return NextResponse.json({
      success: true,
      data: newPost,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
