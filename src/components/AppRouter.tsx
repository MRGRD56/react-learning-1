import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {routes, authorizedRedirect, unauthorizedRedirect} from "../router/routes";

function AppRouter() {
    const isAuth = false;

    return (
        <Switch>
            {routes.map(route => {
                const doAuthorizedRedirect = isAuth && (route.isAuth === false);
                const doUnauthorizedRedirect = !isAuth && (route.isAuth === true);
                const redirectPath =
                    doAuthorizedRedirect
                        ? authorizedRedirect
                        : doUnauthorizedRedirect
                            ? unauthorizedRedirect
                            : null;

                return redirectPath !== null
                    ? <Redirect path={route.path} exact={route.exact} to={redirectPath}/>
                    : <Route path={route.path} exact={route.exact} component={route.component}/>;
            })}
            <Redirect to="/404"/>
        </Switch>
    );
}

export default AppRouter;