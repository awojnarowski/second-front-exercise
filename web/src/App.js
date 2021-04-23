import './css/redditComponent.css';
import RedditPostComponent from './redditPostComponent';
import StockTickerComponent from './stockTickerComponent';

function App() {
  return (
    <div className="parent">
      <RedditPostComponent/>
      <StockTickerComponent/>
    </div>
  );
}

export default App;
