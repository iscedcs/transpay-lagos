"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import MaxWidthWrapper from "@/components/layout/max-width-wrapper"

export default function CTASectionAlternative() {
  return (
    <section className="w-full py-20 bg-[#0a0a0a] relative overflow-hidden">
        <MaxWidthWrapper>
      {/* Background gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-[#0a0a0a] opacity-80"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full">
          {/* Particle grid */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4">
            {Array.from({ length: 144 }).map((_, i) => {
              const size = Math.random() > 0.9 ? 2 : 1
              const opacity = Math.random() * 0.5 + 0.1
              return (
                <div
                  key={i}
                  className="rounded-full bg-[#ffcc00]"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity,
                    animation: `pulse ${Math.random() * 4 + 2}s infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Get started today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400"
          >
            Create a free account. No demos or calls with our sales team are required. Upgrade only if you have to.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 bg-[#ffcc00] hover:bg-[#e6b800] text-black transition-colors duration-300 rounded-md px-6 py-3 font-medium"
            >
              GET STARTED <ArrowRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-transparent border border-white hover:bg-white/10 text-white transition-colors duration-300 rounded-md px-6 py-3 font-medium"
            >
              CONTACT US
            </Link>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      </MaxWidthWrapper>
    </section>
  )
}
