'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { FaUser, FaSignOutAlt, FaHeart, FaCalendarAlt, FaCog, FaShieldAlt } from 'react-icons/fa';

export default function Navigation() {
  const { user, isAuthenticated, signOut, hasRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-midnight/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-white">
            <span className="text-gold">Lifestyle</span> Luxury
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-slate-300 hover:text-gold transition">
              Home
            </Link>
            <Link href="#experience" className="text-sm text-slate-300 hover:text-gold transition">
              Rooms
            </Link>
            <Link href="#book" className="text-sm text-slate-300 hover:text-gold transition">
              Book
            </Link>

            {isAuthenticated ? (
              <>
                {hasRole('user') && (
                  <>
                    <Link href="/dashboard" className="text-sm text-slate-300 hover:text-gold transition">
                      Dashboard
                    </Link>
                    <Link href="/favorites" className="text-sm text-slate-300 hover:text-gold transition flex items-center gap-1">
                      <FaHeart className="text-xs" />
                      Favorites
                    </Link>
                  </>
                )}
                {hasRole('admin') && (
                  <Link href="/admin" className="text-sm text-slate-300 hover:text-gold transition flex items-center gap-1">
                    <FaShieldAlt className="text-xs" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400">{user?.name}</span>
                  <button
                    onClick={signOut}
                    className="text-sm text-slate-300 hover:text-gold transition flex items-center gap-1"
                  >
                    <FaSignOutAlt className="text-xs" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/signin" className="text-sm text-slate-300 hover:text-gold transition">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary py-2 px-4 text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm text-slate-300 hover:text-gold transition">
                Home
              </Link>
              <Link href="#experience" className="text-sm text-slate-300 hover:text-gold transition">
                Rooms
              </Link>
              <Link href="#book" className="text-sm text-slate-300 hover:text-gold transition">
                Book
              </Link>

              {isAuthenticated ? (
                <>
                  {hasRole('user') && (
                    <>
                      <Link href="/dashboard" className="text-sm text-slate-300 hover:text-gold transition">
                        Dashboard
                      </Link>
                      <Link href="/favorites" className="text-sm text-slate-300 hover:text-gold transition">
                        Favorites
                      </Link>
                    </>
                  )}
                  {hasRole('admin') && (
                    <Link href="/admin" className="text-sm text-slate-300 hover:text-gold transition">
                      Admin Panel
                    </Link>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm text-slate-400">{user?.name}</span>
                    <button
                      onClick={signOut}
                      className="text-sm text-slate-300 hover:text-gold transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                  <Link href="/signin" className="text-sm text-slate-300 hover:text-gold transition">
                    Sign In
                  </Link>
                  <Link href="/signup" className="btn-primary py-2 px-4 text-sm text-center">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
