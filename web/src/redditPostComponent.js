/**
 * Container for reddit posts
 * Component will query reddits API
 */
import './css/redditComponent.css';
import React, { useState, useEffect } from 'react';
function RedditPostComponent(props) {
    const { ticker } = props;
    const [results, redditPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://www.reddit.com/search.json?q=${ticker}+subreddit:stocks+sort=new`);
            const results = await response.json();
            const postTitles = results.data.children.map(post => post.data.title);

            redditPosts(postTitles);
        }
        fetchData();
    }, [ticker]);

    return (
        <div className="reddit-post">
            <header>
                <p>What's r/stocks saying about {ticker}?</p>
                {results.map(result => <div> {result} </div>)}
            </header>
        </div>
    );
}

export default RedditPostComponent;