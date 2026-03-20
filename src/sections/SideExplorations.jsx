import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const explorations = [
  { title: "Screen Printing",      subtitle: "Halftones & process", icon: "🖨️" },
  { title: "3D Modelling",         subtitle: "Form & space",        icon: "🧊" },
  { title: "Digital Illustration", subtitle: "Editorial work",      icon: "✏️" },
  { title: "Material Experiments", subtitle: "Tactile design",      icon: "🧪" },
]

export default function SideExplorations() {
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="explorations" className="explorations" ref={ref}>
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
            onClick={() => navigate("/explorations")}
          >
            <div className="card-preview">{exp.icon}</div>
            <div className="card-info">
              <p className="card-title">{exp.title}</p>
              <p className="card-subtitle">{exp.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}