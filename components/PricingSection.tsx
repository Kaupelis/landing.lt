import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PlanComparison from "@/components/PlanComparison"

const plans = [
  {
    name: "Startas",
    price: "€499",
    oldPrice: "€699",
    description: "Skirta greitam kampanijos startui",
    features: [
      "Vienas puslapis (programavimas)",
      "Google Tag Manager + GA4 integracija",
      "1 korekcijų ciklas",
      "30 dienų Lite palaikymas",
    ],
    cta: "Pradėti",
  },
  {
    name: "Augimas",
    price: "€1,490",
    oldPrice: "€1,890",
    save: "Sutaupote €400",
    description: "Populiariausias",
    features: [
      "Iki 5 puslapių (dizainas + programavimas)",
      "Vizualus turinio valdymas (TVS)",
      "1 banerių paketas + 1 mln. parodymų",
      "Google Tag Manager + GA4 integracija",
      "2 korekcijų ciklai",
      "3 mėn. Plus palaikymas",
    ],
    cta: "Rezervuoti skambutį",
    highlighted: true,
  },
  {
    name: "Proveržis",
    price: "€2,390",
    oldPrice: "€2,890",
    save: "Sutaupote €500",
    description: "Pilnas konversijos paketas",
    features: [
      "Iki 10 puslapių + A/B variantai (dizainas + programavimas)",
      "Vizualus turinio valdymas (TVS)",
      "2 banerių paketai + 3 mln. parodymų",
      "Google Tag Manager + GA4 ir Hotjar integracija",
      "Prioritetinis palaikymas 3 mėn.",
      "3 korekcijų ciklai",
    ],
    cta: "Gauti pasiūlymą",
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl text-center space-y-6">
        <h2 className="text-4xl font-bold">Aiški kainodara</h2>
        <p className="text-muted-foreground">Pasirinkite planą pagal savo augimo etapą.</p>
      </div>

      <div className="mt-12 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              plan.highlighted ? "border-4 border-primary shadow-xl scale-105" : ""
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Populiariausias
              </span>
            )}

            <CardHeader className="gap-2">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="mb-4">
                {plan.oldPrice && <span className="line-through text-muted-foreground mr-2">{plan.oldPrice}</span>}
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.save && <p className="text-xs text-muted-foreground mt-1">{plan.save}</p>}
              </div>

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Link href="#contact" className="w-full">
                <Button className="w-full">{plan.cta}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <PlanComparison>
          <button className="mt-8 text-sm underline underline-offset-4 hover:text-primary">
            Palyginti planus detaliau
          </button>
        </PlanComparison>
      </div>
    </section>
  )
}
