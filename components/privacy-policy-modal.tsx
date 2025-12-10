"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Only render on client side to avoid hydration issues
  if (typeof window === "undefined") {
    return null
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full p-1 z-10"
              aria-label="Uždaryti"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 pr-12 space-y-6">
              <h2 id="privacy-policy-title" className="text-2xl font-bold text-gray-900">
                Duomenų apsaugos ir privatumo politika
              </h2>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Bendra informacija</h3>
                <p className="text-gray-700">
                  Ši duomenų apsaugos ir privatumo politika (toliau – Politika) apibrėžia, kaip MB „ROAS" (įmonės kodas:
                  306014878, registracijos adresas: Laisvės al. 110, LT-44253 Kaunas, tinklalapis: <a href="https://roas.lt" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">roas.lt</a> el. paštas: rokas@landing.lt, tel. +37060988386) tvarko Jūsų asmens duomenis, kai naudojatės svetaine <a href="https://landing.lt" target="_blank" rel="noopener" className="text-blue-600 underline">landing.lt</a>.
                </p>
                <p className="text-gray-700 mt-2">
                  MB „ROAS" elgiasi su Jūsų asmens duomenimis atsakingai, laikydamasi galiojančių Lietuvos Respublikos
                  įstatymų ir Europos Sąjungos Bendrojo duomenų apsaugos reglamento (BDAR).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Kokius duomenis renkame?</h3>
                <p className="text-gray-700">Mes galime rinkti šiuos Jūsų duomenis:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Vardą, pavardę</li>
                  <li>El. pašto adresą</li>
                  <li>Telefono numerį</li>
                  <li>IP adresą</li>
                  <li>Žinutės turinį</li>
                  <li>Naršymo informaciją (pvz., puslapių peržiūros, mygtukų paspaudimai ir kt.)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Kam naudojame Jūsų duomenis?</h3>
                <p className="text-gray-700">Jūsų duomenys naudojami šiais tikslais:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Atsakyti į užklausas ar pateikti pasiūlymus</li>
                  <li>Teikti užsakytas paslaugas</li>
                  <li>Siųsti su paslaugomis susijusią informaciją</li>
                  <li>Analizuoti svetainės lankomumą ir vartotojų elgseną (statistikos tikslu)</li>
                  <li>Užtikrinti svetainės saugumą ir kokybę</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Duomenų saugojimo laikotarpis</h3>
                <p className="text-gray-700">Jūsų duomenis saugosime tiek laiko, kiek:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Tai būtina aukščiau nurodytiems tikslams pasiekti</li>
                  <li>Tai numatyta Lietuvos Respublikos teisės aktuose</li>
                  <li>Arba iki tol, kol Jūs paprašysite juos ištrinti</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Duomenų perdavimas trečiosioms šalims</h3>
                <p className="text-gray-700">Jūsų asmens duomenys gali būti perduodami šiems duomenų tvarkytojams:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Formspree – kontaktų formos apdorojimui</li>
                  <li>Google – analitikai (Google Analytics, Google Ads)</li>
                  <li>Meta / Facebook – rinkodaros kampanijoms</li>
                  <li>Kitiems patikimiems paslaugų teikėjams, padedantiems administruoti svetainę ar paslaugas</li>
                </ul>
                <p className="text-gray-700 mt-2">Visi partneriai laikosi duomenų apsaugos reikalavimų.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Duomenų saugojimo vieta</h3>
                <p className="text-gray-700">Jūsų pateikti duomenys gali būti saugomi:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Paslaugų teikėjų serveriuose (pvz., Formspree, Google)</li>
                  <li>MB „ROAS" el. pašto dėžutėje, kurią valdo „Gmail" (Google Workspace)</li>
                  <li>Prireikus – kituose saugiuose, prieigą ribojančiuose sprendimuose</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Duomenys gali būti perduodami už Europos Ekonominės Erdvės ribų, tačiau tik laikantis BDAR apsaugos
                  priemonių (pvz., standartinių sutarčių sąlygų).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">7. Vartotojo teisės</h3>
                <p className="text-gray-700">Jūs turite šias teises:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Gauti informaciją apie Jūsų duomenų tvarkymą</li>
                  <li>Susipažinti su savo tvarkomais duomenimis</li>
                  <li>Prašyti ištaisyti netikslius duomenis</li>
                  <li>Reikalauti ištrinti Jūsų duomenis („teisė būti pamirštam")</li>
                  <li>Apriboti duomenų tvarkymą</li>
                  <li>Atsisakyti tiesioginės rinkodaros</li>
                  <li>
                    Pateikti skundą Valstybinei duomenų apsaugos inspekcijai (vdai.lrv.lt), jei manote, kad Jūsų teisės
                    pažeistos
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">8. Duomenų rinkimo sutikimas</h3>
                <p className="text-gray-700">
                  Duomenys renkami tik Jums išreiškus aiškų sutikimą – pažymint varnelę prie kiekvienos formos. Be šio
                  sutikimo forma negali būti pateikta.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">9. Slapukai (cookies)</h3>
                <p className="text-gray-700">
                  Svetainėje naudojami slapukai (cookies), padedantys užtikrinti svetainės veikimą ir analizuoti
                  lankytojų elgseną. Slapukus valdo ir naudoja:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Google (Analytics, Ads)</li>
                  <li>Facebook (Pixel)</li>
                  <li>CookieYes – slapukų valdymo platforma</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Naudojame „CookieYes“ sprendimą, kuris leidžia jums susipažinti su mūsų slapukų politika, pasirinkti, kuriuos slapukus priimti ar atmesti. Savo pasirinkimus galite bet kada pakeisti ištrynę slapukus naršyklės nustatymuose – apsilankius svetainėje iš naujo, vėl matysite slapukų sutikimo pranešimą. Daugiau informacijos – slapukų nustatymuose.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">10. Kontaktai</h3>
                <p className="text-gray-700">
                  Jeigu turite klausimų dėl savo duomenų apsaugos ar norite pasinaudoti savo teisėmis, prašome
                  susisiekti:
                </p>
                <p className="text-gray-700 mt-2">
                  MB „ROAS"
                  <br />
                  El. paštas: rokas@landing.lt
                  <br />
                  Tel. +37060988386
                </p>
              </section>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Uždaryti
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  // Render modal using portal to ensure it's at the root level
  return createPortal(modalContent, document.body)
}
