"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal"

interface PrizeWheelProps {
  onSpinComplete?: (prize: string) => void
}

export function PrizeWheel({ onSpinComplete }: PrizeWheelProps) {
  const [email, setEmail] = useState("")
  const [agreedToPolicy, setAgreedToPolicy] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  // Prize segments - 8 equal segments of 45 degrees each
  const prizes = [
    { label: "5% nuolaida", color: "#ef4444" },
    { label: "10% nuolaida", color: "#3b82f6" },
    { label: "15% nuolaida", color: "#10b981" },
    { label: "Nemokama konsultacija", color: "#9333ea" },
    { label: "20% nuolaida", color: "#f97316" },
    { label: "25% nuolaida", color: "#ec4899" },
    { label: "30% nuolaida", color: "#eab308" },
    { label: "35% nuolaida", color: "#6366f1" },
  ]

  // Reset wheel position when component mounts
  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(0deg)`
    }
  }, [])

  const openPolicyModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPolicyModalOpen(true)
  }

  const spinWheel = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      alert("Prašome įvesti galiojantį el. pašto adresą")
      return
    }

    if (!agreedToPolicy) {
      alert("Turite sutikti su duomenų apsaugos ir privatumo politika.")
      return
    }

    setIsSpinning(true)

    // Submit to Formspree first
    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("source", "NR.2 – Laimės ratas")
      formData.append("_next", "https://landing.lt/aciu.html")

      const response = await fetch("https://formspree.io/f/xldbqpnv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      alert("Klaida siunčiant formą. Prašome bandyti dar kartą.")
      setIsSpinning(false)
      return
    }

    // Random duration between 4-6 seconds
    const baseDuration = 4000
    const variationRange = 2000
    const duration = baseDuration + Math.random() * variationRange

    // Simplified easing
    const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"

    // Random number of full rotations (3-5 full spins)
    const minRotations = 3
    const maxRotations = 5
    const fullRotations = Math.floor(Math.random() * (maxRotations - minRotations + 1)) + minRotations

    // Calculate rotation to land on "Nemokama konsultacija"
    const consultationSegmentCenter = 157.5
    const arrowPosition = 270
    const targetRotation = arrowPosition - consultationSegmentCenter

    // Add small random variation
    const randomOffset = (Math.random() - 0.5) * 6

    // Calculate total rotation
    const totalRotation = fullRotations * 360 + targetRotation + randomOffset

    // Apply the rotation
    const wheelElement = document.getElementById("spinning-wheel")
    if (wheelElement) {
      wheelElement.style.transition = `transform ${duration}ms ${easing}`
      wheelElement.style.transform = `rotate(${totalRotation}deg)`
    }

    setRotation(totalRotation)

    // Show result after spinning completes
    setTimeout(() => {
      setIsSpinning(false)
      setHasSpun(true)
      setShowResult(true)
      setShowThankYou(true)

      // Clear form
      setEmail("")
      setAgreedToPolicy(false)

      // Hide thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false)
      }, 5000)

      if (onSpinComplete) {
        onSpinComplete("Nemokama konsultacija")
      }
    }, duration)
  }

  return (
    <div className="w-full max-w-7xl px-4 lg:px-16 mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Sukite ratą ir
            <br />
            <span className="text-orange-500 text-3xl lg:text-5xl">laimėkite nuolaidą!</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Jaučiatės laimingai? Įveskite savo el. paštą ir sukite laimės ratą! Galite laimėti iki 35% nuolaidą arba
            nemokamą konsultaciją.
          </p>

          <AnimatePresence>
            {showThankYou ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
              >
                <div className="text-green-800 font-medium">
                  Ačiū! Jūsų prašymą gavome. Susisieksime artimiausiu metu.
                </div>
              </motion.div>
            ) : (
              <motion.form onSubmit={spinWheel} className="space-y-4">
                {/* Honeypot field */}
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Įveskite savo el. paštą"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                  disabled={isSpinning || hasSpun}
                  required
                />

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy-policy-wheel"
                      type="checkbox"
                      checked={agreedToPolicy}
                      onChange={(e) => setAgreedToPolicy(e.target.checked)}
                      required
                      disabled={isSpinning || hasSpun}
                      className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <label htmlFor="privacy-policy-wheel" className="ml-2 text-sm text-gray-600">
                    Sutinku su{" "}
                    <a href="#" onClick={openPolicyModal} className="text-orange-500 hover:text-orange-600 underline">
                      duomenų apsaugos ir privatumo politika
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                  disabled={isSpinning || hasSpun}
                >
                  {isSpinning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      SUKASI...
                    </>
                  ) : hasSpun ? (
                    "AČIŪ!"
                  ) : (
                    "SUKTI LAIMĖS RATĄ 🎯"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Nemokama registracija
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Garantuotas prizas
            </div>
          </div>

          {/* Prize Display */}
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-orange-200">
              <div className="text-sm text-gray-600 mb-1">Jūsų prizas:</div>
              <div className="text-xl font-bold text-purple-600">
                {showResult ? "Nemokama konsultacija! 🎉" : "Sukite ratą ir sužinokite! 🎯"}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Spinning Wheel */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Arrow Pointer */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
              <div className="relative">
                {/* Arrow Shadow */}
                <div className="absolute top-1 left-1 w-0 h-0 border-l-[25px] border-r-[25px] border-t-[40px] border-l-transparent border-r-transparent border-t-gray-400 opacity-30"></div>
                {/* Main Arrow */}
                <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-600 drop-shadow-lg"></div>
                {/* Arrow Highlight */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-red-400"></div>
                {/* Arrow Base */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-red-600 rounded-t-lg"></div>
              </div>
            </div>

            {/* Wheel Container */}
            <div className="relative perspective-1000">
              {/* Spinning Wheel */}
              <div
                ref={wheelRef}
                id="spinning-wheel"
                className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full border-8 border-white shadow-2xl relative overflow-hidden bg-white transition-transform duration-[6000ms] ease-out"
                role="img"
                aria-label="Laimės ratas su prizais"
                aria-describedby="wheel-description"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Prize Segments using SVG */}
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
                  {/* Outer Circle */}
                  <circle cx="200" cy="200" r="198" fill="none" stroke="#e5e7eb" strokeWidth="4" />

                  {/* Prize Segments */}
                  {prizes.map((prize, index) => {
                    const startAngle = index * 45
                    const endAngle = (index + 1) * 45

                    // Calculate path for each segment
                    const startAngleRad = (startAngle * Math.PI) / 180
                    const endAngleRad = (endAngle * Math.PI) / 180

                    const x1 = 200 + 190 * Math.cos(startAngleRad)
                    const y1 = 200 + 190 * Math.sin(startAngleRad)
                    const x2 = 200 + 190 * Math.cos(endAngleRad)
                    const y2 = 200 + 190 * Math.sin(endAngleRad)

                    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

                    const pathData = `M 200 200 L ${x1} ${y1} A 190 190 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                    // Calculate text position and rotation
                    const midAngle = (startAngle + endAngle) / 2
                    const midAngleRad = (midAngle * Math.PI) / 180

                    const textRadius = 125
                    const textX = 200 + textRadius * Math.cos(midAngleRad)
                    const textY = 200 + textRadius * Math.sin(midAngleRad)

                    let textRotation = midAngle
                    if (midAngle > 90 && midAngle < 270) {
                      textRotation = midAngle + 180
                    }

                    return (
                      <g key={index}>
                        {/* Segment */}
                        <path d={pathData} fill={prize.color} stroke="#ffffff" strokeWidth="2" />

                        {/* Text */}
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize="13"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                          style={{
                            textShadow: "0px 1px 2px rgba(0,0,0,0.8)",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                          }}
                        >
                          {prize.label === "Nemokama konsultacija" ? (
                            <>
                              <tspan x={textX} dy="-7">
                                Nemokama
                              </tspan>
                              <tspan x={textX} dy="16">
                                konsultacija
                              </tspan>
                            </>
                          ) : prize.label.includes("nuolaida") ? (
                            <>
                              <tspan x={textX} dy="-7">
                                {prize.label.split(" ")[0]}
                              </tspan>
                              <tspan x={textX} dy="16">
                                {prize.label.split(" ")[1]}
                              </tspan>
                            </>
                          ) : (
                            prize.label
                          )}
                        </text>
                      </g>
                    )
                  })}

                  {/* Center Circle */}
                  <circle cx="200" cy="200" r="30" fill="white" stroke="#d1d5db" strokeWidth="2" />
                  <circle cx="200" cy="200" r="20" fill="url(#grad1)" />
                  <circle cx="200" cy="200" r="10" fill="white" />

                  {/* Gradient definition */}
                  <defs>
                    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Wheel Base/Stand */}
            <div className="mt-4 mx-auto w-40 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-full"></div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-orange-600">100%</div>
          <div className="text-gray-600">Laimėtojų</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600">1523+</div>
          <div className="text-gray-600">Dalyvių</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600">35%</div>
          <div className="text-gray-600">Max nuolaida</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600">48 val.</div>
          <div className="text-gray-600">Galioja</div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
      <div id="wheel-description" className="sr-only">
        Laimės ratas su 8 segmentais: 5%, 10%, 15%, 20%, 25%, 30%, 35% nuolaida ir nemokama konsultacija
      </div>
    </div>
  )
}
