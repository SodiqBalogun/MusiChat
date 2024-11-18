import { supabase } from "../client.js";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
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
            setTitle(data.title);
            setContent(data.content);
            setImage(data.image);
        }
    };

    const updatePost = async () => {
        const { error } = await supabase
            .from('Posts')
            .update({ title, content, image })
            .eq('id', id);

        if (error) console.error("Error updating post:", error);
        else {
            alert("Post updated successfully!");
            navigate(`/post/${id}`);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    return (
        <div className="EditPost">
            <h3> Editing Post </h3>
            <div className="postSel">
                <div className="postTitle">
                    <input type="text" placeholder="Title (Required)" className="smallInp" id="titlePos" value={title} onChange={(e) => setTitle(e.target.value)} /> 
                </div>
                <div className="postContent">
                    <input type="text" placeholder="Post Content (Optional)" className="bigInp" id="contentPos" value={content} onChange={(e) => setContent(e.target.value)} /> 
                </div>
                <div className="postImage">
                    <input type="text" placeholder="Image Url (Optional)" className="smallInp" id="imgPos" value={image} onChange={(e) => setImage(e.target.value)} /> 
                </div>
                <button onClick={updatePost}> Update Post </button>
            </div>
        </div>
    )
}

export default EditPost;