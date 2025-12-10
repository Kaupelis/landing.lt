"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, Palette, Code, BarChart3, Globe, Rocket, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { EmailForm } from "@/components/email-form"
import { ClientSuccessSection } from "@/components/client-success-section"
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, Loader2 } from "lucide-react"
import PricingSection from "@/components/PricingSection"

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [contactAgreedToPolicy, setContactAgreedToPolicy] = useState(false)
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [showContactThankYou, setShowContactThankYou] = useState(false)
  const [isContactPolicyModalOpen, setIsContactPolicyModalOpen] = useState(false)

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!contactAgreedToPolicy) {
      alert("Turite sutikti su duomenų apsaugos ir privatumo politika.")
      return
    }

    setIsContactSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", contactForm.name)
      formData.append("email", contactForm.email)
      formData.append("phone", contactForm.phone)
      formData.append("message", contactForm.message)
      formData.append("source", "NR.3 – Kontaktų forma")
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
        setContactForm({ name: "", email: "", phone: "", message: "" })
        setContactAgreedToPolicy(false)
        setShowContactThankYou(true)

        // Hide thank you message after 5 seconds
        setTimeout(() => {
          setShowContactThankYou(false)
        }, 5000)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      alert("Klaida siunčiant formą. Prašome bandyti dar kartą.")
    } finally {
      setIsContactSubmitting(false)
    }
  }

  const openContactPolicyModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsContactPolicyModalOpen(true)
  }

  return (
    <div onClick={() => setIsMobileMenuOpen(false)}>
      <div className="min-h-screen bg-white" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">landing.lt</span>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="#contact">
                <Button className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white">
                  Gauti pasiūlymą
                </Button>
              </Link>

              {/* Mobile Menu Container */}
              <div className="relative">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-blue-600 transition-all"
                  aria-label={isMobileMenuOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[60]">
                    <Link
                      href="#"
                      className="block px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Pagrindinis
                    </Link>
                    <Link
                      href="#services"
                      className="block px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Paslaugos
                    </Link>
                    <Link
                      href="#process"
                      className="block px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Procesas
                    </Link>
                    <Link
                      href="#pricing"
                      className="block px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kainodara
                    </Link>
                    <Link
                      href="#success-stories"
                      className="block px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sėkmės istorijos
                    </Link>
                    <Link
                      href="#contact"
                      className="block px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kontaktai
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <Badge className="bg-orange-100 text-orange-700 px-4 py-2 text-sm font-medium hover:bg-orange-100">
                  LANDING PUSLAPIŲ KŪRIMAS
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Kuriame landing puslapius,
                  <br />
                  kurie konvertuoja
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Efektyvūs puslapiai, kurie paverčia lankytojus klientais – greičiau ir pelningiau. Prisijunkite prie
                  sėkmingų klientų šiandien.
                </p>

                {/* Email Form */}
                <EmailForm sourceLabel="NR.1 - Hero section" sourceValue="NR.1 – Hero sekcija" />

                {/* Popular Services */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-gray-600 font-medium">Dažniausiai užsakančios verslo sritys:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      E-komercija
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Paslaugų verslai
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      SaaS / IT sprendimai
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Startuoliai
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Mokymai / Edukacija
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Renginiai / Festivaliai / Konferencijos
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      NT agentūros
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Medicina ir grožio klinikos
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Finansinės paslaugos
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Statybos ir renovacija
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-orange-100">
                      Kiti.
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="relative">
                <div className="relative">
                  <div className="w-full h-[500px] md:h-[700px] flex items-center justify-center">
                    <img
                      src="/images/design-mode/LandingLT7_gnlwq1(1).png"
                      alt="Two cheerful people jumping - landing page development team"
                      className="w-full h-full object-contain scale-125"
                      loading="eager"
                      width={600}
                      height={700}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologijos, kurias naudojame</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Naudojame pažangiausias ir patikimiausias technologijas, kad sukurtume greitai veikiančius ir modernius
                landing puslapius
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
              {/* Technology icons remain the same */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
                    <path
                      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z"
                      fill="#61DAFB"
                    />
                    <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1" />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="8"
                      ry="3"
                      fill="none"
                      stroke="#61DAFB"
                      strokeWidth="1"
                      transform="rotate(60 12 12)"
                    />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="8"
                      ry="3"
                      fill="none"
                      stroke="#61DAFB"
                      strokeWidth="1"
                      transform="rotate(120 12 12)"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">React</span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-.5 17.93c-4.63-.47-8.43-4.27-8.9-8.9h8.9v8.9zm1 0V11.07h8.9c-.47 4.63-4.27 8.43-8.9 8.9z"
                      fill="#000000"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Next.js</span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <rect x="1" y="1" width="22" height="22" rx="2" fill="#3178C6" />
                    <path
                      d="M12.5 15.8c.7 0 1.3-.2 1.7-.6.4-.4.6-.9.6-1.5s-.2-1.1-.6-1.5c-.4-.4-1-.6-1.7-.6s-1.3.2-1.7.6c-.4.4-.6.9-.6 1.5s.2 1.1.6 1.5c.4.4 1 .6 1.7.6zm-4.8 1.5v-1.2h1.5v-4.2h-1.5V9.7h3.2v5.4h1.5v1.2H7.7z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">TypeScript</span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"
                      fill="#06B6D4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Tailwind CSS</span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M.5 0h23l-2 22-10-3-10 3L-.5 0zm8 8V6h8v2H8zm0 4v-2h8v2H8zm0 4v-2h5v2H8z" fill="#F7931E" />
                    <path d="M12 2v20l8-2.5L22 2H12z" fill="#FF6600" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">MDX</span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <rect x="2" y="2" width="20" height="20" rx="2" fill="#000000" />
                    <path d="M8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" fill="white" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">ShadCN/UI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-orange-100 text-orange-700 mb-4">MŪSŲ PASLAUGOS</Badge>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Ką siūlome</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pilnas landing puslapių kūrimo ciklas - nuo strategijos iki paleidimo ir optimizavimo
              </p> 
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-all border-orange-100 hover:border-orange-200">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <Palette className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">UI/UX Dizainas</h3>
                  <p className="text-gray-600 mb-6">
                    Kuriame įtraukiantį ir aiškų dizainą, kuris paverčia lankytojus klientais
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Prisitaikantis (responsive) dizainas
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Konversijų didinimo sprendimai
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      A/B testai geriausiam rezultatui
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all border-blue-100 hover:border-blue-200">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Code className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Programavimas</h3>
                  <p className="text-gray-600 mb-6">
                    Programuojame naudojant pažangias technologijas – greitis, stabilumas bei SEO ir AEO draugiškumas
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      React / Next.js pagrindu
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Greitas užkrovimas
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Paieškos sistemoms pritaikyta struktūra
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all border-green-100 hover:border-green-200">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <BarChart3 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Optimizavimas</h3>
                  <p className="text-gray-600 mb-6">
                    Nuolat analizuojame ir tobuliname jūsų puslapį – kad rezultatai augtų
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Konversijų analizė ir tobulinimas
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Google Analytics ir kitų įrankių integracija
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Tęstinis palaikymas ir optimizacija
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <Badge className="bg-orange-100 text-orange-700 mb-4">MŪSŲ PROCESAS</Badge>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Kaip dirbame</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Patikrintas 4 žingsnių procesas, kuris užtikrina kokybišką rezultatą
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Strategija</h3>
                <p className="text-gray-600">Išanalizuojame jūsų tikslus, auditoriją ir konkurentus</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Palette className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Dizainas</h3>
                <p className="text-gray-600">Kuriame unikalų dizainą, orientuotą į konversijas</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Realizacija</h3>
                <p className="text-gray-600">Programuojame ir integruojame visas reikalingas funkcijas</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">4. Startas</h3>
                <p className="text-gray-600">Paleidžiame jūsų puslapį ir stebime pirmuosius rezultatus</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        <ClientSuccessSection />

        {/* Contact Section */}
        <section id="contact" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-orange-100 text-orange-700 mb-4">KONTAKTAI</Badge>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Susisiekite</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Turite klausimų ar norite aptarti projektą? Mielai išklausysime jūsų poreikius
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Left side - Profile & About */}
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src="/images/design-mode/Rokas-Kaupelis_tdqts5(1).png"
                      alt="Rokas Kaupelis"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-purple-600 font-medium text-sm mb-1">Vadovas</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Rokas Kaupelis</h3>
                    <a
                      href="https://www.linkedin.com/in/kaupelis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Linkedin.com/in/kaupelis/
                    </a>
                  </div>
                </div>

                {/* About Text */}
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Sveiki! Esu <span className="font-semibold text-orange-600">Rokas Kaupelis</span> – sertifikuotas
                    skaitmeninės rinkodaros specialistas, turintis daugiau nei 10 metų patirtį komunikacijos strategijų
                    kūrime.
                  </p>
                  <p>
                    Per savo karjerą prisidėjau prie įvairių projektų – nuo inovatyvių startuolių iki didžiųjų Baltijos
                    šalių reklamos agentūrų kampanijų. Šiuo metu daugiausia dėmesio skiriu kompleksinių skaitmeninės
                    rinkodaros projektų valdymui: nuo į konversijas orientuotų „landing" puslapių kūrimo iki reklamos
                    kampanijų paleidimo.
                  </p>
                  <p>
                    Mano sprendimai ne tik patrauklūs vizualiai, bet ir orientuoti į realius rezultatus. Tvirtai tikiu,
                    kad profesionaliai sukurtas „landing" puslapis gali reikšmingai padidinti jūsų verslo rezultatus.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-3 bg-purple-50 rounded-lg p-4 flex-1">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Telefono numeris</div>
                      <div className="font-semibold text-gray-900">+370 609 88386</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-orange-50 rounded-lg p-4 flex-1">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">El. paštas</div>
                      <div className="font-semibold text-gray-900">rokas@landing.lt</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Parašykite mums</h3>

                <AnimatePresence>
                  {showContactThankYou ? (
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
                    <motion.form onSubmit={handleContactSubmit} className="space-y-6">
                      {/* Honeypot field */}
                      <input type="text" name="_gotcha" style={{ display: "none" }} />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vardas</label>
                          <input
                            type="text"
                            name="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                            disabled={isContactSubmitting}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">El. paštas</label>
                          <input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                            disabled={isContactSubmitting}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefono numeris</label>
                        <input
                          type="tel"
                          name="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+370 600 12345"
                          disabled={isContactSubmitting}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Žinutė</label>
                        <textarea
                          rows={5}
                          name="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Parašykite savo klausimą ar projekto aprašymą..."
                          required
                          disabled={isContactSubmitting}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        ></textarea>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy-policy-contact"
                            type="checkbox"
                            checked={contactAgreedToPolicy}
                            onChange={(e) => setContactAgreedToPolicy(e.target.checked)}
                            required
                            disabled={isContactSubmitting}
                            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                        <label htmlFor="privacy-policy-contact" className="ml-2 text-sm text-gray-600">
                          Sutinku su{" "}
                          <a
                            href="#"
                            onClick={openContactPolicyModal}
                            className="text-orange-500 hover:text-orange-600 underline"
                          >
                            duomenų apsaugos ir privatumo politika
                          </a>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={isContactSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-lg disabled:opacity-50"
                      >
                        {isContactSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Siunčiama...
                          </>
                        ) : (
                          "Siųsti žinutę"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-gray-300 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500 rounded-lg p-2">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-xl font-medium">landing.lt</span>
                </div>

                <div className="space-y-1 text-base">
                  <p>MB „ROAS"</p>
                  <p>Įmonės kodas: 306014878</p>
                  <p>PVM mokėtojo kodas: LT100018998018</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:text-right flex flex-col justify-end">
                <div className="space-y-1 text-base mt-8">
                  <p>Telefonas: +370 609 88386</p>
                  <p>El. paštas: rokas@landing.lt</p>
                  <p>© {new Date().getFullYear()} • landing.lt</p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Privacy Policy Modal for Contact Form */}
        <PrivacyPolicyModal isOpen={isContactPolicyModalOpen} onClose={() => setIsContactPolicyModalOpen(false)} />
      </div>
    </div>
  )
}
