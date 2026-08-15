import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SplitChars } from './SplitText.jsx'
import { useMagnetic } from '../lib/useMagnetic.js'
import { profile, socials } from '../data/content.js'

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Paris',
        }).format(new Date()),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="mono">Paris {time}</span>
}

export default function Contact() {
  const reduced = useReducedMotion()
  const magnet = useMagnetic(0.22, !reduced)

  /* Le titre est révélé depuis le <h2> — une cible large et non rognée —
     plutôt que lettre par lettre. */
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.15 })

  /* Filet de sécurité, sans observateur : si le titre est à l'écran depuis
     plus d'une seconde sans avoir été révélé, on le rend en texte simple.
     Un titre invisible en permanence n'est jamais acceptable. */
  const [plain, setPlain] = useState(false)

  useEffect(() => {
    if (titleInView || plain) return undefined

    let timer = null
    const check = () => {
      const el = titleRef.current
      if (!el || timer) return
      const box = el.getBoundingClientRect()
      const onScreen = box.top < window.innerHeight * 0.85 && box.bottom > 0
      if (onScreen) timer = setTimeout(() => setPlain(true), 1100)
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      clearTimeout(timer)
    }
  }, [titleInView, plain])

  return (
    <section className="sec contact" id="contact">
      <div className="shell">
        <p className="contact-kicker mono">06 — Contact</p>

        <h2 className="contact-title display" ref={titleRef}>
          <span className="sr-only">Une alternance à pourvoir ?</span>
          <span className="contact-line" aria-hidden="true">
            <SplitChars text="Une" stagger={0.02} run={titleInView} plain={plain} label={false} />
          </span>
          <span className="contact-line" aria-hidden="true">
            <SplitChars
              text="alternance"
              stagger={0.02}
              delay={0.08}
              run={titleInView}
              plain={plain}
              label={false}
            />
          </span>
          <span className="contact-line contact-line--rouge" aria-hidden="true">
            <SplitChars
              text="à pourvoir ?"
              stagger={0.02}
              delay={0.18}
              run={titleInView}
              plain={plain}
              label={false}
            />
          </span>
        </h2>

        <motion.div
          className="contact-mail-wrap"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span ref={magnet} className="contact-magnet">
            <a className="contact-mail" href={`mailto:${profile.email}`} data-cursor="écrire">
              <span className="contact-mail-base">{profile.email}</span>
              <span className="contact-mail-fill" aria-hidden="true">
                {profile.email}
              </span>
            </a>
          </span>
          <p className="contact-sub">
            Réponse sous 24 h. CV, dépôts GitHub et disponibilités : tout est prêt.
          </p>
        </motion.div>

        <div className="contact-cols">
          <div className="contact-col">
            <span className="contact-col-label mono">Téléphone</span>
            <a className="link-u contact-value" href={`tel:${profile.phoneHref}`}>
              {profile.phone}
            </a>
          </div>
          <div className="contact-col">
            <span className="contact-col-label mono">Ailleurs</span>
            <ul className="contact-socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="link-u contact-value"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.label} <span className="contact-handle">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="contact-col">
            <span className="contact-col-label mono">Dossier</span>
            <a className="link-u contact-value" href={profile.cv} download>
              Curriculum vitæ (PDF)
            </a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="shell footer-inner">
          <span className="mono">
            © {new Date().getFullYear()} {profile.first} {profile.last}
          </span>
          <Clock />
          <a className="mono link-u" href="#top">
            Retour en haut ↑
          </a>
        </div>
      </footer>
    </section>
  )
}
