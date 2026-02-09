import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Ativa quando a seção está no meio da tela
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Detecta se está no topo (home)
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId || (sectionId === '' && activeSection === '');
    return `text-sm uppercase tracking-widest relative link duration-300 hover:text-black hover:border-none hover:pl-4 pl-8 border-b ${isActive ? 'text-black pl-4 border-none' : 'text-white'}`;
  };

  const getSpanClass = (sectionId: string) => {
    const isActive = activeSection === sectionId || (sectionId === '' && activeSection === '');
    return `duration-500 absolute top-0 left-0 h-full bg-white -z-10 ${isActive ? 'w-full' : 'w-0'}`;
  };

  const getMobileLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId || (sectionId === '' && activeSection === '');
    return `text-4xl md:text-7xl font-extralight uppercase tracking-widest relative link duration-300 hover:text-black hover:pl-4 ${isActive ? 'text-black pl-4' : 'text-white'}`;
  };

  return (
    <>
      <div className='hidden lg:block'>
        <VerticalBars />
        <a href='#' className={getLinkClass('')}><span className={getSpanClass('')}/>Home</a>
        <VerticalBars />
          <a href='#work' className={getLinkClass('work')}><span className={getSpanClass('work')}/>WORK</a>
        <VerticalBars />
          <a href='#about' className={getLinkClass('about')}><span className={getSpanClass('about')}/>ABOUT</a>
        <VerticalBars />
          <a href='#press' className={getLinkClass('press')}><span className={getSpanClass('press')}/>PRESS</a>
        <VerticalBars />
          <a href='#contact' className={getLinkClass('contact')}><span className={getSpanClass('contact')}/>CONTACT</a>
        <VerticalBars />
      </div>
      {/* Mobile Menu */}
      <div>
        {isOpen ? (<X onClick={() => setIsOpen(false)} className='z-1000 block lg:hidden cursor-pointer fixed top-4 right-4' strokeWidth={1.5} size={24} color='white'/>) : (<Menu onClick={() => setIsOpen(true)} className='z-1000 block lg:hidden cursor-pointer fixed top-4 right-4' strokeWidth={1.5} size={24} color='white'/>)} 
      </div>
      <div className={`bg-stone-800 fixed top-0 duration-500 ${isOpen ? 'right-0' : '-right-full'} w-full h-full lg:hidden z-50`}>
        <div className='flex flex-col gap-6 items-left justify-center h-full pl-24'>
          <a onClick={() => setIsOpen(false)} href='#' className={getMobileLinkClass('')}><span className={getSpanClass('')}/>Home</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#work' className={getMobileLinkClass('work')}><span className={getSpanClass('work')}/>WORK</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#about' className={getMobileLinkClass('about')}><span className={getSpanClass('about')}/>ABOUT</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#press' className={getMobileLinkClass('press')}><span className={getSpanClass('press')}/>PRESS</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#contact' className={getMobileLinkClass('contact')}><span className={getSpanClass('contact')}/>CONTACT</a>
        </div>
      </div>
    </>
  )
}

export default Navbar

const VerticalBars = () => {
  return (
    <div className='h-1/3 w-full flex flex-col gap-6 my-8'>
      <div className='h-px w-1/3 bg-white/20' />
      <div className='h-px w-1/3 bg-white/20' />
      <div className='h-px w-1/3 bg-white/20' />
      <div className='h-px w-1/3 bg-white/20' />
    </div>
  )
}
const VerticalBar = () => {
  return (
      <div className='h-px w-1/3 bg-white/50' />
  )
}
