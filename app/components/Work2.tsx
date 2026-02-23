import React, { useRef } from 'react'
import ImageTrail from './ImageTrail';

const Work2 = () => {
    const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={sectionRef} id="work2" className='relative z-0 w-screen  sm:min-h-screen md:h-screen py-12 overflow-hidden bg-neutral-300 flex items-center justify-center'>
      <ImageTrail containerRef={sectionRef} />
      <button className='flex flex-col items-center justify-center'>
        <h2 className='text-[20vw] tracking-widest text-neutral-600 select-none text-center'>VIEW</h2>
        <h2 className='text-[20vw] tracking-widest text-neutral-600 select-none text-center -mt-48'>WORK</h2>

      </button>
    </section>
  )
}

export default Work2
