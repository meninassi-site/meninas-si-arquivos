import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, getApiErrorMessage } from '../../../api/client'

const emptyForm = {
  name: '',
  biography: '',
  contact_email: '',
  class_name: '',
  lattes: '',
  linkedin: '',
}

export default function MemberForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isEditing) return
    api.get(`/members/${id}`).then((response) => {
      const member = response.data
      setForm({
        name: member.name ?? '',
        biography: member.biography ?? '',
        contact_email: member.contact_email ?? '',
        class_name: member.class_name ?? '',
        lattes: member.lattes ?? '',
        linkedin: member.linkedin ?? '',
      })
      setPhotoPreview(member.photo_url)
    })
  }, [id, isEditing])

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (photoFile) formData.append('photo', photoFile)

    try {
      if (isEditing) {
        await api.put(`/members/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/members', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      navigate('/admin/membros')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível salvar o membro.'))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!isEditing) return
    if (!window.confirm('Excluir este membro? Essa ação não pode ser desfeita.')) return
    try {
      await api.delete(`/members/${id}`)
      navigate('/admin/membros')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível excluir o membro.'))
    }
  }

  return (
    <form className="editor-layout" onSubmit={handleSubmit}>
      <div className="editor-fields-column">
        <h2 className="editor-title">{isEditing ? 'Editar Membro' : 'Adicionar Membro'}</h2>

        <div className="editor-group">
          <label htmlFor="name" className="member-field-label">
            NOME
          </label>
          <input id="name" className="editor-input" value={form.name} onChange={updateField('name')} required />
        </div>

        <div className="editor-group">
          <label htmlFor="class_name" className="member-field-label">
            TURMA / FUNÇÃO
          </label>
          <input
            id="class_name"
            className="editor-input"
            placeholder="Ex: Coordenação & Pesquisa"
            value={form.class_name}
            onChange={updateField('class_name')}
          />
        </div>

        <div className="editor-group">
          <label htmlFor="contact_email" className="member-field-label">
            E-MAIL DE CONTATO
          </label>
          <input
            id="contact_email"
            type="email"
            className="editor-input"
            value={form.contact_email}
            onChange={updateField('contact_email')}
          />
        </div>

        <div className="editor-group">
          <label htmlFor="lattes" className="member-field-label">
            CURRÍCULO LATTES (URL)
          </label>
          <input id="lattes" type="url" className="editor-input" value={form.lattes} onChange={updateField('lattes')} />
        </div>

        <div className="editor-group">
          <label htmlFor="linkedin" className="member-field-label">
            LINKEDIN (URL)
          </label>
          <input id="linkedin" type="url" className="editor-input" value={form.linkedin} onChange={updateField('linkedin')} />
        </div>

        <div className="editor-group">
          <label htmlFor="biography" className="member-field-label">
            MINIBIOGRAFIA
          </label>
          <textarea
            id="biography"
            className="editor-textarea"
            placeholder="Máximo 500 caracteres"
            value={form.biography}
            onChange={updateField('biography')}
          />
        </div>

        {error && <p style={{ color: '#d92c38' }}>{error}</p>}

        <div className="editor-buttons">
          <button type="submit" className="btn-editor btn-salvar" disabled={submitting}>
            {submitting ? 'Salvando…' : 'Salvar'}
          </button>
          {isEditing && (
            <button type="button" className="btn-editor btn-excluir" onClick={handleDelete}>
              Excluir
            </button>
          )}
        </div>
      </div>

      <div className="editor-image-column">
        <h2 className="editor-title image-title">Foto de Perfil</h2>

        <label className="image-upload-box" htmlFor="photo-input" style={{ cursor: 'pointer' }}>
          <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />

          {photoPreview ? (
            <img src={photoPreview} alt="Pré-visualização" className="preview-img" />
          ) : (
            <div className="upload-placeholder">
              <svg className="placeholder-icon" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          )}
        </label>
      </div>
    </form>
  )
}
