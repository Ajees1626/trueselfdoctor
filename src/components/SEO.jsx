// cspell:ignore Trueself trueself logotop jsonld
import { useEffect } from 'react'

const SITE_URL = 'https://trueselfcounsellingservices.com'
const DEFAULT_IMAGE =
  'https://res.cloudinary.com/dagsqokgc/image/upload/q_auto/f_auto/v1777182274/IMG_6011.JPG_result_zdkoaz.webp'
const DEFAULT_FAVICON = '/logotop.webp'

function setMeta(attr, key, content) {
  if (content == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function setLink(rel, href, extraAttrs = {}) {
  if (!href) return
  const selector = `link[rel="${rel}"]${
    extraAttrs.hreflang ? `[hreflang="${extraAttrs.hreflang}"]` : ''
  }`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v))
}

function setJsonLd(id, data) {
  if (!data) return
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * SEO - lightweight, dependency-free, per-page meta updater.
 *
 * Props:
 * - title:        Full <title> for the page
 * - description:  Meta description (150-160 chars ideal)
 * - keywords:     Comma-separated keywords
 * - path:         Path for canonical / og:url (e.g. "/services")
 * - image:        Absolute URL of share image
 * - type:         og:type ("website" | "article" | "profile" ...)
 * - jsonLd:       Object or array of JSON-LD structured data
 * - noIndex:      If true, robots = noindex,nofollow
 */
export default function SEO({
  title,
  description,
  keywords,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  noIndex = false,
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
    const fullTitle = title || 'TRUESELF COUNSELLING | Online Psychotherapy in India'

    document.title = fullTitle

    // Keep favicons stable across client-side navigation (SPA).
    setLink('icon', DEFAULT_FAVICON)
    setLink('shortcut icon', DEFAULT_FAVICON)
    setLink('apple-touch-icon', DEFAULT_FAVICON)

    setMeta('name', 'title', fullTitle)
    if (description) setMeta('name', 'description', description)
    if (keywords) setMeta('name', 'keywords', keywords)
    setMeta(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    )

    setLink('canonical', url)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:title', fullTitle)
    if (description) setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:site_name', 'TRUESELF COUNSELLING')
    setMeta('property', 'og:locale', 'en_IN')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    if (description) setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:url', url)

    if (jsonLd) {
      const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      data.forEach((d, idx) => setJsonLd(`page-jsonld-${idx}`, d))

      return () => {
        data.forEach((_, idx) => {
          const el = document.getElementById(`page-jsonld-${idx}`)
          if (el) el.remove()
        })
      }
    }
  }, [title, description, keywords, path, image, type, jsonLd, noIndex])

  return null
}

export { SITE_URL, DEFAULT_IMAGE }
