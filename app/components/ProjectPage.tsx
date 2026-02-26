'use client'
import React, { useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import Link from 'next/link';


gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

interface Project {
    title: string,
    description: string,
    slug: string,
    coverImage: string,
    images: string[],
}

interface ProjectPageProps {
  project: Project;
  nextProject: Project;
  prevProject: Project;
}

const ProjectPage = ({ project, nextProject, prevProject }: ProjectPageProps) => {
  const [ isTransitioning, setIsTransitioning ] = useState(false);
  const [ shouldUpdateProgress, setShouldUpdateProgress ] = useState(true);

  useGSAP(() => {
      gsap.registerPlugin(ScrollTrigger) 

      gsap.fromTo('.header-buttons', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power1.out' });
      gsap.fromTo('.header-scrollbar', { opacity: 0, y: -50 }, { delay: 0.2, opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power1.out' });
      gsap.fromTo('.title', { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 2, stagger: 0.3, ease: 'power1.out', scrollTrigger: {
        trigger: '.title',
        start: 'top 50%',
        end: 'top 10%',
        scrub: true,
        toggleActions: 'play none none reverse', }
      })
      gsap.fromTo('.progress-bar', { width:0 }, { width: '100%', duration: 2, scrollTrigger: {
        trigger: '.body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: () => {
        if (isTransitioning) {
          gsap.to('.header', { opacity: 0, duration: 0.4 })
        } else {
          gsap.to('.header', { opacity: 1, duration: 0.4 })
        }
        },
        scrub: true,
        toggleActions: 'play none none reverse', }
      })
      gsap.fromTo('.footer-title', { opacity:0 }, { opacity: 1, duration: 2, scrollTrigger: {
        trigger: '.footer-title',
        start: 'bottom bottom',
        toggleActions: 'play none none reverse', }
      })
      // gsap.to('.header', {
      //   y: -50,
      //   opacity: 0,
      //   duration: 0.4,
      //   scrollTrigger: {
      //     trigger: '.title',
      //     start: 'top 10%',
      //     onEnter: () => gsap.to('.header', { opacity: 0, y: -50, duration: 0.4 }),
      //     onLeaveBack: () => gsap.to('.header', { opacity: 1, y: 0, duration: 0.4 }),
      //     onLeave: () => gsap.to('.header', { opacity: 1, y: 0, duration: 0.4 }),
      //     toggleActions: 'play none none reverse',
      //     onScrubComplete: () => {console.log('scrub complete')
      //   },
      //   }
      // })
      gsap.fromTo('.next-progress-bar', { width: 0 }, { width: '100%', duration: 2, scrollTrigger: {
        trigger: '.footer',
        start: 'top top',
        end: `+=${window.innerHeight*3}px`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onEnter: () => gsap.to('.header', { y: -100, duration: 0.4 }),
        onLeaveBack: () => gsap.to('.header', { y: 0, duration: 0.4 }),
        toggleActions: 'play none none reverse', }
      }) 
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress])
      
  return (
    <div className='body'>
     <header className='header fixed top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] mx-auto h-32 flex items-center justify-center gap-4 z-1000'>
        <Link href={`/work/${prevProject.slug}`} className='header-buttons px-4 py-2 text-sm md:text-base rounded-md bg-black/10 uppercase font-semibold text-black/60'><ArrowBigLeft strokeWidth={1.5} className='inline-block mr-2'/>Prev</Link>
        <div className='header-scrollbar flex-1 flex items-center justify-center relative h-10'>
          <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full rounded-md bg-neutral-300 opacity-40 backdrop-blur-lg'/>
          <div className='progress-bar absolute top-0 left-0 w-full h-full bg-black/20 rounded-md'/>
          <h1 className=' tracking-widest z-10 font-semibold text-black/60 text-sm md:text-base'>{project.title.toUpperCase()}</h1>
        </div>
        <Link href={`/work/${nextProject.slug}`} className='header-buttons px-4 py-2 text-sm md:text-base rounded-md bg-black/10 uppercase font-semibold text-black/60'>Next<ArrowBigRight strokeWidth={1.5} className='inline-block ml-2'/></Link>
      </header>
      <main className='relative'>
        <div className='h-screen grid place-items-center'>
          <h1 className='text-[12vw] md:text-[10vw] tracking-widest text-center'>{project.title.toUpperCase()}</h1>
        </div>
        <div className='h-screen border'></div>
        <div className='h-screen border'></div>
        <div className='title footer h-screen grid place-items-center'>
          <div className='absolute top-1/3 flex items-center justify-center h-2 w-[50vw]'>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full rounded-sm bg-neutral-300 opacity-40 backdrop-blur-lg'/>
            <div className='next-progress-bar absolute top-0 left-0 w-full h-full bg-black/20 rounded-sm'/>
            <h1 className=' tracking-widest z-10 font-semibold text-black/60'>NEXT PROJECT:</h1>
          </div>
          <h1 className='footer-title text-[12vw] md:text-[10vw] tracking-widest text-center opacity-0'>{nextProject.title.toUpperCase()}</h1>
        </div>
      </main>
    </div>
  )
}

export default ProjectPage
