import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api/client'

const FALLBACK_PHOTO = '/assets/images/icons/pessoa.png'

export default function MemberDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [member, setMember] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setMember(null)
    setNotFound(false)
    api
      .get(`/members/${id}`)
      .then((response) => setMember(response.data))
      .catch(() => setNotFound(true))
  }, [id])

  if (notFound) {
    return (
      <main style={{ padding: 60, textAlign: 'center' }}>
        <p>Membro não encontrado.</p>
        <Link to="/membros">&lsaquo; Voltar para Membros</Link>
      </main>
    )
  }

  if (!member) return null

  return (
    <>
      <section className="hero" style={{ padding: '40px 20px' }}>
        <div className="hero-container">
          <div className="hero-texto" style={{ textAlign: 'center' }}>
            <h1>Perfil do Membro</h1>
            <p>Conheça mais sobre a coordenação e integrantes do nosso projeto.</p>
          </div>
        </div>
      </section>

      <main style={{ backgroundColor: '#f8f6fc', padding: '20px 0', overflow: 'hidden' }}>
        <div className="perfil-container">
          <div className="perfil-esquerda">
            <img
              src={member.photo_url || FALLBACK_PHOTO}
              alt={`Foto de ${member.name}`}
              className="perfil-foto"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_PHOTO
              }}
            />
            <h2>{member.name}</h2>
            {member.class_name && <p className="bio">{member.class_name}</p>}
          </div>

          <div className="perfil-direita">
            {member.biography && (
              <div className="secao-info">
                <h3>Sobre</h3>
                <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6 }}>{member.biography}</p>
              </div>
            )}

            {(member.contact_email || member.linkedin || member.lattes) && (
              <div className="secao-info">
                <h3>Contato e Redes</h3>
                {member.contact_email && (
                  <a href={`mailto:${member.contact_email}`} className="info-link">
                    📧 {member.contact_email}
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="info-link">
                    💼 LinkedIn
                  </a>
                )}
                {member.lattes && (
                  <a href={member.lattes} target="_blank" rel="noreferrer" className="info-link">
                    📄 Currículo Lattes
                  </a>
                )}
              </div>
            )}

            <button type="button" className="btn-voltar" onClick={() => navigate(-1)}>
              ← Voltar para Membros
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
