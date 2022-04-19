import React from 'react';
import Navbar from './components/Navigation/Navbar'
import New from "./pages/New/New"
import Single from "./pages/Single/Single";
import {Switch, Route} from 'react-router-dom'
import Users from "./pages/Users/Users";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <Navbar/>
            <ToastContainer position={"top-center"}/>
                <Switch>
                    <Route exact path="/"/>
                    <Route path="/new" component={New}/>
                    <Route exact path="/users" component={Users}/>
                    <Route path="/users/:userID" component={Single}/>
                </Switch>
        </>
    );
};
export default App;