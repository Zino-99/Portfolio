import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SplitWords } from './SplitText.jsx'
import { InkNote } from './Ink.jsx'
import { projects } from '../data/content.js'

const EASE = [0.16, 1, 0.3, 1]

function Shot({ project }) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    return (
      <div className="proj-shot proj-shot--empty">
        <span className="display">{project.name}</span>
        <span className="mono">{project.kind}</span>
      </div>
    )
  }
  return (
    <div className="proj-shot">
      <img src={project.image} alt="" onError={() => setOk(false)} loading="lazy" />
    </div>
  )
}

function Row({ project, isOpen, onToggle, index }) {
  const reduced = useReducedMotion()

  const line = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: EASE },
  })

  return (
    <motion.li
      className={`proj-row ${isOpen ? 'is-open' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
    >
      <button
        className="proj-head"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${project.id}`}
        data-cursor={isOpen ? 'replier' : 'déplier'}
      >
        <span className="proj-sweep" aria-hidden="true" />
        <span className="proj-num mono">{project.index}</span>
        <span className="proj-title display">{project.name}</span>
        <span className="proj-tag mono">{project.kind}</span>
        <span className="proj-toggle" aria-hidden="true">
          <span className="proj-toggle-bar" />
          <span className="proj-toggle-bar" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="proj-panel"
            id={`panel-${project.id}`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.6, ease: EASE }, opacity: { duration: 0.35 } }}
          >
            <div className="proj-panel-inner">
              <motion.div className="proj-shot-wrap" {...line(0.05)}>
                <Shot project={project} />
              </motion.div>

              <div className="proj-detail">
                <motion.p className="proj-summary" {...line(0.12)}>
                  {project.summary}
                </motion.p>

                <motion.p className="proj-role" {...line(0.18)}>
                  <span className="mono proj-role-label">Mon rôle</span>
                  {project.role}
                </motion.p>

                {project.stack.length > 0 && (
                  <motion.ul className="proj-stack" {...line(0.24)}>
                    {project.stack.map((tech) => (
                      <li className="mono" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </motion.ul>
                )}

                <motion.div className="proj-links" {...line(0.3)}>
                  {project.links.length > 0 ? (
                    project.links.map((link) => (
                      <a
                        className="proj-cta mono"
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="ouvrir"
                      >
                        {link.label}
                        <span className="proj-cta-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ))
                  ) : (
                    <span className="proj-links--none mono">Projet d’école — code sur demande</span>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(projects[0].id)

  return (
    <section className="sec sec-rule projects" id="projets">
      <div className="shell">
        <div className="sec-head">
          <span className="sec-num mono">04 — Projets</span>
          <h2 className="sec-title">
            <SplitWords text="Ce que j’ai construit" />
          </h2>
          <p className="sec-note">
            Un site client en production, un dashboard Power BI, des applications full-stack.
            <InkNote className="projects-note" delay={0.4}>
              cliquez pour ouvrir
            </InkNote>
          </p>
        </div>

        <ol className="proj-index">
          {projects.map((project, i) => (
            <Row
              key={project.id}
              project={project}
              index={i}
              isOpen={open === project.id}
              onToggle={() => setOpen((cur) => (cur === project.id ? null : project.id))}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
