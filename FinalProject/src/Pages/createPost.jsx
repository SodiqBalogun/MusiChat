import { supabase } from "../client.js";

const CreatePost = () => {

    const createNew = async (event) => {
        event.preventDefault();
        
        const postTitle = document.getElementById("titlePos").value;
        const postContent = document.getElementById("contentPos").value;
        const postImage = document.getElementById("imgPos").value;

        console.log(postTitle, postContent, postImage);

        await supabase
            .from('Posts')
            .insert({title: postTitle, content:postContent, image:postImage})
            .select();
        
      alert("New Post Addedd Successfully");
    }

    return (
        <div className="CreatePost">
            <h2> Create a new post! </h2>
            <div className="postSel">
                <div className="postTitle">
                    <textarea type="text" maxLength="150" placeholder="Title (Required)" className="smallInp" id="titlePos" /> 
                </div>
                <div className="postContent">
                    <textarea type="text" rows="7" maxLength="900" placeholder="Post Content (Optional)" className="bigInp" id="contentPos" /> 
                </div>
                <div className="postImage">
                    <textarea type="text" maxLength="200" placeholder="Image Url (Optional)" className="smallInp" id="imgPos" /> 
                </div>
                <button onClick={createNew}> Create Post </button>
            </div>
        </div>
    )
}

export default CreatePost;