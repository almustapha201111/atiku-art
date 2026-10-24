import React, { useState, useRef } from 'react';
import { Sliders } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  title: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeUrl, afterUrl, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none cursor-ew-resize rounded-xl border border-[#EADBCE] shadow-md"
    >
      {/* After Image */}
      <img
        src={afterUrl}
        alt={`${title} - After Transformation`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-[#E76F51] shadow-sm">
        After Transformation
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeUrl}
          alt={`${title} - Before State`}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-[#252525] shadow-sm">
          Before
        </div>
      </div>

      {/* Divider Bar in Terracotta */}
      <div
        className="absolute top-0 bottom-0 w-[2.5px] bg-[#E76F51] z-20 shadow-[0_0_12px_rgba(231,111,81,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#E76F51] flex items-center justify-center text-[#E76F51] shadow-lg">
          <Sliders className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
