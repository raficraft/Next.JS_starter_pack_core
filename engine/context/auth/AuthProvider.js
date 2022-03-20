import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  promptForCredentials,
} from "firebase/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [validAuth, setValidAuth] = useState({
    isAuth: false,
    role: 0,
  });

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  //Login
  async function signin(email, password, isRemember) {
    const persistence = isRemember
      ? browserLocalPersistence
      : browserSessionPersistence;

    setPersistence(auth, persistence);
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (res.error) {
      return res.error;
    } else {
      setCurrentUser(res.user);
      setValidAuth((s) => ({ ...s, isAuth: true }));
      return res;
    }
  }

  //Inscription

  /**
   *
   * @param {STRING} email
   * @param {STRING} password
   * @returns {response FireBase}
   */

  async function signup(email, password) {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    /** SIGNUP SUCCESS */
    if (res.user) {
      /**Make display name */
      const splitEmail = res.user.email.split("@");
      const displayName = splitEmail[0];
      const resUpdate = await updateProfil({
        displayName: displayName,
      });

      if (resUpdate.error) {
        return resUpdate.error;
      }
      return res.user;
    }
  }

  //Logout
  function logout() {
    setValidAuth((s) => ({ ...s, isAuth: false }));
    return signOut(auth);
  }

  /**
   * @param {Object} data
   */

  async function updateProfil(data) {
    let res = {};
    return updateProfile(auth.currentUser, { ...data })
      .then((result) => {
        res.succes = true;
        res.error = false;
        return res;
      })
      .catch((error) => {
        res.sucess = false;
        res.error = error;
        return res;
      });
  }

  /**
   * @param {String} newPwd
   */
  async function updatePwd(newPwd) {
    return updatePassword(auth.currentUser, newPwd)
      .then((result) => {
        res.succes = true;
        res.error = false;
        return res;
      })
      .catch((error) => {
        res.sucess = false;
        res.error = error;
        return res;
      });
  }

  /**
   * @param {String} newmail
   */
  async function updateUserEmail(newMail) {
    let res = {};
    return updateEmail(auth.currentUser, newMail)
      .then((result) => {
        res.succes = true;
        res.error = false;
        return res;
      })
      .catch((error) => {
        res.sucess = false;
        res.error = error;
        return res;
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setValidAuth((s) => ({ ...s, isAuth: true }));
      } else {
        setCurrentUser();
      }

      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        validAuth,
        signup,
        signin,
        logout,
        currentUser,
        updateProfil,
        updateUserEmail,
        updatePwd,
      }}
    >
      {!loadingData && children}
    </AuthContext.Provider>
  );
}

/**
 * 
 *   function signup(email, password) {
    setValidAuth((s) => ({ ...s, isAuth: true }));
    return createUserWithEmailAndPassword(auth, email, password);
  }
 */
