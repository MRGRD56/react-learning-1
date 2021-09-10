import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {routes, authorizedRedirect, unauthorizedRedirect} from "../router/routes";
import {AuthContext} from "../models/AuthContext";

function AppRouter() {
    const authContext = useContext(AuthContext);

    return (
        <Switch>
            {routes.map(route => {
                const doAuthorizedRedirect = authContext.isAuth && (route.isAuth === false);
                const doUnauthorizedRedirect = !authContext.isAuth && (route.isAuth === true);
                const redirectPath =
                    doAuthorizedRedirect
                        ? authorizedRedirect
                        : doUnauthorizedRedirect
                            ? unauthorizedRedirect
                            : null;

                return redirectPath !== null
                    ? <Redirect key={route.path} path={route.path} exact={route.exact} to={redirectPath}/>
                    : <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>;
            })}
            <Redirect to="/404"/>
        </Switch>
    );
}

export default AppRouter;