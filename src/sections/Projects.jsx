import { useRef, useEffect, useState } from "react"

const projects = [
  {
    id: 1, title: "Meta Counsel Campaign", x: "22%", y: "30%",
    tags: ["Service Design", "Strategy"],
    desc: "A service design campaign reimagining legal counsel accessibility for independent creators navigating platform policies.",
    problem: "Independent creators on Meta platforms faced confusing, inaccessible legal guidelines with no clear support pathways.",
    skills: ["Research", "Systems Mapping", "Content Strategy", "UX Design"],
    outcome: "A tiered support system concept reducing time-to-resolution for creator disputes."
  },
  {
    id: 2, title: "Emotion AI App", x: "65%", y: "22%",
    tags: ["Experience Design", "AI"],
    desc: "An emotional intelligence interface that helps users understand and navigate their emotional patterns through AI-assisted reflection.",
    problem: "People struggle to identify emotional patterns that affect their decision-making and relationships.",
    skills: ["Psychology", "UX Design", "Behavioural Science", "Prototyping"],
    outcome: "A conversational journal concept with emotion mapping and pattern recognition features."
  },
  {
    id: 3, title: "Sleep Experience System", x: "42%", y: "68%",
    tags: ["Systems Thinking", "Research"],
    desc: "A holistic system redesign of the sleep experience, addressing environmental, behavioural, and social factors.",
    problem: "Existing sleep products solve isolated problems without addressing the interconnected system of sleep health.",
    skills: ["Service Design", "Research", "Systems Thinking", "Interaction Design"],
    outcome: "A service ecosystem spanning environment design, behavioural nudges, and social accountability."
  },
]

const skills = [
  { label: "Psychology", x: "12%", y: "52%" },
  { label: "UX Design", x: "78%", y: "48%" },
  { label: "Research", x: "50%", y: "88%" },
  { label: "Strategy", x: "28%", y: "12%" },
  { label: "Systems", x: "72%", y: "72%" },
]

export default function Projects() {
  const ref = useRef(null)
  const fieldRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)

    const sizeObs = new ResizeObserver(entries => {
      const r = entries[0].contentRect
      setSize({ w: r.width, h: r.height })
    })
    if (fieldRef.current) sizeObs.observe(fieldRef.current)
    return () => { obs.disconnect(); sizeObs.disconnect() }
  }, [])

  const pct = (v, total) => parseFloat(v) / 100 * total

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="projects-header">
        <h2 className="fade-up">Projects</h2>
        <p className="fade-up" style={{ transitionDelay: "0.1s" }}>Projects as nodes — hover to explore connections, click to go deeper</p>
      </div>

      <div className="project-field" ref={fieldRef}>
        <svg>
          {projects.map((p) =>
            skills.map((s, si) => {
              const px = pct(p.x, size.w), py = pct(p.y, size.h)
              const sx = pct(s.x, size.w), sy = pct(s.y, size.h)
              return (
                <line
                  key={`${p.id}-${si}`}
                  x1={px} y1={py} x2={sx} y2={sy}
                  stroke="#8FA7A3"
                  strokeWidth="0.8"
                  opacity={activeProject === p.id ? "0.4" : "0.12"}
                  strokeDasharray="3 4"
                  style={{ transition: "opacity 0.4s" }}
                />
              )
            })
          )}
        </svg>

        {skills.map((s, i) => (
          <div key={i} className="skill-node" style={{ left: s.x, top: s.y }}>
            <span className="skill-pill">{s.label}</span>
          </div>
        ))}

        {projects.map((p) => (
          <div
            key={p.id}
            className="project-node"
            style={{ left: p.x, top: p.y }}
            onMouseEnter={() => setActiveProject(p.id)}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
          >
            <div className="project-node-inner">
              <p className="project-node-title">{p.title}</p>
              <div className="project-node-tags">
                {p.tags.map((t, i) => <span key={i} className="project-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side panel */}
      <div className={`project-panel ${activeProject ? "open" : ""}`}>
        {activeProject && (() => {
          const p = projects.find(p => p.id === activeProject)
          return p ? (
            <>
              <button className="panel-close" onClick={() => setActiveProject(null)}>×</button>
              <p className="panel-eyebrow">System Intervention</p>
              <h3 className="panel-title">{p.title}</h3>
              <p className="panel-desc">{p.desc}</p>
              <div>
                <p className="panel-section-label">Problem Context</p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", fontWeight: 300 }}>{p.problem}</p>
              </div>
              <div>
                <p className="panel-section-label">Skills Applied</p>
                <div className="panel-tags">
                  {p.skills.map((s, i) => <span key={i} className={`panel-tag ${i === 0 ? "highlight" : ""}`}>{s}</span>)}
                </div>
              </div>
              <div>
                <p className="panel-section-label">Outcome</p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", fontWeight: 300 }}>{p.outcome}</p>
              </div>
            </>
          ) : null
        })()}
      </div>
    </section>
  )
}
