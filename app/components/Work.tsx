import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface WorkProps {
  collections: {
    name: string;
    description: string;
    image: string;
    link: string;
  }[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setOpenedCollection: React.Dispatch<React.SetStateAction<number | null>>;
}

const Work = ({collections, index, setIndex }: WorkProps) => {
  return (
    <div className="z-10 text-center text-white flex flex-row-reverse items-center h-full">
      <Image key={index} src={collections[index].image} alt="Cyntia Tomi" width={1920} height={1080} className='max-w-1/2 h-3/4 object-cover animate-fade-in' />
      <div className='w-full flex flex-col items-center h-full relative'>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <div key={index} className='animate-fade-in flex flex-col items-center justify-center gap-0'>
            <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-15">{collections[index].name}</h2>
            <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-30">{collections[index].name}</h2>
            <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest relative">{collections[index].name}</h2>
            <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-30">{collections[index].name}</h2>
            <h2 className="text-[4vw] leading-[4vw] font-light text-left tracking-widest opacity-15">{collections[index].name}</h2>
          </div>
          <div className='w-full flex items-center justify-center gap-8 pt-8'>
            <button onClick={() => setIndex((index - 1 + collections.length) % collections.length)}><ChevronLeft strokeWidth={1} size={48} /></button>
            <button onClick={() => setIndex((index + 1) % collections.length)}><ChevronRight strokeWidth={1} size={48} /></button>
          </div>
          <button className='mt-12 text-base tracking-normal duration-300 hover:opacity-70 hover:underline underline-offset-4'>view collection</button>
        </div>
      </div>
    </div>
  )
}

export default Work
