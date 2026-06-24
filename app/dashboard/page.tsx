'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/protected-route';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaHeart, FaStar, FaUser, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Mock booking data
const mockBookings = [
  {
    id: '1',
    roomName: 'Premium Pool View',
    checkIn: '2024-07-15',
    checkOut: '2024-07-18',
    guests: 2,
    status: 'confirmed',
    totalPrice: 288,
  },
  {
    id: '2',
    roomName: 'Executive Suite',
    checkIn: '2024-08-01',
    checkOut: '2024-08-05',
    guests: 2,
    status: 'pending',
    totalPrice: 1188,
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    roomName: 'Premium Pool View',
    rating: 5,
    comment: 'Absolutely stunning room with amazing pool views!',
    date: '2024-06-20',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews' | 'profile'>('bookings');

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-midnight px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="section-title mb-2">Welcome back, {user?.name}</h1>
            <p className="text-slate-400">Manage your bookings, reviews, and preferences</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 mb-8 sm:grid-cols-3"
          >
            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gold/20 p-3">
                  <FaCalendarAlt className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{mockBookings.length}</p>
                  <p className="text-sm text-slate-400">Total Bookings</p>
                </div>
              </div>
            </div>

            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-500/20 p-3">
                  <FaCheckCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {mockBookings.filter(b => b.status === 'confirmed').length}
                  </p>
                  <p className="text-sm text-slate-400">Confirmed</p>
                </div>
              </div>
            </div>

            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <FaStar className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{mockReviews.length}</p>
                  <p className="text-sm text-slate-400">Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex gap-4 border-b border-white/10">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`pb-4 text-sm font-medium transition ${
                  activeTab === 'bookings'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 text-sm font-medium transition ${
                  activeTab === 'reviews'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                My Reviews
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-4 text-sm font-medium transition ${
                  activeTab === 'profile'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Profile Settings
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="card-luxury">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{booking.roomName}</h3>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-xs" />
                            {booking.checkIn} - {booking.checkOut}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaUser className="text-xs" />
                            {booking.guests} guests
                          </span>
                          <span className="font-medium text-gold">${booking.totalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {booking.status}
                        </span>
                        {booking.status === 'pending' && (
                          <button className="btn-secondary py-2 px-4 text-xs">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {mockBookings.length === 0 && (
                  <div className="card-luxury text-center py-12">
                    <p className="text-slate-400">No bookings yet</p>
                    <a href="#book" className="btn-primary mt-4 inline-flex">
                      Book Your First Stay
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="card-luxury">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{review.roomName}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-gold' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-slate-300">{review.comment}</p>
                        <p className="mt-2 text-xs text-slate-500">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {mockReviews.length === 0 && (
                  <div className="card-luxury text-center py-12">
                    <p className="text-slate-400">No reviews yet</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Leave a review after your stay to help other guests
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="card-luxury">
                <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-200">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="input-field mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-200">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="input-field mt-2"
                      disabled
                    />
                  </div>
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
