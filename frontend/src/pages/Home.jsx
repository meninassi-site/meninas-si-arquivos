import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Carousel from '../components/Carousel'
import FeedCard from '../components/FeedCard'

export default function Home() {
  const [upcoming, setUpcoming] = useState([])
  const [latest, setLatest] = useState([])

  useEffect(() => {
    api.get('/feed/upcoming').then((response) => setUpcoming(response.data.slice(0, 8)))
    api.get('/feed').then((response) => setLatest(response.data.slice(0, 8)))
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-texto">
            <h1>Projeto Meninas de Sistemas</h1>
            <p>
              Acreditamos que todos têm um lugar no mundo da tecnologia e trabalhamos para reduzir barreiras na
              Computação.
            </p>
            <p className="frase">&ldquo;Juntas somos mais fortes&rdquo;</p>
          </div>
          <div className="hero-imagem">
            <img
              src="/assets/images/icons/meninanegra.png"
              alt="Ilustração Meninas de Sistemas"
              className="animacao-flutuar"
            />
          </div>
        </div>
      </section>

      <main>
        <section className="missao" id="sobre">
          <div className="missao-conteudo">
            <h2>Nossa Missão</h2>
            <p>
              O Meninas de Sistemas é um projeto de extensão parceiro do Programa Meninas Digitais, promovido pela
              SBC, que tem como objetivo identificar e combater os motivos que levam as mulheres a evadir do curso de
              Sistemas de Informação, tanto na cidade de Cametá quanto nas cidades de Oeiras e Limoeiro do Ajurú, nas
              quais o curso é ofertado pela UFPA.
            </p>
            <p>
              Acredita-se que esse projeto pode ajudar na diminuição do número de evasão no curso de Sistemas de
              Informação, a partir de ações em escolas públicas da região do Baixo Tocantins que incentivem o ingresso
              de mulheres no curso de Sistemas de Informação e de ações afirmativas com discentes do curso (ingressas
              e egressas).
            </p>
          </div>
          <div className="missao-imagem">
            <img src="/assets/images/icons/equipe.png" alt="Equipe Meninas de Sistemas" className="animacao-pulso" />
          </div>
        </section>

        <section className="secao-carrossel">
          <h2>Próximos Eventos</h2>
          <Carousel
            items={upcoming}
            emptyMessage="Nenhum evento agendado no momento."
            renderItem={(item) => <FeedCard key={`${item.type}-${item.title}`} item={item} />}
          />
          <Link to="/eventos" className="btn-ver-mais">
            Ver mais
          </Link>
        </section>

        <section className="secao-carrossel">
          <h2>Últimas Notícias</h2>
          <Carousel
            items={latest}
            emptyMessage="Nenhuma notícia publicada ainda."
            renderItem={(item) => <FeedCard key={`${item.type}-${item.title}`} item={item} actionLabel="Continue lendo" />}
          />
          <Link to="/noticias" className="btn-ver-mais">
            Ver todas as notícias
          </Link>
        </section>

        <section className="banner-frase">
          <h2>Nossa Missão</h2>
          <h3>Empoderar meninas e mulheres por meio da tecnologia.</h3>
          <p>
            Para uma menina, o desafio de programar se inicia antes mesmo da tentativa de aprender. Faltam exemplos
            que inspirem e sobram preconceitos e estereótipos que desestimulam e reforçam a ideia de que a tecnologia
            é um campo masculino. Não se trata de falta de interesse ou de habilidade: é preciso rever essas
            narrativas culturais que dizem o que a mulher pode ou não fazer, além de oferecer ferramentas e
            oportunidades para que elas aprendam.
          </p>
        </section>
      </main>
    </>
  )
}
