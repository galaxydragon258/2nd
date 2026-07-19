import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  {
    src: '/photo-1.png',
    label: 'May 2026',
    tag: 'Where It All Started',
    title: 'Matching Shirts, Matching Hearts',
    desc: 'Our first photo together at the gym — wearing the same shirt without planning it. That\'s when I knew the universe was on our side.',
  },
  {
    src: '/photo-2.png',
    label: 'June 2026',
    tag: 'Our First Adventure',
    title: 'Walking Into the Sunset Together',
    desc: 'The golden hour felt different with you beside me. Every step forward felt like the beginning of something that would last forever.',
  },
  {
    src: '/photo-3.png',
    label: 'July 2026',
    tag: 'The Little Things',
    title: 'Coffee Dates & Quiet Moments',
    desc: 'It\'s not always about the big gestures. Sometimes love is two cups of coffee and your hand reaching for mine across the table.',
  },
]

export default function TogetherSection() {
  const sectionRef = useRef(null)
  const flapRef = useRef(null)
  const sealRef = useRef(null)
  const letterRef = useRef(null)
  const envelopeWrapperRef = useRef(null)
  const photoFrameRefs = useRef([])
  const captionRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      // ── Phase 1: Wax seal cracks & flap opens ──
      tl.to(sealRef.current, {
        scale: 1.3,
        duration: 0.15,
        ease: 'power2.out',
      })
      .to(sealRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.3,
        ease: 'power3.in',
      })
      .to(flapRef.current, {
        rotateX: -180,
        duration: 1,
        ease: 'power2.inOut',
      }, '-=0.15')

      // ── Phase 2: Letter peeks up ──
      .to(letterRef.current, {
        y: '-65%',
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')

      // ── Phase 3: Envelope shrinks away, first photo appears ──
      .to(envelopeWrapperRef.current, {
        scale: 0.6,
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: 'power3.in',
      })

      // ── Photos cycle: appear → scale → caption → fade ──
      photos.forEach((_, i) => {
        const frame = photoFrameRefs.current[i]
        const caption = captionRefs.current[i]
        if (!frame || !caption) return

        // Photo appears and scales up
        tl.fromTo(frame,
          { opacity: 0, scale: 0.35, y: 80 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        )
        // Caption fades in
        .fromTo(caption,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3',
        )
        // Hold for a beat
        .to(frame, { duration: 0.4 })

        // Fade out (except last photo)
        if (i < photos.length - 1) {
          tl.to(caption, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          })
          .to(frame, {
            opacity: 0,
            scale: 1.1,
            y: -30,
            duration: 0.4,
            ease: 'power2.in',
          }, '-=0.2')
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="together" ref={sectionRef}>
      <div className="envelope-scene">

        {/* ── The Envelope ── */}
        <div className="envelope-wrapper" ref={envelopeWrapperRef}>
          <div className="envelope">
            {/* Back panel */}
            <div className="envelope-back">
              <div className="envelope-back-pattern" />
            </div>

            {/* Letter inside */}
            <div className="envelope-letter" ref={letterRef}>
              <div className="envelope-letter-lines">
                <span /><span /><span /><span />
              </div>
            </div>

            {/* Flap (3D rotates open) */}
            <div className="envelope-flap" ref={flapRef}>
              <div className="envelope-flap-front" />
              <div className="envelope-flap-back" />
            </div>

            {/* Front panel (covers letter exit) */}
            <div className="envelope-front" />

            {/* Wax seal */}
            <div className="envelope-seal" ref={sealRef} aria-hidden="true">♡</div>
          </div>
        </div>

        {/* ── Photo Gallery ── */}
        <div className="photo-gallery">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="photo-frame"
              ref={el => photoFrameRefs.current[i] = el}
            >
              <div className="photo-polaroid" style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}>
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <span className="photo-polaroid-label">{photo.label}</span>
              </div>

              <div
                className="photo-caption"
                ref={el => captionRefs.current[i] = el}
              >
                <p className="photo-caption-tag">{photo.tag}</p>
                <h3 className="photo-caption-title">{photo.title}</h3>
                <p className="photo-caption-desc">{photo.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
