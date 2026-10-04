import { Link } from 'react-router-dom'
import { formatDateTime, itemId, typeLabels } from '../utils/format'
import { shareOrCopyLink } from '../utils/share'

const FALLBACK_IMAGE = '/assets/images/icons/LogoMeninasDeSistema.png'

function excerpt(text, max = 160) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

/** The "card-noticia" look used on the dedicated Notícias listing page. */
export default function NewsCard({ item }) {
  const href = `/noticias/${item.type}/${itemId(item)}`
  const dateLabel = formatDateTime(item.data_occurence, item.time_occurence)

  return (
    <article className="card-noticia">
      <div className="card-noticia-img">
        <img
          src={item.cover_photo_url || FALLBACK_IMAGE}
          alt={item.title}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE
          }}
        />
      </div>
      <div className="card-noticia-corpo">
        <h3>
          {typeLabels[item.type]}: {item.title}
        </h3>
        <p>{excerpt(item.event_description)}</p>
        {dateLabel && <span className="meta-noticia">{dateLabel}</span>}
        <div className="card-noticia-rodape">
          <Link to={href} className="link-continuar">
            Continuar lendo &rsaquo;
          </Link>
          <button
            type="button"
            className="btn-share"
            aria-label="Compartilhar"
            onClick={() =>
              shareOrCopyLink({
                title: item.title,
                text: item.event_description ?? item.title,
                url: `${window.location.origin}${href}`,
              })
            }
          >
            &#10550;
          </button>
        </div>
      </div>
    </article>
  )
}
