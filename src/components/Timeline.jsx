import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { quote } from '../data/constant'
const timelineEvents = [
  {
    month: 'May 17, 2026',
    title: 'Day One',
    desc: 'The moment everything changed. You said yes, and I forgot how to breathe.',
  },
  {
    month: 'Late May',
    title: 'Late Night Calls',
    desc: 'Hours felt like minutes. We discovered entire worlds in each other\'s voices.',
  },
  {
    month: 'Early June',
    title: 'First Adventure',
    desc: 'Somewhere we went, everything was beautiful because you were there.',
  },
  {
    month: 'June — July',
    title: 'Becoming Home',
    desc: 'I stopped looking for belonging. You are where I want to be.',
  },
  {
    month: 'July 17, 2026',
    title: 'Two Months ♡',
    desc: 'Today. Right now. This very moment that I\'m dedicating entirely to you.',
  },
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const spineRef = useRef(null)
  const itemRefs = useRef([])
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

      // Spine draw
      gsap.from(spineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: spineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      })

      // Items animate in alternating sides
      itemRefs.current.forEach((item, i) => {
        if (!item) return
        const content = item.querySelector('.timeline-content')
        const dot = item.querySelector('.timeline-dot')
        const isOdd = i % 2 === 0

        gsap.to(content, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        })

        gsap.fromTo(content, {
          x: isOdd ? -40 : 40,
        }, {
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        })

        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: item, start: 'top 75%' },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" ref={sectionRef}>
      <div className="timeline-spine" ref={spineRef} />
      <p ref={eyebrowRef} className="section-eyebrow">Chapter II</p>
      <h2 ref={headingRef} className="section-heading">Our Story, So Far</h2>

      <div className="timeline-items">
        {timelineEvents.map((ev, i) => (
          <div
            key={i}
            className="timeline-item"
            ref={el => itemRefs.current[i] = el}
          >
            {i % 2 === 0 ? (
              <>
                <div className="timeline-content">
                  <p className="timeline-month">{ev.month}</p>
                  <h3 className="timeline-event-title">{ev.title}</h3>
                  <p className="timeline-event-desc">{ev.desc}</p>
                </div>
                <div className="timeline-spacer">
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-empty" />
              </>
            ) : (
              <>
                <div className="timeline-empty" />
                <div className="timeline-spacer">
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-content">
                  <p className="timeline-month">{ev.month}</p>
                  <h3 className="timeline-event-title">{ev.title}</h3>
                  <p className="timeline-event-desc">{ev.desc}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
