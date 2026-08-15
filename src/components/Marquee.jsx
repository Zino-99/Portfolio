import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const wrap = (min, max, value) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/**
 * Bandeau rouge. Il tourne en continu, accélère et s’incline
 * selon la vitesse de défilement.
 */
export default function Marquee({ items, baseSpeed = 3.2 }) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const direction = useRef(1)

  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 42, stiffness: 380 })
  const factor = useTransform(smooth, [-2200, 0, 2200], [-4.5, 0, 4.5], { clamp: false })
  const skew = useTransform(smooth, [-2200, 0, 2200], [3.5, 0, -3.5], { clamp: false })

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseSpeed * (delta / 1000) * 12
    const v = factor.get()
    if (v < 0) direction.current = -1
    else if (v > 0) direction.current = 1
    move += direction.current * move * Math.abs(v)
    x.set(wrap(-25, -50, x.get() + move * 0.06))
  })

  const xPercent = useTransform(x, (v) => `${v}%`)
  const track = [...items, ...items, ...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee-track"
        style={reduced ? undefined : { x: xPercent, skewX: skew }}
      >
        {track.map((item, i) => (
          <span className="marquee-item display" key={`${item}-${i}`}>
            {item}
            <span className="marquee-sep">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
