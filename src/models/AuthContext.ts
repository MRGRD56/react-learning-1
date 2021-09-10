import {createContext} from "react";
import Auth from "./Auth";

const AuthContext = createContext<Auth>({});
export default AuthContext;