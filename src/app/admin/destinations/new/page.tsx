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

export default function NewDestinationPage() {
  return (
    <AdminForm
      title="Destination"
      description="Add a new travel destination"
      fields={fields}
      backHref="/admin/destinations"
    />
  );
}
