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
          <div className="bottomRow" style={{ padding: '3rem 3rem 4rem 3rem' }}>
            <div className="" style={{ textAlign: "left", paddingBottom: '2rem', fontSize: '1.5rem' }} >
              <span>{cardNumber?.slice(0, 4)} </span>
              <span>{cardNumber?.slice(4, 8)} </span>
              <span>{cardNumber?.slice(8, 12)} </span>
              <span>{cardNumber?.slice(12, 16)}</span>
            </div>
            <div className="" style={{ display: "flex", justifyContent: 'space-between', }}>
              <span>{cardHolderName}</span>
              <div className="">
                <span>{expMM?.length === 1 ? `0${expMM}` : expMM}</span>
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