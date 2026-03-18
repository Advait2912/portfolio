import { useEffect, useRef } from "react"

export default function CaseStudy() {
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
    <section id="case-study" className="case-study" ref={ref}>
      {/* LEFT — STRUCTURED */}
      <div className="case-left">
        <div>
          <p className="section-label fade-up">Case Study</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, marginTop: 12, transitionDelay: "0.1s" }}>
            Emotion AI App
          </h2>
        </div>

        <div className="case-section fade-up" style={{ transitionDelay: "0.15s" }}>
          <p className="case-section-title">Problem Context</p>
          <p className="case-section-body">People struggle to identify emotional patterns that affect their decision-making and relationships. Existing tools are either clinical or superficial.</p>
        </div>

        <div className="case-section fade-up" style={{ transitionDelay: "0.2s" }}>
          <p className="case-section-title">Research Insights</p>
          <div className="framework-block">
            12 interviews revealed that people could describe emotional outcomes but not antecedents — they knew how they felt but not why.
          </div>
        </div>

        <div className="case-section fade-up" style={{ transitionDelay: "0.25s" }}>
          <p className="case-section-title">System Mapping</p>
          <p className="case-section-body">Mapped the emotional journey from trigger → reaction → reflection → pattern recognition. Identified where AI could augment human awareness without replacing it.</p>
        </div>

        <div className="case-section fade-up" style={{ transitionDelay: "0.3s" }}>
          <p className="case-section-title">Intervention</p>
          <p className="case-section-body">A conversational journal with emotion mapping — users log in natural language, AI surfaces patterns over time.</p>
        </div>

        <div className="case-section fade-up" style={{ transitionDelay: "0.35s" }}>
          <p className="case-section-title">Outcome</p>
          <div className="framework-block">
            Prototype tested with 8 users. 7/8 reported feeling "more in control" of emotional responses after 2 weeks.
          </div>
        </div>
      </div>

      {/* RIGHT — CHAOS */}
      <div className="case-right">
        <p className="section-label fade-up">Process</p>
        <h3 className="fade-up" style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, fontStyle: "italic", transitionDelay: "0.1s" }}>
          The Thinking Behind It
        </h3>

        <div className="chaos-item fade-up" style={{ transform: "rotate(-1.5deg)", transitionDelay: "0.15s" }}>
          <div className="sketch-area">First concept sketch</div>
          <p className="chaos-caption">"first version too complex — users felt judged"</p>
        </div>

        <div className="chaos-item fade-up" style={{ transform: "rotate(0.8deg)", transitionDelay: "0.2s" }}>
          <div className="sketch-area">User interview notes</div>
          <p className="chaos-caption">"user interviews completely changed direction"</p>
        </div>

        <div className="chaos-item fade-up" style={{ transform: "rotate(-0.5deg)", transitionDelay: "0.25s" }}>
          <div className="sketch-area">Revised flow v2</div>
          <p className="chaos-caption">"simplified to just: write → reflect → see pattern"</p>
        </div>

        <div className="chaos-item fade-up" style={{ transform: "rotate(1.2deg)", transitionDelay: "0.3s", background: "var(--indigo-light)", borderColor: "rgba(92,106,196,0.2)" }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", fontWeight: 300 }}>
            The breakthrough was realising the AI shouldn't explain emotions — it should just <em>show</em> them back to the user over time.
          </p>
        </div>
      </div>
    </section>
  )
}
