import React, {useState} from 'react';
import BindableInput from "../../components/UI/BindableInput/BindableInput";
import {useHistory} from "react-router-dom";

function About() {
    const [textToGet, setTextToGet] = useState("Lorem ipsum");
    const history = useHistory();

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        history.push(`/get_text/${textToGet}`);
    }

    return (
        <div className="mt-2">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At debitis dolore, enim fugiat, harum iusto
                molestias omnis quam quidem sapiente similique vitae voluptatem. Dolorum incidunt laboriosam maiores,
                molestias necessitatibus quas!
            </div>
            <form onSubmit={onFormSubmit}>
                <BindableInput type="text" value={textToGet} setValue={setTextToGet}/>
                <button className="btn btn-outline-primary">SUBMIT</button>
            </form>
            <a href="/posts/9">Get ninth post!</a>
        </div>
    );
}

export default About;