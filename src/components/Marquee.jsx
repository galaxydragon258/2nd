import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tl = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 18,
      repeat: -1,
    })
    return () => tl.kill()
  }, [])

  const items = ['Two Months of Us', '♡', 'Since May 19', '♡', 'I love you', '♡', 'Na para bang mih at dih ang tawagan', '♡']
  const doubled = [...items, ...items]

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {doubled.map((item, i) => (
          <span key={i} className={item === '♡' ? 'dot' : ''}>{item}</span>
        ))}
      </div>
    </div>
  )
}
