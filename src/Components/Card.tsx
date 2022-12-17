import React from 'react'
import './Card.css'
import Logo from './card-logo.svg';
// import bgCardFront from '/images/bg-card-front.png'
type Props = {
  data?: { [key: string]: string }
  front: boolean //face to draw
}

const Card = ({ data, front }: Props) => {
  const cardHolderName = data ? data['cardHolderName'] ?? 'Name Surname' : null
  const cardNumber = data ? data['cardNumber'] ?? '0000000000000000' : null
  const expMM = data ? data['expMM'] ?? '00' : null
  const expYY = data ? data['expYY'] ?? '00' : null
  const cvc = data ? data['cvc'] ?? '000' : null

  return (
    <>
      {front && <div className='card cardFront'>
        <div className='cardContent' >
          <div className="topRow" >
            <img src={Logo} alt='card logo' />
          </div>
          <div className="bottomRow" >
            <div className="cardNumber"  >
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
          <span>{cvc }</span>
        </div>
      }
    </>

  )
}

export default Card