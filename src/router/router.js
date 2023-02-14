import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/home/home";
import Category from "../pages/categories/index";
import Errorpage from "../pages/errorPage/errorpage";
import AddItems from "../pages/addItems/addItems";
import UpdateItems from "../pages/update Items";
import AppProvider from "../Context";

export default function AppRouting() {
  return (
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/category/:category">
              <Category />
            </Route>

            <Route path="/update-items/:category/:id">
              <UpdateItems />
            </Route>


            <Route path="/add-items">
              <AddItems />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Errorpage />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}
