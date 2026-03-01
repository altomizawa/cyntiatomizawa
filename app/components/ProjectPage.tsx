'use client'
import React, { useState, useRef, useEffect} from 'react'
import ReactLenis from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowBigLeft, ArrowBigRight, ChevronDown, Scroll } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import projects from '../lib/projects';


gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 
gsap.registerPlugin(ScrollTrigger) 



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
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projectNavRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const projectDescriptionRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nextProjectProgressBarRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    gsap.set(nextProjectProgressBarRef.current, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(progressBarRef.current, { scaleX: 0,transformOrigin: 'left center' });
    gsap.set(projectNavRef.current, { y: -100, opacity: 0 });
    gsap.set('.navmenu', { scaleY: 0, transformOrigin: 'top center' });
    gsap.to(projectNavRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });

    gsap.to(progressBarRef.current,{
      scaleX: 1,
      scrollTrigger: {
        trigger: '.body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    })

    // ScrollTrigger.create({
    //   trigger: document.body,
    //   start: 'top top',
    //   end: 'bottom bottom',
    //   onUpdate: (self) => {
    //     if(shouldUpdateProgress){
    //       gsap.to(progressBarRef.current, {
    //         scaleX: self.progress,
    //         duration: 0.1,
    //         ease: 'power2.out',
    //       })
    //     }
    //     console.log('isMenuOpen status:', isMenuOpen);
    //   },
    // })
    // Footer ScrollTrigger for next project transition
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight*3}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if (!isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: 'power2.inOut',
          })
        }
      },
      onLeaveBack: () => {
        if (!isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          })
        }
      },
      onUpdate: (self) => {
        gsap.set(nextProjectProgressBarRef.current, {
          scaleX: self.progress,
        })
        if (self.progress >= 0.99 && !isTransitioning) {
          setIsTransitioning(true);
          window.location.href = `/work/${nextProject.slug}`;
        }
      },
    })
  })

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to('.navmenu', {
        scaleY: 1,
        y: 24,
        transformOrigin: 'top center',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      gsap.to('.rotating-title', {
        y: -24,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    } else {
      gsap.to('.navmenu', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      gsap.to('.rotating-title', {
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }
  }, [isMenuOpen])

  return (
    <ReactLenis root>
      <main className='body'>
      <nav ref={projectNavRef} className='header opacity-0 fixed top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] mx-auto h-32 flex items-center justify-center gap-4 z-1000'>
          <Link href={`/work/${prevProject.slug}`} className='header-buttons px-4 py-2 text-sm md:text-base rounded-md bg-black/10 uppercase font-semibold text-black/60 duration-500 hover:bg-white/40'><ArrowBigLeft strokeWidth={1.5} className='inline-block mr-2'/>Prev</Link>
          <div onClick={() => setIsMenuOpen(prev => !prev)} className='header-scrollbar flex-1 flex items-center justify-center relative h-10 backdrop-blur-md '>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full rounded-md bg-neutral-300 opacity-40'/>
            <div 
              ref={progressBarRef}      
              style={{ willChange: 'transform' }}
              className={`absolute top-0 left-0 w-full h-full bg-black/10 rounded-md duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}/>
            <h1 className=' tracking-widest z-10 font-semibold text-black/60 text-sm md:text-base relative h-6 overflow-hidden grid'>
              <span className='rotating-title text-center'>
              {project.title.toUpperCase()}
              </span>
              <span className='rotating-title text-center'>
              SELECT PROJECT
              </span>
            </h1>
            <ul className={`navmenu absolute left-0 w-full h-full flex flex-col items-center py-4 gap-px`}>
              {
                projects.map((proj, index) => (
                  <li key={index} className={`${proj.title === project.title ? 'underline underline-offset-4 font-semibold' : ''} w-full border cursor-pointer grid place-items-center border-b border-black/10`}><Link href={`/work/${proj.slug}`} className='py-2 w-full h-full text-center text-black/60 tracking-widest  hover:bg-black/20 backdrop-blur-md bg-black/10'>{proj.title}</Link></li>
                ))
              }
            </ul>
            <ChevronDown strokeWidth={1.5} className={`absolute top-1/2 -translate-y-1/2 right-4 duration-500 ${isMenuOpen ? 'rotate-180' : ''}`}/>
          </div>
          <Link href={`/work/${nextProject.slug}`} className='header-buttons px-4 py-2 text-sm md:text-base rounded-md bg-black/10 uppercase font-semibold text-black/60 duration-500 hover:bg-white/40'>Next<ArrowBigRight strokeWidth={1.5} className='inline-block ml-2'/></Link>
        </nav>
          <section className='h-screen grid place-items-center'>
            <h1 className='text-[12vw] md:text-[8vw] tracking-widest text-center opacity-100'>{project.title.toUpperCase()}</h1>
          </section>
          <section ref={projectDescriptionRef} className='project-description-wrapper py-48  border flex items-center justify-center px-4 bg-white/40'>
            <p className='project-description text-2xl uppercase w-2/3 leading-12'>{project.description}</p>
          </section>

          {project.images.map((img, index) => (
            <section key={index} className='h-screen w-full relative overflow-hidden grid place-items-center gap-8 py-16 bg-white'>
                  <Image src={img} alt={`${project.title} image ${index + 1}`} width={1920} height={1080} className='h-[90%] w-[90%] md:w-2/3 object-contain'/>
            </section>
          ))}
        <footer ref={footerRef} className='h-screen grid place-items-center relative'>
          <div className='absolute top-1/3 flex items-center justify-center h-2 w-[50vw]'>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full rounded-sm bg-neutral-300 opacity-40 backdrop-blur-lg'/>
            <div ref={nextProjectProgressBarRef} className='next-progress-bar absolute top-0 left-0 w-full h-full bg-black/20 rounded-sm'/>
            <h1 className='absolute top-0 tracking-widest z-10 font-semibold text-black/60 text-center'>keep scrolling for next project</h1>
          </div>
          <h1 className='text-[12vw] md:text-[8vw] tracking-widest text-center opacity-100'>{nextProject.title.toUpperCase()}</h1>
        </footer>
      </main>
    </ReactLenis>
  )
}

export default ProjectPage
