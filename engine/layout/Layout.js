import React, { useContext } from "react";
import Header from "../component/header/Header";
import Signup from "../component/form/Signup/Signup";
import Signin from "../component/form/Signin/Signin";
import { ModalContext } from "../context/modal/ModalProvider";
import Modal_body from "../component/modal/Modal_body";
import Nav_alt from "../component/header/navigation/nav_alt/Nav_alt";

export default function Layout({ children }) {
  const { modal } = useContext(ModalContext);

  console.log("modal", modal);

  return (
    <>
      <Header></Header>

      {children}
      {modal.signup && (
        <Modal_body>
          <Signup />
        </Modal_body>
      )}
      {modal.signin && (
        <Modal_body>
          <Signin />
        </Modal_body>
      )}

      {modal.nav_alt && (
        <Modal_body>
          <Nav_alt></Nav_alt>
        </Modal_body>
      )}

      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}
