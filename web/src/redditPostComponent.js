/**
 * Container for reddit posts
 * Component will query reddits API
 */
import './css/redditComponent.css';
import React, { useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
    root: {
        color: '#ffb04d',
    },
    icon: {
        fill: '#ffb04d',
    },
});

function RedditPostComponent(props) {
    const { ticker } = props;
    const [{posts, sortMethod, postID}, redditPosts] = useState({posts: [], sortMethod: "new", postID: ""});
    const prevState = usePrevious({ticker, sortMethod});
    useEffect(() => {
        async function fetchData() {
            let url;
            if (prevState !== undefined && (prevState.sortMethod !== sortMethod || prevState.ticker !== ticker)) {
                url = `http://www.reddit.com/search.json?q=${ticker}&subreddit=stocks&sort=${sortMethod}&t=all&`;
            } else {
                url = `http://www.reddit.com/search.json?q=${ticker}&subreddit=stocks&sort=${sortMethod}&t=all&after=${postID}`;
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
                <h4>What's reddit saying about {ticker}?</h4>
                <div className="parent">
                    <SortDropdown renderParentCallback={renderParentCallback}></SortDropdown>
                    <Pagination getNewPosts={getNewPosts}></Pagination>
                </div>
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

    const classes = useStyles();

    return (
        <FormControl onSubmit={handleSubmit}>
            <InputLabel classes={{root: classes.root}}>
            Sort:
            </InputLabel>
            <Select 
                style={{minWidth: 120,}} 
                inputProps={
                    {
                        classes: {
                            icon: classes.icon,
                            },
                        }
                    }
                classes={{root: classes.root}} 
                value={sortMethod} color="primary"
                onChange={handleChange}>

                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="hot">Hot</MenuItem>
                <MenuItem value="top">Top</MenuItem>
                <MenuItem value="new">New</MenuItem>
            </Select>
        </FormControl>        
    )
 }

 function Pagination(props) {
    const [postID, updatedPostID] = useState();
    const buttonStyles = makeStyles({
        root: {
           marginLeft: '5px',
           backgroundColor: '#4a4540',
           color: '#ffb04d',
        }
    });

    const classes = buttonStyles();

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
        <Button classes={classes} variant="contained" size="small" color="primary" onClick={() => handleClick('previous')}>Previous</Button>
        <Button classes={classes} variant="contained" size="small" color="primary" onClick={() => handleClick('next')}>Next</Button>
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