import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero({ elapsed }) {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const dateRef = useRef(null)
  const subtitleRef = useRef(null)
  const counterRef = useRef(null)
  const scrollHintRef = useRef(null)
  const words = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Entrance
      const tl = gsap.timeline({ delay: 0.3 })
      tl.to(dateRef.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
        .to(words.current, {
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08,
        }, '-=0.6')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.5')
        .to(counterRef.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.5')
        .to(scrollHintRef.current, { opacity: 1, duration: 1 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-vignette" />

      <div ref={dateRef} className="hero-date">May 19, 2026 — 2nd Monthsary</div>

      <h1 className="hero-title">
        <span className="line">
          <span className="word" ref={el => words.current[0] = el}>Two</span>
          {' '}
          <span className="word highlight" ref={el => words.current[1] = el}>Months</span>
        </span>
        <span className="line">
          <span className="word" ref={el => words.current[2] = el}>of</span>
          {' '}
          <span className="word" ref={el => words.current[3] = el}>Us</span>
        </span>
      </h1>

      <p ref={subtitleRef} className="hero-subtitle">
        Every second with you is a universe I never want to leave.
      </p>

      <div ref={counterRef} className="hero-counter" aria-live="polite">
        <div className="counter-item">
          <div className="counter-number">{String(elapsed.days).padStart(2, '0')}</div>
          <div className="counter-label">Days</div>
        </div>
        <div className="counter-item">
          <div className="counter-number">{String(elapsed.hours).padStart(2, '0')}</div>
          <div className="counter-label">Hours</div>
        </div>
        <div className="counter-item">
          <div className="counter-number">{String(elapsed.minutes).padStart(2, '0')}</div>
          <div className="counter-label">Minutes</div>
        </div>
        <div className="counter-item">
          <div className="counter-number">{String(elapsed.seconds).padStart(2, '0')}</div>
          <div className="counter-label">Seconds</div>
        </div>
      </div>

      <div ref={scrollHintRef} className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}
