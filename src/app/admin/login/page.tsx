'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button, Input } from '@/components/ui';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    // Demo login - in production, this would call the API
    if (data.email === 'admin@voyageelegance.com' && data.password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-ocean-400" />
                <path
                  d="M10 20C10 20 15 14 20 14C25 14 30 20 30 20C30 20 25 26 20 26C15 26 10 20 10 20Z"
                  fill="currentColor"
                  className="text-coral-400"
                />
                <circle cx="20" cy="20" r="3" fill="currentColor" className="text-ocean-300" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Voyage Elegance</span>
          </div>
          <p className="text-gray-400">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-ocean-800 rounded-2xl border border-ocean-700 p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 mb-6">Sign in to access the admin dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="admin@voyageelegance.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isSubmitting}
              leftIcon={<LogIn className="w-5 h-5" />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-ocean-700">
            <p className="text-gray-500 text-sm text-center">
              Demo credentials: admin@voyageelegance.com / admin123
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a href="/en" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
