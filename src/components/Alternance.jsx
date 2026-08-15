import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SplitWords } from './SplitText.jsx'
import { alternance, profile } from '../data/content.js'

const EASE = [0.16, 1, 0.3, 1]

export default function Alternance() {
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['4%', '-26%'])
  const sheetY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section className="sec alt" id="alternance" ref={ref}>
      {/* Le mot qui traverse le fond au rythme du défilement. */}
      <motion.div
        className="alt-ghost display"
        aria-hidden="true"
        style={reduced ? undefined : { x: ghostX }}
      >
        Alternance Alternance
      </motion.div>

      <div className="shell alt-shell">
        <div className="sec-head alt-head">
          <span className="sec-num mono">05 — Alternance</span>
          <h2 className="sec-title">
            <SplitWords text="Ce que je cherche" />
          </h2>
        </div>

        <div className="alt-layout">
          {/* Le parallaxe vit sur l'enveloppe : l'entrée anime aussi `y`,
              les deux ne peuvent pas piloter la même valeur. */}
          <motion.div className="alt-sheet-shift" style={reduced ? undefined : { y: sheetY }}>
            {/* La fiche de poste, posée de travers sur le rouge. */}
            <motion.article
              className="alt-sheet"
              initial={reduced ? false : { opacity: 0, y: 60, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <header className="alt-sheet-head">
                <span className="mono">Fiche de poste</span>
                <span className="mono alt-sheet-ref">
                  {profile.first[0]}
                  {profile.last[0]} · 2026
                </span>
              </header>

              <dl className="alt-fields">
                {alternance.fields.map((field, i) => (
                  <motion.div
                    className="alt-field"
                    key={field.label}
                    initial={reduced ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: 0.34 + i * 0.1 }}
                  >
                    <dt className="mono">{field.label}</dt>
                    <dd>{field.value}</dd>
                    {/* Le trait d'encre qui balaie la ligne en la révélant.
                        Non rendu sans animation : il resterait posé dessus. */}
                    {!reduced && (
                      <motion.span
                        className="alt-field-wipe"
                        aria-hidden="true"
                        initial={{ scaleX: 1 }}
                        whileInView={{ scaleX: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: EASE }}
                      />
                    )}
                  </motion.div>
                ))}
              </dl>

              <motion.div
                className="alt-stamp"
                initial={reduced ? false : { scale: 1.9, opacity: 0, rotate: -24 }}
                whileInView={{ scale: 1, opacity: 1, rotate: -11 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 1.05, ease: [0.34, 1.4, 0.5, 1] }}
              >
                <span className="mono">Signé</span>
                <strong className="display">Dispo</strong>
              </motion.div>
            </motion.article>
          </motion.div>

          {/* Les trois arguments, numérotés. */}
          <ol className="alt-strengths">
            {alternance.strengths.map((item, i) => (
              <motion.li
                className="alt-strength"
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: EASE }}
              >
                <span className="alt-strength-num display" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="alt-strength-body">
                  <h3 className="alt-strength-title">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <motion.span
                  className="alt-strength-rule"
                  aria-hidden="true"
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.14, ease: EASE }}
                />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
