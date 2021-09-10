import React, {useContext, useEffect} from 'react';
import AuthContext from "../../models/AuthContext";
import {useHistory} from "react-router-dom";

function Logout() {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        authContext.setIsAuth!(false);
        history.push("/login");
    }, []);

    return (
        <div>Logging out...</div>
    );
}

export default Logout;