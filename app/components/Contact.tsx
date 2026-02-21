import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

const Contact = () => {
  return (
    <section id="contact" className='relative z-0 w-screen h-screen overflow-hidden'>
      <div className='w-[70%] mx-auto flex flex-col items-center justify-center h-full relative'>
        <div className='border-b border-white w-full overflow-hidden relative'>
          <p className='text-5xl lg:text-7xl font-extralight tracking-widest text-white'>CONTACT</p>
        </div>
        <div className='flex flex-col md:flex-row gap-8 items-left md:justify-end w-full mt-8 md:mt-0'>
          <Link href="https://www.instagram.com/cyntiatominy/" target="_blank" className='text-md font-base text-white flex gap-2 items-center duration-300 hover:text-stone-600'><Instagram strokeWidth={1.5} size={18} />Instagram</Link>
          <p className='hidden md:block text-white font-bold'>|</p>
          <Link href='https://www.linkedin.com/in/cyntia-tomizawa-81b18b262/' target="_blank" className='text-md font-base text-white flex gap-2 items-center duration-300 hover:text-stone-600'><Linkedin strokeWidth={1.5} size={18} />Linkedin</Link>
          <p className='hidden md:block text-white font-bold'>|</p>
          <p className='text-md font-base text-white flex gap-2 items-center duration-300 hover:text-stone-600 cursor-pointer' onClick={() => {
            navigator.clipboard.writeText('cyntiatomizawa@gmail.com')
            toast.success('Email copied to clipboard',{
              style: {
                background: 'white'
              } 
            })
            }}><Mail strokeWidth={1.5} size={18} /> cyntiatomizawa@gmail.com</p>
          <p className='hidden md:block text-white font-bold'>|</p>
          <Link href='tel:+13475930008' className='text-md font-base text-white flex gap-2 items-center duration-300 hover:text-stone-600'><Phone strokeWidth={1.5} size={18} /> +1 (347) 593 0008</Link>
        </div>
      </div>
    </section>
  ) 
}

export default Contact
