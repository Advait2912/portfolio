import { useEffect, useRef, useState } from "react"

const chaosMessages = [
  "urgent brief!", "revise again", "stakeholder feedback",
  "scope creep", "deadline moved", "user testing tomorrow",
  "budget cut", "new requirements", "pivot?", "start over",
  "too complex", "simplify", "but what does the CEO want",
  "research gap", "reframe", "system failure", "iterate!",
]

export default function OverwhelmMode() {
  const ref = useRef(null)
  const [phase, setPhase] = useState("idle") // idle | chaos | resolving | resolved
  const elementsRef = useRef([])
  const timeoutsRef = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    elementsRef.current.forEach(el => el?.remove())
    elementsRef.current = []
  }

  const triggerChaos = () => {
    if (phase !== "idle" && phase !== "resolved") return
    setPhase("chaos")
    clearAll()

    // Spawn chaos elements
    chaosMessages.forEach((msg, i) => {
      const t = setTimeout(() => {
        const el = document.createElement("div")
        el.className = "chaos-el"
        el.textContent = msg
        el.style.left = `${10 + Math.random() * 75}vw`
        el.style.top = `${10 + Math.random() * 75}vh`
        el.style.transform = `rotate(${-15 + Math.random() * 30}deg)`
        el.style.zIndex = 9200
        document.body.appendChild(el)
        elementsRef.current.push(el)
        requestAnimationFrame(() => { el.style.opacity = "1" })
      }, i * 180)
      timeoutsRef.current.push(t)
    })

    // Resolve after 5s
    const resolve = setTimeout(() => {
      setPhase("resolving")
      elementsRef.current.forEach(el => {
        el.style.opacity = "0"
        el.style.transform = "scale(0.8)"
        el.style.transition = "all 0.8s ease"
      })
      const done = setTimeout(() => {
        clearAll()
        setPhase("resolved")
      }, 1000)
      timeoutsRef.current.push(done)
    }, chaosMessages.length * 180 + 2000)
    timeoutsRef.current.push(resolve)
  }

  useEffect(() => () => clearAll(), [])

  return (
    <section id="overwhelm" className="overwhelm-section" ref={ref}>
      <div className="overwhelm-intro">
        <h2 className="fade-up">What Happens<br />Under Pressure?</h2>
        <p className="fade-up" style={{ transitionDelay: "0.1s" }}>
          Design doesn't happen in controlled conditions. It happens in complexity, ambiguity, and noise.
        </p>
      </div>

      {phase !== "resolved" && (
        <button
          className="stress-btn fade-up"
          style={{ transitionDelay: "0.2s", opacity: phase === "chaos" || phase === "resolving" ? 0.3 : 1 }}
          onClick={triggerChaos}
        >
          {phase === "chaos" ? "System overloading..." : phase === "resolving" ? "Reorganising..." : "Stress Test the System →"}
        </button>
      )}

      <div className={`overwhelm-resolution ${phase === "resolved" ? "visible" : ""}`}>
        <p className="resolution-text">
          Designing systems means working<br />within complexity.
        </p>
        <p className="resolution-sub">
          My work focuses on turning chaos into clarity — finding the structures that make complexity navigable for the people who live inside it.
        </p>
        <button
          className="stress-btn"
          style={{ marginTop: 32, fontSize: 13 }}
          onClick={() => setPhase("idle")}
        >
          Reset
        </button>
      </div>
    </section>
  )
}
