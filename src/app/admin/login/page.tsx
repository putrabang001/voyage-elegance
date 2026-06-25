'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Waves, Sparkles, MapPin, Ship, Palmtree, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(redirect);
      } else {
        setError(data.error || 'Invalid credentials. Please check your email and password.');
        setIsLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* LEFT PANEL - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Luxury tropical beach"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/90 via-[var(--secondary)]/70 to-[var(--primary)]/60" />
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-[var(--accent)]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          {/* Logo + Theme Toggle */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                <Waves className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Voyage Elegance</h1>
                <p className="text-[var(--accent)]/80 text-sm">Admin Portal</p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <Sun className={cn('w-5 h-5 transition-all duration-300', theme === 'dark' && 'rotate-90 scale-0 opacity-0 absolute')} />
              <Moon className={cn('w-5 h-5 transition-all duration-300', theme === 'light' && 'rotate-90 scale-0 opacity-0 absolute')} />
            </button>
          </div>

          {/* Headline */}
          <div className="max-w-xl mb-8">
            <h2 className="text-5xl font-bold text-white leading-tight mb-4">
              Creating Extraordinary{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--primary-light)]">
                Travel Experiences
              </span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Manage luxury journeys and world-class client experiences from one beautiful platform.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Ship className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-white font-medium">Premium Tours</p>
                <p className="text-xs text-white/50">Luxury experiences</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-white font-medium">25+ Destinations</p>
                <p className="text-xs text-white/50">Worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-white font-medium">Elite Service</p>
                <p className="text-xs text-white/50">5-star support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4">
          <Palmtree className="w-12 h-12 text-white/20" />
          <Ship className="w-16 h-16 text-white/10" />
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo + Theme */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--foreground)]">Voyage Elegance</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted-foreground)]/20 transition-colors"
            >
              <Sun className={cn('w-5 h-5 transition-all duration-300', theme === 'dark' && 'rotate-90 scale-0 opacity-0 absolute')} />
              <Moon className={cn('w-5 h-5 transition-all duration-300', theme === 'light' && 'rotate-90 scale-0 opacity-0 absolute')} />
            </button>
          </div>

          {/* Card */}
          <div className="bg-[var(--card)] rounded-3xl shadow-xl shadow-black/5 border border-[var(--border)] p-8">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Welcome back</h2>
              <p className="text-[var(--muted-foreground)] mt-1">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-[var(--error-soft)] border border-[var(--error)]/20">
                  <p className="text-sm text-[var(--error)]">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@voyageelegance.com"
                  className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[var(--foreground)]">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 px-4 pr-12 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <label htmlFor="remember" className="text-sm text-[var(--muted-foreground)]">
                  Keep me signed in
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018 8 8 8 0 000-16 8 8 0 018 8 8 8 0 000-16 8 8 0 018 8 8 8 0 01-16-16 8 8 0 0116 8 8 8 0 0116-8z"
                    />
                  </svg>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--muted-foreground)] text-center mb-3">
                Demo credentials
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <code className="px-2 py-1 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                  admin@voyageelegance.com
                </code>
                <span className="text-[var(--border)]">/</span>
                <code className="px-2 py-1 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                  admin123
                </code>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
            <a href="/en" className="hover:text-[var(--foreground)] transition-colors">
              ← Back to website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
