import React from 'react'
import './Card.css'
// import bgCardFront from '/images/bg-card-front.png'
type Props = {
  data: { [key: string]: string }
}

const Card = ({ data }: Props) => {
  const cardHolderName = data['cardHolderName'] ?? ''
  const cardNumber = data['cardNumber'] ?? ''
  const expMM = data['expMM'] ?? ''
  const expYY = data['expYY'] ?? ''
  const cvc = data['cvc'] ?? ''

  return (
    <div className="cardsContainer">
      <div className='card cardFront'>
        <div className='cardContent' >
          <span>{cardHolderName}</span>
          <span>{cardNumber}</span>
          <span>{expMM}</span>
          <span>{expYY}</span>
          <span>{cvc}</span>
        </div>
      </div>
      <div className='card cardBack'>
      </div>
    </div>

  )
}

export default Card