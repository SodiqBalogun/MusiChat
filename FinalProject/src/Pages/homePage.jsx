import { supabase } from "../client.js";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage = ( {search} = props ) => {
    const [posts, setPosts] = useState([]); // Store the posts
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("recency");

    const fetchPosts = async () => {
        let query = supabase.from('Posts').select('*');

        // Sort based on the selected sorting option
        if (sortBy === "recency") {
            query = query.order('created_at', { ascending: true });
        } else if (sortBy === "popularity") {
            query = query.order('upvotes', { ascending: true });
        }

        const { data, errorT } = await query;

        if (errorT) {
            console.error("Error fetching posts:", errorT);
            setError(errorT.message);
        } else {
            setPosts(data); 
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [sortBy]); 

    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="HomePage">
            <div className="filtersFull">
                <h3> Order by: </h3>
                <div className="filters">
                    <button className="newFilter" onClick={() => setSortBy("recency")}> Newest </button>
                    <button className="popFilter" onClick={() => setSortBy("popularity")}> Most Popular </button>
                </div>
            </div>
            {error && <p>Error: {error}</p>} {/* Display error if exists */}
            {filteredPosts.length === 0 ? (
                <p>No posts available.</p> // Show message when no posts are available
            ) : (
                <div>
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="post">
                            <Link to={`/post/${post.id}`}>
                                <div className="timeandEdit">
                                    <p>Posted at: {new Date(post.created_at).toLocaleString()}</p>
                                    {post.edited && <h4 style={{color: "#ddd492"}}> *edited </h4>}
                                </div>
                                <h2>{post.title}</h2>
                                <p> {post.upvotes} upvotes </p>
                            </Link>
                        </div>
                    )).reverse()}
                </div>
            )}
        </div>
    )
}

export default HomePage;