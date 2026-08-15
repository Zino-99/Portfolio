import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content.js'

/**
 * Ouverture : le dossier se remplit (0 → 100), puis la page blanche
 * se lève comme une feuille qu’on retire.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    let value = 0
    const timer = setInterval(() => {
      value = Math.min(100, value + Math.random() * 12 + 6)
      setCount(Math.round(value))
      if (value >= 100) {
        clearInterval(timer)
        setTimeout(() => setOpen(false), 180)
        setTimeout(() => onDone?.(), 800)
      }
    }, 38)
    return () => clearInterval(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-inner shell">
            <span className="mono preloader-tag">Dossier de candidature</span>
            <div className="preloader-name display">
              {profile.first} <span className="preloader-last">{profile.last}</span>
            </div>
            <div className="preloader-bottom">
              <span className="mono">Alternance · {profile.city}</span>
              <span className="preloader-count display">{String(count).padStart(3, '0')}</span>
            </div>
            <motion.div
              className="preloader-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: 'linear', duration: 0.12 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
