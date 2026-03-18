import { useRef, useEffect, useState } from "react"

const nodes = [
  { id: 1, label: "Research", x: 0.22, y: 0.38 },
  { id: 2, label: "Insight", x: 0.52, y: 0.14 },
  { id: 3, label: "Systems", x: 0.72, y: 0.42 },
  { id: 4, label: "Intervention", x: 0.38, y: 0.68 },
  { id: 5, label: "Impact", x: 0.62, y: 0.82 },
  { id: 6, label: "People", x: 0.78, y: 0.22 },
  { id: 7, label: "Strategy", x: 0.14, y: 0.62 },
]
const connections = [[1,2],[1,4],[2,3],[2,6],[3,5],[4,5],[7,4],[7,1]]
const NW = 110, NH = 38

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

  return (
    <div className="system-map" ref={ref}>
      <svg className="system-lines">
        {connections.map(([a, b], i) => {
          const na = nodes.find(n => n.id === a)
          const nb = nodes.find(n => n.id === b)
          const x1 = nx(na) + NW / 2, y1 = ny(na) + NH / 2
          const x2 = nx(nb) + NW / 2, y2 = ny(nb) + NH / 2
          const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - 40
          const isHot = hovered && (hovered === a || hovered === b)
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              style={{
                stroke: isHot ? "#5C6AC4" : "#8FA7A3",
                opacity: isHot ? 0.7 : 0.25,
                strokeWidth: isHot ? 1.5 : 1,
                transition: "all 0.4s ease"
              }}
            />
          )
        })}
      </svg>
      {nodes.map((node, i) => (
        <div
          key={node.id}
          className="system-node"
          style={{ left: nx(node), top: ny(node), "--i": i }}
          onMouseEnter={() => setHovered(node.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {node.label}
        </div>
      ))}
    </div>
  )
}
