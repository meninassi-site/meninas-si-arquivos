import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getActivity } from '../api/activities'
import { formatDateTime, itemId, itemLecturer, typeLabels } from '../utils/format'
import { shareOrCopyLink } from '../utils/share'

const FALLBACK_IMAGE = '/assets/images/icons/LogoMeninasDeSistema.png'

/**
 * One shared detail layout for events, workshops and short courses — the
 * static site had three near-duplicate versions of this page (one per
 * content type); `backTo` just decides whether "voltar" returns to
 * /noticias or /eventos, matching wherever the visitor came from.
 */
export default function ActivityDetail({ backTo }) {
  const { type, id } = useParams()
  const [item, setItem] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setItem(null)
    setNotFound(false)
    getActivity(type, id)
      .then((response) => setItem(response.data))
      .catch(() => setNotFound(true))
  }, [type, id])

  if (notFound) {
    return (
      <main style={{ padding: 60, textAlign: 'center' }}>
        <p>Conteúdo não encontrado.</p>
        <Link to={backTo}>&lsaquo; Voltar</Link>
      </main>
    )
  }

  if (!item) return null

  const dateLabel = formatDateTime(item.data_occurence, item.time_occurence)
  const lecturer = itemLecturer(item)
  const shareUrl = `${window.location.origin}/${backTo.replace(/^\//, '')}/${item.type}/${itemId(item)}`

  return (
    <>
      <section className="hero-noticias">
        <h1>{item.title}</h1>
      </section>

      <main style={{ padding: '60px 20px', backgroundColor: '#f8f6fc' }}>
        <div style={{ maxWidth: 850, margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ marginBottom: 30, borderRadius: 12, overflow: 'hidden' }}>
              <img
                src={item.cover_photo_url || FALLBACK_IMAGE}
                alt={item.title}
                style={{ width: '100%', height: 'auto', maxHeight: 420, objectFit: 'cover' }}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
                margin: '0 0 30px 0',
                paddingBottom: 15,
                borderBottom: '1px dashed #eee',
              }}
            >
              <span className="tag-palestra">{typeLabels[item.type]}</span>
              <button
                type="button"
                style={{
                  background: '#f0f0f0',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: 30,
                  cursor: 'pointer',
                  color: '#56279b',
                  fontWeight: 'bold',
                }}
                onClick={() => shareOrCopyLink({ title: item.title, text: item.event_description ?? item.title, url: shareUrl })}
              >
                Compartilhar
              </button>
            </div>

            <div
              style={{
                background: '#f8f6fc',
                padding: 25,
                borderRadius: 8,
                marginBottom: 35,
                borderLeft: '5px solid #56279b',
              }}
            >
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dateLabel && (
                  <li>
                    <strong>Quando:</strong> {dateLabel}
                  </li>
                )}
                {item.location && (
                  <li>
                    <strong>Local:</strong> {item.location}
                  </li>
                )}
                {lecturer && (
                  <li>
                    <strong>{item.type === 'evento' ? 'Organização' : 'Ministrante'}:</strong> {lecturer}
                  </li>
                )}
                {item.lenght_time != null && (
                  <li>
                    <strong>Carga horária:</strong> {item.lenght_time}h
                  </li>
                )}
              </ul>
            </div>

            {item.event_description && (
              <div style={{ color: '#444', lineHeight: 1.8, fontSize: 16, whiteSpace: 'pre-line' }}>
                {item.event_description}
              </div>
            )}

            {item.registration_link && (
              <div style={{ marginTop: 40 }}>
                <a
                  href={item.registration_link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#ec4899',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Inscreva-se
                </a>
              </div>
            )}

            <div style={{ marginTop: 50, paddingTop: 30, borderTop: '1px solid #eee' }}>
              <Link to={backTo} style={{ color: '#56279b', fontWeight: 'bold', textDecoration: 'none' }}>
                &lsaquo; Voltar
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
