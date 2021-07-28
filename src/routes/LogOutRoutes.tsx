import {RouteChildType, RouteType} from "../types/routes";
import {
    Sliders,
} from "react-feather";
import React from "react";
import async from "../components/Async";

// DashBoard
const Dashboard = async(() => import("../pages/dashboard/Dashboard"));


export const LogOutRoutes = (): Array<RouteType> => {
    let routeMenus: Array<RouteType> = [];

    routeMenus.push(
        {
            id: "DashBoard",
            path: "/aCarLog",
            header: "Test",
            icon: <Sliders/>,
            component: Dashboard,
            children: null,
        });

    return routeMenus;
}

export default LogOutRoutes;