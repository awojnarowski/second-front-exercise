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
            const postTitles = results.data.children.map(post => {
                return {
                    title: post.data.title,
                    name: post.data.name,
                    url: post.data.url
                }
            });

            redditPosts(postTitles);
        }
        fetchData();
    }, [ticker]);

    return (
        <div className="reddit-post">
            <header>
                <h4>What's r/stocks saying about {ticker}?</h4>
            </header>
            {results.map(result => <div key={result.name}> <a href={result.url}>{result.title}</a></div>)}
            
        </div>
    );
}

export default RedditPostComponent;