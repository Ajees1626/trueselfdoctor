// Lightweight shim for `react-helmet` (SPA-friendly).
// Supports:
// - <title>...</title>
// - <link rel="icon|shortcut icon|apple-touch-icon" href="..."/>
// It intentionally implements only what this project uses.

import { Children, isValidElement, useEffect } from 'react'

function upsertTitle(text) {
  if (text == null) return
  const t = String(text)
  if (t) document.title = t
}

function upsertLink(rel, href) {
  if (!rel || !href) return
  const selector = `link[rel="${rel}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Helmet({ children }) {
  useEffect(() => {
    let nextTitle = null
    const nextLinks = []

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return
      if (child.type === 'title') {
        nextTitle = child.props.children
      } else if (child.type === 'link') {
        const rel = child.props.rel
        const href = child.props.href
        if (rel && href) nextLinks.push({ rel, href })
      }
    })

    upsertTitle(nextTitle)
    nextLinks.forEach(({ rel, href }) => upsertLink(rel, href))
  }, [children])

  return null
}

export default Helmet

