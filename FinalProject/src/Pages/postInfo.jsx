import { supabase } from "../client.js";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import thumbsUp from "../assets/thumbsUp.png";
import deleteIcon from "../assets/deleteIcon.png";
import editIconBlack from "../assets/editIconBlack.png";

const PostInfo = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching post:", error);
        } else {
            setPost(data);
            setComments(data.comments);
        }
    };

    const upVote = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .update({upvotes: post.upvotes + 1})
            .eq("id", id);

        if (error) {
            console.error("Error fetching post:", error);
        }
        console.log("Upvoted!");
        fetchPost();
    }

    const createComment = async () => {
        const userComment = document.getElementById("commentInput").value;
        if (!userComment.trim()) return; 
        const updatedComments = post.comments ? [...post.comments, userComment] : [userComment];

        const { data, error } = await supabase
            .from('Posts')
            .update({ comments: updatedComments })
            .eq("id", id);

        if (error) {
            console.error("Error updating comments:", error);
        } else {
            alert("Commented!");
            setComments(updatedComments);
            fetchPost(); 
        }
    }

    const editPost = async () => {

    }

    const deletePost = async () => {
        const { error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id);
    
        if (error) {
            console.error("Error deleting post:", error);
        } else {
            alert("Post deleted successfully!");
            navigate('/');
        }
    }

    useEffect(() => {
        fetchPost();
    }, [id]);

    console.log(post);
    console.log(comments);

    return (
        <div className="PostInfo">
            <div className="postD">
                <div className="top">
                    <h3>Posted at: {new Date(post.created_at).toLocaleString()}</h3>
                    <div className="icons">
                        <Link to ={`/post/${post.id}/edit`}> <img src={editIconBlack} alt="Black Edit Icon" height="40px" className="icon" onClick={editPost} /> </Link>
                        <img src={deleteIcon} alt="Red Delete Icon" height="40px" className="icon" onClick={deletePost} />
                    </div>
                </div>
                <h2> {post.title} </h2>
                <h3> {post.content} </h3>
                {post.image && <img src={post.image} height="200px" />}
                
                <div className="upvotes" >
                    <img src={thumbsUp} alt="Thumbs Up" height="25px" onClick={upVote}/> 
                    <p onClick={upVote}> {post.upvotes} upvotes </p>
                </div>
            </div>

            <div className="comments">
                <div className="commentPosting">
                    <textarea type="text" rows="10" maxLength="900" placeholder="Leave a Comment..." id="commentInput" />
                    <button className="postComment" onClick={createComment}> Post </button>
                </div>
                {comments && comments.map((comment) => (
                   <div key={comment.id} className="commentLone">
                        <p> - {comment} </p>
                    </div>
                )).reverse()}
            </div>
        </div>
    )
}

export default PostInfo;