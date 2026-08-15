import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SplitWords } from './SplitText.jsx'
import { skillGroups } from '../data/content.js'

export default function Skills() {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(null)

  return (
    <section className="sec sec-rule skills" id="competences">
      <div className="shell">
        <div className="sec-head">
          <span className="sec-num mono">02 — Compétences</span>
          <h2 className="sec-title">
            <SplitWords text="Ma boîte à outils" />
          </h2>
          <p className="sec-note">
            Ce que j’utilise réellement sur mes projets. Quand je suis encore en apprentissage, je
            le dis.
          </p>
        </div>

        <div className="skills-groups">
          {skillGroups.map((group, gi) => (
            <motion.article
              className="skill-group"
              key={group.key}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: gi * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="skill-group-head">
                <h3 className="skill-group-title">{group.title}</h3>
                {group.note && <p className="skill-group-note">{group.note}</p>}
              </header>

              <ul className="skill-list">
                {group.items.map((item, i) => {
                  const name = typeof item === 'string' ? item : item.name
                  const hint = typeof item === 'string' ? null : item.hint
                  const id = `${group.key}-${name}`
                  return (
                    <li
                      className={`skill ${hovered === id ? 'is-hot' : ''}`}
                      key={id}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span className="skill-index mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className="skill-name">{name}</span>
                      {hint && <span className="skill-hint mono">{hint}</span>}
                      <span className="skill-fill" aria-hidden="true" />
                    </li>
                  )
                })}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
