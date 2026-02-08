import GalleryGrid from "@/components/gallery/GalleryGrid"
import GalleryHero from "@/components/gallery/GalleryHero"
import { GALLERY_QUERY } from "@/lib/queries"
import { sanityClient } from "@/lib/sanity.client"

export const revalidate = 10;
export default async function GalleryPage() {
  const gallery = await sanityClient.fetch(GALLERY_QUERY)


  return (
    <>
      <GalleryHero />
      <GalleryGrid gallery={gallery} />
    </>
  )
}
