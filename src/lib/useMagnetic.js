import { useEffect, useRef } from 'react'

/**
 * Attire légèrement un élément vers le curseur.
 * `strength` = fraction du déplacement souris reportée sur l’élément.
 */
export function useMagnetic(strength = 0.3, enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    let raf = 0
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const tick = () => {
      current.x += (target.x - current.x) * 0.15
      current.y += (target.y - current.y) * 0.15
      node.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
      if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      const rect = node.getBoundingClientRect()
      target.x = (event.clientX - (rect.left + rect.width / 2)) * strength
      target.y = (event.clientY - (rect.top + rect.height / 2)) * strength
      start()
    }

    const onLeave = () => {
      target.x = 0
      target.y = 0
      start()
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)

    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength, enabled])

  return ref
}
