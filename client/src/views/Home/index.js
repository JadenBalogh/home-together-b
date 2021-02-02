/*
 * @Author: AA
 * @Date: 2021-01-28 06:05:38
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 05:39:50
 * @FilePath: /src/views/Home/index.js
 */
import React from "react";
// Sections
import Carousel from "./Sections/Carousel";
import Service from "./Sections/Service";
import Team from "./Sections/Team";
import Contact from "./Sections/Contact";

function Home() {
  return (
    <main className="mt-50">
      <Carousel />
      <Service />
      <Team />
      <Contact />
    </main>
  );
}

export default Home;
