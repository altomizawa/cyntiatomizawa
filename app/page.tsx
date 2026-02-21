'use client'
import Image from "next/image";
import { useState } from "react";
import Video from "./components/Video";
import Popup from "./components/Popup";
import Navbar from "./components/Navbar";
import { ABOUT } from "./utils/constants";
import { Toaster } from './components/Sonner';
import Contact from "./components/Contact";
import Work from "./components/Work";
import About from "./components/About";
import Press from "./components/Press";

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
        <Toaster position="top-right" className='text-black'/>
        <header className='fixed top-0 left-0 w-32 min-h-screen z-100 filter-blur-lg flex flex-col gap-4 items-around justify-around animate-fade-in'>
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
        <Work collections={collections} index={index} setIndex={setIndex} setOpenedCollection={setOpenedCollection} />
        <About />
        <Press />
        <Contact />
        <Popup isOpen={openedCollection !== null} onClose={() => setOpenedCollection(null)} />
      </main>
    </>
  );
}


