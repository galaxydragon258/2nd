import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const moments = [
  {
    title: 'Our First Late-Night Call',
    image: '/image5.jpg'
  },
  {
    title: 'The Coffee That Started It All',
    image: '/image6.jpg'
  },
  {
    title: 'First Time Kumain sa lanas"',
    image: '/image7.jpg'
  },
]

export default function MomentsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const cardsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        opacity: 0, y: 20, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%' },
      })

      gsap.from(headingRef.current, {
        opacity: 0, y: 60, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return

        gsap.from(card, {
          opacity: 0, y: 80, skewY: 3, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.1,
        })

        // parallax on image
        const bg = card.querySelector('.moment-bg')
        if (bg) {
          gsap.to(bg, {
            yPercent: -20,
            scale: 1.1,
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
          >
            {/* DYNAMIC IMAGE */}
            <div className="moment-bg-wrap">
              <img
                className="moment-bg"
                src={m.image}
                ></img>
              <div className="moment-bg-overlay" />
            </div>

            <div className="moment-card-inner">
              <h3 className="moment-title">{m.title}</h3>
              <p className="moment-date-tag">{m.date}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}