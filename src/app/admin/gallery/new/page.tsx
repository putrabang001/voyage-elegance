'use client';

import AdminForm, { FormField } from '@/components/admin/ui/AdminForm';

const fields: FormField[] = [
  { name: 'image', label: 'Image', type: 'image', required: true },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    options: [
      { value: 'underwater', label: 'Underwater' },
      { value: 'beach', label: 'Beach' },
      { value: 'sunset', label: 'Sunset' },
      { value: 'wildlife', label: 'Wildlife' },
    ]
  },
  { name: 'featured', label: 'Featured Image', type: 'checkbox' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', placeholder: '0' },
  { name: 'altEn', label: 'Alt Text (English)', placeholder: 'Image description' },
  { name: 'altFr', label: 'Alt Text (French)', placeholder: 'Description de l\'image' },
  { name: 'altId', label: 'Alt Text (Indonesian)', placeholder: 'Deskripsi gambar' },
  { name: 'captionEn', label: 'Caption (English)', placeholder: 'Optional caption' },
  { name: 'captionFr', label: 'Caption (French)', placeholder: 'Légende optionnelle' },
  { name: 'captionId', label: 'Caption (Indonesian)', placeholder: 'Keterangan opsional' },
];

export default function NewGalleryImagePage() {
  return (
    <AdminForm
      title="Gallery Image"
      description="Upload a new gallery image"
      fields={fields}
      backHref="/admin/gallery"
    />
  );
}
