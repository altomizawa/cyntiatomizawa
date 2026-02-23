'use client';
import { useRef, useEffect } from 'react';

const DEFAULT_IMAGES = [
  "/assets/ANEL+Cuadrato.webp",
  "/assets/ANEL+Fences+Two.webp",
  "/assets/Anel+JK.webp",
  "/assets/ANEL+Lua.webp",
  "/assets/Anel+Lunar.webp",
  "/assets/ANEL+Round.webp",
  "/assets/ANEL+Vitral.webp",
  "/assets/BRINCO+Círculos.webp",
  "/assets/BRINCO+Constelação.webp",
  "/assets/BRINCO+Cuadrato.webp",
  "/assets/BRINCO+Fences+Dance-Rubelita.webp",
  "/assets/BRINCO+Fences+Diamantes.webp",
  "/assets/BRINCO+Redondo.webp",
  "/assets/BRINCO+Vitral.webp",
  "/assets/CILINDROS-Brinco-M-4.webp",
  "/assets/CONSTELAÇÃO-Conjunto-M-1.webp",
  "/assets/CÚPULA-Conjunto-M-2.webp",
  "/assets/CUPULA+Ring.webp",
  "/assets/CYLINDER-Earrings.webp",
  "/assets/EARRINGS-Carousel.webp",
];

export default function ImageTrail({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const refs = useRef<HTMLImageElement[]>([]);
  const currentIndex = useRef(0);
  const steps = useRef(0);
  const nbOfImages = useRef(0);
  const maxImages = 8;

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY, movementX, movementY } = e;
    
    nbOfImages.current += Math.abs(movementX) + Math.abs(movementY);

    if (nbOfImages.current > 100) {
      if (currentIndex.current >= DEFAULT_IMAGES.length) currentIndex.current = 0;
      
      const el = refs.current[currentIndex.current];
      if (el) {
        // Get relative position if needed, but clientX/Y works for fixed positioning
        el.style.display = 'block';
        el.style.opacity = '1';
        el.style.left = clientX + 'px';
        el.style.top = clientY + 'px';
        el.style.zIndex = steps.current.toString();
        
        // Use a timeout to hide the image after some time (trail effect)
        const currentEl = el;
        setTimeout(() => {
          currentEl.style.display = 'none';
        }, 1000);

        currentIndex.current++;
        steps.current++;
        nbOfImages.current = 0;
      }
    }
  };

  useEffect(() => {
    const target = containerRef.current;
    if (target) {
      target.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (target) {
        target.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [containerRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] w-full h-full overflow-hidden">
      {DEFAULT_IMAGES.map((src, i) => (
        <img
          key={i}
          ref={(el) => { if (el) refs.current[i] = el; }}
          src={src}
          alt=""
          className="absolute hidden opacity-0 duration-300 w-[200px] aspect-square  object-cover -translate-x-1/2 -translate-y-1/2 object-cover shadow-2xl transition-opacity duration-500 will-change-transform"
        />
      ))}
    </div>
  );
}
