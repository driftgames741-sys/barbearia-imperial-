import React from 'react';
import { Coffee, Scissors, Sparkles } from 'lucide-react';
import { RevealText } from './RevealText.tsx';

export const RitualTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Acolhimento & Diagnóstico',
      subtitle: 'Tempo de pausa e análise visagista',
      desc: 'Ao chegar, o ritmo desacelera. Nosso mestre conduz uma conversa sobre suas preferências, formato de rosto e estilo de vida para desenhar a proposta ideal.',
      icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
    {
      step: '02',
      title: 'Técnica & Fio Navalha',
      subtitle: 'Execução precisa mecha a mecha',
      desc: 'Com toalha aquecida e óleos aromáticos aplicados, a lâmina desliza suavemente. O corte é lapidado para garantir caimento natural duradouro.',
      icon: <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
    {
      step: '03',
      title: 'Finalização & Postura',
      subtitle: 'Harmonia e alinhamento concluídos',
      desc: 'A toalha fria tonifica a pele. Bálsamo de rápida absorção e pomada à base de cera natural fixam o corte com leveza e autenticidade.',
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
  ];

  return (
    <section id="ritual" className="py-20 sm:py-28 lg:py-32 bg-[#0A0A0A] border-t border-[#B28A52]/10 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#B28A52]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B28A52] font-semibold">
              06. A Sequência do Atendimento
            </span>
          </div>
          <RevealText
            as="h2"
            text="O Passo a Passo do Ritual"
            className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E9E1D2]"
            duration={0.75}
            stagger={0.04}
            yOffset={20}
            blur={8}
          />
          <RevealText
            as="p"
            text="Nada é deixado ao acaso. Cada momento foi refinado para proporcionar conforto sensorial e resultado estético impecável."
            className="text-xs sm:text-sm md:text-base text-[#9E988E] leading-relaxed"
            delay={0.15}
            stagger={0.02}
            duration={0.65}
            blur={6}
            yOffset={14}
          />
        </div>

        {/* 3 Step Timeline Cards: 1 col on mobile, 2 cols on tablet (with balanced 3rd card), 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`bg-[#121212] border border-[#E9E1D2]/10 p-6 sm:p-7 space-y-4 sm:space-y-5 relative group hover:border-[#B28A52]/40 transition-colors duration-300 flex flex-col justify-between ${
                index === 2 ? 'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none w-full' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Step indicator header */}
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#B28A52]/60 group-hover:text-[#B28A52] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 border border-[#B28A52]/30 flex items-center justify-center bg-[#181818]">
                    {item.icon}
                  </div>
                </div>

                {/* Title & subtitles */}
                <div className="space-y-1.5">
                  <h3 className="font-cinzel text-lg sm:text-xl text-[#E9E1D2] font-semibold group-hover:text-[#B28A52] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-[#B28A52] uppercase tracking-wider">
                    {item.subtitle}
                  </p>
                </div>

                {/* Description with enhanced legibility */}
                <p className="text-xs sm:text-sm text-[#C4BCAD] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="pt-4 border-t border-[#E9E1D2]/10 flex items-center gap-2 text-xs text-[#E9E1D2]/60">
                <span className="text-[#B28A52]">✦</span>
                <span>Etapa {index + 1} de 3</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
