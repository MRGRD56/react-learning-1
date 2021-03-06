import React, {useContext} from 'react';
import AuthContext from "../models/AuthContext";

function Login() {
    const authContext = useContext(AuthContext);

    function onClick() {
        authContext.setIsAuth?.(true);
    }

    return (
        <div className="mt-2">
            <button className="btn btn-outline-primary" onClick={onClick}>LOG IN</button>
        </div>
    );
}

export default Login;