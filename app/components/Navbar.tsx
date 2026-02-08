import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='hidden lg:block'>
        <VerticalBars />
        <a href='#' className='text-sm uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>Home</a>
        <VerticalBars />
          <a href='#work' className='text-sm uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>WORK</a>
        <VerticalBars />
          <a href='#about' className='text-sm uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>ABOUT</a>
        <VerticalBars />
          <a href='#contact' className='text-sm uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>CONTACT</a>
        <VerticalBars />
      </div>
      {/* Mobile Menu */}
      <div>
        {isOpen ? (<X onClick={() => setIsOpen(false)} className='z-1000 block lg:hidden cursor-pointer fixed top-4 right-4' strokeWidth={1.5} size={24} color='white'/>) : (<Menu onClick={() => setIsOpen(true)} className='z-1000 block lg:hidden cursor-pointer fixed top-4 right-4' strokeWidth={1.5} size={24} color='white'/>)} 
      </div>
      <div className={`bg-stone-800 fixed top-0 duration-500 ${isOpen ? 'right-0' : '-right-full'} w-full h-full lg:hidden z-50`}>
        <div className='flex flex-col gap-6 items-left justify-center h-full pl-24'>
          <a onClick={() => setIsOpen(false)} href='#' className='text-4xl md:text-7xl font-extralight uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>Home</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#work' className='text-4xl md:text-7xl font-extralight uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>WORK</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#about' className='text-4xl md:text-7xl font-extralight uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>ABOUT</a>
          <VerticalBar />
          <a onClick={() => setIsOpen(false)} href='#contact' className='text-4xl md:text-7xl font-extralight uppercase tracking-widest text-white relative link duration-300 hover:text-black hover:pl-4'><span className={`duration-500 absolute top-0 left-0 h-full w-0 bg-white -z-10`}/>CONTACT</a>
        </div>
      </div>
    </>
  )
}

export default Navbar

const VerticalBars = () => {
  return (
    <div className='h-1/3 w-full flex flex-col gap-8 my-8'>
      <div className='h-px w-full bg-white/20' />
      <div className='h-px w-full bg-white/20' />
      <div className='h-px w-full bg-white/20' />
      <div className='h-px w-full bg-white/20' />
    </div>
  )
}
const VerticalBar = () => {
  return (
      <div className='h-px w-1/3 bg-white/50' />
  )
}
