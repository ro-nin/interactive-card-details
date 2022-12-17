import React from 'react'
import './Card.css'
import Logo from './card-logo.svg';
type Props = {
  cardHolderName?: string,
  cardNumber?: string, //16 digits
  expMM?: string,
  expYY?: string,
  cvc?: string;
  front: boolean //face to draw
}
const Card = ({
  cardHolderName,
  cardNumber,
  expMM,
  expYY,
  cvc,
  front
}: Props) => {


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
          <span>{cvc}</span>
        </div>
      }
    </>
  )
}
export default Card