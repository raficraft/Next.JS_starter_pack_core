import React from "react";
import HR from "../engine/component/atomic/HR";

export default function Index_content() {
  return (
    <>
      <article className="article article_home">
        <header>
          <h2>Contenu de la page d'acceuil</h2>
        </header>
      </article>

      <HR
        css={{
          margin: "4 0",
          width: "100%",
        }}
      ></HR>
    </>
  );
}
