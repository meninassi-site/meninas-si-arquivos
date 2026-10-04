import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createActivity, deleteActivity, getActivity, updateActivity } from '../../../api/activities'
import { getApiErrorMessage } from '../../../api/client'
import { typeLabels } from '../../../utils/format'

const emptyForm = {
  title: '',
  event_description: '',
  lecturer: '', // mapped to `organizer` (evento) or `lacturer` (workshop/minicurso) on submit
  location: '',
  lenght_time: '',
  registration_link: '',
  data_occurence: '',
  time_occurence: '',
}

const LECTURER_LABEL = {
  evento: 'Organizador',
  workshop: 'Ministrante',
  minicurso: 'Ministrante',
}

export default function PostForm() {
  const { type: typeParam, id } = useParams()
  const isEditing = Boolean(typeParam && id)
  const navigate = useNavigate()

  const [type, setType] = useState(typeParam ?? 'evento')
  const [form, setForm] = useState(emptyForm)
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isEditing) return
    getActivity(typeParam, id).then((response) => {
      const item = response.data
      setForm({
        title: item.title ?? '',
        event_description: item.event_description ?? '',
        lecturer: item.organizer ?? item.lacturer ?? '',
        location: item.location ?? '',
        lenght_time: item.lenght_time ?? '',
        registration_link: item.registration_link ?? '',
        data_occurence: item.data_occurence ?? '',
        time_occurence: item.time_occurence ?? '',
      })
      setCoverPreview(item.cover_photo_url)
    })
  }, [typeParam, id, isEditing])

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  function handleCoverChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('event_description', form.event_description)
    formData.append(type === 'evento' ? 'organizer' : 'lacturer', form.lecturer)
    formData.append('location', form.location)
    formData.append('lenght_time', form.lenght_time)
    formData.append('registration_link', form.registration_link)
    formData.append('data_occurence', form.data_occurence)
    formData.append('time_occurence', form.time_occurence)
    if (coverFile) formData.append('cover_photo', coverFile)

    try {
      if (isEditing) {
        await updateActivity(typeParam, id, formData)
      } else {
        await createActivity(type, formData)
      }
      navigate('/admin/postagens')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível salvar a postagem.'))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!isEditing) return
    if (!window.confirm(`Excluir "${form.title}"? Essa ação não pode ser desfeita.`)) return
    try {
      await deleteActivity(typeParam, id)
      navigate('/admin/postagens')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível excluir.'))
    }
  }

  return (
    <form className="editor-layout" onSubmit={handleSubmit}>
      <div className="editor-fields-column">
        <h2 className="editor-title">{isEditing ? `Editar ${typeLabels[typeParam]}` : 'Nova Postagem'}</h2>

        {!isEditing && (
          <div className="editor-group post-type-group">
            <span className="post-type-label">Tipo de Postagem</span>
            {Object.entries(typeLabels).map(([value, label]) => (
              <label className="radio-option" key={value}>
                <input
                  type="radio"
                  name="tipo"
                  value={value}
                  checked={type === value}
                  onChange={() => setType(value)}
                />
                {label}
              </label>
            ))}
          </div>
        )}

        <div className="editor-group">
          <input
            className="editor-input"
            placeholder="Título"
            value={form.title}
            onChange={updateField('title')}
            required
          />
        </div>

        <div className="editor-group">
          <input
            className="editor-input"
            placeholder={LECTURER_LABEL[type]}
            value={form.lecturer}
            onChange={updateField('lecturer')}
          />
        </div>

        <div className="editor-group">
          <input
            className="editor-input"
            placeholder="Local"
            value={form.location}
            onChange={updateField('location')}
          />
        </div>

        <div className="editor-group" style={{ display: 'flex', gap: 16 }}>
          <input
            className="editor-input"
            type="number"
            min="0"
            placeholder="Carga horária (h)"
            value={form.lenght_time}
            onChange={updateField('lenght_time')}
          />
        </div>

        <div className="editor-group" style={{ display: 'flex', gap: 16 }}>
          <input className="editor-input" type="date" value={form.data_occurence} onChange={updateField('data_occurence')} />
          <input className="editor-input" type="time" value={form.time_occurence} onChange={updateField('time_occurence')} />
        </div>

        <div className="editor-group">
          <input
            className="editor-input"
            type="url"
            placeholder="Link de inscrição"
            value={form.registration_link}
            onChange={updateField('registration_link')}
          />
        </div>

        <div className="editor-group">
          <textarea
            className="editor-textarea"
            placeholder="Descrição"
            value={form.event_description}
            onChange={updateField('event_description')}
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
        <h2 className="editor-title image-title">Imagem</h2>

        <label className="image-upload-box" htmlFor="cover-input" style={{ cursor: 'pointer' }}>
          <input id="cover-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverChange} />

          {coverPreview ? (
            <img src={coverPreview} alt="Pré-visualização" className="preview-img" />
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
