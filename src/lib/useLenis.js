import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

/**
 * Défilement lissé + interception des ancres.
 * Désactivé si l’utilisateur a demandé moins d’animations.
 */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    const onClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -72, duration: 1.35 })
      history.replaceState(null, '', id)
    }

    document.addEventListener('click', onClick)
    window.__lenis = lenis

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete window.__lenis
    }
  }, [enabled])
}

export function scrollToId(id) {
  const target = document.querySelector(id)
  if (!target) return
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -72, duration: 1.35 })
  else target.scrollIntoView({ behavior: 'smooth' })
}
