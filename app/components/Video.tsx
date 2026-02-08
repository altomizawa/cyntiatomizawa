import React from 'react'

const Video = () => {
  return (
     <video preload="none" autoPlay muted loop controls={false} className='absolute top-0 left-0 w-full h-full object-cover brightness-50 animate-fade-in'>
      <source src="/assets/6007146_Woman_People_3840x2160.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
