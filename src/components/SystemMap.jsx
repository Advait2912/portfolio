import { useRef, useEffect, useState, useMemo } from "react"

const nodes = [
  { id: 1, label: "Research",     tooltip: "Sitting with the problem before trying to solve it" },
  { id: 2, label: "Insight",      tooltip: "I look for what people don’t say out loud." },
  { id: 3, label: "Systems",      tooltip: "The forces quietly shaping how things work and feel" },
  { id: 4, label: "Intervention", tooltip: "Where ideas become real" },
  { id: 5, label: "Impact",       tooltip: "What actually changes" },
  { id: 6, label: "People",       tooltip: "Every system exists because of someone" },
  { id: 7, label: "Strategy",     tooltip: "Choosing what matters (and what doesn’t)" },
  { id: 8, label: "Overwhelm",    tooltip: "Most of my work starts here" },
]

const connections = [[1,2],[1,4],[2,3],[2,6],[3,5],[3,8],[4,5],[4,8],[6,8],[7,4],[7,1]]
const NW = 110, NH = 38

function seededRand(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generatePositions(nodeList) {
  const rand = seededRand(42)
  const colStops = [0.15, 0.48, 0.80]
  const rowStops = [0.18, 0.50, 0.80]
  const zones = []
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++)
      zones.push({ cx: colStops[c], cy: rowStops[r] })
  const shuffled = [...zones].sort(() => rand() - 0.5)
  return nodeList.map((node, i) => {
    const zone = shuffled[i % shuffled.length]
    const jitterX = (rand() - 0.5) * 0.12
    const jitterY = (rand() - 0.5) * 0.10
    return {
      ...node,
      x: Math.min(Math.max(zone.cx + jitterX, 0.08), 0.88),
      y: Math.min(Math.max(zone.cy + jitterY, 0.08), 0.88),
    }
  })
}

const positionedNodes = generatePositions(nodes)

function getConnected(nodeId) {
  const connected = new Set()
  connections.forEach(([a, b]) => {
    if (a === nodeId) connected.add(b)
    if (b === nodeId) connected.add(a)
  })
  return connected
}

export default function SystemMap() {
  const ref = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const r = entries[0].contentRect
      setSize({ w: r.width, h: r.height })
    })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const nx = (n) => size.w * n.x
  const ny = (n) => size.h * n.y

  const connectedToHovered = useMemo(() => {
    if (!hovered) return new Set()
    return getConnected(hovered)
  }, [hovered])

  const getNodeOpacity = (nodeId) => {
    if (!hovered) return 1
    if (nodeId === hovered) return 1
    if (connectedToHovered.has(nodeId)) return 1
    return 0
  }

  const getLineOpacity = (a, b) => {
    if (!hovered) return 0.25
    if (a === hovered || b === hovered) return 0.75
    return 0
  }

  return (
    <div className="system-map" ref={ref}>
      <svg className="system-lines">
        {connections.map(([a, b], i) => {
          const na = positionedNodes.find(n => n.id === a)
          const nb = positionedNodes.find(n => n.id === b)
          const x1 = nx(na) + NW / 2, y1 = ny(na) + NH / 2
          const x2 = nx(nb) + NW / 2, y2 = ny(nb) + NH / 2
          const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - 40
          const isHot = hovered && (hovered === a || hovered === b)
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              style={{
                stroke: isHot ? "var(--indigo)" : "var(--sage)",
                opacity: getLineOpacity(a, b),
                strokeWidth: isHot ? 1.5 : 1,
                transition: "all 0.5s ease",
              }}
            />
          )
        })}
      </svg>

      {positionedNodes.map((node, i) => {
        const isHovered = hovered === node.id
        return (
          <div
            key={node.id}
            className="system-node"
            style={{
              left: nx(node),
              top: ny(node),
              "--i": i,
              position: "absolute",
              opacity: getNodeOpacity(node.id),
              transition: "opacity 0.5s ease",
              zIndex: isHovered ? 10 : 1,
              background: "transparent",
              border: "none",
              padding: 0,
            }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{
              transform: isHovered ? "scale(1.2)" : "scale(1)",
              transformOrigin: "center center",
              position: "relative",
              padding: "10px 18px",
              borderRadius: "100px",
              border: `1px solid ${isHovered ? "var(--indigo)" : "var(--border)"}`,
              background: "var(--white)",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: ".03em",
              color: isHovered ? "var(--indigo)" : "var(--text)",
              boxShadow: isHovered
                ? "0 8px 32px rgba(10,133,140,.15)"
                : "0 2px 12px rgba(0,0,0,0.04)",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
            }}>
              <span style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                opacity: isHovered ? 1 : 0,
                pointerEvents: "none",
                transition: "opacity 0.3s ease",
                background: "var(--white)",
                border: "1px solid var(--indigo)",
                color: "var(--indigo)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "100px",
                fontFamily: "var(--sans)",
              }}>
                {node.tooltip}
              </span>
              {node.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}