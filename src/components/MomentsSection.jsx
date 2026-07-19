import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const moments = [
  {
    emoji: '🌙',
    title: 'Our First Late-Night Call',
    date: 'Day 01',
    fill: 'moment-fill-1',
    desc: 'We talked until 3am without realizing it',
  },
  {
    emoji: '☕',
    title: 'The Coffee That Started It All',
    date: 'Day 12',
    fill: 'moment-fill-2',
    desc: 'You laughed at my terrible joke and I was done for',
  },
  {
    emoji: '🌸',
    title: 'First Time Saying "I Love You"',
    date: 'Day 28',
    fill: 'moment-fill-3',
    desc: 'The world stopped and only you existed',
  },
]

export default function MomentsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(eyebrowRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: 'top 85%',
        },
      })

      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      // Cards stagger with skew
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 80,
          skewY: 3,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
          delay: i * 0.15,
        })

        // Parallax on each card's bg
        const bg = card.querySelector('.moment-bg-div')
        if (bg) {
          gsap.to(bg, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="moments" ref={sectionRef}>
      <p ref={eyebrowRef} className="section-eyebrow">Chapter I</p>
      <h2 ref={headingRef} className="section-heading">Moments We Made</h2>

      <div className="moments-grid">
        {moments.map((m, i) => (
          <article
            key={i}
            className="moment-card"
            ref={el => cardsRef.current[i] = el}
            role="img"
            aria-label={m.title}
          >
            <div
              className={`moment-bg-div ${m.fill}`}
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            />
            <div className="moment-card-inner">
              <div className="moment-emoji" aria-hidden="true">{m.emoji}</div>
              <h3 className="moment-title">{m.title}</h3>
              <p className="moment-date-tag">{m.date}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
