import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import PostsContainer from "../pages/PostsContainer/PostsContainer";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound/NotFound";
import GetText from "../pages/GetText/GetText";
import PostById from "../pages/PostById/PostById";

function AppRouter() {
    return (
        <Switch>
            <Route path="/" exact={true}>
                <PostsContainer/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/get_text/:text">
                <GetText/>
            </Route>
            <Route path="/posts/:id">
                <PostById/>
            </Route>
            <Route path="/404">
                <NotFound/>
            </Route>
            <Redirect to="/404"/>
        </Switch>
    );
}

export default AppRouter;