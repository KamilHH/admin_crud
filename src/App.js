import React from 'react';

import {Switch, Route} from 'react-router-dom'

const App = () => {
    return (
        <>

                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/new" component={New}/>
                    <Route exact path="/users"  component={UserTable}/>
                    <Route path="/users/:userID" component={Single}/>
                </Switch>

        </>
    );
};
export default App;