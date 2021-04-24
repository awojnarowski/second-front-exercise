/**
 * Container for reddit posts
 * Component will query reddits API
 */
import './css/redditComponent.css';
import React, { useState, useEffect, useRef} from 'react';
function RedditPostComponent(props) {
    const { ticker } = props;
    const [{posts, sortMethod, postID}, redditPosts] = useState({posts: [], sortMethod: "new", postID: ""});
    const prevState = usePrevious({ticker, sortMethod});
    useEffect(() => {
        async function fetchData() {
            let url;
            if (prevState !== undefined && (prevState.sortMethod !== sortMethod || prevState.ticker !== ticker)) {
                url = `http://www.reddit.com/search.json?q=${ticker}&subreddit:stocks&sort=${sortMethod}&t=all&`;
            } else {
                url = `http://www.reddit.com/search.json?q=${ticker}&subreddit:stocks&sort=${sortMethod}&t=all&after=${postID}`;
            }

            const response = await fetch(url);
            const results = await response.json();
            const postsFromResponse = results.data.children.map(post => {
                return {
                    title: post.data.title,
                    name: post.data.name,
                    url: post.data.url
                }
            });

            redditPosts({posts: postsFromResponse, sortMethod: sortMethod, postID: postID});
        }
        fetchData();
    }, [ticker, sortMethod, postID]);

    const renderParentCallback = (sortMethod) => {
        redditPosts({posts:posts, sortMethod: sortMethod, postID: postID})
    }

    const getNewPosts = (postID) => {
        redditPosts({posts:posts, sortMethod: sortMethod, postID: postID})
    }
    return (
        <div className="reddit-post">
            <header>
                <h4>What's r/stocks saying about {ticker}?</h4> 
                <SortDropdown renderParentCallback={renderParentCallback}></SortDropdown>
                <Pagination getNewPosts={getNewPosts}></Pagination>
            </header>
            {posts.map(post => <div data-key={post.name} key={post.name}> <a href={post.url}>{post.title}</a></div>)}
        </div>
    );
}

function SortDropdown(props) {
    const [sortMethod, dropdownState] = useState('new');

    const handleChange = (event) => {
        dropdownState(event.target.value);
        props.renderParentCallback(event.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }
      
    return (
        <form onSubmit={handleSubmit}>
        <label>
          Sort:
          <select value={sortMethod} onChange={handleChange}>
            <option value="relevance">Relevance</option>
            <option value="hot">Hot</option>
            <option value="top">Top</option>
            <option value="new">New</option>
          </select>
        </label>
      </form>        
    )
 }

 function Pagination(props) {
    const [postID, updatedPostID] = useState();

    const handleClick = (event) => {
        const posts = document.querySelectorAll('div[data-key]');
        let newID;
        if (event === 'previous') {
            newID = posts[0].getAttribute('data-key');
        } else {
            newID = posts[posts.length -1].getAttribute('data-key');
        }

        updatedPostID(newID);
        props.getNewPosts(newID);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }
      
    return (
        <form onSubmit={handleSubmit}>
        <button onClick={() => handleClick('previous')}>Previous</button>
        <button onClick={() => handleClick('next')}>Next</button>
      </form>        
    )   
 }


//helper hook to track if any states change we need to remove the post ID
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}
export default RedditPostComponent;