import { useRef } from 'react'

/** Mirrors the static site's hand-rolled carousel: a horizontally scrolling
 * `.cards` track nudged by prev/next buttons, one card-width at a time. */
export default function Carousel({ items, renderItem, emptyMessage = 'Nada por aqui ainda.' }) {
  const trackRef = useRef(null)

  function scrollByCard(direction) {
    const track = trackRef.current
    if (!track) return
    const firstCard = track.querySelector(':scope > *')
    const amount = (firstCard?.offsetWidth ?? 300) + 24
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  if (items.length === 0) {
    return <p className="carrossel-vazio">{emptyMessage}</p>
  }

  return (
    <div className="carrossel-container">
      <button className="seta-carrossel anterior" aria-label="Anterior" onClick={() => scrollByCard(-1)}>
        &#10094;
      </button>
      <div className="cards" ref={trackRef}>
        {items.map(renderItem)}
      </div>
      <button className="seta-carrossel proximo" aria-label="Próximo" onClick={() => scrollByCard(1)}>
        &#10095;
      </button>
    </div>
  )
}
