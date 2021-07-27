import {RouteChildType, RouteType} from "../types/routes";
import {
    Codesandbox,
    Monitor,
    ShoppingCart,
    PieChart,
    Sliders,
    Users, IconProps, Calendar, Grid, Shield, Play, Smartphone, GitPullRequest,
} from "react-feather";
import {UserMenu} from "../model/Menu";
import React from "react";
import async from "../components/Async";
import Routes from "./Routes";

// DashBoard
const Dashboard = async(() => import("../pages/dashboard/Dashboard"));
const CarMaster = async(() => import("../pages/master/CarMaster"));
const Login = async(() => import("../pages/login/Login"));
const Error404 = async(() => import("../pages/exception/Page404"));


type ComponentDictionary = {
    key: string;
    component: any;
};

export const MenuRoutes = (menus: UserMenu[]) => {
    let routeComponent: ComponentDictionary[] = [];
    //routeComponent.push({key: "order.storage", component: Storage});


    const searchComponent = (key: string) => {
        let searchData = routeComponent.find(i => i.key == key);

        if (searchData != undefined) {
            return searchData.component;
        } else {
            return Error404;
        }
    };

    function menuIconSwitching(menuCode: string) {

        switch (menuCode) {
            case "2": // master
                return <Codesandbox/>;
                break;
            case "3": // device
                return <Smartphone/>;
                break;
            case "4": // operation
                return <GitPullRequest/>;
                break;
            case "5": // order
                return <Calendar/>;
                break;
            case "6": // stock
                return <Grid/>;
                break;
            case "7": // scada
                return <Shield/>;
                break;
            case "8": // simulation
                return <Play/>;
                break;
            default:
                return <Monitor/>;
                break;
        }
    }

    function routeMenuSeting(): Array<RouteType> {
        let routeMenus: Array<RouteType> = [];

        routeMenus.push(
            {
                id: "DashBoard",
                path: "/",
                header: "Test",
                icon: <Sliders/>,
                component: Dashboard,
                children: null,
            },
            {
                id: "Login",
                path: "/Login",
                header: "Test",
                icon: <Sliders/>,
                component: Login,
                children: null,
            },
            {
                id: "Master",
                path: "/master",
                header: "Test",
                icon: <Sliders/>,
                component: null,
                children: [
                    {
                        path: "/master/default",
                        name: "Default",
                        component: Dashboard,
                    },
                    {
                        path: "/master/carMaster",
                        name: "CarMaster",
                        component: CarMaster,
                    }
                ],
            });

        return routeMenus;
    };


    return routeMenuSeting();
}

export default MenuRoutes;