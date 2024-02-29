import React from "react";
import { useRoutes } from "react-router-dom";
import RegEmps from './components/RegEmps'
import ManageEmps from "./components/ManageEmps";
export default function(){
    const routes= useRoutes([
        {
            path:'/',
            element: <RegEmps />
        },{
            path: '/manage',
            element: <ManageEmps />
        }
    ])
    return routes
    // return<><h2>Fuck you</h2></>
}
