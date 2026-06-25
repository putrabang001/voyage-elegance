import { NextRequest, NextResponse } from 'next/server';

// Sample data
let inquiries = [
  {
    id: '1',
    tourId: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+62 812 3456 7890',
    destination: 'Fiji',
    tour: 'Fiji Snorkeling Tour',
    message: 'Hi, I am interested in the Fiji Snorkeling & Cultural Tour. Can you provide more details about the best time to visit?',
    status: 'new',
    createdAt: '2026-06-25T10:30:00Z',
    updatedAt: '2026-06-25T10:30:00Z',
  },
  {
    id: '2',
    tourId: '1',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 234 567 8901',
    destination: 'Maldives',
    tour: 'Maldives Package',
    message: 'Looking for a honeymoon package in Maldives. Budget around $5000 for 2 people.',
    status: 'read',
    createdAt: '2026-06-24T15:45:00Z',
    updatedAt: '2026-06-24T16:00:00Z',
  },
  {
    id: '3',
    tourId: '2',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+44 20 7123 4567',
    destination: 'Raja Ampat',
    tour: 'Raja Ampat Diving',
    message: 'Is it safe for a beginner diver to join the Raja Ampat expedition?',
    status: 'replied',
    createdAt: '2026-06-23T09:15:00Z',
    updatedAt: '2026-06-23T14:00:00Z',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+61 2 9876 5432',
    destination: 'Bora Bora',
    tour: 'Bora Bora Luxury',
    message: 'Can you arrange a private charter for 4 people in Bora Bora?',
    status: 'closed',
    createdAt: '2026-06-20T14:00:00Z',
    updatedAt: '2026-06-22T10:00:00Z',
  },
];

// GET all inquiries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let result = inquiries;

    if (status) {
      result = result.filter(i => i.status === status);
    }

    // Sort by createdAt descending
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      newCount: inquiries.filter(i => i.status === 'new').length,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const newInquiry = {
      id: String(Date.now()),
      ...body,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);

    return NextResponse.json({
      success: true,
      data: newInquiry,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
