import React from "react";

import S from "./../../Admin.module.scss";

export default function Last_review({ children }) {
  return (
    <div className={S.content_col}>
      <header>
        <h1>Dernière avis à valider</h1>
      </header>
      <div>{children}</div>
    </div>
  );
}
