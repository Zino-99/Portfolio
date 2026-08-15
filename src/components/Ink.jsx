import { motion, useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------
   La couche d’encre : des annotations tracées à la main qui se
   dessinent quand elles entrent dans le champ. C’est la signature
   de la page — à utiliser avec parcimonie.
   ------------------------------------------------------------------ */

/* Le déclencheur est porté par le <svg>, qui a une vraie boîte : un tracé
   à pathLength 0 ne dessine rien et ne déclencherait pas l'observateur. */
const GROUP = { hidden: {}, show: {} }

const draw = (delay, duration) => ({
  variants: {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration, ease: [0.4, 0.05, 0.25, 1], delay },
        opacity: { duration: 0.08, delay },
      },
    },
  },
})

function Svg({ children, viewBox, className = '', style }) {
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <motion.svg
      className={`ink-svg ${className}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={style}
      variants={GROUP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.svg>
  )
}

/** Cercle tracé autour d’un mot, avec le petit dépassement du feutre. */
export function InkCircle({ delay = 0.35, duration = 1.05, width = 5 }) {
  return (
    <Svg viewBox="0 0 300 120">
      <motion.path
        d="M26 66 C20 30 94 12 158 13 C236 14 288 33 283 64 C278 97 206 111 142 108 C72 105 19 91 24 59 C29 31 80 17 140 14"
        strokeWidth={width}
        vectorEffect="non-scaling-stroke"
        {...draw(delay, duration)}
      />
    </Svg>
  )
}

/** Double soulignement rapide sous un mot. */
export function InkUnderline({ delay = 0.5, duration = 0.55, width = 4 }) {
  return (
    <Svg viewBox="0 0 300 30">
      <motion.path
        d="M4 15 C64 5 156 4 296 11"
        strokeWidth={width}
        vectorEffect="non-scaling-stroke"
        {...draw(delay, duration)}
      />
      <motion.path
        d="M14 25 C90 18 188 16 284 22"
        strokeWidth={Math.max(2, width * 0.6)}
        vectorEffect="non-scaling-stroke"
        {...draw(delay + duration * 0.55, duration * 0.8)}
      />
    </Svg>
  )
}

/** Flèche manuscrite. `flip` renvoie la pointe vers la gauche. */
export function InkArrow({ delay = 0.4, duration = 0.7, className = '', flip = false }) {
  return (
    <Svg
      viewBox="0 0 120 120"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <motion.path
        d="M8 10 C40 30 60 56 88 96"
        strokeWidth={4}
        vectorEffect="non-scaling-stroke"
        {...draw(delay, duration)}
      />
      <motion.path
        d="M88 96 L58 88"
        strokeWidth={4}
        vectorEffect="non-scaling-stroke"
        {...draw(delay + duration * 0.75, 0.25)}
      />
      <motion.path
        d="M88 96 L82 66"
        strokeWidth={4}
        vectorEffect="non-scaling-stroke"
        {...draw(delay + duration * 0.85, 0.25)}
      />
    </Svg>
  )
}

/** Accolade verticale pour regrouper une liste. */
export function InkBracket({ delay = 0.2, duration = 0.9, className = '' }) {
  return (
    <Svg viewBox="0 0 40 400" className={className}>
      <motion.path
        d="M30 4 C12 6 14 90 12 140 C11 176 4 190 4 200 C4 210 11 224 12 260 C14 310 12 394 30 396"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        {...draw(delay, duration)}
      />
    </Svg>
  )
}

/** Coche de validation. */
export function InkCheck({ delay = 0.25, duration = 0.4, className = '' }) {
  return (
    <Svg viewBox="0 0 60 60" className={className}>
      <motion.path
        d="M6 32 L22 50 L54 8"
        strokeWidth={5}
        vectorEffect="non-scaling-stroke"
        {...draw(delay, duration)}
      />
    </Svg>
  )
}

/** Note manuscrite, souvent posée près d’une annotation. */
export function InkNote({ children, className = '', delay = 0.8 }) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      className={`hand ink-note ${className}`}
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, y: 8, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  )
}
