import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const quote = "Hi love, happy 2nd monthsary!\nFirst of all, I want to congratulate both of us for reaching another month together, and hopefully, forever. Thank you for spending this day with me, even though it was just a simple celebration. Every moment with you is already more than enough for me. I'm super grateful to have you because you're always by my side whenever I need someone. Whenever I doubt myself, you're always there to give me positive energy and remind me that I can do it. Even if it may seem like a simple act of affection to others, it means so much to me. It gives me confidence and helps me believe in myself, especially whenever I start doubting my future. Even though this month had a lot of misunderstandings and challenges, I'm still grateful for all of them because we chose to stay together. Those moments helped us grow stronger and build the relationship we have today. Again, happy 2nd monthsary, my loveeeeee! ❤ I loveee youuuu soooo muchhhh, girlll. Thank you for always choosing us. Here's to many more months and years together. 🫶"

export default function PinnedQuote() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const authorRef = useRef(null)

  useLayoutEffect(() => {
    const chars = gsap.utils.toArray(quoteRef.current.querySelectorAll('.char'))
    console.log('chars found:', chars.length) // should be ~700

    gsap.set(chars, { opacity: 0.2, y: 0 })
    gsap.set(authorRef.current, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        markers: false,
      }
    })

    tl.fromTo(chars, {
      opacity: 0,
    }, {
      opacity: 1,
      stagger: 0.02,
      ease: 'none',
    })
      .to(authorRef.current, {
        opacity: 1,
        duration: 0.3,
      }, '+=0.2')

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="pinned-quote" ref={sectionRef}>
      <div className="quote-container">
        <span className="quote-mark">"</span>
        <p ref={quoteRef} className="quote-text">
          {[...quote].map((c, i) => (
            <span key={i} className="char">
              {c}
            </span>
          ))}
        </p>
        <footer ref={authorRef} className="quote-author">
          <span className="quote-line" /> — A love letter in code
        </footer>
      </div>
    </section>
  )
}