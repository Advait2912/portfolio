import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      let particles = []
      let t = 0

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.style('position', 'fixed')
        canvas.style('top', '0')
        canvas.style('left', '0')
        canvas.style('z-index', '0')
        canvas.style('pointer-events', 'none')
        // dense count scaled to screen, capped at 1300
        const count = Math.min(1300, Math.floor((p.windowWidth * p.windowHeight) / 1200))
        for (let i = 0; i < count; i++) {
          particles.push({ x: p.random(p.width), y: p.random(p.height), vx: 0, vy: 0 })
        }
        p.frameRate(50)
      }

      p.draw = () => {
        p.background(235, 248, 250, 18)
        const density = 0.002
        const mx = p.mouseX
        const my = p.mouseY

        // batch stroke calls — set once outside loop per style
        p.strokeWeight(1.2)

        for (let pt of particles) {
          const n = p.noise(pt.x * density, pt.y * density, t)
          let angle = n * p.TWO_PI * 2
          const dx = mx - pt.x
          const dy = my - pt.y
          const d = dx * dx + dy * dy  // skip sqrt, compare squared
          if (d < 90000) {  // 300^2
            const dist = p.sqrt(d)
            const pull = p.map(dist, 0, 300, 3.5, 0)
            const swirl = p.map(dist, 0, 300, 1.5, 0)
            angle += p.atan2(dy, dx) * pull
            angle += p.HALF_PI * swirl
          }
          pt.vx += p.cos(angle) * 0.55
          pt.vy += p.sin(angle) * 0.55
          pt.vx *= 0.94
          pt.vy *= 0.94
          pt.x += pt.vx
          pt.y += pt.vy
          if (pt.x < 0) pt.x = p.width
          if (pt.x > p.width) pt.x = 0
          if (pt.y < 0) pt.y = p.height
          if (pt.y > p.height) pt.y = 0

          // single line per particle instead of two
          const tx = pt.x - pt.vx * 0.8
          const ty = pt.y - pt.vy * 0.8
          p.stroke(175, 225, 235, 60)
          p.line(pt.x, pt.y, tx, ty)
        }
        t += 0.0025
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    const instance = new window.p5(sketch)
    return () => instance.remove()
  }, [])

  return <div ref={containerRef} />
}