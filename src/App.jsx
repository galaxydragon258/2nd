import React, { useEffect } from 'react'
import './index.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'


import useCounter from './hooks/useCounter'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import MomentsSection from './components/MomentsSection'
import PinnedQuote from './components/PinnedQuote'
import Timeline from './components/Timeline'
import TogetherSection from './components/TogetherSection'
import LoveNotes from './components/LoveNotes'
import Finale from './components/Finale'

gsap.registerPlugin(ScrollTrigger, TextPlugin,)

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  // Relationship start date — adjust as needed
  const START_DATE = '2026-05-19T00:00:00'
  const elapsed = useCounter(START_DATE)

  useEffect(() => {
    // Smooth scroll refresh
    ScrollTrigger.refresh()
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <Cursor />
      <div className="noise" aria-hidden="true" />

      <main>
        <Hero elapsed={elapsed} />
        <Marquee />
        <MomentsSection />
        <PinnedQuote />
        <Timeline />
        <TogetherSection />
        <LoveNotes />
        <Finale />
      </main>

      <footer>
        <p>Made by your boyfiee na kamukha ni cha eun woo — July 19, 2026</p>
      </footer>
    </>
  )
}