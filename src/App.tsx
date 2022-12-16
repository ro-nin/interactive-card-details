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
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>CARDHOLDER NAME</label>
            <input className={`inputLarge ${errors.cardHolderName ? 'errorInput' : ''}`} defaultValue="" {...register("cardHolderName", { required: true })} />
            <span className={`errorLabel`}>{errors.cardHolderName ? "Error: cardHolderName" : ``}</span>

            <label>CARD NUMBER</label>
            <input className={`inputLarge ${errors.cardNumber ? 'errorInput' : ''}`} {...register("cardNumber", { required: true })} />
            <span className={`errorLabel`}>{errors.cardNumber ? "Error: cardNumber" : ``}</span>

            <div className="" style={{ width: `100%`, display: "flex", alignItems: "start", gap: `2rem` }}>
              <div className="" style={{ flexGrow: `1`, flexShrink: `0`, textAlign: `left` }}>

                <label>EXP. DATE (MM/YY)</label>
                <div className="" style={{ display: "flex", alignItems: "start", flexDirection: `column`, flexShrink: 0 }}>
                  <div className="" style={{ display: "flex", gap: `.5rem` }}>
                    <input className={`inputSmall ${errors.expMM ? 'errorInput' : ''}`} {...register("expMM", { required: true, maxLength: 2, min: 1, max: 12 })} />
                    <input className={`inputSmall ${errors.expYY ? 'errorInput' : ''}`} {...register("expYY", { required: true, maxLength: 2, min: 1, max: 99 })} />
                  </div>
                  <div className="">
                    {errors.expMM ? <span className={`errorLabel`} >exm month</span> : <span style={{ display: `block`, }}> </span>}
                    {errors.expYY ? <span className={`errorLabel`} >exp year</span> : <span style={{ display: `block` }}> </span>}
                  </div>

                </div>
              </div>
              <div className="" style={{ flexGrow: `1`, textAlign: `left` }}>
                <label>CVC</label>
                <div className="" >
                  <input className={`${errors.cvc ? 'errorInput' : ''}`} style={{ width: `100%`, }} type={"number"} {...register("cvc", { required: true, maxLength: 3, min: 1, max: 999 })} />
                  <span className={`errorLabel`}>{errors.cvc ? "CVC" : ``}</span>
                </div>
              </div>

            </div>
            <input className={`confirmButton`} type="submit" />
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
