import React from "react";

import S from "./../../Admin.module.scss";

export default function Review_checked({ children }) {
  return (
    <div className={S.content_col}>
      <header>
        <h1>CHECEKD REVIEW</h1>
      </header>
      <div>{children}</div>
    </div>
  );
}
