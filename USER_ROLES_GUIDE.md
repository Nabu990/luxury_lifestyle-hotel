# User Roles & Authentication System

## Overview
This hotel website now includes a complete authentication and role-based access control system with three user types: guests, signed-in users, and hotel staff/admin.

## User Roles & Permissions

### Visitors (Not Signed In)
**Can:**
- View the home page
- Browse rooms and prices
- See amenities and photos
- Read reviews
- Contact the hotel
- Search room availability
- Start the booking process (request availability)

**Cannot:**
- Complete instant bookings
- Save favorite rooms
- View booking history
- Leave reviews

### Signed-In Users
**Can:**
- All guest permissions PLUS:
- Book rooms instantly
- View and manage their bookings
- Cancel reservations
- Save favorite rooms
- Leave reviews and ratings
- Receive special offers or discounts
- Update profile information
- Access user dashboard

### Hotel Staff/Admin
**Can:**
- All user permissions PLUS:
- Add, edit, and delete rooms
- Manage bookings (approve/reject)
- View customer information
- Approve or remove reviews
- Update prices and availability
- View revenue and occupancy statistics
- Access admin dashboard

## Demo Accounts

### Admin Account
- Email: `admin@hotel.com`
- Password: (any password works in demo)
- Role: Admin

### User Account
- Email: `user@example.com`
- Password: (any password works in demo)
- Role: User

## Pages & Routes

### Public Pages
- `/` - Home page (accessible to all)
- `/signin` - Sign in page
- `/signup` - Sign up page

### Protected Pages (Require Authentication)
- `/dashboard` - User dashboard (requires user role)
- `/favorites` - Favorite rooms (requires user role)
- `/admin` - Admin dashboard (requires admin role)

## Key Components

### Authentication Context (`/lib/auth-context.tsx`)
- Manages user authentication state
- Provides sign in, sign up, sign out functions
- Role checking utilities
- Session persistence via localStorage

### Protected Route Component (`/components/protected-route.tsx`)
- Wraps protected pages
- Redirects unauthenticated users to sign in
- Enforces role-based access control

### Navigation Component (`/components/navigation.tsx`)
- Responsive navigation bar
- Shows different options based on user role
- Mobile menu support

### User Dashboard (`/app/dashboard/page.tsx`)
- View booking history
- Manage reviews
- Update profile settings
- Booking statistics

### Admin Dashboard (`/app/admin/page.tsx`)
- Room management (CRUD)
- Booking management (approve/reject)
- Review moderation
- Revenue and occupancy statistics
- Quick actions

### Favorites System (`/app/favorites/page.tsx`)
- Save favorite rooms
- Quick booking from favorites
- Remove favorites

### Review System (`/components/review-section.tsx`)
- Leave reviews (signed-in users only)
- Star rating system
- Admin approval required for visibility
- Display approved reviews

## Implementation Notes

### Current State
- Uses mock authentication (localStorage-based)
- Demo accounts are hardcoded
- No real backend integration yet
- Data is stored in-memory

### Production Requirements
To make this production-ready, you'll need:
1. Real authentication backend (NextAuth.js, Firebase Auth, etc.)
2. Database integration (PostgreSQL, MongoDB, etc.)
3. API routes for CRUD operations
4. Secure session management
5. Payment integration for bookings
6. Email notifications
7. Real-time availability updates

### TypeScript Configuration
- Path aliases configured (`@/*` maps to project root)
- Type definitions for all user roles and data structures

## How to Use

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test as guest:**
   - Browse the homepage
   - Try to book (will show "Request Availability")
   - Try to access dashboard (will redirect to sign in)

3. **Test as user:**
   - Sign in with `user@example.com`
   - Access dashboard at `/dashboard`
   - Try booking (will show "Book Now")
   - Add favorites
   - Leave a review

4. **Test as admin:**
   - Sign in with `admin@hotel.com`
   - Access admin panel at `/admin`
   - Manage rooms, bookings, and reviews
   - View statistics

## Customization

### Adding New Roles
Edit `/lib/types.ts` to add new user roles:
```typescript
export type UserRole = 'guest' | 'user' | 'admin' | 'new_role';
```

### Modifying Permissions
Update the navigation component and protected routes to include/exclude features based on roles.

### Styling
All components use the existing luxury theme with:
- Gold accent colors
- Dark midnight background
- Consistent card and button styles
- Framer Motion animations
