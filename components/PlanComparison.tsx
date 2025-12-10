"use client"

import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState, useEffect } from "react"

interface PlanComparisonProps {
  children: ReactNode
}

export default function PlanComparison({ children }: PlanComparisonProps) {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={`
          max-w-[92vw] sm:max-w-xl 
          mt-4 sm:mt-16 
          p-2 sm:p-6 
          max-h-[85vh] sm:max-h-[90vh] 
          overflow-y-auto
          rounded-lg
        `}
      >
        <DialogHeader className="px-2 sm:px-0">
          <DialogTitle className="text-lg sm:text-xl font-bold">Planų palyginimas</DialogTitle>
        </DialogHeader>

        <div className="mt-2 sm:mt-4 overflow-x-auto pb-2 px-2 sm:px-0">
          <Table className="min-w-full text-xs sm:text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35%] sm:w-[40%] min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm p-2 sm:p-3">
                  Funkcija
                </TableHead>
                <TableHead className="text-center min-w-[50px] sm:min-w-[70px] text-xs sm:text-sm p-1 sm:p-3">
                  Startas
                </TableHead>
                <TableHead className="text-center min-w-[50px] sm:min-w-[70px] text-xs sm:text-sm p-1 sm:p-3">
                  Augimas
                </TableHead>
                <TableHead className="text-center min-w-[55px] sm:min-w-[70px] text-xs sm:text-sm p-1 sm:p-3">
                  Proveržis
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-3">Korekcijų ciklai</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">1</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">2</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">3</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-3">Palaikymas</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">30 d. Lite</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">3 mėn. Plus</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">3 mėn. Prior.</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-3">Turinio valdymas (TVS)</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">—</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">✔️</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">✔️</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-3">Reklamos parodymai</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">—</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">1 mln.</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">3 mln.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-3">A/B testai</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">—</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">—</TableCell>
                <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-3">✔️</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground space-y-2 px-2 sm:px-0">
          <p>
            <span className="font-bold">Korekcijų ciklas –</span> gaunate parengtą versiją, pateikiate visus pastebėjimus vienu sąrašu; visus pakeitimus įgyvendiname iškart.
          </p>
          <p>
            <span className="font-bold">Palaikymas –</span> 30/90 dienų operatyvi techninė priežiūra: saugumo atnaujinimai, našumo stebėsena ir smulkūs turinio pakeitimai.
          </p>
          <p>
            <span className="font-bold">Turinio valdymas (TVS) –</span> tekstus ir nuotraukas galėsite keisti vizualiu redaktoriumi be programavimo žinių.
          </p>
          <p>
            <span className="font-bold">Reklamos parodymai –</span> iš anksto apmokėtas banerių rodymas mūsų partnerio „Setupad" tinkle, jūsų tikslinei auditorijai.
          </p>
          <p>
            <span className="font-bold">A/B testai –</span> kuriame ir paleidžiame du puslapio variantus; rezultatus analizuojame GA4 / Hotjar ir pritaikome efektyvesnį.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
