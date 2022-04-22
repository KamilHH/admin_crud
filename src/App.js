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

const App = () => {
    const [storage, setStorage] = useState('');

    useEffect(()=>{
        setStorage(localStorage.getItem("username"));
    },[])
    console.log(storage)
    return (
        <>
            <ToastContainer position={"top-center"} autoClose={2_000}/>
            {!storage && <LoginModal/>}
            <Navbar data={storage}/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/new" component={New}/>
                <Route exact path="/users" component={Users}/>
                <Route path="/users/:userID" component={Single}/>
            </Switch>
        </>
    );
};
export default App;