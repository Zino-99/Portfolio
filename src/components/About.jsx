import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ScrollInk, SplitWords } from './SplitText.jsx'
import { InkArrow, InkNote, InkUnderline } from './Ink.jsx'
import Portrait from './Portrait.jsx'
import { facts, profile } from '../data/content.js'

const EASE = [0.16, 1, 0.3, 1]

export default function About() {
  const reduced = useReducedMotion()
  const ref = useRef(null)

  /* Le portrait glisse un peu moins vite que la colonne de texte :
     ça donne de la profondeur sans bouger la mise en page. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section className="sec sec-rule about" id="apropos" ref={ref}>
      <div className="shell">
        <div className="sec-head">
          <span className="sec-num mono">01 — À propos</span>
          <h2 className="sec-title">
            <SplitWords text="Ce que je fais" />
          </h2>
        </div>

        <p className="about-lead">
          <span className="about-lead-line">
            <SplitWords text="Je construis des applications web," amount={0.4} />
          </span>
          <span className="about-lead-line">
            <SplitWords text="et je me spécialise dans" delay={0.14} amount={0.4} />{' '}
            <motion.span
              className="underlined about-lead-key"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              la donnée
              <InkUnderline delay={0.95} width={5} />
            </motion.span>
          </span>
        </p>

        <div className="about-body">
          <motion.div
            className="about-portrait"
            style={reduced ? undefined : { y: portraitY }}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Portrait />
          </motion.div>

          <div className="about-detail">
            <ScrollInk text={profile.statement} className="about-text" />

            <div className="about-note-wrap">
              <InkArrow className="about-arrow" delay={0.2} />
              <InkNote delay={0.7}>les deux, pas l’un ou l’autre</InkNote>
            </div>

            <dl className="about-facts">
              {facts.map((fact, i) => (
                <motion.div
                  className="about-fact"
                  key={fact.label}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                >
                  <dt className="mono">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                  {!reduced && (
                    <motion.span
                      className="about-fact-rule"
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE }}
                    />
                  )}
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
