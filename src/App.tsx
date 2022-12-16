import React, { useState } from 'react';
import './App.css';
import Card from './Components/Card';
import { useForm, SubmitHandler } from "react-hook-form";
import CardForm from './Components/CardForm';
import IconComplete from './icon-complete.svg';

type CardInputs = {
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

  const restart = () => {
    reset(); //reset form to default state
    setCardCreated(!cardCreated)
  }

  return (
    <div className="App">
      <div className={`cardPage`}>
        <div className="gradientContainer" >
          <div className="cardsPreviewContainer">
            <div className="cardFrontShift">
              <Card data={watchFormFields} front={true}></Card>
            </div>
            <div className="cardBackShift">
              <Card front={false}></Card>
            </div>
          </div>
        </div>
        {!cardCreated && <CardForm handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} />
        }
        {cardCreated && <div className="completedContainer">
          <img src={IconComplete} alt='complete icon'></img>
          <h1>THANK YOU!</h1>
          <h2>We've added your card details</h2>
          <button style={{ marginTop: '3em' }} className='confirmButton' onClick={() => restart()}>Continue</button>
        </div>
        }
      </div>
    </div>
  );
}

export default App;



