import React from 'react'
import './Card.css'
import Logo from './card-logo.svg';
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
          <div className="topRow" >
            <img src={Logo} alt='card logo' />
          </div>
          <div className="bottomRow">
            <div className="" >
              <span>{cardNumber}</span>
            </div>
            <div className="" style={{ display: "flex", justifyContent: 'space-between', padding: ' 0 3rem 2rem' }}>
              <span>{cardHolderName}</span>
              <div className="">
                <span>{expMM}</span>
                <span>/</span>
                <span>{expYY}</span>
              </div>

            </div>

          </div>
        </div>
      </div>}
      {
        !front && <div className='card cardBack'>
        </div>
      }
    </>

  )
}

export default Card