'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  approved?: boolean;
}

interface ReviewSectionProps {
  roomId: string;
  roomName: string;
  existingReviews?: Review[];
}

export default function ReviewSection({ roomId, roomName, existingReviews = [] }: ReviewSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || rating === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        userName: user?.name || 'Anonymous',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0],
        approved: false, // Reviews need admin approval
      };

      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  const approvedReviews = reviews.filter(r => r.approved !== false);

  return (
    <div className="space-y-8">
      {/* Review Form - Only for signed-in users */}
      {isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-luxury"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-200 mb-3 block">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl transition hover:scale-110"
                  >
                    {star <= rating ? (
                      <FaStar className="text-gold" />
                    ) : (
                      <FaRegStar className="text-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200 mb-2 block">Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-field min-h-[120px]"
                placeholder="Share your experience with this room..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>

            <p className="text-xs text-slate-500 text-center">
              Your review will be visible after admin approval
            </p>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-luxury text-center py-8"
        >
          <p className="text-slate-400 mb-4">Sign in to leave a review</p>
          <a href="/signin" className="btn-primary inline-flex">
            Sign In to Review
          </a>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Guest Reviews</h3>
        
        {approvedReviews.length > 0 ? (
          approvedReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-luxury"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{review.userName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-gold' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500">{review.date}</p>
              </div>
              <p className="text-sm text-slate-300">{review.comment}</p>
            </motion.div>
          ))
        ) : (
          <div className="card-luxury text-center py-8">
            <p className="text-slate-400">No reviews yet</p>
            <p className="text-sm text-slate-500 mt-2">Be the first to review this room!</p>
          </div>
        )}
      </div>
    </div>
  );
}
