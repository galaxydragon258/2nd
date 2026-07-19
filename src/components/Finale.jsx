import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Finale() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const eyebrowRef = useRef(null)
  const subtitleRef = useRef(null)
  const sigRef = useRef(null)
  const words = useRef([])

  const hearts = ['♡', '❤', '🤍', '♡', '❤', '🤍', '♡', '❤', '🤍', '♡', '♡', '🤍']

  useEffect(() => {
    const ctx = gsap.context(() => {
      // BG fade in + scale
      gsap.to(bgRef.current, {
        opacity: 0.18,
        scale: 1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // BG parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%' },
      })

      gsap.to(words.current, {
        y: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%' },
      })

      gsap.to(sigRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: sigRef.current, start: 'top 90%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="finale" ref={sectionRef}>
      <div className="finale-bg" ref={bgRef} />

      {/* Floating hearts */}
      <div className="finale-hearts" aria-hidden="true">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="floating-heart"
            style={{
              left: `${(i * 8.5) % 95}%`,
              animationDuration: `${8 + (i * 1.3) % 8}s`,
              animationDelay: `${(i * 0.7) % 5}s`,
              fontSize: `${0.8 + (i % 3) * 0.4}rem`,
            }}
          >
            {h}
          </span>
        ))}
      </div>

      <p ref={eyebrowRef} className="finale-eyebrow">Happy 2nd Monthsary</p>

      <h2 className="finale-title">
        <span className="line">
          <span className="word" ref={el => words.current[0] = el}>I</span>
          {' '}
          <span className="word" ref={el => words.current[1] = el}>Choose</span>
          {' '}
          <span className="word" ref={el => words.current[2] = el}>You</span>
        </span>
        <span className="line">
          <span className="word gold" ref={el => words.current[3] = el}>Every</span>
          {' '}
          <span className="word" ref={el => words.current[4] = el}>Single</span>
        </span>
        <span className="line">
          <span className="word gold" ref={el => words.current[5] = el}>Day.</span>
        </span>
      </h2>

      <p ref={subtitleRef} className="finale-message">
        Hiii loveee hehe so medjo late lang yung pag ka send ko ng website pero i just want to say that i love you so much
        im always here by your side support you!!! i love you my lovee, Happy 2nd Monthsaryyy!!!
      </p>

      <p ref={sigRef} className="finale-signature">
        — With all of my heart 🤍
      </p>
    </section>
  )
}
