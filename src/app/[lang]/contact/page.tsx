'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button, Input, Textarea, useToast } from '@/components/ui';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  destination: z.string().optional(),
  tour: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const destinations = [
  { value: '', label: 'Select Destination (Optional)' },
  { value: 'maldives', label: 'Maldives' },
  { value: 'raja-ampat', label: 'Raja Ampat' },
  { value: 'palawan', label: 'Palawan' },
  { value: 'fiji', label: 'Fiji Islands' },
  { value: 'bora-bora', label: 'Bora Bora' },
  { value: 'komodo', label: 'Komodo National Park' },
];

export default function ContactPage() {
  const { t } = useI18n();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    addToast('Message sent successfully!', 'success');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Contact"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/70 to-ocean-900/40" />
        </div>

        <div className="relative z-10 container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-8">{t('contact.info.address')}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-ocean-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{t('contact.info.email')}</h3>
                    <p className="text-gray-400">hello@voyageelegance.com</p>
                    <p className="text-gray-400">support@voyageelegance.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-ocean-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{t('contact.info.phone')}</h3>
                    <p className="text-gray-400">+65 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-ocean-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{t('contact.info.whatsapp')}</h3>
                    <p className="text-gray-400">+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-ocean-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{t('contact.info.address')}</h3>
                    <p className="text-gray-400">Singapore</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-ocean-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{t('contact.info.hours')}</h3>
                    <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-400">Sat - Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-ocean-800/50 rounded-2xl p-8 border border-ocean-700/50">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{t('common.success')}</h3>
                    <p className="text-gray-400 mb-6">{t('contact.success')}</p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">{t('inquiry.title')}</h2>
                    <p className="text-gray-400 mb-8">{t('inquiry.subtitle')}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label={t('contact.form.name')}
                          placeholder="John Doe"
                          required
                          error={errors.name?.message}
                          {...register('name')}
                        />
                        <Input
                          label={t('contact.form.email')}
                          type="email"
                          placeholder="john@example.com"
                          required
                          error={errors.email?.message}
                          {...register('email')}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label={t('contact.form.phone')}
                          type="tel"
                          placeholder="+62 812 xxxx xxxx"
                          {...register('phone')}
                        />
                        <div>
                          <label className="form-label">{t('contact.form.destination')}</label>
                          <select
                            className="form-input"
                            {...register('destination')}
                          >
                            {destinations.map((dest) => (
                              <option key={dest.value} value={dest.value}>
                                {dest.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <Textarea
                        label={t('contact.form.message')}
                        placeholder="Tell us about your dream vacation..."
                        required
                        error={errors.message?.message}
                        {...register('message')}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto"
                        isLoading={isSubmitting}
                        leftIcon={<Send className="w-5 h-5" />}
                      >
                        {t('common.send')}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-ocean-800/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">{t('contact.mapTitle')}</h2>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255175.89285944858!2d103.6058271!3d1.3149444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a0f0b1c1d1%3A0x7b7b7b7b7b7b7b7b!2sSingapore!5e0!3m2!1sen!2ssg!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
