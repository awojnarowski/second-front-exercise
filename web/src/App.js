import './css/redditComponent.css';
import RedditPostComponent from './redditPostComponent';
import StockTickerComponent from './stockTickerComponent';
import React, { useState } from 'react';

function App() {
  const [ticker, setTicker] = useState('AAPL');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTicker(event.target.tickerInput.value);
  }

  return (
    <div className="parent">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="AAPL" name="tickerInput"/>
      </form>
      <RedditPostComponent ticker={ticker}/>
      <StockTickerComponent ticker={ticker}/>
    </div>
  );
}

export default App;
