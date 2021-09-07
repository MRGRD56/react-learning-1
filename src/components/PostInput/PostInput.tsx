import React, {useState} from 'react';
import PostData from "../../models/PostData";
import PostInputMode from "../../models/PostInputMode";
import "./PostInput.scss";

interface Props {
    postData?: PostData,
    mode?: PostInputMode,
    addPost: (postData: PostData) => void
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
        return props.mode === PostInputMode.edit;
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.addPost(postData);
        setPostData({
            ...postData,
            title: "",
            content: ""
        });
    }

    return (
        <form className={`post-input-form d-flex flex-column card`} onSubmit={onSubmit}>
            <input type="text" className="post-input-title" placeholder="Title"
                   value={postData.title} onChange={onTitleChange}/>
            <textarea className="post-input-content" placeholder="Content"
                      value={postData.content} onChange={onContentChange}/>
            <div className="d-flex">
                <button type="submit" className="btn btn-outline-primary">
                    SUBMIT
                </button>
                {
                    isEdit() && (
                        <button type="button" className="btn btn-outline-secondary">CANCEL</button>
                    )
                }
            </div>
        </form>
    );
}

export default PostInput;