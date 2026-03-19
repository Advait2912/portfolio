import SystemMap from "../components/SystemMap"
import { useEffect, useRef } from "react"

export default function Hero() {
  const leftRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible")
      })
    }, { threshold: 0.1 })
    leftRef.current?.querySelectorAll(".fade-up").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero-left" ref={leftRef}>
        <p className="hero-eyebrow fade-up">Portfolio · 2026</p>
        <h1 className="fade-up" style={{ transitionDelay: "0.1s" }}>
          Aarushi Sharma<br />
          <span className="hero-tagline-title">Business Services & Systems Designer</span>
        </h1>
        <p className="hero-tagline fade-up" style={{ transitionDelay: "0.2s" }}>
          
          <i>Service Design · Systems Thinking · Experience Design</i>
        </p>
        <p className="hero-philosophy fade-up" style={{ transitionDelay: "0.3s" }}>
          I design systems that transform complex human problems into structured experiences. My work sits at the intersection of research, strategy, and visual thinking.
        </p>
        <p className="hero-philosophy fade-up" style={{ transitionDelay: "0.35s", fontSize: "14px", fontStyle: "italic", color: "var(--text-muted)" }}>
          This portfolio is not a gallery. It is a map of how I think.
        </p>
        <p className="hero-scroll-hint fade-up" style={{ transitionDelay: "0.4s" }}>
          Scroll to explore the system
        </p>
      </div>
      <div className="hero-right">
        <SystemMap />
      </div>
    </section>
  )
}
