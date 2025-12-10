import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Eye, Users, ArrowRight } from "lucide-react"

interface CaseStudy {
  name: string
  description: string
  metric: string
  metricLabel: string
  image: string
  url?: string
}

const caseStudies: CaseStudy[] = [
  {
    name: "Bazinga.lt",
    description: "Monetizuojamas lietuviško turinio portalas, kuriame AI pagrindu automatizuojamas akcijų leidinių publikavimas, turinio generavimas ir administravimas, bei naudojama pažangi turinio valdymo sistema (TVS).",
    metric: "25K+",
    metricLabel: "lankytojų per mėnesį",
    image:
      "https://res.cloudinary.com/drmblqben/image/upload/c_fill,g_north,w_1600,h_500,dpr_2.0,f_auto,q_98/v1764408463/Screenshot_2025-11-29_at_11.27.23_vknynm.png",
    url: "https://bazinga.lt",
  },
  {
    name: "Remontai.lt",
    description: "Paslaugų teikėjų platforma, automatizuojanti meistrų paiešką ir klientų užklausų srautą visoje Lietuvoje. Integruotos technologijos leidžia greitai ir tiksliai sujungti klientus su patikrintais specialistais vienoje vietoje.",
    metric: "+145%",
    metricLabel: "organinio srauto augimas",
    image:
      "https://res.cloudinary.com/drmblqben/image/upload/c_fill,g_north,w_1600,h_500,dpr_2.0,f_auto,q_98/v1764406951/remontai_j5mya2.png",
    url: "https://remontai.lt",
  },
  {
    name: "ChampsDiet.com",
    description: "Receptų platforma, skirta JAV rinkai, turinti daugiau nei 50,000 patiekalų ir visiškai automatizuotą receptų įkėlimo sistemą su integruotu AI turinio, vizualų kūrimu ir publikavimu.",
    metric: "7M+",
    metricLabel: "puslapių peržiūrų istorijoje",
    image:
      "https://res.cloudinary.com/drmblqben/image/upload/c_fill,g_north,w_1600,h_762,dpr_2.0,f_auto,q_98/v1764408667/Screenshot_2025-11-29_at_11.30.50_qfnidx.png",
    url: "https://champsdiet.com",
  },
]

export function ClientSuccessSection() {
  return (
    <section id="success-stories" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-700 mb-4 hover:bg-orange-100">SĖKMĖS ISTORIJOS</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Mūsų projektai</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Projektai, kurie kalba rezultatais</p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-0">
          {caseStudies.map((study, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl"
            >
              {/* Image Container */}
              <div className="relative h-80 flex items-center justify-center">
                <div className="relative w-[90%] h-[90%] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:rotate-[0.5deg]">
                  {/* Browser top bar */}
                  <div className="absolute top-0 left-0 right-0 h-7 bg-gray-100 flex items-center gap-2 px-4 border-b border-gray-200">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>

                  {/* Screenshot */}
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={`${study.name} projekto nuotrauka`}
                    className="absolute inset-x-0 bottom-0 top-7 w-full h-[calc(100%-1.75rem)] object-cover object-[left_30%]"
                  />
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Client Name */}
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {study.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm min-h-[3rem]">{study.description}</p>

                {/* Metric */}
                <div className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Users className="w-5 h-5 text-white" />}
                    {index === 1 && <TrendingUp className="w-5 h-5 text-white" />}
                    {index === 2 && <Eye className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{study.metric}</div>
                    <div className="text-xs text-gray-500">{study.metricLabel}</div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full mt-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all group/btn bg-transparent"
                  asChild
                >
                  <a href={study.url} target="_blank" rel="noopener noreferrer">
                    Peržiūrėti projektą
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}
