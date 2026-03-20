import { useRef, useEffect, useState } from "react"

const influences = [
  { label: "Psychology",           x: "40%", y: "8%",  desc: "Understanding what people feel, even when they can't explain it." },
  { label: "Visual Communication", x: "10%", y: "42%", desc: "Making ideas clear, visual, and meaningful." },
  { label: "Systems Thinking",     x: "85%", y: "42%", desc: "Seeing the bigger picture behind how everything works." },
  { label: "Behavioural Science",  x: "18%", y: "82%", desc: "People are irrational in predictable ways. Design for who they are, not who we wish they were." },
  { label: "Service Design",       x: "78%", y: "82%", desc: "Bringing everything together into real-world experiences." },
  { label: "Research",             x: "50%", y: "80%", desc: "Sitting with the problem before trying to solve it." },
  { label: "Pattern Recognition",  x: "60%", y: "18%", desc: "Finding connections across people, systems, and experiences." },
  { label: "Emotional Insight",    x: "10%", y: "10%", desc: "Noticing what people feel beneath the surface." },
]

const CENTER = { x: "50%", y: "46%" }
const CENTER_DESC = "Designer, systems thinker, and someone who asks too many questions."

export default function SystemInputs() {
  const sectionRef = useRef(null)
  const constellationRef = useRef(null)
  const [conSize, setConSize] = useState({ w: 0, h: 0 })
  const [hoveredCenter, setHoveredCenter] = useState(false)
  const [hoveredInf, setHoveredInf] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)

    return () => obs.disconnect()
  }, [])

  // Observe the constellation div specifically for its size
  useEffect(() => {
    if (!constellationRef.current) return
    const sizeObs = new ResizeObserver(entries => {
      const r = entries[0].contentRect
      setConSize({ w: r.width, h: r.height })
    })
    sizeObs.observe(constellationRef.current)
    return () => sizeObs.disconnect()
  }, [])

  const pct = (v, total) => parseFloat(v) / 100 * total
  const cx = pct(CENTER.x, conSize.w)
  const cy = pct(CENTER.y, conSize.h)

  const anyHovered = hoveredCenter || hoveredInf !== null

  const lineOpacity = (i) => {
    if (!anyHovered) return 0.25
    if (hoveredCenter) return 0.6
    if (hoveredInf === i) return 0.75
    return 0.05
  }

  const nodeOpacity = (i) => {
    if (!anyHovered) return 1
    if (hoveredInf === i) return 1
    return 0.15
  }

  const centerOpacity = () => {
    if (!anyHovered) return 1
    if (hoveredCenter) return 1
    return 0.15
  }

  return (
    <section id="system-inputs" className="system-inputs" ref={sectionRef} style={{ alignItems: "stretch", padding: 0 }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        width: "100%",
        minHeight: "100%",
      }}>

        {/* ── LEFT col: About Me + Constellation ── */}
        <div style={{
          padding: "100px 60px 100px 6vw",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}>

          {/* About Me */}
          <div className="fade-up" style={{ marginBottom: "60px" }}>
            <h2 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(30px,4vw,52px)",
              fontWeight: 400, lineHeight: 1.1, marginBottom: "16px",
            }}>
              About Me
            </h2>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: "var(--text)", maxWidth: "500px", marginBottom: "12px" }}>
              I'm a Business Services & Systems Designer who believes the most interesting problems live at the edges of disciplines. I work at the intersection of research, strategy, and visual thinking to turn complexity into clarity.
            </p>
            <p style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.75, color: "var(--text-muted)", maxWidth: "500px" }}>
              When I'm not mapping systems, I'm probably questioning why the system exists in the first place.
            </p>
          </div>

          {/* What Shapes My Thinking */}
          <div className="fade-up" style={{ transitionDelay: "0.1s", marginBottom: "40px" }}>
            <h2 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(30px,4vw,52px)",
              fontWeight: 400, lineHeight: 1.1, marginBottom: "12px",
            }}>
              What Shapes My Thinking
            </h2>
            <span style={{
              fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase",
              color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "14px",
            }}>
              The disciplines that inform how I design
              <span style={{ flex: 1, height: "1px", background: "var(--border)", display: "inline-block" }} />
            </span>
          </div>

          {/* Constellation — same width as left col only */}
          <div
            ref={constellationRef}
            className="constellation fade-up"
            style={{ height: 480, position: "relative", width: "100%" }}
          >
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {influences.map((inf, i) => {
                const ix = pct(inf.x, conSize.w)
                const iy = pct(inf.y, conSize.h)
                return (
                  <line
                    key={i}
                    x1={cx} y1={cy}
                    x2={ix} y2={iy}
                    stroke="var(--indigo)"
                    strokeWidth={hoveredInf === i || hoveredCenter ? 1.5 : 1}
                    opacity={lineOpacity(i)}
                    strokeDasharray="4 4"
                    style={{ transition: "opacity 0.4s ease, stroke-width 0.3s ease" }}
                  />
                )
              })}
            </svg>

            {/* Center node — same structure as influence nodes */}
            <div
              className="constellation-node fade-up"
              style={{
                left: CENTER.x,
                top: CENTER.y,
                opacity: centerOpacity(),
                transition: "opacity 0.4s ease",
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredCenter(true)}
              onMouseLeave={() => setHoveredCenter(false)}
            >
              <div className="node-pill" style={{
                background: "var(--text)",
                color: "var(--bg)",
                fontWeight: 500,
                fontSize: "14px",
                padding: "12px 24px",
                transform: hoveredCenter ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}>
                Aarushi
              </div>
              <div className="node-card">
                <strong>Aarushi</strong>
                {CENTER_DESC}
              </div>
            </div>

            {/* Influence nodes */}
            {influences.map((inf, i) => (
              <div
                key={i}
                className="constellation-node fade-up"
                style={{
                  left: inf.x,
                  top: inf.y,
                  transitionDelay: `${0.1 + i * 0.05}s`,
                  opacity: nodeOpacity(i),
                  transition: "opacity 0.4s ease",
                }}
                onMouseEnter={() => setHoveredInf(i)}
                onMouseLeave={() => setHoveredInf(null)}
              >
                <div className="node-pill" style={{
                  transform: hoveredInf === i ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  {inf.label}
                </div>
                <div className="node-card">
                  <strong>{inf.label}</strong>
                  {inf.desc}
                </div>
              </div>
            ))}
          </div>

        </div>{/* end left col */}

        {/* ── RIGHT col: photo spanning full section height ── */}
        <div style={{
          /*borderLeft: "1px solid var(--border)",*/
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 28px",
          position: "sticky",
          top: 0,
          alignSelf: "start",
          height: "100vh",
        }}>
          <div style={{
            width: "100%",
            aspectRatio: "3/4",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            background: "var(--white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "var(--text-muted)",
            fontSize: "11px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            overflow: "hidden",
          }}>
            <span style={{ fontSize: "40px", opacity: 0.15 }}>◻</span>
            Photo
          </div>
        </div>

      </div>
    </section>
  )
}