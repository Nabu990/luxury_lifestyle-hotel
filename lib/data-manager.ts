import { Room, Booking, Review } from './types';

const STORAGE_KEYS = {
  ROOMS: 'hotel_rooms',
  BOOKINGS: 'hotel_bookings',
  REVIEWS: 'hotel_reviews',
};

// Initial data
const initialRooms: Room[] = [
  {
    id: '1',
    name: 'Premium Pool View',
    price: 96,
    description: 'Elegant room with private balcony and pool access.',
    image: '/images/room.webp',
    rating: 4.8,
    amenities: ['Pool Access', 'Balcony', 'WiFi', 'AC', 'Mini Bar'],
    available: true,
  },
  {
    id: '2',
    name: 'Family Apartment',
    price: 252,
    description: 'Spacious suite with kitchenette and living area.',
    image: '/images/hotel-view.webp',
    rating: 4.9,
    amenities: ['Kitchenette', 'Living Area', 'WiFi', 'AC', '2 Bedrooms'],
    available: true,
  },
  {
    id: '3',
    name: 'Executive Suite',
    price: 297,
    description: 'Luxury suite with premium amenities and privacy.',
    image: '/images/vip-bar.webp',
    rating: 5.0,
    amenities: ['King Bed', 'Jacuzzi', 'WiFi', 'AC', 'Mini Bar', 'Ocean View'],
    available: false,
  },
];

const initialBookings: Booking[] = [
  {
    id: '1',
    userId: '2',
    roomId: '1',
    checkIn: new Date('2024-07-15'),
    checkOut: new Date('2024-07-18'),
    guests: 2,
    status: 'confirmed',
    totalPrice: 288,
    createdAt: new Date('2024-06-20'),
  },
  {
    id: '2',
    userId: '2',
    roomId: '3',
    checkIn: new Date('2024-08-01'),
    checkOut: new Date('2024-08-05'),
    guests: 2,
    status: 'pending',
    totalPrice: 1188,
    createdAt: new Date('2024-06-25'),
  },
];

const initialReviews: Review[] = [
  {
    id: '1',
    userId: '2',
    roomId: '1',
    rating: 5,
    comment: 'Absolutely stunning room with amazing pool views!',
    approved: true,
    createdAt: new Date('2024-06-20'),
  },
  {
    id: '2',
    userId: '2',
    roomId: '2',
    rating: 4,
    comment: 'Great space for families, very comfortable.',
    approved: false,
    createdAt: new Date('2024-06-22'),
  },
];

// Generic storage functions
function getFromStorage<T>(key: string, defaultData: T): T {
  if (typeof window === 'undefined') return defaultData;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultData;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}

// Room functions
export function getRooms(): Room[] {
  return getFromStorage<Room[]>(STORAGE_KEYS.ROOMS, initialRooms);
}

export function saveRooms(rooms: Room[]): void {
  saveToStorage(STORAGE_KEYS.ROOMS, rooms);
}

export function addRoom(room: Omit<Room, 'id'>): Room {
  const rooms = getRooms();
  const newRoom: Room = {
    ...room,
    id: Date.now().toString(),
  };
  rooms.push(newRoom);
  saveRooms(rooms);
  return newRoom;
}

export function updateRoom(id: string, updates: Partial<Room>): Room | null {
  const rooms = getRooms();
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return null;
  rooms[index] = { ...rooms[index], ...updates };
  saveRooms(rooms);
  return rooms[index];
}

export function deleteRoom(id: string): boolean {
  const rooms = getRooms();
  const filtered = rooms.filter(r => r.id !== id);
  if (filtered.length === rooms.length) return false;
  saveRooms(filtered);
  return true;
}

// Booking functions
export function getBookings(): Booking[] {
  return getFromStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
}

export function saveBookings(bookings: Booking[]): void {
  saveToStorage(STORAGE_KEYS.BOOKINGS, bookings);
}

export function addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  bookings.push(newBooking);
  saveBookings(bookings);
  return newBooking;
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates };
  saveBookings(bookings);
  return bookings[index];
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  if (filtered.length === bookings.length) return false;
  saveBookings(filtered);
  return true;
}

export function getBookingsByRoom(roomId: string): number {
  const bookings = getBookings();
  return bookings.filter(b => b.roomId === roomId).length;
}

// Review functions
export function getReviews(): Review[] {
  return getFromStorage<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
}

export function saveReviews(reviews: Review[]): void {
  saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
}

export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  reviews.push(newReview);
  saveReviews(reviews);
  return newReview;
}

export function updateReview(id: string, updates: Partial<Review>): Review | null {
  const reviews = getReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], ...updates };
  saveReviews(reviews);
  return reviews[index];
}

export function deleteReview(id: string): boolean {
  const reviews = getReviews();
  const filtered = reviews.filter(r => r.id !== id);
  if (filtered.length === reviews.length) return false;
  saveReviews(filtered);
  return true;
}

export function getReviewsByRoom(roomId: string): Review[] {
  const reviews = getReviews();
  return reviews.filter(r => r.roomId === roomId && r.approved);
}

// Statistics
export function getStats() {
  const rooms = getRooms();
  const bookings = getBookings();
  const reviews = getReviews();
  
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalBookings = bookings.length;
  const totalRooms = rooms.length;
  
  // Calculate occupancy rate (simplified)
  const occupancyRate = totalRooms > 0 ? Math.round((confirmedBookings.length / totalRooms) * 100) : 0;
  
  return {
    totalRooms,
    totalBookings,
    totalRevenue,
    occupancyRate,
  };
}
