import getVenues from "@/libs/getVenues"
import VenueCatalog from "@/components/VenueCatalog"

export default async function VenuePage() { // 🔥 ต้อง async

  const venues = await getVenues() // 🔥 ต้อง await

  return (
    <main>
      <VenueCatalog venuesJson={venues} />
    </main>
  )
}