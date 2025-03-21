import React from 'react'
import craftvideo from '../../Aseets/prvideo.mp4'

function Video() {
  return (
    <section className="py-5">
      <h2 className="text-center mb-4">CRAFT MEETS MODERN</h2>
       
        <video
          className="w-100"
          autoPlay
          loop
          muted
          controls={false}
          src={craftvideo}
        />
    </section>
  )
}

export default Video
