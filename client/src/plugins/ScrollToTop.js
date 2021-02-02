/*
 * @Author: AA
 * @Date: 2021-01-30 06:56:59
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 07:02:02
 * @FilePath: /src/plugins/ScrollToTop.js
 */
import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
