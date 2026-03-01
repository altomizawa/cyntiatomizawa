'use client'
import React, { useState, useRef} from 'react'
import ReactLenis from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowBigLeft, ArrowBigRight, Scroll } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';


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

  const projectNavRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const projectDescriptionRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nextProjectProgressBarRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    gsap.set(nextProjectProgressBarRef.current, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(progressBarRef.current, { scaleX: 0,transformOrigin: 'left center' });
    gsap.set(projectNavRef.current, { y: -100, opacity: 0 });
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
    

    // Footer ScrollTrigger for next project transition
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight*3}px`,
      pin: true,
      pinSpacing: true,
      markers: true,
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
        gsap.to(nextProjectProgressBarRef.current, {
          scaleX: self.progress,
          transformOrigin: 'center center',
        })
        if (self.progress >= 0.99 && !isTransitioning) {
          setIsTransitioning(true);
          window.location.href = `/work/${nextProject.slug}`;
        }
      },
    })
  })
   

  return (
    <ReactLenis root>
      <main className='body'>
      <nav ref={projectNavRef} className='header opacity-0 fixed top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] mx-auto h-32 flex items-center justify-center gap-4 z-1000'>
          <Link href={`/work/${prevProject.slug}`} className='header-buttons px-4 py-2 text-sm md:text-base rounded-md bg-black/10 uppercase font-semibold text-black/60 duration-500 hover:bg-white/40'><ArrowBigLeft strokeWidth={1.5} className='inline-block mr-2'/>Prev</Link>
            <div className='header-scrollbar flex-1 flex items-center justify-center relative h-10 '>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full rounded-md bg-neutral-300 opacity-40'/>
            <div ref={progressBarRef} className='absolute top-0 left-0 w-full h-full bg-black/10 rounded-md backdrop-blur-md'/>
            <h1 className=' tracking-widest z-10 font-semibold text-black/60 text-sm md:text-base'>{project.title.toUpperCase()}</h1>
          </div>
          <Link href={`/work/${nextProject.slug}`} className='header-buttons px-4 py-2 text-sm md:text-base rounded-md bg-black/10 uppercase font-semibold text-black/60 duration-500 hover:bg-white/40'>Next<ArrowBigRight strokeWidth={1.5} className='inline-block ml-2'/></Link>
        </nav>
          <section className='h-screen grid place-items-center'>
            <h1 className='text-[12vw] md:text-[8vw] tracking-widest text-center opacity-100'>{project.title.toUpperCase()}</h1>
          </section>
          <section ref={projectDescriptionRef} className='project-description-wrapper h-screen border flex items-center justify-center px-4 bg-white/40'>
            <p className='project-description text-2xl uppercase w-2/3 leading-12'>{project.description}</p>
          </section>

          {project.images.map((img, index) => (
            <section key={index} className='h-screen w-full relative overflow-hidden grid place-items-center gap-8 py-16 bg-white'>
                  <Image src={img} alt={`${project.title} image ${index + 1}`} width={1920} height={1080} className='h-full w-full md:w-2/3 object-cover'/>
            </section>
          ))}
        <footer ref={footerRef} className='h-screen grid place-items-center relative'>
          <div className='absolute top-1/3 flex items-center justify-center h-2 w-[50vw]'>
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full h-full rounded-sm bg-neutral-300 opacity-40 backdrop-blur-lg'/>
            <div ref={nextProjectProgressBarRef} className='next-progress-bar absolute top-0 left-0 w-full h-full bg-black/20 rounded-sm'/>
            <h1 className='absolute top-0 tracking-widest z-10 font-semibold text-black/60'>NEXT PROJECT:</h1>
          </div>
          <h1 className='text-[12vw] md:text-[8vw] tracking-widest text-center opacity-100'>{nextProject.title.toUpperCase()}</h1>
        </footer>
      </main>
    </ReactLenis>
  )
}

export default ProjectPage
