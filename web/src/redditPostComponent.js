/**
 * Container for reddit posts
 * Component will query reddits API
 */
import './css/redditComponent.css';
import React, { useState, useEffect } from 'react';
function RedditPostComponent(props) {

    const [results, redditPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://www.reddit.com/search.json?q=AAPL+subreddit:stocks+sort=new');
            const results = await response.json();
            const postTitles = results.data.children.map(post => post.data.title);

            redditPosts(postTitles);
        }
        fetchData();
    }, [props.id]);

    return (
        <div className="reddit-post">
            <header>
                <p>Reddit Posts!</p>
                {results.map(result => <div> {result} </div>)}
            </header>
        </div>
    );
}

export default RedditPostComponent;