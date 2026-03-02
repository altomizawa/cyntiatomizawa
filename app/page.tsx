'use client'
import { useState } from "react";
import Video from "./components/Video";
import Popup from "./components/Popup";
import Navbar from "./components/Navbar";
import { Toaster } from './components/Sonner';
import Contact from "./components/Contact";
import Work from "./components/Work";
import About from "./components/About";
import Press from "./components/Press";
import Work2 from "./components/Work2";
import ReactLenis from 'lenis/react';


export default function Home() {
  const [openedCollection, setOpenedCollection] = useState<number | null>(null);

  return (
    <ReactLenis root>
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
        <Work2 />
        <About />
        <Press />
        <Contact />
        <Popup isOpen={openedCollection !== null} onClose={() => setOpenedCollection(null)} />
      </main>
    </ReactLenis>
  );
}


