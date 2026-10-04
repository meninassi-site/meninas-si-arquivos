import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/client'
import { ExternalLinkIcon, LinkedinIcon, MailIcon } from '../../components/icons'

const FALLBACK_PHOTO = '/assets/images/icons/pessoa.png'

export default function MembersList() {
  const [members, setMembers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/members').then((response) => setMembers(response.data))
  }, [])

  return (
    <>
      <section className="hero-noticias">
        <h1 style={{ color: '#ffffff' }}>Membros | Meninas de Sistemas</h1>
      </section>

      <main style={{ padding: '40px 20px' }}>
        <section className="missao-membros" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="missao-conteudo" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ color: '#56279b', fontSize: '1.8rem' }}>Conheça nossa equipe</h2>
            <p className="subtitulo" style={{ color: '#666', fontSize: '1rem', marginTop: 8 }}>
              Aqui estão as pessoas que tornam o projeto possível — coordenação, facilitadoras, desenvolvedoras e
              design.
            </p>
          </div>

          <div className="grid-membros">
            {members.map((member) => (
              <div
                className="card-membro"
                key={member.id_member}
                onClick={() => navigate(`/membros/${member.id_member}`)}
              >
                <img
                  src={member.photo_url || FALLBACK_PHOTO}
                  alt={member.name}
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_PHOTO
                  }}
                />
                <div className="card-corpo">
                  {member.class_name && <span className="tag-funcao">{member.class_name}</span>}
                  <h3>{member.name}</h3>
                  {member.biography && <p>{member.biography}</p>}
                  <div className="membro-redes" onClick={(event) => event.stopPropagation()}>
                    {member.contact_email && (
                      <a href={`mailto:${member.contact_email}`} className="icone-rede email" aria-label="E-mail">
                        <MailIcon />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="icone-rede linkedin" aria-label="LinkedIn">
                        <LinkedinIcon />
                      </a>
                    )}
                    {member.lattes && (
                      <a href={member.lattes} target="_blank" rel="noreferrer" className="icone-rede lattes" aria-label="Currículo Lattes">
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
