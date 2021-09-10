import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import ContentRoot from "../UI/ContentRoot/ContentRoot";
import AppRouter from "../AppRouter";

function App() {
    return (
        <BrowserRouter>
            <ContentRoot>
                <AppRouter/>
            </ContentRoot>
        </BrowserRouter>
    );
}

export default App;
