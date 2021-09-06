import React, {useState} from 'react';
import PostData from "../../models/PostData";
import PostInputMode from "../../models/PostInputMode";
import "./PostInput.scss";

interface Props {
    postData?: PostData,
    mode?: PostInputMode,
    onSubmit?: React.FormEventHandler
}

function PostInput(props: Props) {
    const [postData, setPostData] = useState<PostData>(props.postData ?? {
        title: "",
        content: ""
    });

    function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPostData({...postData, title: e.target.value});
    }

    function onContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const textArea = e.target;
        setPostData({...postData, content: textArea.value});
        textArea.style.height = "auto";
        textArea.style.height = textArea.scrollHeight + "px";
    }

    function isEdit() {
        return props.mode == PostInputMode.edit;
    }

    return (
        <form className="post-input-form d-flex flex-column card">
            <input type="text" className="post-input-title" placeholder="Title"
                   value={postData.title} onChange={onTitleChange}/>
            <textarea className="post-input-content" placeholder="Content"
                      value={postData.content} onChange={onContentChange}/>
            <div className="d-flex">
                <button type="submit" onSubmit={props.onSubmit}>SUBMIT</button>
                {
                    isEdit() && (
                        <button className="cancel" onSubmit={props.onSubmit}>CANCEL</button>
                    )
                }
            </div>
        </form>
    );
}

export default PostInput;