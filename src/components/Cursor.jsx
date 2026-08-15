import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Point d’encre qui suit la souris, avec un anneau qui traîne derrière. */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.35 })
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.35 })
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onOver = (event) => {
      const target = event.target.closest?.('[data-cursor], a, button')
      if (!target) {
        setActive(false)
        setLabel('')
        return
      }
      setActive(true)
      setLabel(
        target.dataset?.cursor && target.dataset.cursor !== 'true' ? target.dataset.cursor : '',
      )
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [x, y])

  return (
    <>
      <motion.div className="cursor" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className="cursor-ring"
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        animate={{
          scale: label ? 2.05 : active ? 1.55 : 1,
          backgroundColor: label ? 'var(--rouge)' : 'rgba(228,0,43,0)',
          color: label ? '#fff' : 'var(--rouge)',
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="cursor-label">{label}</span>
      </motion.div>
    </>
  )
}
