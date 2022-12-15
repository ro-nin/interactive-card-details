import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Card from './Components/Card';
import CardDetailsForm from './Components/CardDetailsForm';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <div className="gradientContainer"></div>
        <div className="formContainer">
          <CardDetailsForm></CardDetailsForm>
          {/*success && thank you! ? */}
          <button className='confirmButton'>Confirm</button>
        </div>
        <div className='cardPreviewContainer'>
          <Card></Card>
        </div>
      </div>
    </div>
  );
}

export default App;
