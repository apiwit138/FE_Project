import ProductCard from "./Card"
import Link from "next/link"

export default async function VenueCatalog({
  venuesJson
}:{ 
  venuesJson: Promise<any>
}) {

  const venues = await venuesJson

  return (
    <div className="flex flex-row flex-wrap justify-around">

      {venues.data.map((item:any)=>(
        
        <Link
          href={`/venue/${item._id}`}
          className="w-1/5"
          key={item._id}
        >

          <ProductCard
            venueName={item.name}
            imgSrc={item.picture}
          />

        </Link>

      ))}

    </div>
  )
}