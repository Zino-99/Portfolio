import { motion, useReducedMotion } from 'framer-motion'

/* Le déclencheur `whileInView` est porté par le conteneur, jamais par le
   texte lui-même : le texte démarre à y:110% dans un masque en overflow
   hidden, donc son aire visible est nulle et l'IntersectionObserver ne
   se déclencherait jamais. Les variantes descendent par le contexte. */
const GROUP = { hidden: {}, show: {} }

const rise = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i },
  }),
}

/** Révèle un texte mot par mot depuis le bas d’un masque. */
export function SplitWords({
  text,
  className = '',
  stagger = 0.045,
  delay = 0,
  once = true,
  amount = 0.35,
}) {
  const reduced = useReducedMotion()
  const words = String(text).split(' ')

  if (reduced) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      variants={GROUP}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
          <motion.span className="word-inner" variants={rise} custom={delay + i * stagger}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Révèle un titre lettre par lettre. Réservé aux titres courts. */
export function SplitChars({
  text,
  className = '',
  stagger = 0.028,
  delay = 0,
  animate = 'inView',
  run,
  plain = false,
  /* `label={false}` quand le parent porte déjà le texte pour les lecteurs
     d'écran : sinon le titre existe en double et se copie en double. */
  label = true,
}) {
  const reduced = useReducedMotion()
  const chars = Array.from(String(text))

  if (reduced || plain) return <span className={className}>{text}</span>

  /* `run` laisse l'appelant décider depuis un élément plus large : une lettre
     seule est une cible trop fragile pour un IntersectionObserver. */
  const trigger =
    run !== undefined
      ? { initial: 'hidden', animate: run ? 'show' : 'hidden' }
      : animate === 'immediate'
        ? { initial: 'hidden', animate: 'show' }
        : {
            initial: 'hidden',
            whileInView: 'show',
            viewport: { once: true, amount: 0.3 },
          }

  return (
    <motion.span className={`chars ${className}`} variants={GROUP} {...trigger}>
      {label && <span className="sr-only">{text}</span>}
      {chars.map((char, i) => (
        <span className="char-mask" key={`${char}-${i}`} aria-hidden="true">
          <motion.span className="char-inner" variants={rise} custom={delay + i * stagger}>
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Paragraphe dont chaque mot s’encre progressivement au scroll. */
export function ScrollInk({ text, className = '' }) {
  const reduced = useReducedMotion()
  const words = String(text).split(' ')

  if (reduced) return <p className={className}>{text}</p>

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          className="ink-word"
          key={`${word}-${i}`}
          aria-hidden="true"
          /* 0,62 est le plancher : en dessous, le mot pas encore encré
             tombe sous le contraste AA (ici 5,6:1 contre 1,2:1 à 0,13). */
          initial={{ opacity: 0.62 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.9, margin: '-18% 0px -34% 0px' }}
          transition={{ duration: 0.42, ease: 'easeOut', delay: (i % 6) * 0.012 }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </p>
  )
}
