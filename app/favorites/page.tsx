'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/protected-route';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaArrowRight, FaStar } from 'react-icons/fa';
import Image from 'next/image';

// Mock favorite rooms data
const mockFavoriteRooms = [
  {
    id: '1',
    name: 'Premium Pool View',
    price: '$96',
    description: 'Elegant room with private balcony and pool access.',
    image: '/images/room.webp',
    rating: 4.8,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Executive Suite',
    price: '$297',
    description: 'Luxury suite with premium amenities and privacy.',
    image: '/images/vip-bar.webp',
    rating: 5.0,
    isFavorite: true,
  },
];

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(mockFavoriteRooms);

  const toggleFavorite = (roomId: string) => {
    setFavorites(favorites.map(room => 
      room.id === roomId 
        ? { ...room, isFavorite: !room.isFavorite }
        : room
    ).filter(room => room.isFavorite));
  };

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
            <h1 className="section-title mb-2">My Favorites</h1>
            <p className="text-slate-400">Your saved rooms for future bookings</p>
          </motion.div>

          {/* Favorites Grid */}
          {favorites.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {favorites.map((room, idx) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="card-luxury overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden rounded-lg bg-slate-900 mb-4">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <button
                      onClick={() => toggleFavorite(room.id)}
                      className="absolute top-4 right-4 rounded-full bg-midnight/80 p-2 text-gold hover:bg-midnight transition"
                    >
                      <FaHeart className="h-5 w-5" />
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="section-subtitle">{room.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(room.rating) ? 'text-gold' : 'text-slate-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">{room.price}<span className="text-lg text-slate-400">/night</span></p>
                    <p className="text-sm leading-relaxed text-slate-400">{room.description}</p>
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 rounded-lg bg-gold/10 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-midnight">
                        Book Now
                      </button>
                      <button className="rounded-lg border border-white/10 bg-slate-900/80 py-3 px-4 text-sm font-semibold text-white transition hover:bg-slate-900/95">
                        <FaArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-luxury text-center py-16"
            >
              <div className="mb-6">
                <FaRegHeart className="mx-auto h-16 w-16 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
              <p className="text-slate-400 mb-6">
                Start saving rooms you love by clicking the heart icon on any room
              </p>
              <a href="#experience" className="btn-primary inline-flex">
                Browse Rooms
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
