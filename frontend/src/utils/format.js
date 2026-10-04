/** "2025-12-01" -> "01/12/2025" */
export function formatDate(dateOnly) {
  if (!dateOnly) return null
  const [year, month, day] = dateOnly.split('-')
  return `${day}/${month}/${year}`
}

/** "11:45" -> "11h45" */
export function formatTime(timeOnly) {
  if (!timeOnly) return null
  const [hour, minute] = timeOnly.split(':')
  return `${hour}h${minute}`
}

/** Combines both the way the static site's cards show them: "01/12/2025 | 11h45" */
export function formatDateTime(dateOnly, timeOnly) {
  return [formatDate(dateOnly), formatTime(timeOnly)].filter(Boolean).join(' | ')
}

export const typeLabels = {
  evento: 'Evento',
  workshop: 'Workshop',
  minicurso: 'Minicurso',
}

export function itemId(item) {
  return item.id_event ?? item.id_workshop ?? item.id_short_course
}

export function itemLecturer(item) {
  return item.organizer ?? item.lacturer ?? null
}
