import { api } from './client'

const BASE_PATH_BY_TYPE = {
  evento: 'events',
  workshop: 'workshops',
  minicurso: 'short-courses',
}

export function basePathForType(type) {
  const base = BASE_PATH_BY_TYPE[type]
  if (!base) throw new Error(`Tipo de postagem desconhecido: ${type}`)
  return base
}

export function getActivity(type, id) {
  return api.get(`/${basePathForType(type)}/${id}`)
}

export function createActivity(type, formData) {
  return api.post(`/${basePathForType(type)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function updateActivity(type, id, formData) {
  return api.put(`/${basePathForType(type)}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function deleteActivity(type, id) {
  return api.delete(`/${basePathForType(type)}/${id}`)
}
