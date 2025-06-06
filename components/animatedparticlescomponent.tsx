'use client'
import { motion, useAnimationFrame } from "framer-motion"
import { useRef } from "react"

const NUM_PARTICLES = 20
const colors = [
  "#f87171",
  "#60a5fa", 
  "#facc15", 
  "#34d399", 
  "#a78bfa"  
]

function generateParticles() {
  return Array.from({ length: NUM_PARTICLES }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    speedX: Math.random() * 0.2 - 0.1,
    speedY: Math.random() * 0.2 - 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
}

const particles = generateParticles()

export default function AnimatedParticlesBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const positions = useRef(particles)

  useAnimationFrame(() => {
    positions.current.forEach((p) => {
      p.x += p.speedX
      p.y += p.speedY

      if (p.x < 0 || p.x > 100) p.speedX *= -1
      if (p.y < 0 || p.y > 100) p.speedY *= -1
    })

    if (ref.current) {
      ref.current.querySelectorAll(".particle").forEach((el, i) => {
        const p = positions.current[i]
        el.setAttribute(
          "style",
          `left:${p.x}vw; top:${p.y}vh; width:${p.size}px; height:${p.size}px; background:${p.color}`
        )
      })
    }
  })

  return (
    <div className=" overflow-hidden bg-black">
      <div ref={ref} className="relative w-full h-full">
        {positions.current.map((p) => (
          <motion.div
            key={p.id}
            className="particle absolute rounded-full blur-md opacity-40"
            style={{ left: `${p.x}vw`, top: `${p.y}vh` }}
          />
        ))}
      </div>
    </div>
  )
}
