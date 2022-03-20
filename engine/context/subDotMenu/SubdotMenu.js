import React, { createContext, useState, useRef, useEffect } from "react";

export const SubDotMenuContext = createContext();

export default function SubDotMenuProvider({ children }) {
  const refSub = useRef(false);
  const [isSub, setIsSub] = useState(false);

  const handleClickOutside = (event) => {
    if (refSub.current && !refSub.current.contains(event.target)) {
      setIsSub(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [refSub]);

  return (
    <SubDotMenuContext.Provider value={{ isSub, setIsSub, refSub }}>
      {children}
    </SubDotMenuContext.Provider>
  );
}
