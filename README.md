# Barbearia Imperial — Site Cinematográfico

Portfólio conceitual demonstrativo da **Barbearia Imperial**.
Conceito: *"Mais do que um corte. Um ritual de imagem."*

## Visão Geral Técnica
- **Framework**: React 19 + TypeScript + Vite 8 + Tailwind CSS v4
- **Hero Scroll Cinema**:
  - Seção com 480vh de rolagem e viewport sticky de `100svh` / `100dvh`
  - Vídeo H.264 scrubbable cujo `currentTime` é sincronizado diretamente ao progresso normalizado da posição de scroll:
    `p = clamp(-rect.top / (sectionHeight - viewportHeight), 0, 1)`
    `video.currentTime = p * duration`
  - Atualizações via `requestAnimationFrame` e listeners passivos sem re-renderizações React desnecessárias por pixel
  - Indicador vertical temático estilo **Barber Pole** animado pelo mesmo progresso `p`
  - Respeito à preferência de acessibilidade `prefers-reduced-motion`
  - Fallback gracioso com tela de simulação caso a mídia ainda não tenha sido inserida em `/public/media/`
- **Direção Visual**:
  - Paleta: Preto (#0A0A0A), Grafite (#161616), Marfim (#E9E1D2), Bronze (#B28A52) e Madeira Escura (#2A1F18)
  - Tipografia: Editorial Cinzel & Cormorant Garamond para títulos + Plus Jakarta Sans para leitura
- **Seções Implementadas**:
  1. *Hero Cinema*: Scroll cinema, marca e frases narrativas progressivas
  2. *Manifesto*: A essência do ritual e resgate do tempo masculino
  3. *Serviços*: Corte Masculino, Barba e Acabamento, Experiência Completa
  4. *Diferenciais e Precisão*: Instrumentos em aço forjado, autoclave e visagismo
  5. *O Espaço*: Arquitetura do salão com micro-movimento responsivo controlado
  6. *O Ritual*: Linha do tempo em 3 etapas (Acolhimento, Execução da Lâmina, Finalização)
  7. *Chamada Final*: CTA demonstrativo com aviso claro de projeto conceitual
  8. *Modal de Agendamento*: Fluxo simulado de agendamento para testes de UX
  9. *Rodapé*: Identidade, navegação e aviso institucional de demonstração

## Diretório de Mídia (`/public/media/`)
Copie os arquivos de mídia aprovados em `/public/media/`:
- `hero-desktop-scroll.mp4` (1920x1080, horizontal, 8 segundos, codificação all-intra)
- `hero-mobile-lightweight-landscape.mp4` (1280x720, horizontal)
- `hero-poster.webp`
- `ritual-do-mestre.webp`
- `corte-degrade.webp`
- `barba-acabamento.webp`
- `instrumentos-premium.webp`
- `ambiente-completo.webp`
- `experiencia-final.webp`

## Orientações para Deploy (Vercel & GitHub)

### 1. Versionamento no GitHub
```bash
git init
git add .
git commit -m "feat: Barbearia Imperial site cinematografico completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/barbearia-imperial.git
git push -u origin main
```

### 2. Deploy na Vercel
1. Acesse o painel da [Vercel](https://vercel.com/) e clique em **Add New Project**.
2. Conecte seu repositório GitHub do projeto.
3. As configurações do Vite são detectadas automaticamente:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Clique em **Deploy**.
