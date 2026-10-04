import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'
import Carousel from '../../components/Carousel'
import FeedCard from '../../components/FeedCard'
import { formatDate, itemId, typeLabels } from '../../utils/format'

const FALLBACK_IMAGE = '/assets/images/icons/LogoMeninasDeSistema.png'

function PastCard({ item }) {
  return (
    <Link
      to={`/eventos/${item.type}/${itemId(item)}`}
      className="card-passado"
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <img
        src={item.cover_photo_url || FALLBACK_IMAGE}
        alt={item.title}
        style={{ width: '100%', height: 200, objectFit: 'cover' }}
        onError={(event) => {
          event.currentTarget.src = FALLBACK_IMAGE
        }}
      />
      <div style={{ padding: 20 }}>
        <span
          style={{
            background: '#e0f2fe',
            color: '#0369a1',
            fontSize: 12,
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: 4,
          }}
        >
          {typeLabels[item.type]}
        </span>
        <h4 style={{ margin: '15px 0 10px 0', fontSize: 18, color: '#1e293b' }}>{item.title}</h4>
        {item.event_description && (
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, marginBottom: 15 }}>
            {item.event_description}
          </p>
        )}
        {item.data_occurence && (
          <div style={{ fontSize: 12, color: '#94a3b8' }}>Realizado em {formatDate(item.data_occurence)}</div>
        )}
      </div>
    </Link>
  )
}

export default function EventsList() {
  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])

  useEffect(() => {
    api.get('/feed/upcoming').then((response) => setUpcoming(response.data))
    api.get('/feed/past').then((response) => setPast(response.data))
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-texto" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <h1>Eventos | Meninas de Sistemas</h1>
            <p>
              O Meninas de Sistemas é um projeto de extensão parceiro do Programa Meninas Digitais, promovido pela
              SBC, que tem como objetivo identificar e combater os motivos que levam as mulheres a evadir do curso de
              Sistemas de Informação.
            </p>
          </div>
        </div>
      </section>

      <main>
        <section className="missao" style={{ flexDirection: 'column', textAlign: 'center', padding: '60px 20px' }}>
          <div className="missao-conteudo" style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2>Próximos Eventos</h2>
            <p style={{ fontSize: 18, color: '#555', lineHeight: 1.6, marginTop: 20 }}>
              Próximos eventos, workshops e minicursos em que o projeto participará.
            </p>
          </div>
        </section>

        <section style={{ padding: '0 40px 60px 40px', backgroundColor: '#f8f6fc' }}>
          <Carousel
            items={upcoming}
            emptyMessage="Nenhum evento agendado no momento."
            renderItem={(item) => <FeedCard key={`${item.type}-${item.title}`} item={item} />}
          />
        </section>

        <section className="eventos-participamos" style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 50px auto' }}>
              <h2>Eventos que Participamos</h2>
              <p style={{ fontSize: 18, color: '#555', lineHeight: 1.6, marginTop: 20 }}>
                Confira um pouco da nossa trajetória e presença em congressos e atividades acadêmicas.
              </p>
            </div>

            {past.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888' }}>Ainda não há eventos passados registrados.</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 30,
                  padding: '0 20px',
                }}
              >
                {past.map((item) => (
                  <PastCard key={`${item.type}-${item.title}`} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
