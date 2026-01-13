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

    // 2. Manejo Táctil PRO (Móvil) - Captura vertical y horizontal
    let lastX = 0;
    let lastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      lastX = e.touches[0].pageX;
      lastY = e.touches[0].pageY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.cancelable) return;
      e.preventDefault(); // Bloquea el scroll nativo del celular

      const currentX = e.touches[0].pageX;
      const currentY = e.touches[0].pageY;

      // Calculamos cuánto se movió el dedo
      const xDiff = lastX - currentX;
      const yDiff = lastY - currentY;

      // Si el movimiento es mayormente vertical (arriba/abajo), 
      // usamos yDiff para movernos horizontalmente.
      // Multiplicamos por 1.5 para que se sienta más rápido y fluido.
      if (Math.abs(yDiff) > Math.abs(xDiff)) {
        el.scrollLeft += yDiff * 1.5;
      } else {
        el.scrollLeft += xDiff * 1.5;
      }

      lastX = currentX;
      lastY = currentY;
    };

    // 3. Seguimiento de Mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    
    // IMPORTANTE: el listener de touchmove debe tener passive: false 
    // para que el preventDefault funcione y el celular no bloquee el movimiento.
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
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-8 md:px-12 mix-blend-difference">
        <div className="text-lg md:text-xl font-bold tracking-tight">
          Bytex <span className="text-zinc-600 font-light mx-1">|</span> <span className="text-zinc-400 font-normal">Software y Marketing</span>
        </div>
        <a 
          href="https://wa.link/hdqr4v" 
          target="_blank" 
          className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
        >
          Cotizar Proyecto
        </a>
      </nav>

      {/* CONTENEDOR PRINCIPAL */}
      <main ref={scrollRef} className="flex h-full w-full overflow-x-hidden overflow-y-hidden select-none">
        
        {/* SECCIÓN 01: HOME */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 border-r border-zinc-900/50">
          <h1 className="text-[12vw] md:text-[9vw] font-bold tracking-tighter leading-[0.8] mb-8">
            DIGITAL<br/><span className="text-zinc-800 italic font-light">SOLUTIONS</span>
          </h1>
          <p className="max-w-xl text-zinc-500 text-lg md:text-xl border-l border-zinc-800 pl-6">
            Impulsamos negocios mediante <span className="text-zinc-300">Marketing 360</span>, <span className="text-zinc-300">Desarrollo Web</span> de alto impacto y <span className="text-zinc-300">SaaS</span> escalables.
          </p>
        </section>

        {/* SECCIÓN 02: MARKETING 360 */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 bg-zinc-950/50 border-r border-zinc-900/50">
          <span className="text-zinc-700 font-mono text-[10px] mb-12 uppercase tracking-[0.2em]">/ 01 . MARKETING 360</span>
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Tráfico que convierte.</h2>
            <p className="text-zinc-500 text-xl mb-10 leading-relaxed">
              No solo creamos anuncios; diseñamos estrategias integrales de pauta, contenido y embudos de venta para maximizar tu retorno de inversión.
            </p>
            <div className="flex gap-4 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span>Ads</span> • <span>Estrategia</span> • <span>Contenido</span>
            </div>
          </div>
        </section>

        {/* SECCIÓN 03: DESARROLLO WEB */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 border-r border-zinc-900/50">
          <span className="text-zinc-700 font-mono text-[10px] mb-12 uppercase tracking-[0.2em]">/ 02 . DESARROLLO WEB</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">Tu vidriera digital.</h2>
              <p className="text-zinc-500 text-xl leading-relaxed">Landings, sitios corporativos y tiendas online diseñadas con tecnología de última generación para una velocidad de carga instantánea.</p>
            </div>
            <div className="flex flex-col justify-center gap-4">
               <div className="h-px w-full bg-zinc-800"></div>
               <div className="flex justify-between items-center"><span className="text-zinc-300">Landing Page</span></div>
               <div className="h-px w-full bg-zinc-800"></div>
               <div className="flex justify-between items-center"><span className="text-zinc-300">Sitios Corporativos</span></div>
               <div className="h-px w-full bg-zinc-800"></div>
               <div className="flex justify-between items-center"><span className="text-zinc-300">E-commerce</span></div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 04: SAAS & SOFTWARE */}
<section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24 bg-zinc-950/50 border-r border-zinc-900/50">
  <span className="text-zinc-700 font-mono text-[10px] mb-12 uppercase tracking-[0.2em]">/ 03 . SOFTWARE & SAAS</span>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl">
    <div>
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">Sistemas Propios.</h2>
      <p className="text-zinc-500 text-xl leading-relaxed mb-8">
        Desarrollo de software a medida y productos SaaS pensados para automatizar y escalar procesos de negocio.
      </p>
    </div>
    
    {/* CARD DE BYTEX MANAGER */}
    <div>
      <div>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">Bytex Manager</h3>
        <p className="text-zinc-500 text-xl leading-relaxed mb-8">
          Nuestra solución propietaria para la gestión eficiente de leads y operaciones comerciales en tiempo real.
        </p>
      </div>
      
      {/* BOTÓN SABER MÁS */}
      <a 
        href="https://bytexmanager.netlify.app/" // Reemplaza con la URL real de tu landing
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-all"
      >
        <span className="border-b border-blue-500 group-hover:border-white pb-1">Saber más</span>
        <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
      </a>
    </div>
  </div>
</section>

        {/* SECCIÓN 05: CONTACTO */}
        <section className="flex-none w-screen h-full flex flex-col justify-center px-8 md:px-24">
          <h2 className="text-[10vw] font-bold tracking-tighter leading-none mb-12 text-white">
            ¿Hablamos?
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <a href="https://wa.link/hdqr4v" className="text-4xl md:text-6xl font-light border-b border-zinc-800 pb-2 hover:border-white transition-all">
              WhatsApp →
            </a>
            <div className="md:ml-auto text-zinc-600 font-mono text-xs uppercase tracking-widest text-right">
              Villa María, Córdoba<br/>
              Argentina 2026
            </div>
          </div>
        </section>

      </main>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden !important;
          touch-action: none; /* Esto desactiva el gesto de recargar (pull-to-refresh) */
        }
      `}</style>
    </div>
  );
}