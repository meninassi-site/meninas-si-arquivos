/** Mirrors VIIjornada.html's inline share script: native share sheet when
 * available, otherwise copy the link to the clipboard. */
export async function shareOrCopyLink({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return
    } catch {
      // user cancelled the share sheet — fall through silently
      return
    }
  }

  try {
    await navigator.clipboard.writeText(url)
    window.alert('Link copiado para a área de transferência!')
  } catch {
    window.alert(`Copie o link: ${url}`)
  }
}
