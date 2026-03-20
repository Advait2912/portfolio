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
        for (let i = 0; i < 1000; i++) {
          particles.push({ x: p.random(p.width), y: p.random(p.height), vx: 0, vy: 0 })
        }
      }

      p.draw = () => {
        p.background(235, 248, 250, 18)
        const density = 0.002
        for (let pt of particles) {
          const n = p.noise(pt.x * density, pt.y * density, t)
          let angle = n * p.TWO_PI * 2
          const dx = p.mouseX - pt.x
          const dy = p.mouseY - pt.y
          const d = p.sqrt(dx * dx + dy * dy)
          if (d < 300) {
            const pull = p.map(d, 0, 300, 3.5, 0)
            const swirl = p.map(d, 0, 300, 1.5, 0)
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
          p.stroke(200, 240, 245, 40)
          p.strokeWeight(2)
          p.line(pt.x, pt.y, pt.x - pt.vx * 0.8, pt.y - pt.vy * 0.8)
          p.stroke(150, 210, 220, 90)
          p.strokeWeight(0.6)
          p.line(pt.x, pt.y, pt.x - pt.vx * 0.8, pt.y - pt.vy * 0.8)
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