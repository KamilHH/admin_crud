import React, {useEffect, useState} from 'react';
import Navbar from './components/Navigation/Navbar'
import Home from './pages/Home/Home'
import New from "./pages/New/New"
import Single from "./pages/Single/Single";
import {Switch, Route} from 'react-router-dom'
import Users from "./pages/Users/Users";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from "./components/Login/Login";
const name = localStorage.getItem("username")
const App = () => {
    const [storage, setStorage] = useState(name);



    return (
        <>
            <ToastContainer position={"top-center"} autoClose={1_000}/>
            {!storage && <LoginModal/>}
            <Navbar/>
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