import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    api.get('/dashboard/summary').then((response) => setSummary(response.data))
  }, [])

  return (
    <>
      <div className="dashboard-header-actions">
        <div className="dashboard-title">
          <h1>Painel Geral de Controle</h1>
        </div>
        <div className="action-buttons-group">
          <Link to="/admin/postagens/novo" className="btn-action">
            + Nova postagem
          </Link>
          <Link to="/admin/membros/novo" className="btn-action">
            + Novo membro
          </Link>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-info">
            <h3>Eventos</h3>
            <p>{summary?.events ?? '—'}</p>
          </div>
          <div className="overview-icon">📅</div>
        </div>
        <div className="overview-card">
          <div className="overview-info">
            <h3>Workshops</h3>
            <p>{summary?.workshops ?? '—'}</p>
          </div>
          <div className="overview-icon">🛠️</div>
        </div>
        <div className="overview-card">
          <div className="overview-info">
            <h3>Minicursos</h3>
            <p>{summary?.shortCourses ?? '—'}</p>
          </div>
          <div className="overview-icon">🎓</div>
        </div>
        <div className="overview-card">
          <div className="overview-info">
            <h3>Membros</h3>
            <p>{summary?.members ?? '—'}</p>
          </div>
          <div className="overview-icon">👥</div>
        </div>
        <div className="overview-card">
          <div className="overview-info">
            <h3>Usuários ADM</h3>
            <p>{summary?.admins ?? '—'}</p>
          </div>
          <div className="overview-icon">👤</div>
        </div>
      </div>
    </>
  )
}
