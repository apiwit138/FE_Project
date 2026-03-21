export default async function getVenues() {
  const response = await fetch(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
    {
      method: "GET",
      cache: "no-store"
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch venues")
  }

 const json = await response.json()

  return json // ⭐ ต้อง return ทั้งก้อน
}

