"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function BytexLanding() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // 1. Manejo de Rueda (PC)
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    // 2. Manejo Táctil (Móvil) - REINTEGRADO
    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchEnd = e.touches[0].clientX;
      const move = touchStart - touchEnd;
      el.scrollLeft += move;
      touchStart = touchEnd;
      if (e.cancelable) e.preventDefault();
    };

    // 3. Seguimiento de Mouse (Efecto Grid)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: window.innerWidth * index,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white antialiased overflow-hidden">
      
      {/* EFECTO GRID INTERACTIVO */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent), 
                            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: `100% 100%, 40px 40px, 40px 40px`
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 py-8 md:px-12 mix-blend-difference">
        <div className="text-lg md:text-xl font-bold tracking-tight">
          Bytex <span className="text-zinc-600 font-light mx-1">|</span> <span className="text-zinc-400 font-normal">Software y Desarrollo Web</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
          <button 
            onClick={() => scrollToSection(0)} 
            className="hover:text-white hover:underline underline-offset-8 decoration-zinc-500 transition-all"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection(1)} 
            className="hover:text-white hover:underline underline-offset-8 decoration-zinc-500 transition-all"
          >
            Servicios
          </button>
          <button 
            onClick={() => scrollToSection(2)} 
            className="hover:text-white hover:underline underline-offset-8 decoration-zinc-500 transition-all"
          >
            Software
          </button>
          <button 
            onClick={() => scrollToSection(3)} 
            className="hover:text-white hover:underline underline-offset-8 decoration-zinc-500 transition-all"
          >
            Contacto
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-[110] flex flex-col gap-1.5"
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* MENU DESPLEGABLE MOBILE */}
      <div className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-10 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-8 text-4xl font-bold tracking-tighter">
          <button onClick={() => scrollToSection(0)} className="text-left">Inicio</button>
          <button onClick={() => scrollToSection(1)} className="text-left">Servicios</button>
          <button onClick={() => scrollToSection(2)} className="text-left">Software</button>
          <button onClick={() => scrollToSection(3)} className="text-left">Contacto</button>
        </div>
      </div>

      {/* CONTENEDOR DE SECCIONES */}
      <main 
        ref={scrollRef}
        className="relative z-10 flex h-full w-full overflow-x-hidden overflow-y-hidden select-none"
      >
        {/* SECCIÓN 01 */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 border-r border-zinc-900/50">
          <h1 className="text-[12vw] font-bold tracking-tighter leading-[0.8] mb-8">
            DIGITAL<br/><span className="text-zinc-800 italic font-light">SOLUTIONS</span>
          </h1>
          <p className="max-w-md text-zinc-500 text-lg md:text-xl border-l border-zinc-800 pl-6">
            Especialistas en la creación de ecosistemas digitales de alto rendimiento.
          </p>
        </section>

        {/* SECCIÓN 02 */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 bg-zinc-950/20 border-r border-zinc-900/50">
          <span className="text-zinc-700 font-mono text-[10px] mb-12 uppercase tracking-[0.2em]">/ 02 . DESARROLLO WEB</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-3xl font-light mb-2">Landings</h3>
              <p className="text-zinc-600">Alta conversión y diseño minimalista.</p>
            </div>
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-3xl font-light mb-2">Corporativos</h3>
              <p className="text-zinc-600">Presencia digital institucional sólida.</p>
            </div>
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-3xl font-light mb-2">E-commerce</h3>
              <p className="text-zinc-600">Tiendas rápidas y autogestionables.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 03 */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 border-r border-zinc-900/50">
          <span className="text-zinc-700 font-mono text-[10px] mb-12 uppercase tracking-[0.2em]">/ 03 . SOFTWARE</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Software a medida</h2>
              <p className="text-zinc-500 text-xl text-balance">Arquitecturas robustas para optimizar procesos complejos.</p>
            </div>
            <div>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">SaaS Bytex</h3>
              <p className="text-zinc-500 text-xl text-balance">"Nuestros propios productos con la misma rigurosidad técnica que ofrecemos a clientes."</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 04 */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 bg-zinc-950/20">
          <h2 className="text-[10vw] font-bold tracking-tighter leading-none mb-12">
            Iniciemos <br/>tu proyecto.
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col gap-4">
              <a href="mailto:bytexdesarrolloweb@outlook.com" className="text-2xl md:text-4xl font-light hover:text-zinc-400 transition-colors border-b border-zinc-800 pb-2">
                bytexdesarrolloweb@outlook.com →
              </a>
              <a 
                href="https://wa.link/hdqr4v"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-4xl font-light hover:text-zinc-400 transition-colors border-b border-zinc-800 pb-2"
              >
                Chat por WhatsApp
              </a>
            </div>
            <p className="text-zinc-600 font-mono text-xs uppercase self-end tracking-widest mt-auto">
              Villa María, Córdoba
            </p>
          </div>
        </section>
      </main>

      <style jsx global>{`
        body { margin: 0; padding: 0; overflow: hidden !important; background: black; }
      `}</style>
    </div>
  );
}