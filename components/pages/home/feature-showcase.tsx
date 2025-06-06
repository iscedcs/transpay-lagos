"use client"

import MaxWidthWrapper from "@/components/layout/max-width-wrapper"
import { motion } from "framer-motion"

export default function FeaturesShowcase() {
  return (
    <section className="w-full py-20 bg-[#0a0a0a] text-white overflow-hidden">
      <MaxWidthWrapper>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[#ffcc00] text-sm font-medium uppercase tracking-wider"
            >
              Features
            </motion.span>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mt-2"
            >
              Experience our features
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto mt-4"
            >
              Dive into our features and experience the difference we can make
              in your transportation management and levy collection.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1: Real-time Tracking */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="bg-[#0d0d0d] rounded-lg p-4 mb-6 h-48 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Radar animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-2 border-[#ffcc00]/20 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-2 border-[#ffcc00]/30 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-2 border-[#ffcc00]/40 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-2 border-[#ffcc00]/50 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-[#ffcc00]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Radar sweep */}
                      <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-gradient-to-r from-[#ffcc00]/80 to-transparent origin-left -translate-x-0 -translate-y-0.5 animate-[spin_4s_linear_infinite]"></div>
                      {/* Dots */}
                      <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-pulse"></div>
                      <div className="absolute bottom-[35%] left-[40%] w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Real-time Vehicle Location
                </h3>
                <p className="text-gray-400 mt-2">
                  View your entire fleet in real-time with precise location
                  data, ensuring efficient route management and enhanced
                  security.
                </p>
              </div>
            </motion.div>

            {/* Feature 2: Smart Fairflex Device */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="bg-[#0d0d0d] rounded-lg p-4 mb-6 h-48 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Device visualization */}
                    <div className="w-32 h-48 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] relative flex flex-col items-center">
                      {/* Device screen */}
                      <div className="w-24 h-16 bg-[#0a0a0a] mt-4 rounded-md flex items-center justify-center">
                        <div className="w-20 h-12 bg-[#ffcc00]/10 rounded-sm flex items-center justify-center animate-pulse">
                          <div className="text-[#ffcc00] text-xs font-mono">
                            FAIRFLEX
                          </div>
                        </div>
                      </div>
                      {/* Device fingerprint scanner */}
                      <div className="w-12 h-12 bg-[#1f1f1f] rounded-full mt-4 flex items-center justify-center relative overflow-hidden">
                        <div className="w-10 h-10 rounded-full border border-[#ffcc00]/30 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-[#ffcc00]"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C11 11.4477 11.4477 11 12 11Z"
                              fill="currentColor"
                            />
                            <path
                              d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
                              fill="currentColor"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        {/* Scanning animation */}
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="w-full h-1 bg-[#ffcc00]/30 animate-[scan_2s_ease-in-out_infinite]"></div>
                        </div>
                      </div>
                      {/* Device buttons */}
                      <div className="flex space-x-2 mt-4">
                        <div className="w-4 h-4 bg-[#2a2a2a] rounded-full hover:bg-[#ffcc00]/50 transition-colors duration-300"></div>
                        <div className="w-4 h-4 bg-[#2a2a2a] rounded-full hover:bg-[#ffcc00]/50 transition-colors duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Smart Fairflex Device
                </h3>
                <p className="text-gray-400 mt-2">
                  Our proprietary security device ensures the protection and
                  tracking of every vehicle registered on our platform.
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Advanced Encryption */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="bg-[#0d0d0d] rounded-lg p-4 mb-6 h-48 flex items-center justify-center">
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Encryption key visualization */}
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 font-mono text-[#ffcc00] text-sm mb-4 relative overflow-hidden">
                      f794fd0j6LXwZC
                      {/* Animated highlight effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffcc00]/20 to-transparent w-[200%] animate-[slide_3s_linear_infinite]"></div>
                    </div>
                    {/* Binary background */}
                    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                      <div className="w-full h-full flex flex-wrap">
                        {Array.from({ length: 200 }).map((_, i) => (
                          <div
                            key={i}
                            className="text-[8px] text-[#ffcc00]"
                            style={{
                              animation: `blink ${
                                Math.random() * 5 + 2
                              }s infinite`,
                              animationDelay: `${Math.random() * 2}s`,
                            }}
                          >
                            {Math.random() > 0.5 ? "1" : "0"}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Lock icon */}
                    <div className="relative z-10">
                      <svg
                        className="w-16 h-16 text-[#ffcc00] animate-pulse"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Advanced Encryption
                </h3>
                <p className="text-gray-400 mt-2">
                  Be sure that sensitive information remains confidential and
                  secure with our military-grade encryption protocols.
                </p>
              </div>
            </motion.div>

            {/* Feature 4: Visibility Dashboard */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="bg-[#0d0d0d] rounded-lg p-4 mb-6 h-48 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Dashboard visualization */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Dashboard header */}
                      <div className="h-6 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-2">
                        <div className="w-2 h-2 rounded-full bg-[#ffcc00] mr-1"></div>
                        <div className="w-2 h-2 rounded-full bg-[#333] mr-1"></div>
                        <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                        <div className="text-[10px] text-[#ffcc00] mx-auto">
                          Transpay Dashboard
                        </div>
                      </div>
                      {/* Dashboard content */}
                      <div className="flex-1 flex">
                        {/* Sidebar */}
                        <div className="w-1/4 bg-[#151515] border-r border-[#2a2a2a] p-2">
                          <div className="w-full h-3 bg-[#2a2a2a] rounded mb-2"></div>
                          <div className="w-full h-3 bg-[#ffcc00]/30 rounded mb-2 animate-pulse"></div>
                          <div className="w-full h-3 bg-[#2a2a2a] rounded mb-2"></div>
                          <div className="w-full h-3 bg-[#2a2a2a] rounded"></div>
                        </div>
                        {/* Main content */}
                        <div className="flex-1 p-2">
                          {/* Charts */}
                          <div className="flex mb-2">
                            <div className="w-1/2 h-12 bg-[#1a1a1a] rounded mr-2 relative overflow-hidden">
                              {/* Animated chart line */}
                              <svg
                                className="absolute inset-0"
                                width="100%"
                                height="100%"
                                viewBox="0 0 100 50"
                              >
                                <path
                                  d="M0,25 Q20,40 40,20 Q60,0 80,15 Q100,30 100,25"
                                  fill="none"
                                  stroke="#ffcc00"
                                  strokeWidth="1.5"
                                  strokeDasharray="200"
                                  strokeDashoffset="200"
                                  className="animate-[dash_3s_linear_forwards_infinite]"
                                />
                              </svg>
                            </div>
                            <div className="w-1/2 h-12 bg-[#1a1a1a] rounded relative overflow-hidden">
                              {/* Animated bar chart */}
                              <div className="absolute bottom-0 left-1 w-2 h-4 bg-[#ffcc00]/40 animate-[grow_2s_ease-in-out_infinite]"></div>
                              <div className="absolute bottom-0 left-5 w-2 h-6 bg-[#ffcc00]/60 animate-[grow_2s_ease-in-out_infinite_0.5s]"></div>
                              <div className="absolute bottom-0 left-9 w-2 h-3 bg-[#ffcc00]/30 animate-[grow_2s_ease-in-out_infinite_1s]"></div>
                              <div className="absolute bottom-0 left-13 w-2 h-7 bg-[#ffcc00]/70 animate-[grow_2s_ease-in-out_infinite_1.5s]"></div>
                            </div>
                          </div>
                          {/* Table */}
                          <div className="w-full bg-[#1a1a1a] rounded p-1">
                            <div className="flex mb-1">
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded"></div>
                            </div>
                            <div className="flex mb-1">
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#ffcc00]/30 rounded mr-1 animate-pulse"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded"></div>
                            </div>
                            <div className="flex">
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded mr-1"></div>
                              <div className="w-1/4 h-2 bg-[#2a2a2a] rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Visibility Dashboard
                </h3>
                <p className="text-gray-400 mt-2">
                  Role-specific dashboards provide complete transparency,
                  allowing all stakeholders to monitor operations in real-time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
