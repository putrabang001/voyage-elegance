'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, Ship, ChevronRight, Layers } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'admin@voyageelegance.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-ocean-700 to-coral-600" />
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-coral-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <Ship className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Voyage Elegance</h1>
              <p className="text-ocean-200">Admin Portal</p>
            </div>
          </div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Welcome to<br />your command center
          </h2>
          <p className="text-xl text-ocean-200 max-w-md">
            Manage your ocean adventures, destinations, and bookings from one beautiful dashboard.
          </p>
          <div className="mt-12 flex items-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">25+</div>
              <div className="text-ocean-200 text-sm">Destinations</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold">5K+</div>
              <div className="text-ocean-200 text-sm">Travelers</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold">99%</div>
              <div className="text-ocean-200 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Voyage Elegance</span>
          </div>

          {/* Form Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Sign in</h2>
              <p className="text-gray-400">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@voyageelegance.com"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in to Dashboard
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-500 text-sm mb-3">Demo credentials</p>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <span className="px-2 py-1 bg-white/5 rounded">admin@voyageelegance.com</span>
                <span>/</span>
                <span className="px-2 py-1 bg-white/5 rounded">admin123</span>
              </div>
            </div>
          </div>

          {/* Back to Website */}
          <div className="text-center mt-6">
            <a href="/en" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
