'use client'
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Video from "./components/Video";
import Popup from "./components/Popup";
import Navbar from "./components/Navbar";
import { ABOUT } from "./utils/constants";
import Link from "next/link";
import { Toaster } from './components/Sonner';
import { toast } from "sonner";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [openedCollection, setOpenedCollection] = useState<number | null>(null);

  const collections = [
    {
      name: "FENCES",
      description: "A collection inspired by the concept of boundaries and the beauty found within them. Each piece in the FENCES collection explores the interplay between structure and freedom, showcasing intricate designs that evoke a sense of both confinement and liberation.",
      image: "/assets/FENCES+TRIO-Anel-FENCES+DANCE-Brinco-Modelo.webp",
      link: "/collections/fences"
    },
    {
      name: "CONSTELAÇÃO",
      description: "A collection inspired by the night sky and the constellations that adorn it. Each piece in the CONSTELAÇÃO collection captures the celestial beauty of stars and galaxies, featuring intricate designs that evoke a sense of wonder and cosmic elegance.",
      image: "/assets/CONSTELAÇÃO-Conjunto-M-1.webp",
      link: "/collections/constelacao"
    },
  ]

  return (
    <>
      <main>
        <Toaster position="top-right"/>
        <header className='fixed top-0 left-0 w-32 px-8 min-h-screen z-100 filter-blur-lg flex flex-col gap-4 items-around justify-around animate-fade-in'>
          <Navbar />
        </header>
        <section className='relative z-0 h-screen w-screen flex flex-col items-center justify-center'>
          {/* <Image src="/assets/CONSTELAÇÃO-Conjunto-M-1.webp" alt="Cyntia Tomi" width={1920} height={1080} className='-z-100 absolute top-0 left-0 h-full w-full object-cover brightness-50' /> */}
          <Video />
          <div className="z-10 text-center text-white">
            <h1 className="text-[8vw] uppercase text-center font-extralight tracking-widest animate-fade-in">Cyntia Tomizawa</h1>
            <p className="text-xl justify-self-end pr-6 animate-fade-in">Jewelry Designer</p>
          </div>
        </section>
        <section id="work" className='relative z-0 w-screen h-screen overflow-hidden'>
          <div className="z-10 text-center text-white flex flex-row-reverse items-center h-full">
            <Image key={index} src={collections[index].image} alt="Cyntia Tomi" width={1920} height={1080} className='w-1/2 h-full object-cover brightness-50 animate-fade-in' />
            <div className='w-full flex flex-col items-center h-full relative'>
              <div className='w-full h-full flex flex-col items-center justify-center'>
                <div key={index} className='animate-fade-in flex flex-col items-center justify-center gap-0'>
                  <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-15">{collections[index].name}</h2>
                  <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-30">{collections[index].name}</h2>
                  <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest">{collections[index].name}</h2>
                  <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-30">{collections[index].name}</h2>
                  <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-15">{collections[index].name}</h2>
                </div>
                <div className='w-full flex items-center justify-center gap-8 pt-8'>
                  <button onClick={() => setIndex((index - 1 + collections.length) % collections.length)}><ChevronLeft strokeWidth={1} size={48} /></button>
                  <button onClick={() => setIndex((index + 1) % collections.length)}><ChevronRight strokeWidth={1} size={48} /></button>
                </div>
              </div>
              <button className='absolute bottom-4 right-4 text-md cursor-pointer duration-500 hover:text-black/50' onClick={() => setOpenedCollection(collections[index])}>(view collection)</button>
            </div>
          </div>
        </section>
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
        <section id="contact" className='relative z-0 w-screen h-screen overflow-hidden'>
          <div className='w-[70%] mx-auto flex flex-col items-center justify-center h-full relative'>
            <div className='border-b border-white w-full overflow-hidden relative'>
              <p className='text-5xl lg:text-7xl font-extralight tracking-widest text-white'>CONTACT</p>
            </div>
            <div className='flex flex-col md:flex-row gap-8 items-left md:items-center w-full mt-8 md:mt-0'>
              <Link href="https://www.instagram.com/cyntiatominy/" target="_blank" className='text-md font-base text-white flex gap-2 items-center'><Instagram strokeWidth={1.5} size={18} />Instagram</Link>
              <p className='hidden md:block text-white font-bold'>|</p>
              <Link href='https://www.linkedin.com/in/cyntia-tomizawa-81b18b262/' target="_blank" className='text-md font-base text-white flex gap-2 items-center'><Linkedin strokeWidth={1.5} size={18} />Linkedin</Link>
              <p className='hidden md:block text-white font-bold'>|</p>
              <p className='text-md font-base text-white flex gap-2 items-center cursor-pointer' onClick={() => {
                navigator.clipboard.writeText('cyntiatomizawa@gmail.com')
                toast.success('Email copied to clipboard',{
                  style: {
                    background: 'white'
                  }
                })
                }}><Mail strokeWidth={1.5} size={18} /> cyntiatomizawa@gmail.com</p>
              <p className='hidden md:block text-white font-bold'>|</p>
              <Link href='tel:+13475930008' className='text-md font-base text-white flex gap-2 items-center'><Phone strokeWidth={1.5} size={18} /> +1 (347) 593 0008</Link>
            </div>
          </div>
        </section>
        <Popup isOpen={openedCollection !== null} onClose={() => setOpenedCollection(null)} />
      </main>
    </>
  );
}


