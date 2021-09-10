import React from 'react';
import {useParams} from "react-router-dom";
import GetTextParams from "./GetTextParams";

function GetText() {
    const params = useParams<GetTextParams>();

    return (
        <div>
            {params.text}
        </div>
    );
}

export default GetText;