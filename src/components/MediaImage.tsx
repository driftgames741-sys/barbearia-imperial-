import React, { useState } from 'react';
import { Scissors } from 'lucide-react';

export interface PictureSource {
  srcSet: string;
  type?: string;
  media?: string;
}

export interface MediaImageProps {
  /** Primary image source (e.g. optimized local WebP or primary URL) */
  src: string;
  /** Fallback sources in priority order (e.g. local WebP -> local JPG -> Postimages original) */
  fallbackSources?: string[];
  /** Picture element sources for responsive/format delivery */
  sources?: PictureSource[];
  alt: string;
  title?: string;
  description?: string;
  aspectRatioClass?: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  fallbackSources = [],
  sources = [],
  alt,
  title,
  description,
  aspectRatioClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  objectPosition = 'object-center',
  priority = false,
  width,
  height,
  sizes,
}) => {
  // Candidate list: [src, ...fallbackSources]
  const allCandidates = [src, ...fallbackSources.filter(Boolean)];
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFatalError, setHasFatalError] = useState(false);

  const currentSrc = allCandidates[candidateIndex] || src;

  const handleImageError = () => {
    if (candidateIndex < allCandidates.length - 1) {
      // Try next fallback candidate seamlessly
      setCandidateIndex((prev) => prev + 1);
    } else {
      // All fallback candidates exhausted
      setHasFatalError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasFatalError(false);
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#121212] border border-[#B28A52]/20 ${aspectRatioClass} ${className} group`}
    >
      {/* Skeleton / Ambient Luxury Shimmer Placeholder while loading */}
      {!isLoaded && !hasFatalError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#161616] via-[#101010] to-[#0A0A0A] animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B28A52]/5 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      )}

      {/* Picture / Responsive Image Element */}
      {!hasFatalError && (
        <picture className="w-full h-full block">
          {sources.map((source, idx) => (
            <source
              key={idx}
              srcSet={source.srcSet}
              type={source.type}
              media={source.media}
            />
          ))}
          <img
            key={currentSrc}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding={priority ? 'sync' : 'async'}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover ${objectPosition} transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105'
            } group-hover:scale-102 ${imgClassName}`}
          />
        </picture>
      )}

      {/* Editorial Luxury Fallback Card if all resources ever fail */}
      {hasFatalError && (
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
            <span className="truncate max-w-[220px]">
              {title || 'Barbearia Imperial'}
            </span>
            <span className="shrink-0 text-[#B28A52]">
              Atendimento Exclusivo
            </span>
          </div>
        </div>
      )}

      {/* Luxury Vignette Depth Overlay */}
      {!hasFatalError && isLoaded && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      )}
    </div>
  );
};
