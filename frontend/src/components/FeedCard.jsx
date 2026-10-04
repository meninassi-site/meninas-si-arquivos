import { Link } from 'react-router-dom'
import { formatDateTime, itemId, typeLabels } from '../utils/format'

const FALLBACK_IMAGE = '/assets/images/icons/LogoMeninasDeSistema.png'

function excerpt(text, max = 140) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

/** The "card" look used across Home's carousels and the Eventos listing. */
export default function FeedCard({ item, actionLabel = 'Saiba mais' }) {
  const href = `/eventos/${item.type}/${itemId(item)}`
  const dateLabel = formatDateTime(item.data_occurence, item.time_occurence)

  return (
    <div className="card">
      <img
        src={item.cover_photo_url || FALLBACK_IMAGE}
        alt={item.title}
        onError={(event) => {
          event.currentTarget.src = FALLBACK_IMAGE
        }}
      />
      <div className="card-corpo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="tag-palestra">{typeLabels[item.type]}</span>
          {dateLabel && <span className="data-post">{dateLabel}</span>}
        </div>
        <h3>{item.title}</h3>
        <p>{excerpt(item.event_description)}</p>
        <Link to={href} className="link-acao">
          {actionLabel} &rsaquo;
        </Link>
      </div>
    </div>
  )
}
