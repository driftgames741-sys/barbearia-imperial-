import React from 'react';
import { ShieldCheck, Compass, Feather, Sparkles } from 'lucide-react';
import { RevealText } from './RevealText.tsx';
import { MediaImage } from './MediaImage.tsx';

export const PrecisionDetails: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Lâminas de Precisão & Fio Navalha',
      desc: 'Tesouras artesanais em liga de alto carbono e lâminas de corte único, proporcionando caimento perfeito sem puxar os fios.',
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
    {
      num: '02',
      title: 'Esterilização & Cuidado Rigoroso',
      desc: 'Protocolo de assepsia e autoclave de alto padrão para todos os instrumentos metálicos, garantindo segurança absoluta.',
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
    {
      num: '03',
      title: 'Visagismo Anatômico',
      desc: 'Mapeamento visual que respeita o formato do crânio, a simetria do rosto e o direcionamento natural do crescimento dos fios.',
      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
    {
      num: '04',
      title: 'Cosmética Botânica Selecionada',
      desc: 'Pomadas à base de ceras naturais, bálsamos de cedro e bergamota, e loções calmantes desenvolvidas para a pele masculina.',
      icon: <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28A52]" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#0A0A0A] border-t border-[#E9E1D2]/8 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual: Editorial Instruments */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-2 border border-[#B28A52]/20 -translate-x-1.5 translate-y-1.5 pointer-events-none transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />
              <MediaImage
                src="/media/instrumentos-premium.webp"
                fallbackSources={[
                  '/media/instrumentos-premium.jpg',
                  'https://i.postimg.cc/J030bZTd/Ferramentas-Premium-em-Barbearia-Classica.png',
                ]}
                sources={[
                  { srcSet: '/media/instrumentos-premium.webp', type: 'image/webp' },
                  { srcSet: '/media/instrumentos-premium.jpg', type: 'image/jpeg' },
                ]}
                alt="Ferramentas Premium em Barbearia Clássica — Navalhete, tesouras e escova de acabamento"
                title="Instrumentos Premium"
                description="Tesouras forjadas à mão, navalhete de alta precisão e materiais esterilizados"
                aspectRatioClass="aspect-[4/5]"
                className="shadow-2xl shadow-black/80"
                objectPosition="object-center"
                width={800}
                height={800}
                priority={false}
              />
            </div>
          </div>

          {/* Editorial Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#B28A52]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#B28A52] font-semibold">
                  04. Diferenciais & Padrão
                </span>
              </div>
              <RevealText
                as="h2"
                text="Precisão em Cada Detalhe"
                className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E9E1D2]"
                duration={0.75}
                stagger={0.04}
                yOffset={20}
                blur={8}
              />
              <RevealText
                as="p"
                text="A distinção de um corte de alto padrão está nos milímetros imperceptíveis a olho nu, mas evidentes na postura de quem o veste. Unimos tradição artesanal e técnica precisa."
                className="text-xs sm:text-sm md:text-base text-[#9E988E] leading-relaxed pt-1"
                delay={0.15}
                stagger={0.02}
                duration={0.65}
                blur={6}
                yOffset={14}
              />
            </div>

            {/* 4 Pillars Grid (1 col mobile, 2 col tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {pillars.map((item) => (
                <div
                  key={item.num}
                  className="p-5 sm:p-6 bg-[#121212] border border-[#E9E1D2]/8 hover:border-[#B28A52]/40 transition-colors duration-200 space-y-2.5 sm:space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#B28A52] tracking-widest font-semibold">
                      {item.num}
                    </span>
                    <div className="p-1.5 sm:p-2 bg-[#1A1A1A] group-hover:bg-[#B28A52]/10 transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-cinzel text-sm sm:text-base font-semibold text-[#E9E1D2] group-hover:text-[#B28A52] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9E988E] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
