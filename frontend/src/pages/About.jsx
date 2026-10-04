export default function About() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-texto" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <h1>Sobre | Meninas de Sistemas</h1>
            <p>Conheça mais sobre nossa história, missão e objetivos</p>
          </div>
        </div>
      </section>

      <main>
        <section className="missao" id="quem-somos">
          <div className="missao-conteudo">
            <h2>Quem Somos?</h2>
            <p>
              O Meninas de Sistemas é um projeto de extensão parceiro do Programa Meninas Digitais, promovido pela
              SBC, que tem como objetivo identificar e combater os motivos que levam as mulheres a evadir do curso de
              Sistemas de Informação, tanto na cidade de Cametá quanto nas cidades de Oeiras e Limoeiro do Ajurú, nas
              quais o curso é ofertado pela UFPA.
            </p>
            <p>
              Acredita-se que esse projeto pode ajudar na diminuição do número de evasão no curso de Sistemas de
              Informação, a partir de ações em escolas públicas da região do Baixo Tocantins que incentivem o
              ingresso de mulheres no curso de Sistemas de Informação e de ações afirmativas com discentes do curso
              (ingressas e egressas).
            </p>
          </div>
          <div className="missao-imagem">
            <img src="/assets/images/icons/LogoMeninasDeSistema.png" alt="Logo Meninas de Sistemas" />
          </div>
        </section>

        <section style={{ padding: '80px 40px', backgroundColor: '#f8f6fc' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#56279b', fontSize: 32, marginBottom: 20 }}>Nossos Objetivos</h2>
            <p style={{ fontSize: 18, color: '#555', maxWidth: 800, margin: '0 auto 50px auto', lineHeight: 1.6 }}>
              Trabalhamos para promover a inclusão e a equidade de gênero na área da computação.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
              <div className="card" style={{ textAlign: 'center', padding: 30 }}>
                <div className="card-corpo">
                  <div style={{ fontSize: 48, marginBottom: 20 }}>🎯</div>
                  <h3 style={{ color: '#56279b' }}>Inclusão Digital</h3>
                  <p style={{ color: '#666' }}>
                    Promover ações pedagógicas e oficinas práticas de tecnologia para jovens e mulheres da comunidade
                    local.
                  </p>
                </div>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: 30 }}>
                <div className="card-corpo">
                  <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
                  <h3 style={{ color: '#56279b' }}>Empoderamento</h3>
                  <p style={{ color: '#666' }}>
                    Incentivar e apoiar a permanência de alunas no curso de Sistemas de Informação da UFPA.
                  </p>
                </div>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: 30 }}>
                <div className="card-corpo">
                  <div style={{ fontSize: 48, marginBottom: 20 }}>💡</div>
                  <h3 style={{ color: '#56279b' }}>Inovação</h3>
                  <p style={{ color: '#666' }}>
                    Desenvolver projetos tecnológicos com impacto social positivo nas cidades atendidas pelo projeto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="banner-frase">
          <h2>Nossa Missão</h2>
          <h3>Empoderar meninas e mulheres por meio da tecnologia.</h3>
          <p>
            Para uma menina, o desafio de programar se inicia antes mesmo da tentativa de aprender. Faltam exemplos
            que inspirem e sobram preconceitos e estereótipos que desestimulam e reforçam a ideia de que a tecnologia
            é um campo masculino. Não se trata de falta de interesse ou de habilidade, acreditamos que é preciso
            rever essas narrativas culturais que dizem o que a mulher pode ou não fazer, além de oferecer
            ferramentas e oportunidades para que elas aprendam.
          </p>
        </section>
      </main>
    </>
  )
}
