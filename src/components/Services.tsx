import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealText } from './RevealText.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';
import { MediaImage } from './MediaImage.tsx';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const serviceItems = [
    {
      id: 'corte',
      name: 'Corte de Alfaiataria',
      webpSrc: '/media/corte-degrade.webp',
      jpgSrc: '/media/corte-degrade.jpg',
      remoteSrc: 'https://i.postimg.cc/wMY3y0Vp/Homem-com-corte-degrade-pronto.png',
      imageTitle: 'Corte Masculino & Degradê',
      imageDesc: 'Graduação refinada e caimento natural sob medida',
      duration: '50 min',
      objectPosition: 'object-[center_20%]',
      width: 800,
      height: 800,
      description:
        'Diagnóstico visagista, lavagem relaxante com ativos calmantes, corte lapidado com tesouras forjadas e finalização artesanal.',
      highlights: ['Análise de proporção craniana', 'Massagem capilar revigorante', 'Acabamento navalhado em nuca'],
    },
    {
      id: 'barba',
      name: 'Barba & Acabamento',
      webpSrc: '/media/barba-acabamento.webp',
      jpgSrc: '/media/barba-acabamento.jpg',
      remoteSrc: 'https://i.postimg.cc/Znz0BVLQ/Barba-e-acabamento-com-navalha.png',
      imageTitle: 'Barba Tradicional com Navalha',
      imageDesc: 'Toalha aquecida, óleos nobres e lâmina de precisão',
      duration: '45 min',
      objectPosition: 'object-[center_35%]',
      width: 640,
      height: 800,
      description:
        'O ritual clássico: toalha aquecida aromatizada, emulsão densa em pincel macio, lâmina de precisão e bálsamo refrescante pós-navalha.',
      highlights: ['Vaporização com óleo de cedro', 'Lâmina de alta precisão', 'Bálsamo calmante e hidratação'],
    },
    {
      id: 'completa',
      name: 'Experiência Completa',
      webpSrc: '/media/experiencia-final.webp',
      jpgSrc: '/media/experiencia-final.jpg',
      remoteSrc: 'https://i.postimg.cc/Hn1jcBtZ/Experiencia-final-barbeiro-e-cliente.png',
      imageTitle: 'Experiência Imperial Integrada',
      imageDesc: 'Harmonia integral entre cabelo, barba e bem-estar',
      duration: '90 min',
      objectPosition: 'object-[center_30%]',
      width: 1279,
      height: 720,
      description:
        'Alinhamento total de cabelo e barba em harmonia estética. Inclui consultoria de imagem, tratamento facial e bebida cortesia.',
      highlights: ['Corte visagista e barboterapia', 'Tratamento facial com toalha fria', 'Alinhamento integral de sobrancelha'],
    },
  ];

  return (
    <section id="servicos" className="py-20 sm:py-28 lg:py-32 bg-[#0E0E0E] relative border-t border-[#E9E1D2]/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B28A52]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B28A52] font-semibold">
                03. Nossos Serviços
              </span>
            </div>
            <RevealText
              as="h2"
              text="A Curadoria do Ritual"
              className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E9E1D2]"
              duration={0.75}
              stagger={0.04}
              yOffset={20}
              blur={8}
            />
          </div>
          <RevealText
            as="p"
            text="Sem processos genéricos. Cada atendimento é moldado à estrutura facial e ao estilo de cada cavalheiro."
            className="text-xs sm:text-sm text-[#9E988E] max-w-md leading-relaxed"
            delay={0.15}
            stagger={0.025}
            duration={0.65}
            blur={6}
            yOffset={14}
          />
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-[#141414] border border-[#E9E1D2]/10 hover:border-[#B28A52]/40 transition-all duration-300 flex flex-col group overflow-hidden ${
                index === 2 ? 'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none w-full' : ''
              }`}
            >
              {/* Image Frame with duration badge */}
              <div className="overflow-hidden relative aspect-[16/10] bg-[#121212] border-b border-[#E9E1D2]/10">
                <MediaImage
                  src={item.webpSrc}
                  fallbackSources={[item.jpgSrc, item.remoteSrc]}
                  sources={[
                    { srcSet: item.webpSrc, type: 'image/webp' },
                    { srcSet: item.jpgSrc, type: 'image/jpeg' },
                  ]}
                  alt={item.name}
                  title={item.imageTitle}
                  description={item.imageDesc}
                  aspectRatioClass="aspect-[16/10]"
                  className="w-full h-full border-0"
                  objectPosition={item.objectPosition}
                  width={item.width}
                  height={item.height}
                  priority={false}
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-2.5 py-1 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#E9E1D2]/15 text-[10px] sm:text-[11px] font-mono text-[#B28A52] uppercase tracking-wider">
                  {item.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 justify-between space-y-5">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="font-cinzel text-lg sm:text-xl text-[#E9E1D2] font-semibold tracking-wide group-hover:text-[#B28A52] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E988E] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#E9E1D2]/8 space-y-1.5">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#E9E1D2]/70">
                        <span className="text-[#B28A52] text-[10px]">✦</span>
                        <span className="truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9E1D2]/8 flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-[#9E988E]/80">
                    Atendimento com hora marcada
                  </span>
                  <button
                    onClick={() => onSelectService(item.name)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B28A52] hover:text-[#C9A066] font-semibold group/btn"
                  >
                    <span>Selecionar</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic WhatsApp Inquiries Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 lg:p-10 bg-[#121212] border border-[#E9E1D2]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-[0.2em] text-[#B28A52] font-semibold">
              <span>✦</span>
              <span>Dúvidas sobre o corte ou ritual ideal?</span>
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl text-[#E9E1D2] font-bold">
              Consulte nossos barbeiros especialistas
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988E] leading-relaxed">
              Tire dúvidas sobre visagismo facial, cuidados com a barba ou solicite orientações exclusivas diretamente pelo WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.link/wx6nob"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A0A0A] bg-[#25D366] hover:bg-[#20ba59] active:scale-98 transition-all shrink-0 shadow-lg shadow-[#25D366]/20 relative z-10 group/wa font-sans"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A] group-hover/wa:scale-110 transition-transform" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
