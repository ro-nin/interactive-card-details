import React from 'react'
import './Card.css'
// import bgCardFront from '/images/bg-card-front.png'
type Props = {
  data?: { [key: string]: string }
  front: boolean //face to draw
}

const Card = ({ data, front }: Props) => {
  const cardHolderName = data ? data['cardHolderName'] ?? '' : null
  const cardNumber = data ? data['cardNumber'] ?? '' : null
  const expMM = data ? data['expMM'] ?? '' : null
  const expYY = data ? data['expYY'] ?? '' : null
  const cvc = data ? data['cvc'] ?? '' : null

  return (
    <>
      {front && <div className='card cardFront'>
        <div className='cardContent' >
          <span>{cardHolderName}</span>
          <span>{cardNumber}</span>
          <span>{expMM}</span>
          <span>{expYY}</span>
          <span>{cvc}</span>
        </div>
      </div>}
      {!front && <div className='card cardBack'>
      </div>}
    </>

  )
}

export default Card