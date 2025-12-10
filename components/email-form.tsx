"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal"

interface EmailFormProps {
  sourceLabel: string
  sourceValue: string
}

export function EmailForm({ sourceLabel, sourceValue }: EmailFormProps) {
  const [email, setEmail] = useState("")
  const [agreedToPolicy, setAgreedToPolicy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!agreedToPolicy) {
      alert("Turite sutikti su duomenų apsaugos ir privatumo politika.")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("form-source", sourceValue)
      formData.append("_gotcha", "")
      formData.append("_next", "https://landing.lt/aciu.html")

      const response = await fetch("https://formspree.io/f/xldbqpnv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        // Clear form and show thank you message
        setEmail("")
        setAgreedToPolicy(false)
        setShowThankYou(true)

        // Hide thank you message after 5 seconds
        setTimeout(() => {
          setShowThankYou(false)
        }, 5000)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      alert("Klaida siunčiant formą. Prašome bandyti dar kartą.")
    } finally {
      setIsLoading(false)
    }
  }

  const openPolicyModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPolicyModalOpen(true)
  }

  return (
    <div className="w-full max-w-lg">
      <AnimatePresence>
        {showThankYou ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <div className="text-green-800 font-medium">Ačiū! Jūsų prašymą gavome. Susisieksime artimiausiu metu.</div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 1 }} className="bg-white rounded-lg shadow-lg p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Įveskite savo el. pašto adresą..."
                  required
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="El. pašto adresas"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 whitespace-nowrap disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Siunčiama...
                    </>
                  ) : (
                    "Gauti pasiūlymą"
                  )}
                </Button>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`privacy-policy-${sourceLabel}`}
                    type="checkbox"
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    required
                    disabled={isLoading}
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <label htmlFor={`privacy-policy-${sourceLabel}`} className="ml-2 text-sm text-gray-600">
                  Sutinku su{" "}
                  <a href="#" onClick={openPolicyModal} className="text-orange-500 hover:text-orange-600 underline">
                    duomenų apsaugos ir privatumo politika
                  </a>
                </label>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <PrivacyPolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
    </div>
  )
}
