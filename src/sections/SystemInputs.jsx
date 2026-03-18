import { useRef, useEffect, useState } from "react"

const influences = [
  { label: "Psychology", x: "50%", y: "8%", desc: "Understanding emotional patterns helps design systems people actually use." },
  { label: "Visual Design", x: "10%", y: "42%", desc: "Aesthetics aren't decoration — they shape how people understand and trust a system." },
  { label: "Systems Thinking", x: "85%", y: "42%", desc: "Everything connects. Changing one part changes everything." },
  { label: "Behavioural Science", x: "18%", y: "82%", desc: "People are irrational in predictable ways. Design for who they are, not who we wish they were." },
  { label: "Service Design", x: "78%", y: "82%", desc: "Experiences are systems. Every touchpoint is part of a larger journey." },
  { label: "Research", x: "50%", y: "72%", desc: "Assumptions are the enemy. Evidence is the foundation." },
]

const CENTER = { x: "50%", y: "46%" }

export default function SystemInputs() {
  const ref = useRef(null)
  const svgRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

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
    if (ref.current) sizeObs.observe(ref.current)

    return () => { obs.disconnect(); sizeObs.disconnect() }
  }, [])

  const pct = (v, total) => parseFloat(v) / 100 * total

  const cx = pct(CENTER.x, size.w)
  const cy = pct(CENTER.y, size.h)

  return (
    <section id="system-inputs" className="system-inputs" ref={ref}>
      <div className="section-header">
        <h2 className="fade-up">What Shapes<br />My Thinking</h2>
        <p className="fade-up" style={{ transitionDelay: "0.1s" }}>The disciplines that inform how I design</p>
      </div>

      <div className="constellation" style={{ height: 480 }} ref={svgRef}>
        <svg>
          {influences.map((inf, i) => {
            const ix = pct(inf.x, size.w)
            const iy = pct(inf.y, size.h)
            return (
              <line
                key={i}
                x1={cx} y1={cy}
                x2={ix} y2={iy}
                stroke="#8FA7A3"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="4 4"
              />
            )
          })}
        </svg>

        {/* Center node */}
        <div className="constellation-node center fade-up" style={{ left: CENTER.x, top: CENTER.y }}>
          <div className="node-pill">Aarushi</div>
        </div>

        {/* Influence nodes */}
        {influences.map((inf, i) => (
          <div
            key={i}
            className="constellation-node fade-up"
            style={{ left: inf.x, top: inf.y, transitionDelay: `${0.1 + i * 0.05}s` }}
          >
            <div className="node-pill">{inf.label}</div>
            <div className="node-card">
              <strong>{inf.label}</strong>
              {inf.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
