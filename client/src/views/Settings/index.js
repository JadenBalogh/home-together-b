/*
 * @Author: AA
 * @Date: 2021-01-28 23:02:49
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 23:19:43
 * @FilePath: /src/views/Settings/index.js
 */
import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

// Import plugin resources
import { Container, Button } from "@material-ui/core";

// pages for this product
import Account from "./Account.js";
import Profile from "./Profile.js";
import Password from "./Password.js";
import Business from "./Buiness.js";
var hist = createBrowserHistory();

export default function Login(props) {
  return (
    <Container className="mt-90 pb-40">
      <BrowserRouter history={hist}>
        <div className="row">
          <div className="col-24 col-md-4 aside-menu">
            <NavLink to="/settings/profile" exact activeClassName="active">
              <i className="fa fa-id-card-o" aria-hidden="true"></i>
              Profile
            </NavLink>

            <NavLink to="/settings/business" activeClassName="active">
              <i className="fa fa-bank" aria-hidden="true"></i>
              Business
            </NavLink>

            <NavLink to="/settings/account" activeClassName="active">
              <i className="fa fa-user" aria-hidden="true"></i>
              Account
            </NavLink>

            <NavLink to="/settings/password" activeClassName="active">
              <i className="fa fa-shield" aria-hidden="true"></i>
              Password
            </NavLink>

            <NavLink to="/logout">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              Logout
            </NavLink>
          </div>
          <div className="col-24 col-md-20">
            <Switch>
              <Route path="/settings/account" component={Account} />
              <Route path="/settings/profile" component={Profile} />
              <Route path="/settings/password" component={Password} />
              <Route path="/settings/business" component={Business} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Container>
  );
}
