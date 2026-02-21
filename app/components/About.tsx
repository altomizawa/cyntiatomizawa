import React from 'react'
import Image from 'next/image';
import { ABOUT } from '../utils/constants';

const About = () => {
  return (
    <section id="about" className='relative z-0 w-screen  sm:min-h-screen md:h-screen py-12 overflow-hidden bg-stone-800'>
      <div className='w-[70%] lg:w-[70%] mx-auto grid md:grid-cols-2 gap-4 items-center justify-center h-full relative'>
        <div>
          <h2 className="text-3xl font-extralight text-left tracking-widest text-white">{ABOUT.title}</h2>
          <p className='text-white font-light tracking-wide leading-7 md:leading-10 w-full mt-12 text-sm md:text-base'>{ABOUT.description}</p>
        </div>
        <div className='flex justify-center md:justify-end items-start'>
          <Image src="/assets/cyntiatomi.png" alt="Cyntia Tomi" width={1920} height={1080} className='h-3/4 md:w-3/4 object-cover' />
        </div>
      </div>
    </section>
  )
}

export default About
