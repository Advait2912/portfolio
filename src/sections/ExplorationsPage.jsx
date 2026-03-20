import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const explorations = [
  { title: "Screen Printing", subtitle: "Halftones & process", icon: "🖨️", emoji: ["🔴", "🟡", "🔵", "⬛"], desc: "Exploring layered colour separation and halftone patterns through hand-pulled prints." },
  { title: "3D Modelling", subtitle: "Form & space", icon: "🧊", emoji: ["🎯", "🔷", "🔶", "💎"], desc: "Experimenting with geometric form, materiality, and light in Blender." },
  { title: "Digital Illustration", subtitle: "Editorial work", icon: "✏️", emoji: ["🌿", "🎨", "🖌️", "📐"], desc: "Systems diagrams, editorial illustrations, and visual essays." },
  { title: "Material Experiments", subtitle: "Tactile design", icon: "🧪", emoji: ["🪨", "🌱", "💧", "🔥"], desc: "Exploring how physical materials communicate meaning — paper, texture, weight." },
]

export default function ExplorationsPage() {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [gallery, setGallery] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setGallery(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "lab(92.22% -13.94 -4.11)", paddingTop: "60px", position: "relative", zIndex: 2 }}>
      <section className="explorations" ref={ref}>

        <div className="section-header" style={{ textAlign: "left" }}>
          <p className="section-label fade-up">Beyond the Brief</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,4vw,52px)", fontWeight: 400, marginTop: 12, transitionDelay: "0.1s" }}>
            Side Explorations
          </h2>
          <p className="fade-up" style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 300, marginTop: 12, transitionDelay: "0.15s" }}>
            Design is also play. These are the experiments that feed the work.
          </p>
        </div>

        <div className="explorations-grid">
          {explorations.map((exp, i) => (
            <div
              key={i}
              className="exploration-card fade-up"
              style={{ transitionDelay: `${0.1 + i * 0.07}s` }}
              onClick={() => setGallery(exp)}
            >
              <div className="card-preview">{exp.icon}</div>
              <div className="card-info">
                <p className="card-title">{exp.title}</p>
                <p className="card-subtitle">{exp.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "60px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", border: "1px solid var(--border)",
              borderRadius: "100px", padding: "10px 20px",
              fontSize: "12px", letterSpacing: ".08em",
              color: "var(--text-muted)", cursor: "pointer",
              fontFamily: "var(--sans)", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--indigo)"; e.currentTarget.style.color = "var(--indigo)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)" }}
          >
            ← Back to Portfolio
          </button>
        </div>

        {/* Gallery overlay — same as original */}
        <div className={`gallery-overlay ${gallery ? "open" : ""}`} onClick={() => setGallery(null)}>
          {gallery && (
            <div className="gallery-content" onClick={e => e.stopPropagation()}>
              <button className="gallery-close" onClick={() => setGallery(null)}>×</button>
              <h3>{gallery.title}</h3>
              <p style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 300, lineHeight: 1.7 }}>{gallery.desc}</p>
              <div className="gallery-grid">
                {gallery.emoji.map((e, i) => (
                  <div key={i} className="gallery-img" style={{ transitionDelay: `${i * 0.05}s` }}>
                    <span style={{ fontSize: 40 }}>{e}</span>
                  </div>
                ))}
                <div className="gallery-img" style={{ background: "var(--indigo-light)", borderColor: "rgba(92,106,196,0.2)" }}>
                  <span style={{ fontSize: 12, color: "var(--indigo)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Add images</span>
                </div>
                <div className="gallery-img">
                  <span style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Add images</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </section>
    </div>
  )
}