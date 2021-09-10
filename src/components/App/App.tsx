import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import ContentRoot from "../UI/ContentRoot/ContentRoot";
import AppRouter from "../AppRouter";
import {AuthContext, IAuthContext} from 'src/models/AuthContext';

function App() {
    const [isAuth, _setIsAuth] = useState<boolean>(loadIsAuth());

    function loadIsAuth(): boolean {
        return localStorage.getItem("AUTH") === "true";
    }

    function setIsAuth(newIsAuth: boolean) {
        _setIsAuth(newIsAuth);
        localStorage.setItem("AUTH", newIsAuth ? "true" : "false");
    }

    return (
        <AuthContext.Provider value={{
            isAuth: isAuth,
            setIsAuth: setIsAuth
        }}>
            <BrowserRouter>
                <ContentRoot>
                    <AppRouter/>
                </ContentRoot>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
