import React, { useState, useEffect } from "react";

export default function HR({ axis, size, css, crement, children }) {
  const [style, setStyle] = useState(css);

  function getCss() {
    const multiple = crement ? crement : 8;
    const splitAxis = css.margin.split(" ");

    if (splitAxis.length === 2) {
      const X = splitAxis[0] * multiple + "px";
      const Y = splitAxis[1] * multiple + "px";

      const initial = {
        margin: `${X} ${Y}`,
        display: "grid",
        placeItems: "center",
      };

      setStyle((S) => ({ ...S, ...initial }));
    }
  }

  useEffect(() => {
    getCss();
  }, []);

  return <span style={style}>{children}</span>;
}
