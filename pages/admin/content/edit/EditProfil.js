import React from "react";

import S from "./EditProfil.module.scss";
import EditEmail from "./form/EditEmail";
import EditPassword from "./form/EditPassword";
import EditUsername from "./form/EditUsername";

// nexstep
// add ref
// check before sub
// if empty if !current
// if format valid

export default function EditProfil() {
  return (
    <>
      <div className={S.editProfil}>
        {/* Edit Email */}

        <EditEmail></EditEmail>

        {/* Edit USerName */}
        <EditUsername></EditUsername>

        {/* Edit passowrd */}
        <EditPassword></EditPassword>
      </div>
    </>
  );
}
