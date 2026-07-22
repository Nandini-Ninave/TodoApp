import type { RouteObject } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Today from "./components/Today/Today";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Dashboard/>,
    },
    {
        path: "/today",
        element: <Today/>,
    },
]