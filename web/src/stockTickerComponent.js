/**
 * Container for stock ticker
 * Component will query reddits API
 */
 import './css/stockTickerComponent.css';
 import React, { useState, useEffect } from 'react';
 function StockTickerComponent(props) {
 
     const [price, redditPosts] = useState([]);
 
     useEffect(() => {
         async function fetchData() {
             //TODO: Secure API key
            const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=TUSEDLP72TPRBL62');
            const result = await response.json();
            //Alpha Advantage guarantees price will be in this format
            redditPosts(result['Global Quote']["05. price"]);
         }
         fetchData();
     }, [props.id]);
 
     return (
         <div className="stock-ticker">
             <header>
                 <p>AAPL Price!</p>
                 <div>{price}</div>
             </header>
         </div>
     );
 }
 
 export default StockTickerComponent;