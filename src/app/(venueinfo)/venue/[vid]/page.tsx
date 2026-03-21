import Image from "next/image"
import getVenue from "@/libs/getVenue"

export default async function VenueDetailPage(
  { params }: { params: any } // 🔥 ใช้ any แก้ type error
) {

  const venue = await getVenue(params.vid)
  const data = venue.data

  return (
    <main className="p-5 text-center">
      <h1 className="text-xl font-medium mb-5">{data.name}</h1>

      <div className="flex flex-row justify-center items-start my-5">

        <Image
          src={data.picture}
          alt="venue"
          width={0} 
          height={0}
          sizes="100vw"
          className="w-[35%] rounded-lg shadow-md"
        />

        <div className="text-left mx-8 space-y-1">
          <div><span className="font-semibold">Name:</span> {data.name}</div>
          <div><span className="font-semibold">Address:</span> {data.address}</div>
          <div><span className="font-semibold">District:</span> {data.district}</div>
          <div><span className="font-semibold">Postal Code:</span> {data.postalcode}</div>
          <div><span className="font-semibold">Tel:</span> {data.tel}</div>
          <div><span className="font-semibold">Daily Rate:</span> {data.dailyrate}</div>
        </div>

      </div>
    </main>
  )
}