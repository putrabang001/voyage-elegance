'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
}

export interface FormSection {
  title?: string;
  description?: string;
  fields: FormField[];
}

export interface AdminFormProps {
  title: string;
  description?: string;
  sections?: FormSection[];
  fields?: FormField[];
  initialData?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  backHref: string;
  isEditing?: boolean;
}

function FormInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const baseClassName = 'w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all';

  if (field.type === 'textarea') {
    return (
      <textarea
        name={field.name}
        value={(value as string) || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        rows={field.rows || 4}
        className={cn(baseClassName, field.className)}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select
        name={field.name}
        value={(value as string) || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={cn(baseClassName, field.className)}
      >
        <option value="">Select...</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={(value as boolean) || false}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
        />
        <span className="text-sm text-[var(--muted-foreground)]">{field.placeholder || 'Enable'}</span>
      </label>
    );
  }

  return (
    <input
      type={field.type || 'text'}
      name={field.name}
      value={(value as string) || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      placeholder={field.placeholder}
      required={field.required}
      className={cn(baseClassName, field.className)}
    />
  );
}

function ImageUpload({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value as string | null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[var(--border)]">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onChange('image', '');
            }}
            className="absolute top-2 right-2 p-2 bg-[var(--error)] text-white rounded-lg hover:bg-[var(--error)]/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] cursor-pointer transition-colors">
          <Upload className="w-8 h-8 text-[var(--muted-foreground)] mb-2" />
          <span className="text-sm text-[var(--muted-foreground)]">Click to upload</span>
          <span className="text-xs text-[var(--muted-foreground)] mt-1">PNG, JPG up to 10MB</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
}

export function AdminForm({
  title,
  description,
  sections,
  fields = [],
  initialData = {},
  onSubmit,
  backHref,
  isEditing = false,
}: AdminFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      router.push(backHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href={backHref}
          className="p-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--muted-foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {isEditing ? 'Edit' : 'Add New'} {title}
          </h1>
          {description && (
            <p className="text-[var(--muted-foreground)] mt-1">{description}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-[var(--error-soft)] border border-[var(--error)]/20">
            <p className="text-sm text-[var(--error)]">{error}</p>
          </div>
        )}

        {sections ? (
          sections.map((section, index) => (
            <div
              key={index}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6"
            >
              {section.title && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      {section.description}
                    </p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div
                    key={field.name}
                    className={cn(
                      field.type === 'textarea' && 'md:col-span-2'
                    )}
                  >
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                      {field.label}
                      {field.required && <span className="text-[var(--error)] ml-1">*</span>}
                    </label>
                    {field.type === 'image' ? (
                      <ImageUpload value={formData[field.name]} onChange={handleChange} />
                    ) : (
                      <FormInput
                        field={field}
                        value={formData[field.name]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={cn(
                    field.type === 'textarea' && 'md:col-span-2'
                  )}
                >
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    {field.label}
                    {field.required && <span className="text-[var(--error)] ml-1">*</span>}
                  </label>
                  {field.type === 'image' ? (
                    <ImageUpload value={formData[field.name]} onChange={handleChange} />
                  ) : (
                    <FormInput
                      field={field}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-4">
          <Link
            href={backHref}
            className="px-6 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018 8 8 8 0 000-16 8 8 0 018 8 8 8 0 000-16" />
              </svg>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
