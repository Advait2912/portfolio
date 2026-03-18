import { useEffect, useRef } from "react"

const steps = [
  { name: "Observe", desc: "Immerse in context. Watch how people actually behave, not how they say they do." },
  { name: "Understand", desc: "Synthesise patterns. Find the hidden structures beneath surface-level problems." },
  { name: "Map", desc: "Visualise the system. Make invisible relationships visible and navigable." },
  { name: "Design", desc: "Intervene with intention. Create solutions that work within existing systems." },
  { name: "Improve", desc: "Iterate with evidence. Every project feeds the next cycle of learning." },
]

const chaosNotes = [
  { text: "patterns everywhere →", top: "12%", left: "8%", rotate: "-3deg", cls: "" },
  { text: "what if the system changed?", top: "28%", left: "55%", rotate: "2deg", cls: "terracotta" },
  { text: "user said one thing, did another", top: "44%", left: "12%", rotate: "-1.5deg", cls: "" },
  { text: "the brief was wrong ↓", top: "58%", left: "48%", rotate: "3deg", cls: "indigo" },
  { text: "failure = data", top: "70%", left: "18%", rotate: "-2deg", cls: "terracotta" },
  { text: "start over?", top: "82%", left: "60%", rotate: "1.5deg", cls: "" },
]

export default function SplitMind() {
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
    <section id="split-mind" className="split-mind" ref={ref}>
      {/* LEFT — LOGIC */}
      <div className="logic-side">
        <div>
          <p className="section-label fade-up">Logic</p>
          <h2 className="logic-title fade-up" style={{ transitionDelay: "0.1s" }}>How I Approach<br />Design</h2>
        </div>
        <div className="process-steps fade-up" style={{ transitionDelay: "0.2s" }}>
          {steps.map((step, i) => (
            <div className="process-step" key={i}>
              <span className="step-num">0{i + 1}</span>
              <div className="step-content">
                <p className="step-name">{step.name}</p>
                <p className="step-desc">{step.desc}</p>
              </div>
              <span className="step-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — CHAOS */}
      <div className="chaos-side">
        <p className="section-label fade-up">Chaos</p>
        <h2 className="chaos-title fade-up" style={{ transitionDelay: "0.1s" }}>The Thinking<br />Underneath</h2>

        {chaosNotes.map((note, i) => (
          <p
            key={i}
            className={`chaos-note ${note.cls}`}
            style={{
              top: note.top,
              left: note.left,
              transform: `rotate(${note.rotate})`,
              transitionDelay: `${0.1 * i}s`
            }}
          >
            {note.text}
          </p>
        ))}

        {/* Sketchy arrows */}
        <p className="chaos-arrow" style={{ top: "22%", left: "40%", transform: "rotate(45deg)" }}>↗</p>
        <p className="chaos-arrow" style={{ top: "50%", left: "70%", transform: "rotate(-20deg)" }}>↙</p>
        <p className="chaos-arrow" style={{ top: "75%", left: "35%", transform: "rotate(10deg)" }}>→</p>

        {/* Sketch shapes */}
        <div className="chaos-sketch" style={{ top: "35%", left: "30%", width: 60, height: 60, borderRadius: "50%" }} />
        <div className="chaos-sketch" style={{ top: "60%", left: "55%", width: 80, height: 40, transform: "rotate(-5deg)" }} />
      </div>
    </section>
  )
}
