import React, { useState } from 'react';
import './App.css';
import Card from './Components/Card';
import { useForm, SubmitHandler } from "react-hook-form";
import CardForm from './Components/CardForm';
import IconComplete from './icon-complete.svg';

export type CardInputs = {
  cardHolderName: string,
  cardNumber: string,
  expMM: string,
  expYY: string,
  cvc: string;
};

function App() {

  const [cardCreated, setCardCreated] = useState(false)
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<CardInputs>();
  const onSubmit: SubmitHandler<CardInputs> = data => setCardCreated(!cardCreated);
  const watchFormFields = watch()
  //TODO, add guard for empty string return from watch() that resets placeholder fields ^
  const cardHolderName = watchFormFields['cardHolderName'] ?? 'Name Surname'
  const cardNumber = watchFormFields['cardNumber'] ?? '0000000000000000'
  const expMM = watchFormFields['expMM'] ?? '00'
  const expYY = watchFormFields['expYY'] ?? '00'
  const cvc = watchFormFields['cvc'] ?? '000'

  const restart = () => {
    reset(); //reset form to default state
    setCardCreated(!cardCreated)
  }

  return (
    <div className="App">
      <main className={`cardPage`}>
        <div className="gradientContainer" >
          <div className="cardsPreviewContainer">
            <div className="cardFrontShift">
              <Card front={true} cardHolderName={cardHolderName} cardNumber={cardNumber} expMM={expMM} expYY={expYY} ></Card>
            </div>
            <div className="cardBackShift">
              <Card front={false} cvc={cvc} ></Card>
            </div>
          </div>
        </div>
        {!cardCreated && <CardForm handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} />
        }
        {cardCreated && <div className="completedContainer">
          <div className="" style={{ width: '50%' }}>
            <img src={IconComplete} alt='complete icon'></img>
            <h1>THANK YOU!</h1>
            <h2>We've added your card details</h2>
            <button style={{ marginTop: '3em' }} className='confirmButton' onClick={() => restart()}>Continue</button>
          </div>
        </div>
        }
      </main>
    </div>
  );
}

export default App;



