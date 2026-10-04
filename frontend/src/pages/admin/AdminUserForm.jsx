import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, getApiErrorMessage } from '../../api/client'

export default function AdminUserForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await api.post('/auth/register-admin', form)
      setSuccess(true)
      setForm({ username: '', email: '', password: '' })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível criar o administrador.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="editor-layout" onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
      <div className="editor-fields-column">
        <h2 className="editor-title">Cadastrar Administrador</h2>

        <div className="editor-group">
          <label className="member-field-label" htmlFor="username">
            USUÁRIO
          </label>
          <input id="username" className="editor-input" value={form.username} onChange={updateField('username')} required />
        </div>

        <div className="editor-group">
          <label className="member-field-label" htmlFor="email">
            E-MAIL
          </label>
          <input
            id="email"
            type="email"
            className="editor-input"
            value={form.email}
            onChange={updateField('email')}
            required
          />
        </div>

        <div className="editor-group">
          <label className="member-field-label" htmlFor="password">
            SENHA
          </label>
          <input
            id="password"
            type="password"
            className="editor-input"
            value={form.password}
            onChange={updateField('password')}
            minLength={6}
            required
          />
        </div>

        {error && <p style={{ color: '#d92c38' }}>{error}</p>}
        {success && <p style={{ color: '#3fa34d' }}>Administrador criado com sucesso.</p>}

        <div className="editor-buttons">
          <button type="submit" className="btn-editor btn-salvar" disabled={submitting}>
            {submitting ? 'Salvando…' : 'Salvar'}
          </button>
          <button type="button" className="btn-editor" onClick={() => navigate('/admin')}>
            Voltar
          </button>
        </div>
      </div>
    </form>
  )
}
