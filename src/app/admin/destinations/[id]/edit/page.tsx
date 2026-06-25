'use client';

import AdminForm, { FormField } from '@/components/admin/ui/AdminForm';

const fields: FormField[] = [
  { name: 'name', label: 'Destination Name', placeholder: 'e.g., Maldives', required: true },
  { name: 'slug', label: 'Slug', placeholder: 'e.g., maldives', required: true },
  { name: 'region', label: 'Region', placeholder: 'e.g., Indian Ocean', required: true },
  {
    name: 'featured',
    label: 'Featured Destination',
    type: 'checkbox',
    placeholder: 'Mark as featured destination'
  },
  { name: 'image', label: 'Cover Image', type: 'image' },
  { name: 'nameEn', label: 'Name (English)', placeholder: 'Maldives' },
  { name: 'nameFr', label: 'Name (French)', placeholder: 'Maldives' },
  { name: 'nameId', label: 'Name (Indonesian)', placeholder: 'Maladewa' },
  { name: 'locationEn', label: 'Location (English)', placeholder: 'Indian Ocean' },
  { name: 'locationFr', label: 'Location (French)', placeholder: 'Océan Indien' },
  { name: 'locationId', label: 'Location (Indonesian)', placeholder: 'Samudra Hindia' },
  { name: 'shortDescEn', label: 'Short Description (English)', type: 'textarea', placeholder: 'Brief description...', rows: 2 },
  { name: 'shortDescFr', label: 'Short Description (French)', type: 'textarea', placeholder: 'Brève description...', rows: 2 },
  { name: 'shortDescId', label: 'Short Description (Indonesian)', type: 'textarea', placeholder: 'Deskripsi singkat...', rows: 2 },
  { name: 'descriptionEn', label: 'Full Description (English)', type: 'textarea', placeholder: 'Full description...', rows: 6 },
  { name: 'descriptionFr', label: 'Full Description (French)', type: 'textarea', placeholder: 'Description complète...', rows: 6 },
  { name: 'descriptionId', label: 'Full Description (Indonesian)', type: 'textarea', placeholder: 'Deskripsi lengkap...', rows: 6 },
];

// Sample data - in real app, fetch from API
const sampleData = {
  name: 'Maldives',
  slug: 'maldives',
  region: 'Indian Ocean',
  featured: true,
  image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
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
};

export default function EditDestinationPage({ params }: { params: { id: string } }) {
  return (
    <AdminForm
      title="Destination"
      description={`Editing destination: ${params.id}`}
      fields={fields}
      initialData={sampleData}
      backHref="/admin/destinations"
      isEditing
    />
  );
}
