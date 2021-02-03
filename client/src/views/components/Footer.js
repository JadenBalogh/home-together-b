/*
 * @Author: AA
 * @Date: 2021-01-28 18:43:45
 * @LastEditors: AA
 * @LastEditTime: 2021-01-28 23:08:08
 * @FilePath: /src/views/components/Footer.js
 */
import React from "react";
import { Container } from "@material-ui/core";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="d-flex justify-content-between align-items-center">
        <ul>
          <li>
            <a
              href="https://github.com/JadenBalogh/home-together-b"
              target="_blank"
              className="text-white"
            >
              <i className="fa fa-github"></i> Gitub
            </a>
          </li>
        </ul>
        <div className="credits ml-auto">
          <span className="copyright text-light">
            {" "}
            © 2020 - {new Date().getFullYear()} , made by{" "}
            <i className="fa fa-heart"></i>AA
          </span>
        </div>
      </Container>
    </footer>
  );
}
