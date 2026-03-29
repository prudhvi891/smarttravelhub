import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { sanityClient } from "@/lib/sanity.client"
import { SITE_SETTINGS_QUERY } from "@/lib/queries"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export const metadata = {
  title: "Smart Travel Hub – Plan Trips Easily",
  description:
    "Smart Travel Hub helps you plan trips, manage itineraries, and explore destinations efficiently.",
  keywords: [
    "travel planner",
    "trip planner",
    "itinerary app",
    "travel app India",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  
  return (
    <html lang="en">
      <body className="bg-[#0B0F14] text-white">
        <Navbar settings={settings} />
        <main>{children}</main>

         {/* Floating WhatsApp */}
        <FloatingWhatsApp phoneNumber={settings?.whatsappNumber} />
        <Footer settings={settings} />
      </body>
    </html>
  )
}
