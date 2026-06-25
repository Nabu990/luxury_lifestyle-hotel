'use client';

import { useState, useRef, useEffect } from 'react';

interface Room360ViewerProps {
  imageUrl: string;
  onClose: () => void;
}

export default function Room360Viewer({ imageUrl, onClose }: Room360ViewerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const newX = e.touches[0].clientX - startPos.x;
    const newY = e.touches[0].clientY - startPos.y;
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const resetView = () => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-6xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gold transition-colors text-sm font-semibold z-10"
        >
          ✕ Close 360° View
        </button>
        
        <div className="absolute -top-12 left-0 flex gap-2 z-10">
          <button
            onClick={resetView}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            Reset View
          </button>
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            + Zoom
          </button>
          <button
            onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.5))}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            - Zoom
          </button>
        </div>
        
        <div
          ref={containerRef}
          className="relative h-[70vh] w-full overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing bg-slate-900"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div
            className="absolute"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              width: '300%',
              height: '300%',
              left: '-100%',
              top: '-100%',
            }}
          >
            {/* Tiled image for seamless panning */}
            {[...Array(9)].map((_, i) => (
              <img
                key={i}
                src={imageUrl}
                alt="360 Room View"
                className="absolute w-1/3 h-1/3 object-cover pointer-events-none"
                draggable={false}
                style={{
                  left: `${(i % 3) * 33.333}%`,
                  top: `${Math.floor(i / 3) * 33.333}%`,
                }}
              />
            ))}
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-white text-sm z-10">
            🖱️ Drag to move • Scroll to zoom • {Math.round(zoom * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
