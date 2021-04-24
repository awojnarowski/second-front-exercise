/**
 * Container for stock ticker
 * Component will query reddits API
 */
 import './css/stockTickerComponent.css';
 import React, { useState, useEffect } from 'react';
 function StockTickerComponent(props) {
    const { ticker } = props
     const [prices, stockPricing] = useState({});
 
     useEffect(() => {
         async function fetchData() {
             //TODO: Secure API key
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=TUSEDLP72TPRBL62`);
            const result = await response.json();
            //Alpha Advantage guarantees price will be in this format, global quote will be empty if the ticker doesn't exist
            if (!result.hasOwnProperty('Error Message') && Object.keys(result["Global Quote"]).length > 0) {
                stockPricing(result['Global Quote']);
            }
            else {
                stockPricing({error: "Sorry, we coudln't find your ticker!"});
            }
         }
         fetchData();
     }, [ticker]);
 
     return (
         <div className="stock-ticker">
             <header>
                 <h4>{props.ticker}</h4>
             </header>
             {Object.entries(prices).map(([key, value]) => { return (<p key={key}>{key} : {value}</p>);}) }
         </div>
     );
 }
 
 export default StockTickerComponent;