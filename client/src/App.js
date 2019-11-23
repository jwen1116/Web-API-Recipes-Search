import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Saved from "./pages/Saved";
import ErrorPage from "./pages/ErrorPage";
import Nav from "./components/Nav/index";


function App() {
    return(
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Recipes} />
                    <Route exact path="/recipes" component={Recipes} />
                    <Route exact path="/saved" component={Saved} />
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;