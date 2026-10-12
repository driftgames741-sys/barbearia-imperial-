import React from 'react';
import { RevealText } from './RevealText.tsx';
import { MediaImage } from './MediaImage.tsx';

export const Manifesto: React.FC = () => {
  return (
    <section
      id="manifesto"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#0A0A0A] border-t border-[#E9E1D2]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 h-[1px] bg-[#B28A52]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#B28A52] font-semibold">
            02. O Manifesto
          </span>
        </div>

        {/* 2-Column Split: Editorial Prose & Master Ritual Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Editorial Manifesto Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <RevealText
              as="h2"
              className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E9E1D2] leading-[1.16]"
              duration={0.75}
              stagger={0.04}
              yOffset={20}
              blur={8}
              segments={[
                { text: 'O corte é apenas a consequência.' },
                {
                  text: 'O ritual é a essência.',
                  className: 'text-[#B28A52] italic font-editorial font-normal',
                },
              ]}
            />

            <div className="space-y-4 sm:space-y-5 text-[#9E988E] text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              <RevealText
                as="p"
                text="Em um cotidiano acelerado, a Barbearia Imperial resgata o momento da pausa masculina. Não operamos em linha de produção; cultivamos um refúgio de precisão, postura e sobriedade."
                delay={0.1}
                stagger={0.02}
                duration={0.65}
                blur={6}
                yOffset={14}
              />
              <RevealText
                as="p"
                text="Cada detalhe respeita o visagismo e a estrutura facial. A toalha aquecida e a lâmina deslizam para alinhar os fios, desacelerar a rotina e renovar a sua presença pessoal."
                delay={0.2}
                stagger={0.02}
                duration={0.65}
                blur={6}
                yOffset={14}
              />
            </div>

            {/* Quote block */}
            <div className="p-4 sm:p-6 bg-[#141414] border-l-2 border-[#B28A52] space-y-1.5">
              <RevealText
                as="p"
                text="“A imagem de um homem não é vaidade superficial. É a postura com a qual ele se apresenta ao mundo.”"
                className="font-editorial text-lg sm:text-xl lg:text-2xl text-[#E9E1D2] italic leading-snug"
                delay={0.15}
                duration={0.7}
                stagger={0.035}
                yOffset={16}
                blur={6}
              />
              <span className="text-[10px] sm:text-xs tracking-widest text-[#B28A52] uppercase block pt-1">
                — Princípio Imperial da Imagem
              </span>
            </div>
          </div>

          {/* Right: Master Barber Portrait / Working Scene */}
          <div className="lg:col-span-5 relative">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-2 border border-[#B28A52]/20 translate-x-1.5 translate-y-1.5 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

              <MediaImage
                src="/media/ritual-do-mestre.webp"
                fallbackSources={[
                  '/media/ritual-do-mestre.jpg',
                  'https://i.postimg.cc/Bb5bxHhR/Barbeiro-cortando-cabelo-O-Ritual-do-Mestre.jpg',
                ]}
                sources={[
                  { srcSet: '/media/ritual-do-mestre.webp', type: 'image/webp' },
                  { srcSet: '/media/ritual-do-mestre.jpg', type: 'image/jpeg' },
                ]}
                alt="O Ritual do Mestre — Barbeiro cortando cabelo com tesoura e atenção aos detalhes"
                title="O Ritual do Mestre"
                description="O profissional trabalhando com foco nas mãos, alinhamento e precisão artesanal"
                aspectRatioClass="aspect-[4/5]"
                className="editorial-mask shadow-2xl shadow-black/80"
                objectPosition="object-[center_25%]"
                width={1280}
                height={956}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
