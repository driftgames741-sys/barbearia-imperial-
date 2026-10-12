import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { RevealText } from './RevealText.tsx';

export const SpaceGallery: React.FC = () => {
  const [tiltOffset, setTiltOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply tilt on devices that support hover
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setTiltOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setTiltOffset({ x: 0, y: 0 });
  };

  return (
    <section id="espaco" className="py-20 sm:py-28 lg:py-32 bg-[#0E0E0E] border-t border-[#E9E1D2]/8 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#B28A52]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B28A52] font-semibold">
              05. A Arquitetura do Espaço
            </span>
          </div>
          <RevealText
            as="h2"
            text="O Silêncio da Madeira Nobre"
            className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E9E1D2]"
            duration={0.75}
            stagger={0.04}
            yOffset={20}
            blur={8}
          />
          <RevealText
            as="p"
            text="Projetado como uma pausa no ritmo acelerado da cidade. Nossas estações contam com distância generosa, iluminação indireta a 2700K para conforto visual e acabamento em madeira maciça."
            className="text-xs sm:text-sm md:text-base text-[#9E988E] leading-relaxed"
            delay={0.15}
            stagger={0.02}
            duration={0.65}
            blur={6}
            yOffset={14}
          />
        </div>

        {/* Wide Cinematic Image Container */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden border border-[#B28A52]/25 group shadow-2xl shadow-black/90"
        >
          <div
            style={{
              transform: `translate3d(${tiltOffset.x}px, ${tiltOffset.y}px, 0) scale(1.01)`,
              transition: 'transform 0.25s ease-out',
            }}
          >
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#121212]">
              <img
                src="https://i.postimg.cc/J0CtDPqW/Ambiente-completo-da-barbearia.png"
                alt="Ambiente Completo da Barbearia — Salão clássico com cadeiras em couro e bancadas em madeira nobre"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Interactive Editorial Overlay Badge */}
          <div className="sm:absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-20 bg-[#0A0A0A]/95 sm:bg-[#0A0A0A]/90 backdrop-blur-md p-3.5 sm:p-4 border border-[#E9E1D2]/10 sm:max-w-md">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#B28A52] font-semibold">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B28A52]" />
              <span>Visão Panorâmica</span>
            </div>
            <p className="text-xs text-[#E9E1D2] pt-1 leading-snug">
              Bancadas em jacarandá entalhado, poltronas hidráulicas vintage e espelhos com tratamento anti-reflexo.
            </p>
          </div>
        </div>

        {/* Spatial Micro-Attributes (1 col mobile, 3 col tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs text-[#9E988E]">
          <div className="p-4 bg-[#141414] border border-[#E9E1D2]/6 space-y-1">
            <span className="text-[#B28A52] uppercase font-mono tracking-wider text-[10px] sm:text-[11px] block">
              Temperatura de Luz
            </span>
            <p className="text-[#E9E1D2] font-medium text-xs sm:text-sm">2700K Aconchegante</p>
            <p className="text-[11px] leading-relaxed">Iluminação cênica quente que valoriza os traços sem ofuscar a visão.</p>
          </div>
          <div className="p-4 bg-[#141414] border border-[#E9E1D2]/6 space-y-1">
            <span className="text-[#B28A52] uppercase font-mono tracking-wider text-[10px] sm:text-[11px] block">
              Acústica
            </span>
            <p className="text-[#E9E1D2] font-medium text-xs sm:text-sm">Ambiente Contemplativo</p>
            <p className="text-[11px] leading-relaxed">Seleção sutil de jazz clássico e isolamento sonoro para privacidade.</p>
          </div>
          <div className="p-4 bg-[#141414] border border-[#E9E1D2]/6 space-y-1">
            <span className="text-[#B28A52] uppercase font-mono tracking-wider text-[10px] sm:text-[11px] block">
              Hospitalidade
            </span>
            <p className="text-[#E9E1D2] font-medium text-xs sm:text-sm">Bebida de Boas-Vindas</p>
            <p className="text-[11px] leading-relaxed">Café arábica de torra especial ou dose cortesia servida na chegada.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
