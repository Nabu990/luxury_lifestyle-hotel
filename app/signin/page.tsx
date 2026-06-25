'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card-luxury">
          <div className="mb-8 text-center">
            <h1 className="section-title mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-200">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mt-2"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field mt-2"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-gold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-500 mb-3 text-center">Demo Accounts:</p>
            <div className="space-y-2 text-xs text-slate-400">
              <p>Admin: admin@hotel.com</p>
              <p>User: user@example.com</p>
              <p>Password: (any)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
