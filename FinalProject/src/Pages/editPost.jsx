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
            .update({ title, content, image, edited: true })
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
            <h2> Editing Post </h2>
            <div className="postSel">
                <div className="postTitle">
                    <textarea type="text" maxLength="150" placeholder="Title (Required)" className="smallInp" id="titlePos" value={title} onChange={(e) => setTitle(e.target.value)} /> 
                </div>
                <div className="postContent">
                    <textarea type="text" rows="7" maxLength="900" placeholder="Post Content (Optional)" className="bigInp" id="contentPos" value={content} onChange={(e) => setContent(e.target.value)} /> 
                </div>
                <div className="postImage">
                    <textarea type="text" rows="7" maxLength="2000" placeholder="Image Url (Optional)" className="smallInp" id="imgPos" value={image} onChange={(e) => setImage(e.target.value)} /> 
                </div>
                <button onClick={updatePost}> Update Post </button>
            </div>
        </div>
    )
}

export default EditPost;