"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Search } from "lucide-react"

// FAQ data with categories
const faqData = {
  general: [
    {
      question: `What is Transpay?`,
      answer: `Transpay is a comprehensive transportation management platform designed specifically for Nigerian transportation authorities. It streamlines levy collection, enhances security, and provides real-time analytics for better decision-making.`,
    },
    {
      question: `How does Transpay differ from other solutions?`,
      answer: `Unlike traditional systems, Transpay is built specifically for the Nigerian transportation ecosystem. It offers seamless integration with existing infrastructure, supports multiple payment methods, and provides robust security features tailored to local needs.`,
    },
  ],
  security: [
    {
      question: `Is my data safe with your platform?`,
      answer: `Yes, your data is completely secure with Transpay. We implement military-grade encryption, regular security audits, and comply with all relevant data protection regulations. All sensitive information is encrypted both in transit and at rest.`,
    },
    {
      question: `How does the Smart Fairflex Device ensure security?`,
      answer: `The Smart Fairflex Device uses advanced authentication methods, tamper-proof hardware, and real-time monitoring to ensure only authorized personnel can access vehicles and systems. It also provides location tracking for enhanced fleet security.`,
    },
  ],
  support: [
    {
      question: `What kind of customer support do you offer?`,
      answer: `We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is trained to resolve technical issues quickly and efficiently. We also offer personalized onboarding and training for all new clients.`,
    },
    {
      question: `Do you provide implementation assistance?`,
      answer: `Yes, our team of experts will guide you through the entire implementation process. We offer comprehensive training, system setup, and ongoing support to ensure a smooth transition to the Transpay platform.`,
    },
  ],
  pricing: [
    {
      question: `How does the pricing for your SaaS solution work?`,
      answer: `Our pricing is transparent and scalable based on your needs. We offer tiered subscription plans with different features and user limits. All plans include core functionality, with premium features available in higher tiers. Custom enterprise pricing is also available for large-scale deployments.`,
    },
    {
      question: `Can I cancel my subscription at any time?`,
      answer: `Yes, you can cancel your subscription at any time without any long-term commitments or hidden fees. We operate on a monthly billing cycle, and you'll have access to the platform until the end of your current billing period.`,
    },
    {
      question: `Can I upgrade or downgrade my subscription plan?`,
      answer: `Absolutely. You can upgrade your plan at any time, with the new rate prorated for the remainder of your billing cycle. Downgrades take effect at the start of your next billing cycle to ensure uninterrupted access to your current features.`,
    },
  ],
};

// Flatten the FAQ data for search functionality
const allFaqs = Object.values(faqData).flat()

export default function FAQSectionAdvanced() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<keyof typeof faqData>("general")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleCategoryChange = (category: keyof typeof faqData) => {
    setActiveCategory(category)
    setOpenIndex(null)
    setSearchQuery("")
    setSearchResults([])
    if (searchInputRef.current) {
      searchInputRef.current.value = ""
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults([])
      return
    }

    const results = allFaqs.filter(
      (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
    )
    setSearchResults(results)
  }

  const displayFaqs = searchQuery ? searchResults : faqData[activeCategory] || []

  // Categories for the tabs
  const categories: { id: keyof typeof faqData; label: string }[] = [
    { id: "general", label: "General" },
    { id: "security", label: "Security" },
    { id: "support", label: "Support" },
    { id: "pricing", label: "Pricing" },
  ]

  return (
    <section className="w-full py-20 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[#ffcc00] text-sm font-medium uppercase tracking-wider"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2"
          >
            Everything you need to know
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto mt-4"
          >
            Here you can find answers to frequently asked questions about our transportation management platform.
          </motion.p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="block w-full p-4 pl-10 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg focus:ring-[#ffcc00] focus:border-[#ffcc00] text-white placeholder-gray-400"
              placeholder="Search for questions..."
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Category tabs - only show when not searching */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#ffcc00] text-black"
                    : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Display message when no search results */}
        {searchQuery && displayFaqs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No results found for "{searchQuery}"</p>
            <p className="mt-2">Try a different search term or browse by category</p>
          </div>
        )}

        {/* FAQ items */}
        <div className="space-y-4">
          <AnimatePresence>
            {displayFaqs.map((item: { question: string; answer: string }, index: number) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-lg">{item.question}</span>
                  <span className="ml-4 flex-shrink-0 text-[#ffcc00]">
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={openIndex !== index}
                >
                  <div className="p-6 pt-0 text-gray-400">{item.answer}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] border border-[#ffcc00] hover:bg-[#ffcc00] hover:text-black transition-colors duration-300 rounded-md px-6 py-2.5 text-sm font-medium"
          >
            Contact our support team
          </a>
        </motion.div>
      </div>
    </section>
  )
}
