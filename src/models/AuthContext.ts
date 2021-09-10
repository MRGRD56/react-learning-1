import {createContext} from "react";

export interface IAuthContext {
    isAuth?: boolean;
    setIsAuth?: (isAuth: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({});