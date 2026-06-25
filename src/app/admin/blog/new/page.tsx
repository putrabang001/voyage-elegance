'use client';

import AdminForm, { FormField } from '@/components/admin/ui/AdminForm';

const sections = [
  {
    title: 'Basic Information',
    fields: [
      { name: 'title', label: 'Post Title', placeholder: 'Enter post title', required: true },
      { name: 'slug', label: 'Slug', placeholder: 'post-url-slug', required: true },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { value: 'travel-guide', label: 'Travel Guide' },
          { value: 'tips', label: 'Tips' },
          { value: 'conservation', label: 'Conservation' },
          { value: 'destination', label: 'Destination' },
          { value: 'news', label: 'News' },
        ]
      },
      { name: 'author', label: 'Author', placeholder: 'Author name' },
      { name: 'featured', label: 'Featured Post', type: 'checkbox' },
      { name: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    title: 'Featured Image',
    fields: [
      { name: 'image', label: 'Post Image', type: 'image' },
      { name: 'altEn', label: 'Alt Text (English)', placeholder: 'Image description' },
      { name: 'altFr', label: 'Alt Text (French)', placeholder: 'Description de l\'image' },
      { name: 'altId', label: 'Alt Text (Indonesian)', placeholder: 'Deskripsi gambar' },
    ],
  },
  {
    title: 'Content - English',
    fields: [
      { name: 'titleEn', label: 'Title (English)', placeholder: 'English title' },
      { name: 'excerptEn', label: 'Excerpt', type: 'textarea', rows: 3, placeholder: 'Brief summary...' },
      { name: 'contentEn', label: 'Full Content', type: 'textarea', rows: 12, placeholder: 'Write your content here...' },
    ],
  },
  {
    title: 'Content - French',
    fields: [
      { name: 'titleFr', label: 'Title (French)', placeholder: 'Titre en français' },
      { name: 'excerptFr', label: 'Excerpt', type: 'textarea', rows: 3 },
      { name: 'contentFr', label: 'Full Content', type: 'textarea', rows: 12 },
    ],
  },
  {
    title: 'Content - Indonesian',
    fields: [
      { name: 'titleId', label: 'Title (Indonesian)', placeholder: 'Judul dalam Bahasa Indonesia' },
      { name: 'excerptId', label: 'Excerpt', type: 'textarea', rows: 3 },
      { name: 'contentId', label: 'Full Content', type: 'textarea', rows: 12 },
    ],
  },
];

export default function NewBlogPostPage() {
  return (
    <AdminForm
      title="Blog Post"
      description="Create a new blog post"
      sections={sections}
      backHref="/admin/blog"
    />
  );
}
