import { useEffect } from 'react'
import type { PageId } from '../templates/types'

export function useRouteSection(page: PageId) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(page)
      if (section) section.scrollIntoView?.({ block: 'start', behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [page])
}
