import React, { useState } from 'react';
import { Scissors, AlertCircle, Camera } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  aspectRatioClass?: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  title,
  description,
  aspectRatioClass = 'aspect-[4/3]',
  className = '',
  objectPosition = 'object-center',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#121212] border border-[#B28A52]/15 ${aspectRatioClass} ${className} group`}
    >
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${objectPosition} transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-102`}
        />
      )}

      {/* Fallback container when asset is missing from /public/media */}
      {hasError && (
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-[#161616] via-[#111111] to-[#0A0A0A] border border-[#B28A52]/20 select-none">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full border border-[#B28A52]/30 flex items-center justify-center text-[#B28A52]">
              <Scissors className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#B28A52]/70 uppercase">
              Barbearia Imperial
            </span>
          </div>

          <div className="space-y-1.5 my-auto">
            <p className="font-cinzel text-base sm:text-lg text-[#E9E1D2] font-semibold tracking-wide">
              {title || alt}
            </p>
            {description && (
              <p className="text-xs text-[#9E988E] line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-[#E9E1D2]/8 flex items-center justify-between text-[10px] text-[#9E988E]/70 font-mono">
            <span className="truncate max-w-[220px]" title={src}>
              {title || 'Barbearia Imperial'}
            </span>
            <span className="shrink-0">
              Atendimento Exclusivo
            </span>
          </div>
        </div>
      )}

      {/* Subtle luxury vignette gradient overlay for photography depth */}
      {!hasError && isLoaded && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      )}
    </div>
  );
};
