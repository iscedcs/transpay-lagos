"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import MaxWidthWrapper from "@/components/layout/max-width-wrapper"

export default function GlobalReachSection() {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!globeRef.current) return

    // Set up scene
    const scene = new THREE.Scene()

    // Set up camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 5

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(500, 500)
    renderer.setClearColor(0x000000, 0)

    // Clear any existing canvas
    if (globeRef.current.firstChild) {
      globeRef.current.removeChild(globeRef.current.firstChild)
    }

    globeRef.current.appendChild(renderer.domElement)

    // Create globe
    const radius = 2
    const segments = 64
    const globeGeometry = new THREE.SphereGeometry(radius, segments, segments)

    // Create dot material
    const dotMaterial = new THREE.PointsMaterial({
      color: 0xffcc00,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    // Create globe points
    const globePoints = new THREE.Points(globeGeometry, dotMaterial)
    scene.add(globePoints)

    // Add additional random points for density
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a sphere of points
      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI
      const r = radius * (0.8 + Math.random() * 0.3) // Vary radius slightly for depth

      posArray[i * 3] = r * Math.sin(angle2) * Math.cos(angle1)
      posArray[i * 3 + 1] = r * Math.sin(angle2) * Math.sin(angle1)
      posArray[i * 3 + 2] = r * Math.cos(angle2)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffcc00,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add connection lines for key transportation hubs
    const hubLocations = [
      { lat: 6.5244, lng: 3.3792 }, // Lagos
      { lat: 9.0765, lng: 7.3986 }, // Abuja
      { lat: 4.8156, lng: 7.0498 }, // Port Harcourt
      { lat: 11.8469, lng: 13.1539 }, // Maiduguri
      { lat: 7.3775, lng: 3.947 }, // Ibadan
      { lat: 10.5167, lng: 7.4333 }, // Kaduna
      { lat: 12.0, lng: 8.5167 }, // Kano
      { lat: 5.0039, lng: 7.9336 }, // Owerri
      { lat: 6.335, lng: 5.6037 }, // Benin City
      { lat: 9.8965, lng: 8.8583 }, // Jos
    ]

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.3,
    })

    // Convert lat/lng to 3D coordinates
    function latLngToVector3(lat: number, lng: number, radius: number) {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)

      const x = -radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(theta)

      return new THREE.Vector3(x, y, z)
    }

    // Create connections between hubs
    for (let i = 0; i < hubLocations.length; i++) {
      for (let j = i + 1; j < hubLocations.length; j++) {
        if (Math.random() > 0.7) continue // Only connect some hubs

        const hub1 = hubLocations[i]
        const hub2 = hubLocations[j]

        const point1 = latLngToVector3(hub1.lat, hub1.lng, radius)
        const point2 = latLngToVector3(hub2.lat, hub2.lng, radius)

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([point1, point2])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
      }
    }

    // Add hub points (slightly larger)
    const hubGeometry = new THREE.BufferGeometry()
    const hubPositions = new Float32Array(hubLocations.length * 3)

    hubLocations.forEach((hub, i) => {
      const point = latLngToVector3(hub.lat, hub.lng, radius)
      hubPositions[i * 3] = point.x
      hubPositions[i * 3 + 1] = point.y
      hubPositions[i * 3 + 2] = point.z
    })

    hubGeometry.setAttribute("position", new THREE.BufferAttribute(hubPositions, 3))

    const hubMaterial = new THREE.PointsMaterial({
      color: 0xffcc00,
      size: 0.08,
      transparent: true,
      opacity: 1,
    })

    const hubPoints = new THREE.Points(hubGeometry, hubMaterial)
    scene.add(hubPoints)

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)

      frame += 0.003

      // Rotate globe
      globePoints.rotation.y = frame
      particlesMesh.rotation.y = frame

      // Rotate all lines and hubs
      scene.children.forEach((child) => {
        if (child instanceof THREE.Line || child === hubPoints) {
          child.rotation.y = frame
        }
      })

      // Pulse effect for hub points
      if (hubMaterial.size) {
        hubMaterial.size = 0.08 + Math.sin(frame * 5) * 0.02
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!globeRef.current) return

      const width = globeRef.current.clientWidth
      const height = globeRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="w-full py-20 bg-[#0a0a0a] text-white overflow-hidden">
      <MaxWidthWrapper>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[#ffcc00] text-sm font-medium uppercase tracking-wider"
              >
                Nationwide scale
              </motion.span>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mt-2 mb-6"
              >
                Transform transportation across Nigeria
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-gray-400 mb-8"
              >
                {`Join the transportation revolution and let our platform empower your operations nationwide. Nigeria's
              transportation network is your opportunity with Transpay as your ally.`}
              </motion.p>

              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#ffcc00]">
                    500K+
                  </div>
                  <div className="text-gray-400 mt-2">
                    Vehicles registered on our platform across major cities
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#ffcc00]">
                    95%
                  </div>
                  <div className="text-gray-400 mt-2">
                    Collection efficiency rate, maximizing revenue for
                    transportation authorities
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full md:w-1/2 h-[400px] md:h-[500px]"
            >
              <div ref={globeRef} className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
