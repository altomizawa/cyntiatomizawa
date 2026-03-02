'use client'
import React, { useState, useEffect} from 'react'
import ReactLenis from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);


  useGSAP(() => {
    gsap.fromTo('.project-nav', { y: 100, opacity: 0 }, { y: 0, delay:0.25, opacity: 1, duration: 1, ease: 'power3.out' });
    gsap.set('.page-scrollbar', { scaleX: 0, transformOrigin: 'center center' });
    gsap.set('.project-description', { y: 50, opacity: 0 }); 
    gsap.set('.parallax', { scale: 0.2, opacity: 0, transformOrigin: 'top center' });
    gsap.fromTo('.parallax', { opacity: 0, y: 100 }, { y: 0, opacity: 1 });
    // gsap.to('.select-menu', {opacity: 0, pointerEvents: 'none', duration: 1, ease: 'power3.out'});
    
    const navScrollTrigger = ScrollTrigger.create({
      trigger: '.body',
      start: 'top top',
      end: 'bottom bottom',
      
      onUpdate: (self) => {
        gsap.set('.page-scrollbar', {
          scaleX: self.progress,
        })
      }
    })

    gsap.to('.parallax', {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax',
        start: 'top bottom',
        end: 'top 20%',
        scrub: true,
      }
    })

    // const coverScrollTrigger = ScrollTrigger.create({
    //   trigger: '.parallax',
    //   start: 'top bottom',
    //   end: 'bottom top',
    //   scrub: true,
    //   onUpdate: (self) => {
    //     gsap.to('.parallax', {
    //       scale: 1 + self.progress * 0.1, // scale up to 10% as you scroll
    //     })
    //   },
    // })

    gsap.to('.project-description ', {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: '.project-description',
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    })
    const footerScrollTrigger = ScrollTrigger.create({
      trigger: '.footer',
      start: 'top top',
      end: `+=${window.innerHeight*3}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if (!isTransitioning) {
          gsap.to('.project-nav', {
            y: 100,
            duration: 0.5,
            ease: 'power3.inOut',
          })
        }
      },
      onLeaveBack: () => {
        if (!isTransitioning) {
          gsap.to('.project-nav', {
            y: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          })
        }
      },
      onUpdate: (self) => {
        if(shouldUpdateProgress) {
          gsap.set('.next-project-progress-bar', {
            scaleX: self.progress,
          })
        }
        if (self.progress >= 0.99 && !isTransitioning) {
          setShouldUpdateProgress(false); // stop updating progress to prevent multiple triggers
          setIsTransitioning(true);
          gsap.to('.page-scrollbar', {
            scaleX: 0,
          })
          window.location.href = `/work/${nextProject.slug}`;
        }
      },
    })

    return () => {
      navScrollTrigger.kill();
      footerScrollTrigger.kill();
      // projectDescriptionTrigger.kill();
    } 
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isSelectMenuOpen) {
      setIsSelectMenuOpen(false);
    }
  }
  const handleCloseSelectMenu = (e: MouseEvent) => {
    if (isSelectMenuOpen && !(e.target as HTMLElement).closest('.header-scrollbar')) {
      setIsSelectMenuOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleCloseSelectMenu);
    // });
    if (isSelectMenuOpen) {
      gsap.to('.select-menu', {opacity: 1, pointerEvents: 'all', duration: 0.5, ease: 'power3.out'});
    } else {
      gsap.to('.select-menu', {opacity: 0, pointerEvents: 'none', duration: 0.5, ease: 'power3.out'});
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleCloseSelectMenu);
    }
  }, [isSelectMenuOpen])

  return (
    <ReactLenis root>
      <main className='body'>
        {/* Navbar */}
        <nav className='project-nav opacity-0 fixed bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] mx-auto h-32 flex items-center justify-center z-1000'>
          <Link href={`/work/${prevProject.slug}`} onClick={()=>console.log('clicked')} className='header-buttons px-1 py-1 bg-black text-sm md:text-base uppercase font-semibold duration-500 text-white'><ArrowLeft strokeWidth={1.5} className='inline-block'/></Link>
          
          <div onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)} className='header-scrollbar flex-1 flex items-center justify-center relative py-1 backdrop-blur-md cursor-pointer'>
            <ul className='select-menu absolute h-auto bottom-0 left-1/2 -translate-x-1/2 w-full grid place-items-center bg-neutral-100 shadow-md z-100 opacity-0'>
              <Link href='/' className={`bg-neutral-600 text-white duration-300 cursor-pointer font-semibold tracking-widest text-base md:text-xl w-full text-center h-full py-6 grid place-items-center`}>BACK TO HOME</Link>
            {
              projects.map((proj, index) => (
                 <Link href={`/work/${proj.slug}`} key={index} className={`hover:text-white hover:bg-black text-neutral-400 duration-300 cursor-pointer font-semibold tracking-widest text-base md:text-xl w-full text-center h-full py-4 md:py-6 grid place-items-center`}>{proj.title}</Link>
              ))
            }
            </ul>
            {/* Page Scrollbar */}
            <div
              style={{ willChange: 'transform' }}
              className={`page-scrollbar scale-x-0 absolute top-0 left-0 w-full h-full bg-black/10 duration-500`}/>
            <h1 className='tracking-widest z-10 font-semibold text-black/60 text-sm md:text-base relative h-6 overflow-hidden grid'>{project.title.toUpperCase()}</h1>
          </div>
          
          <Link href={`/work/${nextProject.slug}`} className='header-buttons bg-black px-1 py-1 text-sm md:text-base uppercase font-semibold text-white'><ArrowRight strokeWidth={1.5} className='inline-block'/></Link>
        </nav>

        {/* Project Title */}
        <section className='h-[80vh] grid place-items-center'>
          <h1 className='tracking-widest text-[12vw] md:text-[8vw] text-center opacity-100 leading-12'>{project.title.toUpperCase()}</h1>
        </section>

        {/* PARALLAX */}
        <section className='parallax h-[120vh] w-screen overflow-hidden mx-auto'>
          <div className='w-screen h-[120vh] relative '>
            <Image src={project.coverImage} alt={`${project.title} cover image`} width={1920} height={1080} className='absolute top-0 left-0 h-full w-full mx-auto object-cover object-center'/>
          </div>
        </section>
        
        {/* Project Description */}
        <section className='h-[75vh] uppercase tracking-wide grid place-items-center px-4 bg-white/40'>
          <p className='project-description text-lg md:text-xl text-black/50 w-2/3 leading-10 md:leading-12'>{project.description}</p>
          {/* <Image src={project.coverImage} alt={`${project.title} cover image`} width={1920} height={1080} className='project-description hidden md:block w-full h-full object-cover'/> */}
        </section>

        {/* Project Images */}
        <section className='w-full h-full relative overflow-hidden grid md:grid-cols-2 place-items-center gap-8 py-16 bg-white'>
        {project.images.map((img, index) => (
              <Image key={index} src={img} alt={`${project.title} image ${index + 1}`} width={1920} height={1080} className='h-screen w-auto object-contain object-center'/>
            ))}
          </section>

        <footer className='footer h-screen grid place-items-center relative'>
          {/* Next Project */}
          <div className='absolute top-1/3 flex items-center justify-center h-2 w-[50vw]'>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full bg-neutral-300 opacity-40'/>

            {/* Next Project Progress Bar */}
            <div className='next-project-progress-bar absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md'/>
            <h1 className='absolute -top-2 tracking-widest z-10 font-semibold text-black/60 text-center text-sm'>NEXT PROJECT:</h1>
          </div>

          {/* Next Project Title */}
          <h1 className='tracking-widest text-[12vw] md:text-[8vw] text-center opacity-100 leading-12'>{nextProject.title.toUpperCase()}</h1>
        </footer>
      </main>
    </ReactLenis>
  )
}

export default ProjectPage
