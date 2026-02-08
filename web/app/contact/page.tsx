import ContactOptionsSection from "@/components/contact/ContactOptionsSection"
import { sanityClient } from "@/lib/sanity.client"
import { SITE_SETTINGS_QUERY } from "@/lib/queries"
import ContactHero from "@/components/contact/ContactHero"

export const revalidate = 10;
export default async function ContactPage() {
  const settings = await sanityClient.fetch(SITE_SETTINGS_QUERY)

  return (
    <>
      <ContactHero />
      <ContactOptionsSection settings={settings} />
    </>
  )
}
