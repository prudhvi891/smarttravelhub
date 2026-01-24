import { sanityClient } from "@/lib/sanity.client"
import { SITE_SETTINGS_QUERY } from "@/lib/queries"
import AboutHero from "@/components/about/AboutHero"
import TeamSection from "@/components/about/TeamSection"

export default async function AboutPage() {
  const settings = await sanityClient.fetch(SITE_SETTINGS_QUERY)

  return (
    <>
      <AboutHero />
      <TeamSection settings={settings} />
    </>
  )
}
