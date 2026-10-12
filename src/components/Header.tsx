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
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
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
      {/* 
        Luxury Editorial Header:
        - Consistent height to prevent jarring physical resizing or jumps on scroll
        - Seamless dark glass backdrop with warm bronze hairline divider (no white lines or "barrinhas brancas")
        - Natural, professional, and discreet luxury presence
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#B28A52]/15 shadow-lg shadow-black/60'
            : 'bg-[#0A0A0A]/70 backdrop-blur-sm border-b border-transparent'
        }`}
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: '0.75rem',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            className="font-cinzel text-base sm:text-lg lg:text-xl font-bold tracking-[0.2em] text-[#E9E1D2] hover:text-[#B28A52] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="text-[#B28A52] text-xs font-normal">✦</span>
            BARBEARIA IMPERIAL
          </a>

          {/* Nav Links for Desktop & Large Screens */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs xl:text-sm font-medium tracking-[0.12em] text-[#E9E1D2]/80">
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

          {/* Action Area */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* WhatsApp Access */}
            <a
              href="https://wa.link/wx6nob"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#E9E1D2]/85 hover:text-[#25D366] transition-colors border border-[#B28A52]/20 hover:border-[#25D366]/50 bg-[#0A0A0A]/40"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] active:scale-98 transition-all duration-150 shadow-md shadow-[#B28A52]/10 whitespace-nowrap shrink-0"
            >
              Agendar Experiência
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="lg:hidden p-2 text-[#E9E1D2] hover:text-[#B28A52] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação"
          className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl pt-24 px-6 sm:px-10 pb-8 flex flex-col justify-between lg:hidden animate-in fade-in duration-200 overflow-y-auto"
        >
          <nav className="flex flex-col divide-y divide-[#B28A52]/15 font-cinzel">
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
