import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { notes } from '../data/constant.js'


export default function LoveNotes() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        opacity: 0, y: 20,
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%' },
      })
      gsap.from(headingRef.current, {
        opacity: 0, y: 60,
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
          delay: (i % 2) * 0.15,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="love-notes" ref={sectionRef}>
      <p ref={eyebrowRef} className="section-eyebrow">Chapter III</p>
      <h2 ref={headingRef} className="section-heading">Things I Need You to Know</h2>

      <div className="notes-grid">
        {notes.map((n, i) => (
          <article
            key={i}
            className={`note-card${n.large ? ' large' : ''}`}
            ref={el => cardsRef.current[i] = el}
          >
            <span className="note-number" aria-hidden="true">{n.num}</span>
            <h3 className="note-title">{n.title}</h3>
            <p className="note-body">{n.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
