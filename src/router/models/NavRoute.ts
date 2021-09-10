import React from "react";

export default interface NavRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
    isAuth: boolean | null;
}