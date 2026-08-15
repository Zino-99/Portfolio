import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Parcours from './components/Parcours.jsx'
import Projects from './components/Projects.jsx'
import Alternance from './components/Alternance.jsx'
import Contact from './components/Contact.jsx'
import { useLenis } from './lib/useLenis.js'
import { band } from './data/content.js'

export default function App() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  useLenis(!reduced)

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {!reduced && <Cursor />}
      {!reduced && !ready && <Preloader onDone={() => setReady(true)} />}

      <a className="skip" href="#apropos">
        Aller au contenu
      </a>

      <Nav />

      <main>
        <Hero />
        <Marquee items={band} />
        <About />
        <Skills />
        <Parcours />
        <Projects />
        <Alternance />
        <Contact />
      </main>
    </>
  )
}
