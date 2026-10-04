import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, getApiErrorMessage } from '../../../api/client'
import { deleteActivity } from '../../../api/activities'
import { formatDateTime, itemId, typeLabels } from '../../../utils/format'

export default function PostsAdmin() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  function reload() {
    api.get('/feed').then((response) => setItems(response.data))
  }

  useEffect(reload, [])

  async function handleDelete(item) {
    if (!window.confirm(`Excluir "${item.title}"? Essa ação não pode ser desfeita.`)) return
    try {
      await deleteActivity(item.type, itemId(item))
      reload()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível excluir.'))
    }
  }

  return (
    <>
      <div className="dashboard-header-actions">
        <div className="dashboard-title">
          <h1>Postagens</h1>
        </div>
        <div className="action-buttons-group">
          <Link to="/admin/postagens/novo" className="btn-action">
            + Nova postagem
          </Link>
        </div>
      </div>

      {error && <p style={{ color: '#d92c38' }}>{error}</p>}

      <div className="members-list">
        {items.map((item) => (
          <div className="member-card" key={`${item.type}-${item.title}`}>
            <div className="member-col">
              <span className="member-label">TIPO</span>
              <span className="member-value">{typeLabels[item.type]}</span>
            </div>
            <div className="member-col">
              <span className="member-label">TÍTULO</span>
              <span className="member-value">{item.title}</span>
            </div>
            <div className="member-col">
              <span className="member-label">DATA</span>
              <span className="member-value">{formatDateTime(item.data_occurence, item.time_occurence) || '—'}</span>
            </div>
            <Link
              to={`/admin/postagens/${item.type}/${itemId(item)}/editar`}
              className="btn-action"
              style={{ marginRight: 8 }}
            >
              Editar
            </Link>
            <button type="button" className="btn-editor btn-excluir" onClick={() => handleDelete(item)}>
              Excluir
            </button>
          </div>
        ))}
        {items.length === 0 && <p>Nenhuma postagem cadastrada ainda.</p>}
      </div>
    </>
  )
}
