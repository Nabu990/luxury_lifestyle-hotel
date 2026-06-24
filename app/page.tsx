'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaMapMarkerAlt, FaUmbrellaBeach, FaArrowRight, FaStar } from 'react-icons/fa';
import { useAuth } from '@/lib/auth-context';


// Data structures
const stats = [
  { label: 'Luxury Rooms', value: '21', icon: '🛏️' },
  { label: 'Rooftop Bar', value: '1', icon: '🍸' },
  { label: 'Min to Stadium', value: '7', icon: '⏱️' },
  { label: 'Concierge', value: '24/7', icon: '👤' },
];

const features = [
  {
    title: 'Elegant Web Design',
    description: 'Mobile-first, SEO-optimized pages showcasing 360° tours and cinematic videos.',
    icon: '✨',
  },
  {
    title: 'AI Booking Assistant',
    description: 'GPT-powered WhatsApp and voice integration for instant guest support.',
    icon: '🤖',
  },
  {
    title: 'Direct Bookings',
    description: 'Premium experience that converts site visitors into confirmed reservations.',
    icon: '📅',
  },
];

const roomCards = [
  {
    name: 'Premium Pool View',
    price: '$96',
    description: 'Elegant room with private balcony and pool access.',
    image: '/images/room.webp',
    rating: 4.8,
  },
  {
    name: 'Family Apartment',
    price: '$252',
    description: 'Spacious suite with kitchenette and living area.',
    image: '/images/hotel-view.webp',
    rating: 4.9,
  },
  {
    name: 'Executive Suite',
    price: '$297',
    description: 'Luxury suite with premium amenities and privacy.',
    image: '/images/vip-bar.webp',
    rating: 5.0,
  },
];

const gallery = [
  { src: '/images/front-view.jpg', alt: 'Hotel front view', caption: 'Grand Entrance' },
  { src: '/images/bar-day.webp', alt: 'Daytime bar area', caption: 'Rooftop Lounge' },
  { src: '/images/room.webp', alt: 'Hotel room interior', caption: 'Suite Interiors' },
  { src: '/images/vip-bar.webp', alt: 'VIP bar lounge', caption: 'VIP Bar' },
];

const amenities = [
  { title: '360° Room Tours', description: 'Immersive virtual exploration of every space' },
  { title: 'Cinematic Videos', description: 'Professional storytelling of your atmosphere' },
  { title: 'Multi-Language', description: 'Reach guests across all regions' },
  { title: 'Live Availability', description: 'Real-time booking and pricing updates' },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startVoiceRecognition = () => {
    if (!recognitionRef.current) return;
    setVoiceTranscript('');
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopVoiceRecognition = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const speakVoicePrompt = () => {
    if (typeof window === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(
      'Welcome to Lifestyle Luxury Hotel & Residence. Please say your booking dates, room preferences, or ask for more details about our amenities.'
    );
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-midnight text-pearl">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center"
          >
            {/* Hero Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-gold border border-gold/30">
                  ✨ Luxury Living
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="section-title leading-tight"
              >
                Modern Boutique Luxury in Monrovia
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="max-w-xl text-lg leading-relaxed text-slate-300"
              >
                Experience sophisticated elegance with our signature rooftop bar, refined European design, and curated outdoor lifestyle. A hotel that makes lasting impressions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row pt-6"
              >
                <a href="#book" className="btn-primary">
                  View Availability
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#experience" className="btn-secondary">
                  Explore Experience
                </a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10"
              >
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <p className="text-3xl font-bold text-gold">{stat.value}</p>
                    <p className="text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden rounded-[40px] border border-white/20 shadow-glow">
                <Image
                  src="/images/front-view.jpg"
                  alt="Hotel front view"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -left-8 max-w-xs rounded-2xl border border-white/20 bg-midnight/95 p-6 backdrop-blur-xl shadow-xl"
              >
                <p className="text-sm uppercase tracking-widest text-gold mb-2">Featured Amenity</p>
                <p className="text-lg font-semibold text-white">VIP Rooftop Bar & Lounge</p>
                <p className="mt-2 text-sm text-slate-300">Experience sunset views with crafted cocktails</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 sm:grid-cols-3"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="card-luxury"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <p className="section-subtitle">Visual Highlights</p>
          <h2 className="section-title">Experience Through Curated Imagery</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
            Explore our rooftop bar, poolside suites, and refined interiors through professional photography.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((image, idx) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group overflow-hidden rounded-[24px] border border-white/10 shadow-lg"
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent" />
              </div>
              <div className="border-t border-white/10 bg-slate-950/80 px-5 py-4">
                <p className="font-medium text-white">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rooms Section */}
      <section id="experience" className="border-y border-white/10 bg-slate-950/40 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4"
          >
            <p className="section-subtitle">Accommodations</p>
            <h2 className="section-title">Premium Room Options</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {roomCards.map((room, idx) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  <button className="mt-6 w-full rounded-lg bg-gold/10 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-midnight">
                    View Room Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <p className="section-subtitle">Why Choose Us</p>
          <h2 className="section-title">Premium Amenities & Services</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity, idx) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition"
            >
              <h3 className="font-semibold text-white">{amenity.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Booking Assistant Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <p className="section-subtitle">Smart Technology</p>
          <h2 className="section-title">AI Booking Assistant</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
            Powered by GPT technology, our AI assistant provides instant support via WhatsApp and voice for a seamless booking experience 24/7.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* WhatsApp Integration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-luxury"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-lg bg-green-500/20 p-3">
                <svg className="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.718.738 5.33 2.139 7.592l-2.261 6.541 6.718-1.766c2.16 1.176 4.591 1.797 7.15 1.797 5.411 0 9.852-4.402 9.895-9.84 0-2.637-.738-5.122-2.139-7.289a9.875 9.875 0 00-7.756-3.893z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">WhatsApp Integration</h3>
                <p className="mt-1 text-sm text-slate-400">Instant messaging support</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-green-400">✓</span>
                <div>
                  <p className="font-medium text-white">Real-time Availability Checks</p>
                  <p className="mt-1 text-sm text-slate-400">Check room availability and prices instantly</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-green-400">✓</span>
                <div>
                  <p className="font-medium text-white">Quick Booking Confirmations</p>
                  <p className="mt-1 text-sm text-slate-400">Complete reservations directly via WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-green-400">✓</span>
                <div>
                  <p className="font-medium text-white">Personalized Recommendations</p>
                  <p className="mt-1 text-sm text-slate-400">AI suggests rooms based on preferences</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-green-400">✓</span>
                <div>
                  <p className="font-medium text-white">Special Offers & Promotions</p>
                  <p className="mt-1 text-sm text-slate-400">Get exclusive deals sent to your chat</p>
                </div>
              </li>
            </ul>

            <a
              href="https://wa.me/231770381510?text=Hello%20Lifestyle%20Luxury%20Hotel%20%26%20Residence%20team%2C%20I%20would%20like%20to%20book%20a%20room%20and%20learn%20more%20about%20your%20AI%20Booking%20Assistant.%20Could%20you%20please%20help%20me%20with%20availability%20and%20rates%3F"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-green-500/20 py-3 text-sm font-semibold text-green-400 transition hover:bg-green-500/30"
            >
              Start WhatsApp Chat
            </a>
          </motion.div>

          {/* Voice Integration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-luxury"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-lg bg-blue-500/20 p-3">
                <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z M17.3 11c.4-.4.7-.9.7-1.3V5c0-2.21-1.79-4-4-4S9 2.79 9 5v4.7c0 .4.3.9.7 1.3l1.4 1.4c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.7-.9.7-1.3V5c0-.6.4-1 1-1s1 .4 1 1v4.7c0 .4.3.9.7 1.3l1.4 1.4c.4.4 1 .4 1.4 0l1.4-1.4zM19 13h-2v2h2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h2v-2h-2c-2.21 0-4 1.79-4 4v4c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-4c0-2.21-1.79-4-4-4z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Voice Assistant</h3>
                <p className="mt-1 text-sm text-slate-400">Hands-free booking experience</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-blue-400">✓</span>
                <div>
                  <p className="font-medium text-white">Natural Language Processing</p>
                  <p className="mt-1 text-sm text-slate-400">Talk naturally about your travel plans</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-blue-400">✓</span>
                <div>
                  <p className="font-medium text-white">Multi-Language Support</p>
                  <p className="mt-1 text-sm text-slate-400">Communicate in your preferred language</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-blue-400">✓</span>
                <div>
                  <p className="font-medium text-white">Smart Hotel Information</p>
                  <p className="mt-1 text-sm text-slate-400">Ask about amenities, dining, and services</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg text-blue-400">✓</span>
                <div>
                  <p className="font-medium text-white">24/7 Concierge Support</p>
                  <p className="mt-1 text-sm text-slate-400">Round-the-clock assistance for all queries</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => {
                  speakVoicePrompt();
                  startVoiceRecognition();
                }}
                className="w-full rounded-lg bg-blue-500/20 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/30"
              >
                Try Voice Assistant
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={!isListening}
                  onClick={stopVoiceRecognition}
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Stop Listening
                </button>

                <button
                  type="button"
                  onClick={speakVoicePrompt}
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/10 bg-slate-900/80 py-3 text-sm font-semibold text-white transition hover:bg-slate-900/95"
                >
                  Speak Prompt
                </button>
              </div>

              {voiceTranscript && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="font-medium text-white">Recognized Voice Input</p>
                  <p className="mt-2">{voiceTranscript}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* AI Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-3 text-3xl">🧠</div>
            <h4 className="font-semibold text-white">GPT Powered</h4>
            <p className="mt-2 text-sm text-slate-400">Advanced AI understands context and preferences</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-3 text-3xl">⚡</div>
            <h4 className="font-semibold text-white">Instant Responses</h4>
            <p className="mt-2 text-sm text-slate-400">Get immediate answers to all questions</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-3 text-3xl">🔒</div>
            <h4 className="font-semibold text-white">Secure & Private</h4>
            <p className="mt-2 text-sm text-slate-400">Your personal data is encrypted and protected</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-3 text-3xl">🌍</div>
            <h4 className="font-semibold text-white">Global Reach</h4>
            <p className="mt-2 text-sm text-slate-400">Support for 50+ languages worldwide</p>
          </div>
        </motion.div>
      </section>

      {/* Booking Section */}
      <section id="book" className="border-t border-white/10 bg-slate-950/60 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4 max-w-2xl"
          >
            <p className="section-subtitle">Ready to Book</p>
            <h2 className="section-title">Check Availability Now</h2>
            <p className="text-lg leading-relaxed text-slate-400">
              Browse rooms, view live rates, and complete your reservation with our intuitive booking interface.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            {/* Booking Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="card-luxury">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-white">Prime Location</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">Thinker Village, Monrovia - Steps from local landmarks and airport</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-2xl">🍹</div>
                  <div>
                    <h3 className="font-semibold text-white">Entertainment Hub</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">Rooftop bar, poolside dining, and curated experiences</p>
                  </div>
                </div>
              </div>

              <div className="card-luxury">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-2xl">🚗</div>
                  <div>
                    <h3 className="font-semibold text-white">Airport Transfer</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">Complimentary shuttle service to/from airport</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-gold/20 bg-midnight/70 p-8 shadow-glow"
            >
              <h3 className="section-title mb-8">Request Your Stay</h3>

              <form className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-200">Check-in Date</label>
                  <input
                    type="date"
                    className="input-field mt-2"
                    placeholder="Select date"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">Check-out Date</label>
                  <input
                    type="date"
                    className="input-field mt-2"
                    placeholder="Select date"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">Number of Guests</label>
                  <select className="input-field mt-2">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">Room Type</label>
                  <select className="input-field mt-2">
                    <option>Premium Pool View</option>
                    <option>Family Apartment</option>
                    <option>Executive Suite</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">Full Name</label>
                  <input
                    type="text"
                    className="input-field mt-2"
                    placeholder="Your name"
                    defaultValue={isAuthenticated ? user?.name : ''}
                    disabled={isAuthenticated}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200">Email Address</label>
                  <input
                    type="email"
                    className="input-field mt-2"
                    placeholder="your@email.com"
                    defaultValue={isAuthenticated ? user?.email : ''}
                    disabled={isAuthenticated}
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                  {isAuthenticated ? 'Book Now' : 'Request Availability'}
                </button>

                <p className="text-center text-xs text-slate-500">
                  {isAuthenticated 
                    ? 'Complete your booking instantly as a signed-in user'
                    : 'Sign in to book instantly or request availability as a guest'
                  }
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Offers Section - Only for signed-in users */}
      {isAuthenticated && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4"
          >
            <p className="section-subtitle">Exclusive Member Benefits</p>
            <h2 className="section-title">Special Offers & Discounts</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
              As a valued member, enjoy exclusive discounts and special offers on your bookings.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-luxury border-gold/30 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gold text-midnight px-3 py-1 rounded-full text-xs font-bold">
                15% OFF
              </div>
              <div className="mb-4 text-4xl">🎉</div>
              <h3 className="text-xl font-semibold text-white mb-2">Member Discount</h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                Save 15% on all room bookings as a registered member
              </p>
              <p className="text-xs text-gold font-medium">Auto-applied at checkout</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-luxury border-gold/30 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gold text-midnight px-3 py-1 rounded-full text-xs font-bold">
                FREE
              </div>
              <div className="mb-4 text-4xl">🍳</div>
              <h3 className="text-xl font-semibold text-white mb-2">Complimentary Breakfast</h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                Enjoy free breakfast for stays of 3+ nights
              </p>
              <p className="text-xs text-gold font-medium">Valid for all room types</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-luxury border-gold/30 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gold text-midnight px-3 py-1 rounded-full text-xs font-bold">
                VIP
              </div>
              <div className="mb-4 text-4xl">✨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Rooftop Bar Access</h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                Exclusive VIP access to rooftop bar with complimentary welcome drink
              </p>
              <p className="text-xs text-gold font-medium">One-time per stay</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-r from-gold/10 to-gold/5 p-12 text-center"
        >
          <h2 className="section-title mb-6">Ready for Your Luxury Escape?</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 mb-8">
            Join our community of satisfied guests who have experienced our world-class hospitality.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="#book" className="btn-primary">
              Book Now
            </a>
            <a href="#experience" className="btn-secondary">
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-4">About</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Luxury boutique hotel in Monrovia's Thinker Village offering world-class amenities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Email: info@luxuryhotel.com</li>
                <li>Phone: +231 123 456</li>
                <li>Location: Thinker Village</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Hours</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Concierge: 24/7</li>
                <li>Check-in: 2:00 PM</li>
                <li>Check-out: 11:00 AM</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-gold transition">Instagram</a></li>
                <li><a href="#" className="hover:text-gold transition">Facebook</a></li>
                <li><a href="#" className="hover:text-gold transition">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 Lifestyle Luxury Hotel & Residence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
