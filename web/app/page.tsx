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
    {/* ✅ SEO CONTENT (VERY IMPORTANT) */}
      <section>
        <h1>Smart Travel Hub – Your Personal Travel Planner</h1>

        <p>
          Smart Travel Hub is a powerful travel planning application that helps you
          create itineraries, organize trips, and explore destinations efficiently.
          Whether you're planning a vacation or a business trip, our platform makes
          travel management simple and seamless.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Create and manage travel itineraries</li>
          <li>Explore destinations بسهولة</li>
          <li>Download trip plans as PDF</li>
          <li>Organize trips in one place</li>
        </ul>
      </section>
      
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
