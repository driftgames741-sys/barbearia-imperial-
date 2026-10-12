import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { RevealText } from './RevealText.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';
import { MediaImage } from './MediaImage.tsx';

interface FinalCTAProps {
  onOpenBookingModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBookingModal }) => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#0E0E0E] border-t border-[#E9E1D2]/8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Final Image */}
          <div className="lg:col-span-5 relative group max-w-md mx-auto lg:max-w-none">
            <div className="absolute -inset-2 border border-[#B28A52]/20 translate-x-1.5 -translate-y-1.5 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <MediaImage
              src="/media/experiencia-final.webp"
              fallbackSources={[
                '/media/experiencia-final.jpg',
                'https://i.postimg.cc/Hn1jcBtZ/Experiencia-final-barbeiro-e-cliente.png',
              ]}
              sources={[
                { srcSet: '/media/experiencia-final.webp', type: 'image/webp' },
                { srcSet: '/media/experiencia-final.jpg', type: 'image/jpeg' },
              ]}
              alt="Experiência Final — Barbeiro e cliente satisfeito em frente ao espelho com corte alinhado"
              title="Experiência Final"
              description="O atendimento concluído entre cliente e mestre barbeiro em harmonia estética"
              aspectRatioClass="aspect-[4/5]"
              className="shadow-2xl shadow-black/80"
              objectPosition="object-[center_20%]"
              width={1279}
              height={720}
              priority={false}
            />
          </div>

          {/* Right: Editorial CTA and Reservation Policy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#B28A52]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#B28A52] font-semibold">
                  07. O Seu Momento
                </span>
              </div>
              <RevealText
                as="h2"
                text="Pronto para transformar sua presença?"
                className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E9E1D2] leading-[1.16]"
                duration={0.75}
                stagger={0.04}
                yOffset={20}
                blur={8}
              />
              <RevealText
                as="p"
                text="Viva a experiência de ser atendido por mestres dedicados à sua imagem. Reserve seu momento exclusivo na cadeira clássica da Barbearia Imperial."
                className="text-xs sm:text-sm md:text-base text-[#9E988E] leading-relaxed"
                delay={0.15}
                stagger={0.02}
                duration={0.65}
                blur={6}
                yOffset={14}
              />
            </div>

            {/* Booking Actions */}
            <div className="space-y-4 pt-1 sm:pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#0A0A0A] bg-[#B28A52] hover:bg-[#C9A066] active:scale-98 transition-all duration-150 shadow-xl shadow-[#B28A52]/15 text-center"
                >
                  <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                  <span>Agendar Meu Horário</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
                </button>
                <a
                  href="https://wa.link/wx6nob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#E9E1D2] border border-[#25D366]/40 hover:border-[#25D366] bg-[#0A0A0A] hover:bg-[#25D366]/10 transition-all duration-150 group/wa text-center"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover/wa:scale-110 transition-transform" />
                  <span>Agendar pelo WhatsApp</span>
                </a>
              </div>

              {/* Reservation Policy Note */}
              <div className="p-4 bg-[#141414] border border-[#B28A52]/20 flex items-start gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#E9E1D2] uppercase tracking-wider block">
                    Atendimento Exclusivo sob Reserva
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#9E988E] leading-relaxed">
                    Para garantir pontualidade, discrição e dedicação integral a cada cavalheiro, nossos atendimentos são realizados exclusivamente com agendamento prévio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
