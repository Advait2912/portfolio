import { useEffect, useRef } from "react"

export default function Contact() {
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
    <section id="contact" className="contact-section" ref={ref}>
      <h2 className="fade-up">
        Let's build<br /><em>better systems.</em>
      </h2>
      <p className="fade-up" style={{ transitionDelay: "0.1s", fontSize: 15, color: "var(--text-muted)", fontWeight: 300, maxWidth: 400 }}>
        I'm open to collaborations, internships, and conversations about design, systems, and everything in between.
      </p>

      <div className="contact-links fade-up" style={{ transitionDelay: "0.2s" }}>
        <a href="mailto:aarushi@example.com" className="contact-link">
          <span className="link-label">
            <span className="link-type">Email</span>
            aarushi@example.com
          </span>
          <span className="link-arrow">→</span>
        </a>
        <a href="https://linkedin.com/in/aarushi" target="_blank" rel="noreferrer" className="contact-link">
          <span className="link-label">
            <span className="link-type">LinkedIn</span>
            linkedin.com/in/aarushi
          </span>
          <span className="link-arrow">→</span>
        </a>
        <a href="#" className="contact-link">
          <span className="link-label">
            <span className="link-type">Resume</span>
            Download PDF
          </span>
          <span className="link-arrow">↓</span>
        </a>
      </div>

      <p className="contact-footer fade-up" style={{ transitionDelay: "0.3s" }}>
        AARUSHI SHARMA · SYSTEMS DESIGNER · 2024
      </p>
    </section>
  )
}
