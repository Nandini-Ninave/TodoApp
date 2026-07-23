import type { RouteObject } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Today from "./components/Today/Today";
import InProgress from "./components/inProgress/InProgress";
import Completed from "./components/completed/Completed";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Dashboard/>,
    },
    {
        path: "/today",
        element: <Today/>,
    },
    {
        path: "/inprogress",
        element: <InProgress/>,
    },
    {
        path: "/completed",
        element: <Completed/>,
    },
]