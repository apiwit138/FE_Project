'use client'

import { useReducer } from "react"
import ProductCard from "./Card"
import Link from "next/link"

export default function CardPanel(){

const ratingReducer = (
  ratingMap: Map<string,number>,
  action:{type:string,venueName:string,rating?:number}
)=>{

  switch(action.type){

    case "rate":{
      const newMap = new Map(ratingMap)
      newMap.set(action.venueName,action.rating ?? 0)
      return newMap
    }

    case "remove":{
      const newMap = new Map(ratingMap)
      newMap.delete(action.venueName)
      return newMap
    }

    default:
      return ratingMap
  }
}

const [ratingMap,dispatchRating] = useReducer(
  ratingReducer,
  new Map<string,number>([
    ["The Bloom Pavilion",0],
    ["The Grand Table",0],
    ["Spark Space",0]
  ])
)

/**
 * Mock Data for Demonstration Only
 */
const mockVenueRepo = [
  { vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg" },
  { vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg" },
  { vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg" }
]

return (

<div>

<div style={{
margin:"20px",
display:"flex",
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-around"
}}>

{
mockVenueRepo.map((venueItem)=>(
  <Link href={`/venue/${venueItem.vid}`} className="w-1/5" key={venueItem.vid}>
    <ProductCard
      venueName={venueItem.name}
      imgSrc={venueItem.image}
      onRating={(name,rating)=>dispatchRating({
        type:"rate",
        venueName:name,
        rating:rating
      })}
    />
  </Link>
))
}

</div>


<div className="w-full text-xl font-medium">
Venue Rating List
</div>

{

Array.from(ratingMap).map(([venue,rating])=>(

<div
key={venue}
data-testid={venue}
onClick={()=>dispatchRating({
type:"remove",
venueName:venue
})}
>

{venue} Rating : {rating}

</div>

))

}

</div>

)
}