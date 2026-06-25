export type UserRole = 'guest' | 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  amenities: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  roomId: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  roomId: string;
  createdAt: Date;
}
