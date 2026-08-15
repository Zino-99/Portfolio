import { useState } from 'react'
import { profile } from '../data/content.js'

/** Portrait détouré posé sur un disque d’encre rouge. */
export default function Portrait() {
  const [ok, setOk] = useState(true)

  return (
    <figure className="portrait">
      <span className="portrait-disc" aria-hidden="true" />
      {ok ? (
        <img
          className="portrait-img"
          src="/portrait.png"
          alt={`${profile.first} ${profile.last}`}
          onError={() => setOk(false)}
          loading="lazy"
          width="500"
          height="500"
        />
      ) : (
        <span className="portrait-fallback display" aria-hidden="true">
          YD
        </span>
      )}
      <figcaption className="portrait-tag mono">
        {profile.first} {profile.last} · {profile.city}
      </figcaption>
    </figure>
  )
}
