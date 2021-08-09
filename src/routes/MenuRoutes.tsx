import {RouteChildType, RouteType} from "../types/routes";
import {
    Codesandbox,
    Monitor,
    ShoppingCart,
    PieChart,
    Sliders,
    Users, IconProps, Calendar, Grid, Shield, Play, Smartphone, GitPullRequest,
} from "react-feather";
import React from "react";
import async from "../components/Async";

// DashBoard
const Dashboard = async(() => import("../pages/dashboard/Dashboard"));
const CarMaster = async(() => import("../pages/master/VehicleMaster"));
const VehiclePage = async(() => import("../pages/vehicle/VehiclePage"));


export const MenuRoutes = (): Array<RouteType> => {
    let routeMenus: Array<RouteType> = [];

    routeMenus.push(
        {
            id: "DashBoard",
            path: "/aCarLog",
            header: "Test",
            icon: <Sliders/>,
            component: Dashboard,
            children: null,
        },
        {
            id: "Master",
            path: "/aCarLog/master",
            header: "Test",
            icon: <Sliders/>,
            component: null,
            children: [
                {
                    path: "/aCarLog/master/default",
                    name: "Default",
                    component: Dashboard,
                },
                {
                    path: "/aCarLog/master/carMaster",
                    name: "CarMaster",
                    component: CarMaster,
                }
            ],
        },
        {
            id: "VehiclePage",
            path: "/aCarLog/VehiclePage",
            header: "VehiclePage",
            icon: <Sliders/>,
            component: VehiclePage,
            children: null,
        }
        );

    return routeMenus;
}

export default MenuRoutes;