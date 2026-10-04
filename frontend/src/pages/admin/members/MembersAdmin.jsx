import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, getApiErrorMessage } from '../../../api/client'

export default function MembersAdmin() {
  const [members, setMembers] = useState([])
  const [error, setError] = useState(null)

  function reload() {
    api.get('/members').then((response) => setMembers(response.data))
  }

  useEffect(reload, [])

  async function handleDelete(member) {
    if (!window.confirm(`Excluir o membro "${member.name}"? Essa ação não pode ser desfeita.`)) return
    try {
      await api.delete(`/members/${member.id_member}`)
      reload()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível excluir o membro.'))
    }
  }

  return (
    <>
      <h2 className="members-page-title">Gerenciar Membros</h2>

      {error && <p style={{ color: '#d92c38' }}>{error}</p>}

      <div className="members-list">
        {members.map((member) => (
          <div className="member-card" key={member.id_member}>
            <div className="member-avatar">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              )}
            </div>
            <div className="member-col">
              <span className="member-label">NOME</span>
              <span className="member-value">{member.name}</span>
            </div>
            <div className="member-col">
              <span className="member-label">TURMA / FUNÇÃO</span>
              <span className="member-value">{member.class_name || '—'}</span>
            </div>
            <div className="member-col">
              <span className="member-label">EMAIL</span>
              <span className="member-value">{member.contact_email || '—'}</span>
            </div>
            <Link to={`/admin/membros/${member.id_member}/editar`} className="btn-action" style={{ marginRight: 8 }}>
              Editar
            </Link>
            <button type="button" className="btn-editor btn-excluir" onClick={() => handleDelete(member)}>
              Excluir
            </button>
          </div>
        ))}
      </div>

      <div className="add-member-action">
        <Link to="/admin/membros/novo" className="btn-add-post">
          <span>+</span> Adicionar Membro
        </Link>
      </div>
    </>
  )
}
