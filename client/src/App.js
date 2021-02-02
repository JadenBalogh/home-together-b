/*
 * @Author: AA
 * @Date: 2021-01-28 06:05:38
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:31:04
 * @FilePath: /src/App.js
 */
import React, { useEffect } from "react";

import { createBrowserHistory } from "history";

import { BrowserRouter, Route } from "react-router-dom";

import AnimatedRouter from "react-animated-router";
// Plugins
import ScrollToTop from "./plugins/ScrollToTop";
// Layouts
import Header from "./views/components/Header";
import Footer from "./views/components/Footer";

// Page
import Home from "./views/Home";
import Settings from "./views/Settings";

import Roommate from "./views/Roommate";
import RoommateDetail from "./views/Roommate/Detail";

import Business from "./views/Business";
import BusinessDetail from "./views/Business/Detail"

export default function App() {
  useEffect(() => {
    console.log(" window.scrollTo(0, 0)");
    window.scrollTo(0, 0);
  }, []);
  var hist = createBrowserHistory();
  return (
    <BrowserRouter history={hist}>
      <ScrollToTop />
      <Header />
      <AnimatedRouter>
        <Route path="/business/detail/:id" component={BusinessDetail} />
        <Route path="/business" component={Business} />
        <Route path="/roommate/detail/:id" component={RoommateDetail} />
        <Route path="/roommate" component={Roommate} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Home} />
      </AnimatedRouter>
      <Footer />
    </BrowserRouter>
  );
}
