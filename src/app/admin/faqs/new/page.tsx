'use client';

import AdminForm, { FormField } from '@/components/admin/ui/AdminForm';

const sections = [
  {
    title: 'FAQ Details',
    fields: [
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        options: [
          { value: 'general', label: 'General' },
          { value: 'booking', label: 'Booking & Payment' },
          { value: 'trip', label: 'On the Trip' },
          { value: 'safety', label: 'Safety & Health' },
          { value: 'equipment', label: 'Equipment & Gear' },
        ]
      },
      { name: 'sortOrder', label: 'Sort Order', type: 'number', placeholder: '0' },
      { name: 'featured', label: 'Featured FAQ', type: 'checkbox' },
    ],
  },
  {
    title: 'Question & Answer - English',
    fields: [
      { name: 'questionEn', label: 'Question (English)', type: 'textarea', rows: 2, required: true },
      { name: 'answerEn', label: 'Answer (English)', type: 'textarea', rows: 6, required: true },
    ],
  },
  {
    title: 'Question & Answer - French',
    fields: [
      { name: 'questionFr', label: 'Question (French)', type: 'textarea', rows: 2 },
      { name: 'answerFr', label: 'Answer (French)', type: 'textarea', rows: 6 },
    ],
  },
  {
    title: 'Question & Answer - Indonesian',
    fields: [
      { name: 'questionId', label: 'Question (Indonesian)', type: 'textarea', rows: 2 },
      { name: 'answerId', label: 'Answer (Indonesian)', type: 'textarea', rows: 6 },
    ],
  },
];

export default function NewFAQPage() {
  return (
    <AdminForm
      title="FAQ"
      description="Add a new frequently asked question"
      sections={sections}
      backHref="/admin/faqs"
    />
  );
}
