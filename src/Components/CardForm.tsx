import React from 'react'
import './CardForm.css'
type Props = {
  handleSubmit: any, onSubmit: any, errors: any, register: any
}

const CardForm = ({ handleSubmit, onSubmit, errors, register }: Props) => {


  return <div className="formContainer">
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='cardHolderName'>CARDHOLDER NAME</label>
      {/* TODO pattern for NAME input field (no numbers?) */}
      <input aria-invalid={errors.cardHolderName ? true : false}
        className={`inputLarge ${errors.cardHolderName ? 'errorInput' : ''}`} placeholder='e.g. Jane Appleseed'
        defaultValue="" {...register("cardHolderName", { maxLength: { value: 20, message: 'Name too long (max 20 characters.)' }, required: 'Insert a full name.' })} />
      <span className={`errorLabel`}>{errors.cardHolderName ? errors.cardHolderName.message : ``}</span>

      <label id='cardNumber' htmlFor='cardNumber'>CARD NUMBER</label>
      <input aria-labelledby='cardNumber' aria-invalid={errors.cardNumber ? true : false}
        placeholder='e.g. 1234 1234 1234 1234'
        className={`inputLarge ${errors.cardNumber ? 'errorInput' : ''}`}
        {...register("cardNumber", {
          setValueAs: (value: string) => {
            if (value) {
              //TODO clean and improve
              const cleanedValued = value.replaceAll('-', '').trim().replaceAll(' ', '');
              return cleanedValued;
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
            message: 'Wrong format, numbers only'
          }, required: 'Insert your card number.'
        })} />
      <span className={`errorLabel`}>{errors.cardNumber ? errors.cardNumber.message : ``}</span>

      <div className="" style={{ width: `100%`, display: "flex", alignItems: "start", gap: `2rem` }}>
        <div className="" style={{ flexGrow: `1`, flexShrink: `0`, textAlign: `left` }}>

          <label>EXP. DATE (MM/YY)</label>
          <div className="" style={{ display: "flex", alignItems: "start", flexDirection: `column`, flexShrink: 0 }}>
            <div className="" style={{ display: "flex", gap: `.5rem` }}>
              <input aria-invalid={errors.expMM ? true : false} placeholder='MM' className={`inputSmall ${errors.expMM ? 'errorInput' : ''}`} {...register("expMM", {
                pattern: {
                  value: /^[0-9]?[0-9]$/,
                  message: 'Insert a valid month.'
                }, required: 'Insert a month.', maxLength: 2, min: { value: 1, message: 'Month not in range 1-12' }, max: { value: 12, message: 'Month not in range 1-12' }
              })} />
              <input aria-invalid={errors.expYY ? true : false} placeholder='YY' className={`inputSmall ${errors.expYY ? 'errorInput' : ''}`} {...register("expYY", {
                pattern: {
                  value: /^[2-9][0-9]$/,
                  message: 'Insert a valid year.'
                }, required: 'Insert a year.', maxLength: 2, min: { value: 1, message: 'Year not in range 1-99' }, max: { value: 99, message: 'Year not in range 1-99' }
              })} />
            </div>
            <div className="">
              {errors.expMM ? <span className={`errorLabel`}>{errors.expMM.message}</span> : <span style={{ display: `block`, }}> </span>}
              {errors.expYY ? <span className={`errorLabel`}>{errors.expYY.message}</span> : <span style={{ display: `block` }}> </span>}
            </div>

          </div>
        </div>
        <div className="" style={{ flexGrow: `1`, textAlign: `left` }}>
          <label>CVC</label>
          <div className="">
            <input aria-invalid={errors.cvc ? true : false} placeholder='e.g. 123' className={`${errors.cvc ? 'errorInput' : ''}`} style={{ width: `100%`, }} type={"number"} {...register("cvc", { valueAsNumber: true, required: 'Insert a valid CVC', maxLength: 3, min: 111, max: 999 })} />
            <span className={`errorLabel`}>{errors.cvc ? errors.cvc.message : ``}</span>
          </div>
        </div>

      </div>
      <button data-testid="confirmButton" disabled={errors.cardHolderName != null ||
        errors.cardNumber != null
        || errors.cvc != null
        || errors.expMM != null
        || errors.expYY != null
        ? true : false} className={`confirmButton`} type="submit" value='Confirm' >Confirm</button>
    </form>
  </div>;

}

export default CardForm