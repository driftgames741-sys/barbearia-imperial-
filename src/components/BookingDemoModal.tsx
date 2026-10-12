import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle, Scissors } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface BookingDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingDemoModal: React.FC<BookingDemoModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Corte Masculino de Alfaiataria',
}) => {
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedBarber, setSelectedBarber] = useState('Mestre Rodrigo · Visagismo & Estrutura');
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedTime, setSelectedTime] = useState('15:00');
  const [clientName, setClientName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#000000]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-[#121212] border border-[#B28A52]/30 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E9E1D2]/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-2">
            <span className="text-[#B28A52]">✦</span>
            <h2 id="modal-title" className="font-cinzel text-base sm:text-lg text-[#E9E1D2] font-bold tracking-wider">
              {isSubmitted ? 'Confirmação do Agendamento' : 'Agendar Horário'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            className="p-2 text-[#9E988E] hover:text-[#E9E1D2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B28A52]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Notice Banner */}
              <div className="p-3.5 sm:p-4 bg-[#181818] border border-[#B28A52]/20 flex items-start gap-2.5 sm:gap-3 text-xs">
                <Clock className="w-4 h-4 text-[#B28A52] shrink-0 mt-0.5" />
                <p className="text-[#9E988E] leading-relaxed text-[11px] sm:text-xs">
                  <strong className="text-[#E9E1D2]">Atendimento sob reserva:</strong> Selecione o serviço, o mestre barbeiro e o horário de sua preferência. A estação é reservada exclusivamente para o seu horário.
                </p>
              </div>

              {/* Service Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B28A52] font-semibold block">
                  Serviço Desejado
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#E9E1D2]/15 text-[#E9E1D2] px-3.5 py-3 text-xs sm:text-sm min-h-[44px] focus:border-[#B28A52] focus:outline-none transition-colors"
                >
                  <option value="Corte Masculino de Alfaiataria">
                    Corte de Alfaiataria (50 min)
                  </option>
                  <option value="Barba Tradicional & Acabamento">
                    Barba & Acabamento (45 min)
                  </option>
                  <option value="Experiência Completa Imperial">
                    Experiência Completa (90 min)
                  </option>
                </select>
              </div>

              {/* Barber Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B28A52] font-semibold block">
                  Profissional
                </label>
                <select
                  value={selectedBarber}
                  onChange={(e) => setSelectedBarber(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#E9E1D2]/15 text-[#E9E1D2] px-3.5 py-3 text-xs sm:text-sm min-h-[44px] focus:border-[#B28A52] focus:outline-none transition-colors"
                >
                  <option value="Mestre Rodrigo · Visagismo & Estrutura">
                    Mestre Rodrigo · Visagismo & Estrutura
                  </option>
                  <option value="Mestre Gabriel · Navalha Clássica & Barba">
                    Mestre Gabriel · Navalha Clássica & Barba
                  </option>
                  <option value="Mestre Arthur · Alfaiataria Capilar Contemporânea">
                    Mestre Arthur · Alfaiataria Capilar Contemporânea
                  </option>
                </select>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B28A52] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B28A52]" />
                    Data da Sessão
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#E9E1D2]/15 text-[#E9E1D2] px-3.5 py-3 text-xs sm:text-sm min-h-[44px] focus:border-[#B28A52] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B28A52] font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B28A52]" />
                    Horário Sugerido
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#E9E1D2]/15 text-[#E9E1D2] px-3.5 py-3 text-xs sm:text-sm min-h-[44px] focus:border-[#B28A52] focus:outline-none transition-colors"
                  >
                    <option value="10:00">10:00</option>
                    <option value="11:30">11:30</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:30">16:30</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B28A52] font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B28A52]" />
                  Nome do Cavalheiro
                </label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Albuquerque"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#E9E1D2]/15 text-[#E9E1D2] placeholder-[#9E988E]/50 px-3.5 py-3 text-xs sm:text-sm min-h-[44px] focus:border-[#B28A52] focus:outline-none transition-colors"
                />
              </div>

              {/* Action */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] active:scale-98 transition-all duration-150 min-h-[44px]"
                >
                  Confirmar Agendamento
                </button>
                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-[#E9E1D2]/10"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-[#9E988E] uppercase tracking-widest font-mono">ou</span>
                  <div className="flex-grow border-t border-[#E9E1D2]/10"></div>
                </div>
                <a
                  href="https://wa.link/wx6nob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#E9E1D2] border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Agendar Diretamente pelo WhatsApp</span>
                </a>
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#B28A52]/10 border border-[#B28A52] flex items-center justify-center text-[#B28A52]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-cinzel text-2xl text-[#E9E1D2] font-bold">
                  Agendamento Confirmado
                </h3>
                <p className="text-xs text-[#9E988E]">
                  Sua cadeira e horário foram reservados com sucesso.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 bg-[#181818] border border-[#B28A52]/20 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-[#E9E1D2]/8 pb-2">
                  <span className="text-[#9E988E]">Protocolo:</span>
                  <span className="text-[#B28A52]">#IMP-2026-8472</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E1D2]/8 pb-2">
                  <span className="text-[#9E988E]">Cavalheiro:</span>
                  <span className="text-[#E9E1D2]">{clientName || 'Cavalheiro Convidado'}</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E1D2]/8 pb-2">
                  <span className="text-[#9E988E]">Serviço:</span>
                  <span className="text-[#E9E1D2]">{selectedService}</span>
                </div>
                <div className="flex justify-between border-b border-[#E9E1D2]/8 pb-2">
                  <span className="text-[#9E988E]">Mestre:</span>
                  <span className="text-[#E9E1D2]">{selectedBarber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E988E]">Data & Horário:</span>
                  <span className="text-[#B28A52]">{selectedDate} às {selectedTime}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href="https://wa.link/wx6nob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0A0A] bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A]" />
                  <span>Avisar Recepção no WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#E9E1D2] border border-[#B28A52] hover:bg-[#B28A52]/10 transition-colors"
                >
                  Fechar Confirmação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
