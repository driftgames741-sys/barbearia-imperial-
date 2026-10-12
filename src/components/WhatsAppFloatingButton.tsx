import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface WhatsAppFloatingButtonProps {
  url?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  url = 'https://wa.link/wx6nob',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 pointer-events-auto"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Falar com a Barbearia Imperial no WhatsApp"
        className="group relative flex items-center gap-2.5 sm:gap-3 bg-[#0D0D0D]/95 hover:bg-[#141414] border border-[#B28A52]/40 hover:border-[#25D366] text-[#E9E1D2] p-3 sm:px-4 sm:py-3 shadow-2xl shadow-black/90 hover:shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-all duration-300 rounded-full select-none"
      >
        {/* Subtle breathing glow ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#B28A52]/20 to-[#25D366]/30 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

        {/* WhatsApp Icon with green background badge */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] text-[#0A0A0A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
          <WhatsAppIcon className="w-5 h-5 text-[#0A0A0A]" />
          {/* Status Indicator Dot */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0D0D0D]" />
        </div>

        {/* Label: Always visible on desktop, clean typography */}
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B28A52] group-hover:text-[#25D366] transition-colors leading-tight">
            Atendimento Rápido
          </span>
          <span className="text-xs font-semibold text-[#E9E1D2] tracking-wide font-cinzel leading-snug">
            Falar no WhatsApp
          </span>
        </div>

        {/* Mobile Tooltip / Floating label on hover */}
        {isHovered && (
          <div className="sm:hidden absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#0D0D0D] border border-[#B28A52]/40 text-[#E9E1D2] text-[11px] font-medium tracking-wide whitespace-nowrap shadow-lg rounded animate-in fade-in duration-150">
            Falar no WhatsApp
          </div>
        )}
      </a>
    </aside>
  );
};
