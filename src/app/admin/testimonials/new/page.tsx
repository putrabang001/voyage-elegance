'use client';

import AdminForm, { FormField } from '@/components/admin/ui/AdminForm';

const fields: FormField[] = [
  { name: 'name', label: 'Customer Name', placeholder: 'e.g., John Smith', required: true },
  { name: 'location', label: 'Location', placeholder: 'e.g., New York, USA' },
  { name: 'avatar', label: 'Avatar URL', placeholder: 'https://...' },
  {
    name: 'tourId',
    label: 'Related Tour',
    type: 'select',
    options: [
      { value: '', label: 'No specific tour' },
      { value: '1', label: 'Maldives 5-Day Island Hopping' },
      { value: '2', label: 'Raja Ampat Diving Expedition' },
      { value: '3', label: 'Palawan Underground River' },
    ]
  },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', placeholder: '5' },
  { name: 'featured', label: 'Featured', type: 'checkbox' },
  { name: 'quoteEn', label: 'Testimonial (English)', type: 'textarea', rows: 4, required: true },
  { name: 'quoteFr', label: 'Testimonial (French)', type: 'textarea', rows: 4 },
  { name: 'quoteId', label: 'Testimonial (Indonesian)', type: 'textarea', rows: 4 },
];

export default function NewTestimonialPage() {
  return (
    <AdminForm
      title="Testimonial"
      description="Add a customer testimonial"
      fields={fields}
      backHref="/admin/testimonials"
    />
  );
}
