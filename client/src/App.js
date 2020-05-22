import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblesPage from './components/BubblePage'
import PrivateRoute from './utils/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path='/bubbles' component={BubblesPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
