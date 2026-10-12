import React from 'react';
import { Scissors } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080808] border-t border-[#E9E1D2]/10 py-12 sm:py-16 text-[#C4BCAD]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10 sm:space-y-12">
        {/* Reorganized Responsive Grid: 1 col mobile, 2 balanced cols on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Brand & Philosophy */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[#B28A52]">✦</span>
              <span className="font-cinzel text-xl text-[#E9E1D2] font-bold tracking-[0.2em]">
                BARBEARIA IMPERIAL
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#C4BCAD] max-w-sm leading-relaxed">
              Mais do que um corte. Um ritual de imagem. Alfaiataria capilar e visagismo masculino clássico contemporâneo.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.link/wx6nob"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#E9E1D2] hover:text-[#25D366] transition-colors py-1 group/wa"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover/wa:scale-110 transition-transform" />
                <span>Atendimento & Dúvidas via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B28A52] font-semibold block">
              Navegação
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#hero" className="text-[#C4BCAD] hover:text-[#B28A52] transition-colors">
                  01. Início & Apresentação
                </a>
              </li>
              <li>
                <a href="#manifesto" className="text-[#C4BCAD] hover:text-[#B28A52] transition-colors">
                  02. Manifesto da Imagem
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-[#C4BCAD] hover:text-[#B28A52] transition-colors">
                  03. Curadoria de Serviços
                </a>
              </li>
              <li>
                <a href="#espaco" className="text-[#C4BCAD] hover:text-[#B28A52] transition-colors">
                  04. O Espaço & Arquitetura
                </a>
              </li>
              <li>
                <a href="#ritual" className="text-[#C4BCAD] hover:text-[#B28A52] transition-colors">
                  05. As Etapas do Atendimento
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Commitment */}
          <div className="sm:col-span-1 lg:col-span-4 p-5 bg-[#121212] border border-[#B28A52]/25 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B28A52] uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5" />
              <span>Compromisso Imperial</span>
            </div>
            <p className="text-xs text-[#C4BCAD] leading-relaxed">
              Dedicados à alta alfaiataria capilar e ao cuidado masculino em sua forma mais nobre. Atendimentos individuais com hora marcada para proporcionar discrição, conforto e excelência técnica.
            </p>
          </div>
        </div>

        {/* Bottom hairline row */}
        <div className="pt-8 border-t border-[#E9E1D2]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E988E]">
          <p>© {new Date().getFullYear()} Barbearia Imperial. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-[11px] text-[#9E988E]">
            <span>Tradição & Visagismo</span>
            <span>·</span>
            <span>Atendimento Exclusivo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
