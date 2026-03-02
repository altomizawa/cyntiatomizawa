'use client'
import React, { useRef } from 'react'
import ImageTrail from './ImageTrail';
import { useRouter } from 'next/navigation';

const Work2 = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const router = useRouter();
  
  return (
    <section ref={sectionRef} id="work" className='relative z-0 w-screen min-h-screen md:h-screen py-12 overflow-hidden bg-neutral-300 flex items-center justify-center'>
      <ImageTrail containerRef={sectionRef} />
      <button className='flex flex-col items-center justify-center' onClick={() => router.push('/work/maze')}>
        <h2 className='text-[10vw] tracking-widest text-neutral-600 select-none text-center leading-[10vw]'>VIEW<br></br>WORK</h2>
      </button>
    </section>
  )
}

export default Work2
