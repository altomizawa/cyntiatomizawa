import React from 'react'
import Image from 'next/image';
import { ABOUT } from '../utils/constants';

const Press = () => {
  return (
    <div className='w-full mx-auto grid grid-cols-2 gap-4 items-center justify-start h-full relative overflow-x-auto border'>
      <div className='w-full border border-white h-full flex items-center justify-center'>
        <h2 className="text-3xl font-extralight text-left tracking-widest text-white">PRESS</h2>
      </div>
      <div className='flex h-3/4 justify-start md:justify-end items-start'>
        <Image src="/assets/cyntiatomi.png" alt="Cyntia Tomi" width={1920} height={1080} className='h-3/4 md:w-3/4 object-cover' />
        <Image src="/assets/cyntiatomi.png" alt="Cyntia Tomi" width={1920} height={1080} className='h-3/4 md:w-3/4 object-cover' />
      </div>
    </div>
  )
}

export default Press
