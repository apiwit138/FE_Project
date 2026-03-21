'use client'

import { useState } from 'react'
import InteractiveCard from './InteractiveCard'
import Image from 'next/image'
import { Rating } from '@mui/material'

export default function ProductCard({
  venueName,
  imgSrc,
  onRating
}: {
  venueName: string
  imgSrc: string
  onRating?: (venueName:string,rating:number)=>void
}) {

  const [rating, setRating] = useState<number | null>(0)

  return (
    <div className='w-full h-[300px] rounded-lg shadow-lg'>

      <InteractiveCard contentName={venueName}>

        <div className='w-full h-[70%] relative rounded-t-lg'>
          <Image
            src={imgSrc}
            alt='Product Picture'
            fill={true}
            className='object-cover rounded-lg'
          />
        </div>

        <div className='w-full h-[30%] p-[10px]'>

          <div>{venueName}</div>

          <Rating
            id={`${venueName} Rating`}
            name={`${venueName} Rating`}
            data-testid={`${venueName} Rating`}
            value={rating}
            onClick={(e)=>{e.stopPropagation(), e.preventDefault()}}
            onChange={(event,newValue)=>{
            event.stopPropagation()
            setRating(newValue)
            onRating?.(venueName,newValue ?? 0) // ใส่ ? กัน error
            }}
          />

        </div>

      </InteractiveCard>

    </div>
  )
}