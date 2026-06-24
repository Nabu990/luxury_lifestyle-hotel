'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/protected-route';
import { motion } from 'framer-motion';
import { FaBed, FaCalendarCheck, FaUsers, FaDollarSign, FaStar, FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import { Room, Booking, Review } from '@/lib/types';
import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  getBookings,
  updateBooking,
  deleteBooking,
  getReviews,
  updateReview,
  deleteReview,
  getStats,
  getBookingsByRoom,
} from '@/lib/data-manager';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'bookings' | 'reviews'>('overview');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ totalRooms: 0, totalBookings: 0, totalRevenue: 0, occupancyRate: 0 });
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm, setRoomForm] = useState({ name: '', price: '', description: '', image: '', available: true });
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCustomersModal, setShowCustomersModal] = useState(false);
  const [pricingForm, setPricingForm] = useState<{ roomId: string; price: string }>({ roomId: '', price: '' });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRooms(getRooms());
    setBookings(getBookings());
    setReviews(getReviews());
    setStats(getStats());
  };

  // Room operations
  const handleAddRoom = () => {
    setEditingRoom(null);
    setRoomForm({ name: '', price: '', description: '', image: '', available: true });
    setShowRoomModal(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      name: room.name,
      price: room.price.toString(),
      description: room.description,
      image: room.image,
      available: room.available,
    });
    setShowRoomModal(true);
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      updateRoom(editingRoom.id, {
        name: roomForm.name,
        price: parseInt(roomForm.price),
        description: roomForm.description,
        image: roomForm.image,
        available: roomForm.available,
      });
    } else {
      addRoom({
        name: roomForm.name,
        price: parseInt(roomForm.price),
        description: roomForm.description,
        image: roomForm.image,
        rating: 0,
        amenities: [],
        available: roomForm.available,
      });
    }
    setShowRoomModal(false);
    loadData();
  };

  const handleDeleteRoom = (id: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      deleteRoom(id);
      loadData();
    }
  };

  // Booking operations
  const handleApproveBooking = (id: string) => {
    updateBooking(id, { status: 'confirmed' });
    loadData();
  };

  const handleRejectBooking = (id: string) => {
    if (confirm('Are you sure you want to reject this booking?')) {
      updateBooking(id, { status: 'cancelled' });
      loadData();
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
      loadData();
    }
  };

  // Review operations
  const handleApproveReview = (id: string) => {
    updateReview(id, { approved: true });
    loadData();
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
      loadData();
    }
  };

  const getRoomName = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room?.name || 'Unknown Room';
  };

  const getUserName = (userId: string) => {
    // In a real app, this would fetch from user database
    return 'Guest';
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-midnight px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="section-title mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage rooms, bookings, and reviews</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gold/20 p-3">
                  <FaBed className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalRooms}</p>
                  <p className="text-sm text-slate-400">Total Rooms</p>
                </div>
              </div>
            </div>

            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-500/20 p-3">
                  <FaCalendarCheck className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
                  <p className="text-sm text-slate-400">Active Bookings</p>
                </div>
              </div>
            </div>

            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <FaDollarSign className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-slate-400">Total Revenue</p>
                </div>
              </div>
            </div>

            <div className="card-luxury">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <FaUsers className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.occupancyRate}%</p>
                  <p className="text-sm text-slate-400">Occupancy Rate</p>
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
            <div className="flex gap-4 border-b border-white/10 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('rooms')}
                className={`pb-4 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === 'rooms'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Rooms
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`pb-4 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === 'bookings'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Reviews
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="card-luxury">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <div>
                        <p className="text-sm text-white">New booking from John Doe</p>
                        <p className="text-xs text-slate-500">2 hours ago</p>
                      </div>
                      <span className="text-xs text-gold">Premium Pool View</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <div>
                        <p className="text-sm text-white">Review submitted by Jane Smith</p>
                        <p className="text-xs text-slate-500">5 hours ago</p>
                      </div>
                      <span className="text-xs text-gold">Family Apartment</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm text-white">Room availability updated</p>
                        <p className="text-xs text-slate-500">1 day ago</p>
                      </div>
                      <span className="text-xs text-gold">Executive Suite</span>
                    </div>
                  </div>
                </div>

                <div className="card-luxury">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button onClick={handleAddRoom} className="w-full btn-secondary justify-start">
                      <FaEdit className="mr-2" />
                      Add New Room
                    </button>
                    <button onClick={() => setActiveTab('bookings')} className="w-full btn-secondary justify-start">
                      <FaCalendarCheck className="mr-2" />
                      View All Bookings
                    </button>
                    <button onClick={() => setShowPricingModal(true)} className="w-full btn-secondary justify-start">
                      <FaDollarSign className="mr-2" />
                      Update Pricing
                    </button>
                    <button onClick={() => setShowCustomersModal(true)} className="w-full btn-secondary justify-start">
                      <FaUsers className="mr-2" />
                      Manage Customers
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Room Management</h3>
                  <button onClick={handleAddRoom} className="btn-primary py-2 px-4 text-sm">
                    <FaPlus className="mr-2" />
                    Add Room
                  </button>
                </div>
                {rooms.map((room) => (
                  <div key={room.id} className="card-luxury">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{room.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
                          <span className="font-medium text-gold">${room.price}/night</span>
                          <span>{getBookingsByRoom(room.id)} bookings</span>
                          <span className={room.available ? 'text-green-400' : 'text-red-400'}>
                            {room.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleEditRoom(room)} className="btn-secondary py-2 px-4 text-xs">
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button onClick={() => handleDeleteRoom(room.id)} className="btn-secondary py-2 px-4 text-xs text-red-400 hover:text-red-300">
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Booking Management</h3>
                {bookings.map((booking) => (
                  <div key={booking.id} className="card-luxury">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{getUserName(booking.userId)}</h3>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
                          <span>{getRoomName(booking.roomId)}</span>
                          <span>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
                          <span className="font-medium text-gold">${booking.totalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : booking.status === 'cancelled'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {booking.status}
                        </span>
                        {booking.status === 'pending' && (
                          <>
                            <button onClick={() => handleApproveBooking(booking.id)} className="btn-secondary py-2 px-4 text-xs text-green-400">
                              <FaCheck className="mr-1" />
                              Approve
                            </button>
                            <button onClick={() => handleRejectBooking(booking.id)} className="btn-secondary py-2 px-4 text-xs text-red-400">
                              <FaTimes className="mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDeleteBooking(booking.id)} className="btn-secondary py-2 px-4 text-xs text-red-400 hover:text-red-300">
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Review Management</h3>
                {reviews.map((review) => (
                  <div key={review.id} className="card-luxury">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white">{getUserName(review.userId)}</h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? 'text-gold' : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{review.comment}</p>
                        <p className="text-xs text-slate-500">{getRoomName(review.roomId)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {review.approved ? (
                          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                            Approved
                          </span>
                        ) : (
                          <>
                            <button onClick={() => handleApproveReview(review.id)} className="btn-secondary py-2 px-4 text-xs text-green-400">
                              <FaCheck className="mr-1" />
                              Approve
                            </button>
                            <button onClick={() => handleDeleteReview(review.id)} className="btn-secondary py-2 px-4 text-xs text-red-400">
                              <FaTrash className="mr-1" />
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-luxury max-w-md w-full p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h3>
            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-200">Room Name</label>
                <input
                  type="text"
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                  className="input-field mt-2"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-200">Price per Night ($)</label>
                <input
                  type="number"
                  value={roomForm.price}
                  onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                  className="input-field mt-2"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-200">Description</label>
                <textarea
                  value={roomForm.description}
                  onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                  className="input-field mt-2 min-h-[100px]"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-200">Image URL</label>
                <input
                  type="text"
                  value={roomForm.image}
                  onChange={(e) => setRoomForm({ ...roomForm, image: e.target.value })}
                  className="input-field mt-2"
                  placeholder="/images/room.webp"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={roomForm.available}
                  onChange={(e) => setRoomForm({ ...roomForm, available: e.target.checked })}
                  className="rounded bg-slate-800 border-white/20 text-gold focus:ring-gold"
                />
                <label htmlFor="available" className="text-sm text-slate-200">Available for booking</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowRoomModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {editingRoom ? 'Update' : 'Add'} Room
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-luxury max-w-md w-full p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Update Room Pricing</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (pricingForm.roomId && pricingForm.price) {
                updateRoom(pricingForm.roomId, { price: parseInt(pricingForm.price) });
                setShowPricingModal(false);
                setPricingForm({ roomId: '', price: '' });
                loadData();
              }
            }} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-200">Select Room</label>
                <select
                  value={pricingForm.roomId}
                  onChange={(e) => setPricingForm({ ...pricingForm, roomId: e.target.value })}
                  className="input-field mt-2"
                  required
                >
                  <option value="">Choose a room...</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - ${room.price}/night
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-200">New Price per Night ($)</label>
                <input
                  type="number"
                  value={pricingForm.price}
                  onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })}
                  className="input-field mt-2"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowPricingModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Update Price
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Customers Modal */}
      {showCustomersModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-luxury max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Customer Management</h3>
            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => {
                  const room = rooms.find(r => r.id === booking.roomId);
                  return (
                    <div key={booking.id} className="card-luxury">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-white">Guest ID: {booking.userId}</p>
                          <p className="text-sm text-slate-400">Room: {room?.name || 'Unknown'}</p>
                          <p className="text-sm text-slate-400">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-green-500/20 text-green-400'
                                : booking.status === 'cancelled'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-gold font-medium">${booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-slate-400">
                  No customers found
                </div>
              )}
            </div>
            <div className="mt-6">
              <button onClick={() => setShowCustomersModal(false)} className="btn-secondary w-full">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </ProtectedRoute>
  );
}
