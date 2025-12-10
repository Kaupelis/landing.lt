import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Landing puslapių kūrimas | Konversijoms optimizuoti sprendimai - Landing.lt",
  description:
    "Kuriame landing puslapius, kurie paverčia lankytojus klientais. Profesionalus puslapių kūrimas verslui Lietuvoje ir užsienyje.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://landing.lt",
    title: "Landing puslapių kūrimas | Konversijoms optimizuoti sprendimai - Landing.lt",
    description:
      "Kuriame landing puslapius, kurie paverčia lankytojus klientais. Profesionalus puslapių kūrimas verslui Lietuvoje ir užsienyje.",
    siteName: "landing.lt",
    images: [
      {
        url: "https://landing.lt/og-image.png",
        width: 1200,
        height: 630,
        alt: "landing.lt - Konvertuojantys landing puslapiai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing puslapių kūrimas | Konversijoms optimizuoti sprendimai - Landing.lt",
    description:
      "Kuriame landing puslapius, kurie paverčia lankytojus klientais. Profesionalus puslapių kūrimas verslui Lietuvoje ir užsienyje.",
    images: ["https://landing.lt/og-image.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lt">
      <body className={inter.className}>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T9NZZ4MM');
            `,
          }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T9NZZ4MM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* Schema.org Organization JSON-LD */}
        <Script
          id="schema-org-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Landing.lt",
                url: "https://landing.lt",
                logo: "https://landing.lt/logo.png",
                description: "Landing puslapių kūrimas – greitai, efektyviai, su konversijomis.",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+37060988386",
                  contactType: "customer service",
                  areaServed: "LT",
                },
                sameAs: ["https://www.linkedin.com/in/kaupis/"], // Corrected LinkedIn URL
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Rokas Kaupelis",
                jobTitle: "Skaitmeninės rinkodaros specialistas, įmonės vadovas",
                url: "https://landing.lt",
                worksFor: {
                  "@type": "Organization",
                  name: "Landing.lt",
                },
                sameAs: ["https://www.linkedin.com/in/kaupelis/", "https://roas.lt"],
                email: "rokas@landing.lt",
                telephone: "+37060988386",
                image: "https://res.cloudinary.com/drmblqben/image/upload/v1748282047/Rokas-Kaupelis_tdqts5.png",
              },
            ]),
          }}
        />
      </body>
    </html>
  )
}
