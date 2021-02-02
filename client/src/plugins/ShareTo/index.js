/*
 * @Author: AA
 * @Date: 2020-07-10 07:56:39
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:15:14
 * @FilePath: /src/plugins/ShareTo/index.js
 */
import React from "react";
import shareToSites from "./ShareTo";
import "./assets/share.css";
export default function ShareTo(props) {
  const { url, title, target } = props;
  let shares = target || shareToSites;
  let shareLink = [];
  for (const i in shares) {
    const lnk = shares[i];
    const toUrl = shareToSites[lnk](url, title);

    shareLink.push(
      <a
        href={toUrl}
        className={["share-to", "share-to-" + lnk].join(" ")}
        title={"Share To:" + lnk}
        target="_blank"
        key={"share" + i}
      >
        <span>{lnk}</span>
      </a>
    );
  }
  return <div className="cocial-share">{shareLink}</div>;
}
