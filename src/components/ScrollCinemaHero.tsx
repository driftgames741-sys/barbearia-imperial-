import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { RevealText } from './RevealText.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface ScrollCinemaHeroProps {
  onOpenBookingModal: () => void;
}

interface NarrativePhase {
  phase: number;
  subtitle: string;
  title: string;
  body: string;
  ctaText: string;
}

const NARRATIVE_PHASES: NarrativePhase[] = [
  {
    phase: 0,
    subtitle: 'BARBEARIA IMPERIAL',
    title: 'Mais do que um corte. Um ritual de imagem.',
    body: 'Uma atmosfera de distinção e elegância criada para homens que compreendem o poder da própria postura.',
    ctaText: 'Role para conhecer',
  },
  {
    phase: 1,
    subtitle: '01. O SANTUÁRIO DO TEMPO',
    title: 'Uma barbearia criada para quem valoriza presença.',
    body: 'O silêncio da madeira nobre e a iluminação acolhedora. Um refúgio onde o ritmo desacelera para a sua imagem emergir.',
    ctaText: 'Role para continuar',
  },
  {
    phase: 2,
    subtitle: '02. A ARTE DA PRECISÃO',
    title: 'Precisão, presença e experiência em cada detalhe.',
    body: 'Cada linha e cada proporção desenhadas para projetar autoridade, respeito e autenticidade.',
    ctaText: 'Conheça o ritual',
  },
  {
    phase: 3,
    subtitle: '03. A IDENTIDADE SELADA',
    title: 'O trono da sua imagem está reservado.',
    body: 'Acomode-se na cadeira clássica e vivencie uma experiência concebida para o cavalheiro contemporâneo.',
    ctaText: 'Pronto para o seu ritual',
  },
];

export const ScrollCinemaHero: React.FC<ScrollCinemaHeroProps> = ({ onOpenBookingModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barberPoleMarkerRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const reducedMotion = useReducedMotion();

  // Scroll scrub calculation via RAF
  const updateScrub = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollDistance = rect.height - viewportHeight;

    if (scrollDistance <= 0) return;

    const rawProgress = -rect.top / scrollDistance;
    const p = Math.min(1, Math.max(0, rawProgress));

    // Update video currentTime smoothly
    if (videoRef.current && videoRef.current.duration && !reducedMotion) {
      const targetTime = p * videoRef.current.duration;
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.02) {
        videoRef.current.currentTime = targetTime;
      }
    }

    // Direct DOM mutation for Barber Pole indicator without React re-render lags
    if (barberPoleMarkerRef.current) {
      // Cylinder height varies responsively: 80px on mobile, 160px on desktop
      const isMobile = window.innerWidth < 640;
      const travelDistance = isMobile ? 66 : 144;
      barberPoleMarkerRef.current.style.transform = `translateY(${p * travelDistance}px)`;
    }

    // Determine current narrative phase synchronized with real video lighting (0, 1, 2, 3)
    let newPhase = 0;
    if (p >= 0.26 && p < 0.54) newPhase = 1;
    else if (p >= 0.54 && p < 0.78) newPhase = 2;
    else if (p >= 0.78) newPhase = 3;

    setActivePhaseIndex(newPhase);
  }, [reducedMotion]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateScrub();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial sync
    updateScrub();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateScrub]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setVideoLoaded(true);
      setVideoError(false);
      updateScrub();
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  const currentPhase = NARRATIVE_PHASES[activePhaseIndex];

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Barbearia Imperial — Apresentação Principal"
      className="relative w-full h-[480vh] bg-[#0A0A0A]"
    >
      {/* Sticky Fullscreen Viewport (100svh / 100dvh for mobile address bar stability) */}
      <div className="sticky top-0 left-0 w-full h-[100svh] min-h-[100dvh] overflow-hidden flex items-center">
        {/* Background Video Element (Controlled continuously by user scroll; object position anchors chair) */}
        <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover object-[54%_center] sm:object-center filter brightness-[0.84] contrast-[1.08] pointer-events-none select-none transition-opacity duration-700"
        >
          <source
            src="https://res.cloudinary.com/iapbbued/video/upload/v1791772357/hero-desktop-scroll.mp4"
            type="video/mp4"
          />
          <source src="/media/hero-desktop-scroll.mp4" type="video/mp4" />
        </video>

        {/* Ambient Cinema Backdrop (Guarantees seamless luxury aesthetic during load) */}
        <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-br from-[#121212] via-[#0D0D0D] to-[#070707] select-none pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#B28A52]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E9E1D2_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        {/* Cinematic Scrims (Measured localized dark gradients that protect text legibility without hiding chair details) */}
        {/* Left-to-right localized scrim: focused contrast strictly behind text, fading smoothly before center/right chair */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0A0A0A]/92 via-[#0A0A0A]/55 to-transparent w-full sm:w-[70%] md:w-[60%] lg:w-[50%]" />
        {/* Bottom scrim for safe area */}
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        {/* Top scrim for header legibility */}
        <div className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-[#0A0A0A]/90 to-transparent" />

        {/* Narrative Content Layer */}
        {/* Constrained safely on the left: pr-12 on mobile ensures zero collision with the right indicator */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pointer-events-none">
          <div className="max-w-[calc(100%-54px)] sm:max-w-md md:max-w-lg lg:max-w-xl text-left pointer-events-auto">
            {/* Active Phase Narrative Container (Single active phase visible, no text clashes) */}
            <div className="space-y-4 sm:space-y-6">
              {/* Kicker badge */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-[1.5px] w-6 sm:w-8 bg-[#B28A52] shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#B28A52] uppercase truncate">
                  {currentPhase.subtitle}
                </span>
              </div>

              {/* Fluid Editorial Headline with Cinematic Reveal */}
              <RevealText
                key={`hero-title-${activePhaseIndex}`}
                text={currentPhase.title}
                as="h1"
                trigger="mount"
                duration={0.72}
                stagger={0.038}
                yOffset={18}
                blur={8}
                className="font-cinzel text-[clamp(1.5rem,5.5vw,3.5rem)] font-bold tracking-tight text-[#E9E1D2] leading-[1.14] text-balance"
              />

              {/* Responsive Body Copy with Progressive Cinematic Reveal */}
              <RevealText
                key={`hero-body-${activePhaseIndex}`}
                text={currentPhase.body}
                as="p"
                trigger="mount"
                delay={0.12}
                duration={0.65}
                stagger={0.02}
                yOffset={14}
                blur={6}
                className="text-xs sm:text-sm md:text-base text-[#D4CBBF] font-normal leading-relaxed line-clamp-3 sm:line-clamp-none max-w-lg"
              />

              {/* Contextual Action / Scroll Prompt */}
              <div className="pt-2 sm:pt-3">
                {activePhaseIndex === 0 ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        onClick={onOpenBookingModal}
                        className="px-5 sm:px-7 py-3 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] active:scale-98 transition-all duration-150 shadow-lg shadow-[#B28A52]/20 text-center"
                      >
                        Agendar Horário
                      </button>
                      <a
                        href="https://wa.link/wx6nob"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#E9E1D2] border border-[#B28A52]/40 hover:border-[#25D366] bg-[#0A0A0A]/60 hover:bg-[#25D366]/10 transition-all duration-150 backdrop-blur-sm group"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                        <span>Falar no WhatsApp</span>
                      </a>
                    </div>
                    <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#E9E1D2]/60 font-medium pt-1">
                      <span className="text-[#B28A52]">✦</span>
                      <span>{currentPhase.ctaText}</span>
                      <ChevronDown className="w-3 h-3 text-[#B28A52] animate-bounce" />
                    </div>
                  </div>
                ) : activePhaseIndex === 3 ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={onOpenBookingModal}
                      className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] active:scale-98 transition-all duration-150 shadow-lg shadow-[#B28A52]/20 text-center"
                    >
                      Agendar Meu Ritual
                    </button>
                    <a
                      href="https://wa.link/wx6nob"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#E9E1D2] border border-[#25D366]/40 hover:border-[#25D366] bg-[#0A0A0A]/70 hover:bg-[#25D366]/10 transition-all duration-150 backdrop-blur-sm group"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                      <span>Agendar pelo WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#E9E1D2]/80 font-medium">
                    <span className="text-[#B28A52]">✦</span>
                    <span>{currentPhase.ctaText}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#B28A52] animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Barber Pole Thematic Progress Indicator — Clean, Minimalist & Elegant */}
        {/* Discreet vertical pole in aged bronze & graphite, visually tracking progress without numerical clutter */}
        <aside
          aria-label="Indicador Barber Pole"
          className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center select-none pointer-events-none"
        >
          {/* Barber Pole Striped Cylinder Bar */}
          <div className="relative w-2 sm:w-2.5 h-[80px] sm:h-[160px] rounded-full overflow-hidden border border-[#B28A52]/30 bg-[#121212]/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            {/* Repeating diagonal barber pole stripes (Bronze, Ivory, Graphite) */}
            <div className="absolute inset-0 barber-pole-vertical-stripes opacity-75" />

            {/* Active Position Ring Marker */}
            <div
              ref={barberPoleMarkerRef}
              className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-b from-[#C9A066] to-[#B28A52] rounded-full shadow-[0_0_10px_rgba(178,138,82,0.9)] border border-[#E9E1D2]/80 pointer-events-none transition-none"
            />
          </div>
        </aside>
      </div>
    </section>
  );
};
