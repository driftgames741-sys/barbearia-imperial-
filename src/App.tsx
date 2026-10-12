/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { ScrollCinemaHero } from './components/ScrollCinemaHero.tsx';
import { Manifesto } from './components/Manifesto.tsx';
import { Services } from './components/Services.tsx';
import { PrecisionDetails } from './components/PrecisionDetails.tsx';
import { SpaceGallery } from './components/SpaceGallery.tsx';
import { RitualTimeline } from './components/RitualTimeline.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingDemoModal } from './components/BookingDemoModal.tsx';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.tsx';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>(
    'Corte Masculino de Alfaiataria'
  );

  const handleOpenBookingModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForModal(serviceName);
    }
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E9E1D2] selection:bg-[#B28A52] selection:text-[#0A0A0A] flex flex-col font-sans-clean">
      {/* Accessible Skip Link */}
      <a
        href="#manifesto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#B28A52] text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Bar Contract Navigation */}
      <Header onOpenBookingModal={() => handleOpenBookingModal()} />

      {/* Main Content Landmarks */}
      <main className="flex-1 w-full">
        {/* 01. Hero Scroll Cinema (480vh sticky scroll sequence, 100svh viewport, barber pole indicator) */}
        <ScrollCinemaHero onOpenBookingModal={() => handleOpenBookingModal()} />

        {/* 02. Manifesto */}
        <Manifesto />

        {/* 03. Serviços */}
        <Services onSelectService={(service) => handleOpenBookingModal(service)} />

        {/* 04. Diferenciais & Precisão */}
        <PrecisionDetails />

        {/* 05. O Espaço */}
        <SpaceGallery />

        {/* 06. Ritual / Experiência */}
        <RitualTimeline />

        {/* 07. Chamada Final */}
        <FinalCTA onOpenBookingModal={() => handleOpenBookingModal()} />
      </main>

      {/* 08. Rodapé */}
      <Footer />

      {/* Strategic Floating WhatsApp Button */}
      <WhatsAppFloatingButton url="https://wa.link/wx6nob" />

      {/* Interactive Booking Modal */}
      <BookingDemoModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        initialService={selectedServiceForModal}
      />
    </div>
  );
}
