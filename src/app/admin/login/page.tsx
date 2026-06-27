'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* LEFT SIDE - Premium Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1602002418082-a4443978a5bc?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Bali villa with infinity pool at sunset"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay - Subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/40 via-transparent to-[#0F172A]/60" />

        {/* Brand Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Voyage Elegance</h1>
              <p className="text-white/60 text-sm">Admin Portal</p>
            </div>
          </div>

          {/* Headline & Trust Indicators */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white leading-tight">
                Creating Extraordinary<br />Travel Experiences
              </h2>
              <p className="text-white/70 text-base max-w-md leading-relaxed">
                Manage luxury journeys and deliver world-class travel experiences from one elegant platform.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '25+', label: 'Premium Destinations' },
                { number: '5★', label: 'Star Service' },
                { number: '100+', label: 'Countries Served' },
                { number: '99%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <p className="text-2xl font-semibold text-white">{stat.number}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#111827]">Voyage Elegance</span>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[#0F172A]/5 border border-[#E5E7EB] p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-[#111827] mb-2">
                Welcome back
              </h1>
              <p className="text-[#6B7280] text-sm">
                Sign in to your admin account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-[#374151]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-[#374151]">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 px-4 pr-11 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
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
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    remember
                      ? 'bg-[#2563EB] border-[#2563EB]'
                      : 'border-[#D1D5DB] hover:border-[#9CA3AF]'
                  }`}>
                    {remember && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-[#6B7280]">Remember me</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isLoading ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            <a href="/" className="hover:text-[#6B7280] transition-colors">
              ← Back to website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
