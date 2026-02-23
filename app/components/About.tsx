import React from 'react'
import Image from 'next/image';
import { ABOUT } from '../utils/constants';
import { motion } from 'motion/react';
import { useDebounceCallback } from '../utils/useDebounce';


const About = () => {

  const callback = useDebounceCallback(() => {
    console.log('mouse move')
  }, 100);
  
  return (
    <section id="about" className='relative z-0 w-screen  sm:min-h-screen md:h-screen py-12 overflow-hidden bg-stone-800'>
      <div className='w-[70%] lg:w-[70%] mx-auto grid md:grid-cols-2 gap-4 items-center justify-center h-full relative'>
          <motion.div
            initial={{ x: "-20%", opacity: 0}}
            transition={{
              duration: 1,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            whileInView={{ opacity: 1, x: 0}}
            onMoueMove={callback}
          >
          <h2 className="text-3xl font-extralight text-left tracking-widest text-white">{ABOUT.title}</h2>
          <p className='text-white font-light tracking-wide leading-7 md:leading-10 w-full mt-12 text-sm md:text-base'>{ABOUT.description}</p>
        </motion.div>
        <motion.div
          initial={{ x: "20%", opacity: 0}}
          transition={{
            duration: 1,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          whileInView={{ opacity: 1, x: 0}}
        >
          <Image src="/assets/cyntiatomi.png" alt="Cyntia Tomi" width={1920} height={1080} className='h-3/4 md:w-3/4 object-cover' />
        </motion.div>
       
      </div>
    </section>
  )
}

export default About
