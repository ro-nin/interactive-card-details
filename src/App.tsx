import React from 'react';
import './App.css';
import Card from './Components/Card';
import CardDetailsForm from './Components/CardDetailsForm';
import { useForm, SubmitHandler } from "react-hook-form";

type CardInputs = {
  cardHolderName: string,
  cardNumber: string,
  expMM: string,
  expYY: string,
  cvc: string;
};

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CardInputs>();
  const onSubmit: SubmitHandler<CardInputs> = data => console.log(data);

  const watchFormFields = watch()

  return (
    <div className="App">
      <div className=' cardPage '>
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
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>CARDHOLDER NAME</label>
            <input className='inputLarge' defaultValue="" {...register("cardHolderName", { required: true })} />
            {errors.cardHolderName && <span>Error: name</span>}
           
            <label>CARD NUMBER</label>
            <input className='inputLarge' {...register("cardNumber", { required: true })} />
            {errors.cardNumber && <span>Error: cardNumber</span>}
            
            <div className="" style={{ width: '100%', display: "flex", gap: "2rem", alignItems: "start" }}>
              <div className="" style={{ alignItems: "start", textAlign: 'left' }}>
                <label>EXP. DATE (MM/YY)</label>
                <div className="" style={{ display: "flex", gap: ".4rem", alignItems: "start" }}>
                  <input className='inputSmall' {...register("expMM", { required: true, maxLength: 2, min: 1, max: 12 })} />
                  {errors.expMM && <span>exm month</span>}
                  <input className='inputSmall' {...register("expYY", { required: true, maxLength: 2, min: 1, max: 99 })} />
                  {errors.expYY && <span>exp year</span>}
                </div>
              </div>
              <div className="" style={{ flexGrow: '1', flexShrink: '0', alignItems: "start", alignSelf: "end", textAlign: 'left' }}>
                <label>CVC</label>
                <div className="" style={{ display: 'flex', }}>
                  <input className='' style={{ flexGrow: '1', flexShrink: '0', }} type={"number"} {...register("cvc", { required: true, maxLength: 3, min: 1, max: 999 })} />
                  {errors.cvc && <span>CVC</span>}
                </div>
              </div>


            </div>


            <input className='confirmButton' type="submit" />
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
