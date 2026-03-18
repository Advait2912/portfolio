import { useEffect, useState } from "react"

const SECTIONS = [
  { id: "hero", label: "System Intro" },
  { id: "split-mind", label: "Split Mind" },
  { id: "system-inputs", label: "Influences" },
  { id: "projects", label: "Projects" },
  { id: "case-study", label: "Case Study" },
  { id: "explorations", label: "Explorations" },
  { id: "overwhelm", label: "Overwhelm" },
  { id: "iteration", label: "Iteration" },
  { id: "contact", label: "Contact" },
]

export default function MiniMap() {
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.4 })
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="mini-map" aria-label="Page navigation">
      {SECTIONS.map(s => (
        <div
          key={s.id}
          className={`mm-dot ${active === s.id ? "active" : ""}`}
          onClick={() => scrollTo(s.id)}
          title={s.label}
        >
          <span className="mm-label">{s.label}</span>
        </div>
      ))}
    </nav>
  )
}
