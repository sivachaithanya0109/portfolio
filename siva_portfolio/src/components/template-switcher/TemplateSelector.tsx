import { useEffect, useRef } from 'react'
import { LayoutTemplate, Check } from 'lucide-react'
import type { TemplateDefinition, TemplateId } from '../../templates/types'

type Props = {
  templates: readonly TemplateDefinition[]
  selected: TemplateId
  onSelect: (id: TemplateId) => void
  className?: string
}

export function TemplateSelector({ templates, selected, onSelect, className = '' }: Props) {
  const menuRef = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const closeIfOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) menuRef.current?.removeAttribute('open')
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') menuRef.current?.removeAttribute('open')
    }
    document.addEventListener('pointerdown', closeIfOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeIfOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])
  return <details ref={menuRef} className={`template-menu ${className}`}>
    <summary aria-label="Choose portfolio template" title="Choose template"><LayoutTemplate size={17} /></summary>
    <div className="template-menu-panel" role="group" aria-label="Portfolio templates">
      <p className="template-menu-heading">Choose a look</p>
      {templates.map((template) => <button type="button" key={template.id} className={`template-option ${selected === template.id ? 'is-selected' : ''}`} aria-pressed={selected === template.id} onClick={(event) => { onSelect(template.id); const details = event.currentTarget.closest('details'); if (details) details.open = false }}>
        <img src={template.previewImage} alt="" />
        <span className="template-option-copy"><strong>{template.name}</strong><small>{template.description}</small></span>
        {selected === template.id && <Check size={16} className="template-option-check" />}
      </button>)}
    </div>
  </details>
}
