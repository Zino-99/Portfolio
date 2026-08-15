import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SplitChars } from './SplitText.jsx'
import { InkCircle, InkUnderline } from './Ink.jsx'
import { useMagnetic } from '../lib/useMagnetic.js'
import { profile } from '../data/content.js'

const START = 1.15 // le préloader vient de se lever

export default function Hero() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const titleY = useTransform(scrollYProgress, [0, 0.22], ['0%', '-16%'])
  const fade = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const cta = useMagnetic(0.28, !reduced)

  const fadeUp = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="hero" id="top">
      <div className="hero-inner shell">
        <div className="hero-rail">
          <motion.span className="mono" {...fadeUp(START + 0.1)}>
            Recherche d’alternance
          </motion.span>
          <motion.span className="mono hero-rail-year" {...fadeUp(START + 0.16)}>
            2026
          </motion.span>
        </div>

        <div className="hero-body">
          <div className="hero-top">
            <motion.p className="hero-eyebrow mono" {...fadeUp(START)}>
              <span className="hero-eyebrow-dot" />
              {profile.school} → Master Data & IA, {profile.nextSchool}
            </motion.p>

            <motion.div
              className="stamp"
              initial={reduced ? false : { scale: 1.8, opacity: 0, rotate: -22 }}
              animate={{ scale: 1, opacity: 0.92, rotate: -8 }}
              transition={{ duration: 0.5, delay: START + 1.25, ease: [0.34, 1.4, 0.5, 1] }}
            >
              <span className="stamp-top mono">Disponible</span>
              <span className="stamp-main display">Alternance</span>
              <span className="stamp-bottom mono">Rentrée 2026 · France</span>
            </motion.div>
          </div>

          <motion.h1 className="hero-title display" style={reduced ? undefined : { y: titleY }}>
            <span className="sr-only">
              {profile.first} {profile.last} — {profile.role}
            </span>
            <span className="hero-line" aria-hidden="true">
              <SplitChars text={profile.first} delay={START} animate="immediate" label={false} />
            </span>
            <span className="hero-line hero-line--2" aria-hidden="true">
              <SplitChars
                text={profile.last}
                delay={START + 0.28}
                animate="immediate"
                label={false}
              />
            </span>
          </motion.h1>

          <motion.p className="hero-role" {...fadeUp(START + 0.45)}>
            <span className="underlined">
              {profile.roleLine}
              <InkUnderline delay={START + 1.15} width={5} />
            </span>
          </motion.p>

          <div className="hero-bottom">
            <motion.p className="hero-lede" {...fadeUp(START + 0.55)}>
              Je cherche une{' '}
              <span className="mark">
                alternance
                <InkCircle delay={START + 1.7} width={4} />
              </span>{' '}
              pour mon Master Data &amp; IA : développement web, analyse de données, ou les deux.
            </motion.p>

            <motion.div className="hero-actions" {...fadeUp(START + 0.68)}>
              <span ref={cta} className="hero-cta-magnet">
                <a className="btn" href="#contact" data-cursor="écrire">
                  <span className="btn-dot" />
                  Discutons alternance
                </a>
              </span>
              <a className="link-u mono hero-cv" href={profile.cv} download>
                Télécharger le CV ↓
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div className="hero-foot shell" style={reduced ? undefined : { opacity: fade }}>
        <span className="mono">Faites défiler</span>
        <span className="hero-scroll-line" aria-hidden="true">
          <span className="hero-scroll-run" />
        </span>
        <span className="mono hero-foot-right">Symfony · React · Power BI</span>
      </motion.div>
    </section>
  )
}
