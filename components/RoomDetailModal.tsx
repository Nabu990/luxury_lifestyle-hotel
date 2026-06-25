'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaWifi, FaTv, FaSnowflake, FaCoffee, FaBath, FaBed, FaUser, FaCalendar, FaUserFriends } from 'react-icons/fa';
import Room360Viewer from './Room360Viewer';

interface Room {
  name: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  amenities: string[];
  size: string;
  capacity: number;
}

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  const [show360View, setShow360View] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    name: '',
    email: '',
    phone: '',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  if (!room) return null;

  const amenityIcons: { [key: string]: JSX.Element } = {
    'WiFi': <FaWifi />,
    'TV': <FaTv />,
    'Air Conditioning': <FaSnowflake />,
    'Coffee Maker': <FaCoffee />,
    'Bathtub': <FaBath />,
    'King Bed': <FaBed />,
    'Capacity': <FaUser />,
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const total = calculateTotalPrice();
    const nights = getNumberOfNights();
    
    const bookingPayload = {
      roomName: room.name,
      price: room.price,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      total,
      nights,
    };

    console.log('Booking submitted:', bookingPayload);
    
    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        setBookingSubmitted(true);
        setTimeout(() => {
          setBookingSubmitted(false);
          setShowBookingForm(false);
          onClose();
        }, 3000);
      } else {
        console.error('Failed to send booking email');
        alert('There was an error processing your booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) return 0;
    
    const pricePerNight = parseInt(room.price.replace(/[^0-9]/g, ''));
    return pricePerNight * nights;
  };

  const getNumberOfNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !show360View && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              <div className="relative h-80">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-bold text-white mb-2">{room.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(room.rating) ? 'text-gold' : 'text-slate-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-white/80 text-sm">({room.rating})</span>
                  </div>
                  <p className="text-3xl font-bold text-gold">{room.price}<span className="text-lg text-white/80">/night</span></p>
                </div>
              </div>

              <div className="p-8">
                {!showBookingForm ? (
                  <>
                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => setShow360View(true)}
                        className="flex-1 bg-gold hover:bg-gold/90 text-midnight font-semibold py-3 rounded-xl transition-colors"
                      >
                        🔄 View 360° Tour
                      </button>
                      <button
                        onClick={handleBookNow}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        Book Now
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Room Details</h3>
                        <p className="text-slate-400 leading-relaxed mb-4">{room.description}</p>
                        <div className="flex gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <FaBed className="text-gold" />
                            <span>{room.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaUser className="text-gold" />
                            <span>{room.capacity} guests</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 text-slate-400 text-sm">
                              {amenityIcons[amenity] || <span className="text-gold">•</span>}
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">Book {room.name}</h3>
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        ← Back to Details
                      </button>
                    </div>

                    {bookingSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/20 border border-green-500 rounded-2xl p-6 text-center"
                      >
                        <p className="text-green-400 text-lg font-semibold mb-2">Booking Request Submitted!</p>
                        <p className="text-slate-400">We'll confirm your reservation via email shortly.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              <FaCalendar className="inline mr-2" />Check-in Date
                            </label>
                            <input
                              type="date"
                              name="checkIn"
                              required
                              value={bookingData.checkIn}
                              onChange={handleBookingChange}
                              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              <FaCalendar className="inline mr-2" />Check-out Date
                            </label>
                            <input
                              type="date"
                              name="checkOut"
                              required
                              value={bookingData.checkOut}
                              onChange={handleBookingChange}
                              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            <FaUserFriends className="inline mr-2" />Number of Guests
                          </label>
                          <select
                            name="guests"
                            required
                            value={bookingData.guests}
                            onChange={handleBookingChange}
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                          >
                            {[...Array(room.capacity)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1} Guest{i !== 0 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={bookingData.name}
                            onChange={handleBookingChange}
                            placeholder="Enter your full name"
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={bookingData.email}
                            onChange={handleBookingChange}
                            placeholder="your@email.com"
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={bookingData.phone}
                            onChange={handleBookingChange}
                            placeholder="+231 XXX XXX XXX"
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400">Room Rate</span>
                            <span className="text-white font-semibold">{room.price}/night</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400">Number of Nights</span>
                            <span className="text-white font-semibold">{getNumberOfNights()} night{getNumberOfNights() !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Total (estimated)</span>
                            <span className="text-gold font-bold text-xl">${calculateTotalPrice()}</span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gold hover:bg-gold/90 text-midnight font-bold py-4 rounded-xl transition-colors"
                        >
                          Confirm Booking
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {show360View && (
        <Room360Viewer imageUrl={room.image} onClose={() => setShow360View(false)} />
      )}
    </>
  );
}
