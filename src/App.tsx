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
            <input aria-invalid={errors.cardHolderName ? true : false} className={`inputLarge ${errors.cardHolderName ? 'errorInput' : ''}`} defaultValue="" {...register("cardHolderName", { maxLength: 35, required: 'Insert a full name.' })} />
            <span className={`errorLabel`}>{errors.cardHolderName ? errors.cardHolderName.message : ``}</span>

            <label>CARD NUMBER</label>
            <input aria-invalid={errors.cardNumber ? true : false} className={`inputLarge ${errors.cardNumber ? 'errorInput' : ''}`} {...register("cardNumber", {
              setValueAs: value => {
                if (value) {
                  //TODO clean and improve
                  const cleanedValued = value.replaceAll('-', '').trim().replaceAll(' ', '')
                  console.log('setval before', value, 'returning:', cleanedValued);
                  return cleanedValued

                }
              },
              // onChange: e => {
              //   if (e) {
              //     const value = e.target.value.trim().replaceAll('-', '').replaceAll(' ', '').split('')
              //     //TODO set state to change input field manually
              //     console.log('onchange', value);
              //   }
              // },
              pattern: {
                value: /^([0-9]{4}[- ]?){4}$/,
                message: 'Insert valid card format (16 digits).'
              }, required: 'Insert your card number.'
              // , maxLength: { value: 16, message: 'Insert 16 characters' }, minLength: { value: 16, message: 'Insert 16 characters' },


            })} />
            <span className={`errorLabel`}>{errors.cardNumber ? errors.cardNumber.message : ``}</span>

            <div className="" style={{ width: `100%`, display: "flex", alignItems: "start", gap: `2rem` }}>
              <div className="" style={{ flexGrow: `1`, flexShrink: `0`, textAlign: `left` }}>

                <label>EXP. DATE (MM/YY)</label>
                <div className="" style={{ display: "flex", alignItems: "start", flexDirection: `column`, flexShrink: 0 }}>
                  <div className="" style={{ display: "flex", gap: `.5rem` }}>
                    <input aria-invalid={errors.expMM ? true : false} className={`inputSmall ${errors.expMM ? 'errorInput' : ''}`} {...register("expMM", {
                      pattern: {
                        value: /^[0-9]?[0-9]$/,
                        message: 'Insert a valid month.'
                      }, required: 'Insert a month.', maxLength: 2, min: { value: 1, message: 'Month not in range 1-12' }, max: { value: 12, message: 'Month not in range 1-12' }
                    })} />
                    <input aria-invalid={errors.expYY ? true : false} className={`inputSmall ${errors.expYY ? 'errorInput' : ''}`} {...register("expYY", {
                      pattern: {
                        value: /^[2-9][0-9]$/,
                        message: 'Insert a valid year.'
                      }, required: 'Insert a year.', maxLength: 2, min: { value: 1, message: 'Year not in range 1-99' }, max: { value: 99, message: 'Year not in range 1-99' }
                    })} />
                  </div>
                  <div className="">
                    {errors.expMM ? <span className={`errorLabel`} >{errors.expMM.message}</span> : <span style={{ display: `block`, }}> </span>}
                    {errors.expYY ? <span className={`errorLabel`} >{errors.expYY.message}</span> : <span style={{ display: `block` }}> </span>}
                  </div>

                </div>
              </div>
              <div className="" style={{ flexGrow: `1`, textAlign: `left` }}>
                <label>CVC</label>
                <div className="" >
                  <input aria-invalid={errors.cvc ? true : false} className={`${errors.cvc ? 'errorInput' : ''}`} style={{ width: `100%`, }} type={"number"} {...register("cvc", { valueAsNumber: true, required: 'Insert a valid CVC', maxLength: 3, min: 111, max: 999 })} />
                  <span className={`errorLabel`}>{errors.cvc ? errors.cvc.message : ``}</span>
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
