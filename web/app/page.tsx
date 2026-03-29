import AnimatedHero from "@/components/AnimatedHero"
import ReviewsSection from "@/components/ReviewsSection"
import ScrollToHash from "@/components/ScrollToHash"
import StatsSection from "@/components/StatsSection"
import ToursSection from "@/components/ToursSection"
import WhyChooseSTH from "@/components/WhyChooseSTH"
import { SITE_SETTINGS_QUERY } from "@/lib/queries"
import { sanityClient } from "@/lib/sanity.client"
import { Suspense } from "react"

export const revalidate = 60;

export const metadata = {
  title: "Smart Travel Hub | Best Travel Planner App",
  description:
    "Plan your trips easily with Smart Travel Hub. Create itineraries and explore destinations.",
};

export default async function HomePage() {
  
  const settings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  
  return (
    <>

      <Suspense fallback={null}>
        <ScrollToHash />
      </Suspense>

      <AnimatedHero />

      <ToursSection />

      <WhyChooseSTH />

      <StatsSection settings={settings} />

      <ReviewsSection />

    </>
  )
}
