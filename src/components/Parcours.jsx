import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { SplitWords } from './SplitText.jsx'
import { experience, formation } from '../data/content.js'

function Entry({ item, i }) {
  const reduced = useReducedMotion()
  return (
    <motion.li
      className="entry"
      initial={reduced ? false : { opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="entry-node" aria-hidden="true" />
      <span className="entry-year mono">{item.year}</span>
      <div className="entry-body">
        <h4 className="entry-title">{item.title}</h4>
        <p className="entry-org">
          {item.href ? (
            <a className="link-u" href={item.href} target="_blank" rel="noreferrer">
              {item.org}
            </a>
          ) : (
            item.org
          )}
          {item.place && <span className="entry-place"> — {item.place}</span>}
        </p>
        {item.detail && <p className="entry-detail">{item.detail}</p>}
      </div>
    </motion.li>
  )
}

function Column({ label, items, kicker }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 55%'],
  })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <div className="parcours-col" ref={ref}>
      <header className="parcours-col-head">
        <h3 className="parcours-col-title mono">{label}</h3>
        <span className="parcours-col-kicker mono">{kicker}</span>
      </header>
      <div className="timeline">
        <span className="timeline-rail" aria-hidden="true" />
        <motion.span
          className="timeline-run"
          aria-hidden="true"
          style={reduced ? { scaleY: 1 } : { scaleY: line }}
        />
        <ul className="entries">
          {items.map((item, i) => (
            <Entry item={item} i={i} key={item.title} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Parcours() {
  return (
    <section className="sec sec-rule parcours" id="parcours">
      <div className="shell">
        <div className="sec-head">
          <span className="sec-num mono">03 — Parcours</span>
          <h2 className="sec-title">
            <SplitWords text="D’où je viens" />
          </h2>
        </div>

        <div className="parcours-grid">
          <Column label="Expérience" kicker="En entreprise" items={experience} />
          <Column label="Formation" kicker="Diplômes" items={formation} />
        </div>
      </div>
    </section>
  )
}
