import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';

export interface TextSegment {
  text: string;
  className?: string;
}

export interface RevealTextProps {
  /**
   * Plain text string to reveal word by word.
   */
  text?: string;
  /**
   * Children as string or plain text.
   */
  children?: React.ReactNode;
  /**
   * Multi-segment text with individual styling (e.g. bold, italic, accent color).
   */
  segments?: TextSegment[];
  /**
   * Semantic HTML tag to render. Defaults to 'div'.
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  /**
   * Class name for the parent element.
   */
  className?: string;
  /**
   * Delay before animation starts (in seconds). Default: 0.
   */
  delay?: number;
  /**
   * Delay between consecutive words (in seconds). Recommended range: 0.035 - 0.055s. Default: 0.04s.
   */
  stagger?: number;
  /**
   * Animation duration per word (in seconds). Recommended range: 0.65 - 0.85s. Default: 0.75s.
   */
  duration?: number;
  /**
   * Initial vertical displacement (in pixels). Recommended range: 16 - 24px. Default: 20px.
   */
  yOffset?: number;
  /**
   * Initial blur radius (in pixels). Recommended range: 6 - 10px. Default: 8px.
   */
  blur?: number;
  /**
   * Trigger mode:
   * - 'inView': triggers when element scrolls into view (once: true).
   * - 'mount': triggers immediately when mounted/rendered.
   */
  trigger?: 'inView' | 'mount';
  /**
   * Whether to animate only once when inView. Default: true.
   */
  once?: boolean;
}

interface ParsedWord {
  id: string;
  word: string;
  className?: string;
}

const CINEMATIC_EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  children,
  segments,
  as: Component = 'div',
  className = '',
  delay = 0,
  stagger = 0.04,
  duration = 0.75,
  yOffset = 20,
  blur = 8,
  trigger = 'inView',
  once = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Scroll visibility observer
  const isInView = useInView(containerRef, {
    once,
    margin: '-8% 0px -8% 0px',
  });

  // Effective text source
  const effectiveText = React.useMemo(() => {
    if (text) return text;
    if (typeof children === 'string') return children;
    return '';
  }, [text, children]);

  // Build the list of parsed words from text or segments
  const parsedWords: ParsedWord[] = React.useMemo(() => {
    const list: ParsedWord[] = [];
    let wordIndex = 0;

    if (segments && segments.length > 0) {
      segments.forEach((seg, segIdx) => {
        const words = seg.text.trim().split(/\s+/).filter(Boolean);
        words.forEach((w) => {
          list.push({
            id: `seg-${segIdx}-w-${wordIndex++}`,
            word: w,
            className: seg.className,
          });
        });
      });
    } else if (effectiveText) {
      const words = effectiveText.trim().split(/\s+/).filter(Boolean);
      words.forEach((w) => {
        list.push({
          id: `w-${wordIndex++}`,
          word: w,
        });
      });
    }

    return list;
  }, [effectiveText, segments]);

  // Full raw string for accessible screen-reader announcement
  const fullText = React.useMemo(() => {
    if (segments && segments.length > 0) {
      return segments.map((s) => s.text).join(' ');
    }
    return effectiveText || '';
  }, [effectiveText, segments]);

  const shouldAnimate = trigger === 'mount' ? true : isInView;

  // Variants for Framer Motion / Motion
  const containerVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: reducedMotion ? 0 : delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : yOffset,
      filter: reducedMotion ? 'blur(0px)' : `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reducedMotion ? 0 : duration,
        ease: CINEMATIC_EASE,
      },
    },
  };

  const MotionTag = motion[Component] as any;

  return (
    <MotionTag
      ref={containerRef}
      className={`relative ${className}`}
      aria-label={fullText}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
    >
      {parsedWords.map((item) => (
        <span
          key={item.id}
          className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0 align-baseline"
          aria-hidden="true"
        >
          <motion.span
            variants={wordVariants}
            style={{ willChange: 'transform, opacity, filter' }}
            className={`inline-block ${item.className || ''}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
