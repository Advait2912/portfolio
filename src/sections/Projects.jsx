import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const projects = [
  { id: "meta-counsel",  title: "Meta Counsel Campaign",   subtitle: "Service Design · Strategy",   icon: "⚖️" },
  { id: "emotion-ai",   title: "Emotion AI App",           subtitle: "Experience Design · AI",       icon: "🧠" },
  { id: "sleep-system", title: "Sleep Experience System",  subtitle: "Systems Thinking · Research",  icon: "🌙" },
  { id: null,           title: "Coming Soon",              subtitle: "In Progress",                  icon: "✦", placeholder: true },
]

export default function Projects() {
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
    <section id="projects" className="explorations" ref={ref}>

      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-label fade-up">Work</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,4vw,52px)", fontWeight: 400, marginTop: 12, transitionDelay: "0.1s" }}>
          Projects
        </h2>
        <p className="fade-up" style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 300, marginTop: 12, transitionDelay: "0.15s" }}>
          Click any project to explore the full case study.
        </p>
      </div>

      <div className="explorations-grid">
        {projects.map((p, i) => (
          <div
            key={i}
            className="exploration-card fade-up"
            style={{ transitionDelay: `${0.1 + i * 0.07}s`, cursor: p.placeholder ? "default" : "pointer" }}
            onClick={() => p.id && navigate(`/case-study/${p.id}`)}
          >
            <div className="card-preview" style={{ fontSize: p.placeholder ? "22px" : "44px", opacity: p.placeholder ? 0.3 : 1 }}>
              {p.icon}
            </div>
            <div className="card-info">
              <p className="card-title">{p.title}</p>
              <p className="card-subtitle">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}