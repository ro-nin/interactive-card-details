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
  return (
    <div className="App">
      <div className='content'>
        <div className='cardPreviewContainer'>
          <Card></Card>
        </div>
        <div className="gradientContainer">

        </div>
        <div className="formContainer">
          {/* <CardDetailsForm></CardDetailsForm> */}
          {/*success && thank you! ? */}

          <form onSubmit={handleSubmit(onSubmit)}>

            <label>CARDHOLDER NAME</label>
            {errors.cardHolderName && <span>Error: name</span>}
            <input defaultValue="" {...register("cardHolderName", { required: true })} />

            <label>CARD NUMBER</label>
            {errors.cardNumber && <span>Error: cardNumber</span>}
            <input {...register("cardNumber", { required: true })} />

            <label>EXP. DATE (MM/YY)</label>
            <input {...register("expMM", { required: true, maxLength: 2, min: 1, max: 12 })} />
            {errors.expMM && <span>exm month</span>}

            <input {...register("expYY", { required: true, maxLength: 2, min: 1, max: 99 })} />
            {errors.expYY && <span>exp year</span>}

            <label>CVC</label>
            {errors.cvc && <span>CVC</span>}

            <input type={"number"} {...register("cvc", { required: true, maxLength: 3, min: 1, max: 999 })} />

            <input className='confirmButton' type="submit" />
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
