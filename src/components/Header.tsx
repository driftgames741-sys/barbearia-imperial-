import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface HeaderProps {
  onOpenBookingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key and handle scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#manifesto', label: 'Manifesto' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#espaco', label: 'O Espaço' },
    { href: '#ritual', label: 'O Ritual' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#E9E1D2]/10 py-3 shadow-xl shadow-black/70'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand wordmark (single text element, fluid font size) */}
          <a
            href="#hero"
            className="font-cinzel text-base sm:text-lg lg:text-xl font-bold tracking-[0.18em] sm:tracking-[0.2em] text-[#E9E1D2] hover:text-[#B28A52] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="text-[#B28A52] text-xs font-normal">✦</span>
            BARBEARIA IMPERIAL
          </a>

          {/* Zone 2: Full single-line nav links for Large Screens (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs xl:text-sm font-medium tracking-wider text-[#E9E1D2]/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#B28A52] transition-colors whitespace-nowrap shrink-0 py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B28A52] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA & Mobile/Tablet Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* WhatsApp Direct Access (Desktop & Tablet) */}
            <a
              href="https://wa.link/wx6nob"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#E9E1D2]/80 hover:text-[#25D366] transition-colors border border-[#E9E1D2]/10 hover:border-[#25D366]/40"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button (Desktop and Tablet) */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] active:scale-98 transition-all duration-150 rounded-none shadow-md shadow-[#B28A52]/10 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B28A52]"
            >
              Agendar Experiência
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="lg:hidden p-2 text-[#E9E1D2] hover:text-[#B28A52] transition-colors focus-visible:outline-2 focus-visible:outline-[#B28A52]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação"
          className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl pt-24 px-6 sm:px-10 pb-8 flex flex-col justify-between lg:hidden animate-in fade-in duration-200 overflow-y-auto"
        >
          <nav className="flex flex-col divide-y divide-[#E9E1D2]/8 font-cinzel">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-[#E9E1D2] hover:text-[#B28A52] text-base sm:text-lg tracking-widest transition-colors flex items-center justify-between"
              >
                <span>{`0${idx + 1}. ${link.label}`}</span>
                <span className="text-xs text-[#B28A52]">✦</span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 pt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] transition-colors"
            >
              Agendar Experiência
            </button>
            <a
              href="https://wa.link/wx6nob"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E9E1D2] border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/10 flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Falar no WhatsApp</span>
            </a>
            <p className="text-center text-[11px] text-[#9E988E]">
              Atendimento exclusivo com hora marcada
            </p>
          </div>
        </div>
      )}
    </>
  );
};
