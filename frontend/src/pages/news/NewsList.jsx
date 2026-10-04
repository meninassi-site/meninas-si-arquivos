import { useEffect, useState } from 'react'
import { api } from '../../api/client'
import NewsCard from '../../components/NewsCard'

const PAGE_SIZE = 6

export default function NewsList() {
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(PAGE_SIZE)

  useEffect(() => {
    api.get('/feed').then((response) => setItems(response.data))
  }, [])

  return (
    <>
      <section className="hero-noticias">
        <h1>Notícias | Projeto Meninas de Sistema</h1>
      </section>

      <main className="main-noticias">
        <section className="secao-titulo-noticias">
          <h2>Notícias mais recentes</h2>
          <p>
            Acompanhe todas as novidades, eventos, workshops e minicursos do projeto Meninas de Sistemas na UFPA e
            região.
          </p>
        </section>

        <section className="lista-noticias">
          {items.length === 0 && <p>Nenhuma notícia publicada ainda.</p>}
          {items.slice(0, visible).map((item) => (
            <NewsCard key={`${item.type}-${item.title}`} item={item} />
          ))}
        </section>

        {visible < items.length && (
          <div className="container-btn-carregar">
            <button type="button" className="btn-carregar-mais" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Carregar mais notícias
            </button>
          </div>
        )}
      </main>
    </>
  )
}
