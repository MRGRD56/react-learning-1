import NavRoute from "./models/NavRoute";
import PostsContainer from "../pages/PostsContainer/PostsContainer";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound/NotFound";
import PostById from "../pages/PostById/PostById";
import GetText from "../pages/GetText/GetText";
import Login from "../pages/Login";
import Logout from "../pages/Logout/Logout";

export const routes: NavRoute[] = [
    { path: "/", exact: true, component: PostsContainer, isAuth: true },
    { path: "/about", component: About, isAuth: null },
    { path: "/get_text/:text", component: GetText, isAuth: true },
    { path: "/posts/:id", component: PostById, isAuth: true },
    { path: "/login", component: Login, isAuth: false },
    { path: "/logout", component: Logout, isAuth: true },
    { path: "/404", component: NotFound, isAuth: null }
];

export const authorizedRedirect = "/";
export const unauthorizedRedirect = "/login";