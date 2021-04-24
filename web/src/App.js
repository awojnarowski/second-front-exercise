import './css/redditComponent.css';
import RedditPostComponent from './redditPostComponent';
import StockTickerComponent from './stockTickerComponent';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    float: 'right',
  },
  input: {
      color: "#ffb04d",
  },
});

function App() {
  const [ticker, setTicker] = useState('AAPL');
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setTicker(event.target.tickerInput.value);
  }

  return (
    <div className="parent">
      <form className="formFit" onSubmit={handleSubmit}>
        <TextField
          classes={classes}  
          InputProps={{
            className: classes.input
          }}
          InputLabelProps= {{
            className: classes.input
          }}
          type="text" label="Enter A Ticker" name="tickerInput"/>
      </form>
      <RedditPostComponent ticker={ticker}/>
      <StockTickerComponent ticker={ticker}/>
    </div>
  );
}

export default App;
