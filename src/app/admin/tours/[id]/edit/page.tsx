'use client';

import AdminForm, { FormField } from '@/components/admin/ui/AdminForm';

const sections = [
  {
    title: 'Basic Information',
    fields: [
      { name: 'name', label: 'Tour Name', placeholder: 'e.g., Maldives 5-Day Island Hopping', required: true },
      { name: 'slug', label: 'Slug', placeholder: 'e.g., maldives-5-day', required: true },
      { name: 'destinationId', label: 'Destination', type: 'select', options: [
        { value: '1', label: 'Maldives' },
        { value: '2', label: 'Raja Ampat' },
        { value: '3', label: 'Palawan' },
        { value: '4', label: 'Bora Bora' },
      ]},
      { name: 'duration', label: 'Duration', placeholder: 'e.g., 5 Days / 4 Nights' },
      { name: 'price', label: 'Price (USD)', type: 'number', placeholder: 'e.g., 2499' },
      { name: 'groupSizeMin', label: 'Min Group Size', type: 'number', placeholder: '1' },
      { name: 'groupSizeMax', label: 'Max Group Size', type: 'number', placeholder: '12' },
      {
        name: 'difficulty',
        label: 'Difficulty',
        type: 'select',
        options: [
          { value: 'easy', label: 'Easy' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'challenging', label: 'Challenging' },
        ]
      },
      { name: 'featured', label: 'Featured Tour', type: 'checkbox', placeholder: 'Mark as featured' },
    ],
  },
  {
    title: 'Tour Images',
    fields: [
      { name: 'image', label: 'Cover Image', type: 'image' },
    ],
  },
  {
    title: 'Multilingual Content - English',
    fields: [
      { name: 'nameEn', label: 'Tour Name (EN)', placeholder: 'English name' },
      { name: 'shortDescEn', label: 'Short Description', type: 'textarea', rows: 2 },
      { name: 'descriptionEn', label: 'Full Description', type: 'textarea', rows: 6 },
      { name: 'itineraryEn', label: 'Itinerary (JSON)', type: 'textarea', rows: 4 },
      { name: 'includesEn', label: 'What\'s Included (JSON)', type: 'textarea', rows: 3 },
      { name: 'excludesEn', label: 'Not Included (JSON)', type: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'Multilingual Content - French',
    fields: [
      { name: 'nameFr', label: 'Tour Name (FR)', placeholder: 'Nom en français' },
      { name: 'shortDescFr', label: 'Short Description', type: 'textarea', rows: 2 },
      { name: 'descriptionFr', label: 'Full Description', type: 'textarea', rows: 6 },
      { name: 'itineraryFr', label: 'Itinerary (JSON)', type: 'textarea', rows: 4 },
      { name: 'includesFr', label: 'What\'s Included (JSON)', type: 'textarea', rows: 3 },
      { name: 'excludesFr', label: 'Not Included (JSON)', type: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'Multilingual Content - Indonesian',
    fields: [
      { name: 'nameId', label: 'Tour Name (ID)', placeholder: 'Nama dalam Bahasa Indonesia' },
      { name: 'shortDescId', label: 'Short Description', type: 'textarea', rows: 2 },
      { name: 'descriptionId', label: 'Full Description', type: 'textarea', rows: 6 },
      { name: 'itineraryId', label: 'Itinerary (JSON)', type: 'textarea', rows: 4 },
      { name: 'includesId', label: 'What\'s Included (JSON)', type: 'textarea', rows: 3 },
      { name: 'excludesId', label: 'Not Included (JSON)', type: 'textarea', rows: 3 },
    ],
  },
];

const sampleData = {
  name: 'Maldives 5-Day Island Hopping',
  slug: 'maldives-5-day',
  destinationId: '1',
  duration: '5 Days / 4 Nights',
  price: 2499,
  groupSizeMin: 2,
  groupSizeMax: 8,
  difficulty: 'easy',
  featured: true,
  image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  nameEn: 'Maldives 5-Day Island Hopping',
  nameFr: 'Escapade de 5 jours aux Maldives',
  nameId: 'Island Hopping Maldives 5 Hari',
  shortDescEn: 'Explore the beautiful islands of Maldives',
  shortDescFr: 'Explorez les belles îles des Maldives',
  shortDescId: 'Jelajahi pulau-pulau indah Maladewa',
};

export default function EditTourPage({ params }: { params: { id: string } }) {
  return (
    <AdminForm
      title="Tour"
      description={`Editing tour: ${params.id}`}
      sections={sections}
      initialData={sampleData}
      backHref="/admin/tours"
      isEditing
    />
  );
}
