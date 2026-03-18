import { useEffect, useRef } from "react"

const iterations = [
  { version: "v1", desc: "HTML/CSS site. Static. Portfolio as gallery." },
  { version: "v2", desc: "Added interaction. Better structure. Still linear." },
  { version: "v3", desc: "React. Systems thinking. Portfolio as map." },
  { version: "v∞", desc: "Ongoing. Every project feeds the next." },
]

export default function Iteration() {
  const ref = useRef(null)

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
    <section id="iteration" className="iteration-section" ref={ref}>
      <h2 className="fade-up">Design is an<br /><em style={{ fontStyle: "italic", color: "var(--indigo)" }}>Evolving System</em></h2>
      <p className="fade-up" style={{ transitionDelay: "0.1s" }}>Every project becomes an input for the next.</p>

      <div className="iteration-timeline fade-up" style={{ transitionDelay: "0.2s" }}>
        {iterations.map((it, i) => (
          <div className="iteration-item" key={i}>
            <div className="iteration-dot" />
            <div className="iteration-card">
              <p className="iteration-version">{it.version}</p>
              <p className="iteration-desc">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="fade-up" style={{
        transitionDelay: "0.3s",
        fontSize: 13,
        color: "var(--text-muted)",
        fontStyle: "italic",
        fontFamily: "var(--hand)",
        fontSize: 18
      }}>
        "You're looking at v3 right now."
      </p>
    </section>
  )
}
