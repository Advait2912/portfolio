import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const projects = [
  {
    id: "meta-counsel",
    title: "Meta Counsel Campaign",
    subtitle: "Service Design · Strategy",
    tags: ["Service Design", "Strategy"],
    desc: "A service design campaign reimagining legal counsel accessibility for independent creators navigating platform policies.",
    problem: "Independent creators on Meta platforms faced confusing, inaccessible legal guidelines with no clear support pathways.",
    skills: ["Research", "Systems Mapping", "Content Strategy", "UX Design"],
    outcome: "A tiered support system concept reducing time-to-resolution for creator disputes.",
    process: [
      { sketch: "Initial service blueprint", caption: "\"started with the creator journey — 14 touchpoints, all broken\"" },
      { sketch: "Stakeholder map", caption: "\"three different teams owned the same problem — no one knew\"" },
      { sketch: "Tiered system v2", caption: "\"simplified to: identify → route → resolve\"" },
    ],
    insight: "The real problem wasn't legal complexity — it was that creators didn't know what kind of help they needed.",
  },
  {
    id: "emotion-ai",
    title: "Emotion AI App",
    subtitle: "Experience Design · AI",
    tags: ["Experience Design", "AI"],
    desc: "An emotional intelligence interface that helps users understand and navigate their emotional patterns through AI-assisted reflection.",
    problem: "People struggle to identify emotional patterns that affect their decision-making and relationships.",
    skills: ["Psychology", "UX Design", "Behavioural Science", "Prototyping"],
    outcome: "A conversational journal concept with emotion mapping and pattern recognition features.",
    process: [
      { sketch: "First concept sketch", caption: "\"first version too complex — users felt judged\"" },
      { sketch: "User interview notes", caption: "\"user interviews completely changed direction\"" },
      { sketch: "Revised flow v2", caption: "\"simplified to just: write → reflect → see pattern\"" },
    ],
    insight: "The AI shouldn't explain emotions — it should just show them back to the user over time.",
  },
  {
    id: "sleep-system",
    title: "Sleep Experience System",
    subtitle: "Systems Thinking · Research",
    tags: ["Systems Thinking", "Research"],
    desc: "A holistic system redesign of the sleep experience, addressing environmental, behavioural, and social factors.",
    problem: "Existing sleep products solve isolated problems without addressing the interconnected system of sleep health.",
    skills: ["Service Design", "Research", "Systems Thinking", "Interaction Design"],
    outcome: "A service ecosystem spanning environment design, behavioural nudges, and social accountability.",
    process: [
      { sketch: "System map draft", caption: "\"mapped 9 variables — only 3 were addressable by design\"" },
      { sketch: "Behavioural audit", caption: "\"people's sleep rituals were deeply personal — not hackable\"" },
      { sketch: "Ecosystem v3", caption: "\"final model: environment + habit + social loop\"" },
    ],
    insight: "Sleep isn't a product problem. It's a rhythm problem — and rhythms need systems, not apps.",
  },
]

export default function CaseStudyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", background: "lab(92.22% -13.94 -4.11)", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "60px", position: "relative", zIndex: 2 }}>
        <p style={{ color: "var(--text-muted)" }}>Project not found.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "lab(92.22% -13.94 -4.11)", paddingTop: "60px", position: "relative", zIndex: 2 }}>
      <div className="case-study">

        {/* LEFT */}
        <div className="case-left">
          <div>
            <p className="section-label">Case Study</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, marginTop: 12 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "8px", letterSpacing: ".04em" }}>
              {project.subtitle}
            </p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Problem Context</p>
            <p className="case-section-body">{project.problem}</p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Description</p>
            <p className="case-section-body">{project.desc}</p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Skills Applied</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
              {project.skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: "12px", padding: "5px 13px", borderRadius: "100px",
                  border: `1px solid ${i === 0 ? "var(--indigo)" : "var(--border)"}`,
                  color: i === 0 ? "var(--indigo)" : "var(--text-muted)",
                }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="case-section">
            <p className="case-section-title">Outcome</p>
            <div className="framework-block">{project.outcome}</div>
          </div>

          <button
            onClick={() => navigate(-1)}
            style={{
              alignSelf: "flex-start", marginTop: "auto",
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", border: "1px solid var(--border)",
              borderRadius: "100px", padding: "10px 20px",
              fontSize: "12px", letterSpacing: ".08em",
              color: "var(--text-muted)", cursor: "pointer",
              fontFamily: "var(--sans)", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--indigo)"; e.currentTarget.style.color = "var(--indigo)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)" }}
          >
            ← Back to Portfolio
          </button>
        </div>

        {/* RIGHT */}
        <div className="case-right">
          <p className="section-label">Process</p>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, fontStyle: "italic", marginTop: 12 }}>
            The Thinking Behind It
          </h3>

          {project.process.map((step, i) => (
            <div key={i} className="chaos-item" style={{ transform: `rotate(${[-1.5, 0.8, -0.5][i] || 0}deg)` }}>
              <div className="sketch-area">{step.sketch}</div>
              <p className="chaos-caption">{step.caption}</p>
            </div>
          ))}

          {project.insight && (
            <div className="chaos-item" style={{ background: "var(--indigo-light)", borderColor: "rgba(10,133,140,0.2)" }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", fontWeight: 300 }}>
                <em>"{project.insight}"</em>
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}