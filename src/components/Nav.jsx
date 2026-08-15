import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { nav, profile } from '../data/content.js'

export default function Nav() {
  const [menu, setMenu] = useState(false)
  const [tucked, setTucked] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setTucked(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', menu)
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])

  return (
    <>
      <header className={`nav ${tucked ? 'is-tucked' : ''}`}>
        <div className="nav-inner shell">
          <a href="#top" className="nav-mark" aria-label="Retour en haut">
            <span className="nav-mark-initials display">YD</span>
            <span className="nav-mark-dot" />
          </a>

          <nav className="nav-links" aria-label="Navigation principale">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="nav-link mono">
                <span className="nav-link-text nav-link-text--base">{item.label}</span>
                <span className="nav-link-text nav-link-text--hover" aria-hidden="true">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a className="nav-status mono" href="#alternance">
              <span className="nav-status-pulse" />
              Dispo. alternance
            </a>
            <a className="btn btn--rouge nav-cta" href="#contact">
              Me contacter
            </a>
            <button
              className={`nav-burger ${menu ? 'is-open' : ''}`}
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-inner shell">
              <ul className="menu-list">
                {nav.concat({ label: 'Contact', href: '#contact' }).map((item, i) => (
                  <li key={item.href}>
                    <motion.a
                      href={item.href}
                      className="menu-link display"
                      onClick={() => setMenu(false)}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="menu-num mono">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="menu-foot mono">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
