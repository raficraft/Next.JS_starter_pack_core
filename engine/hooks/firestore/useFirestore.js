import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase.config";
import {
  onSnapshot,
  collection,
  setDoc,
  doc,
  deleteDoc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function useFirestore(thisCollection, initialState) {
  const [currentCollection, setCurrentCollection] = useState([]);

  /**
   *
   * @param {String} table  Name of collection
   * @param {Object} payload
   * @returns {json}
   */

  async function createDocument(table, payload) {
    const collectionRef = collection(db, table);
    const docRef = await addDoc(collectionRef, payload);

    return docRef;
  }

  /**
   *
   * @param {String} table  Name of collection
   * @param {String} id
   * @returns {json}
   */
  async function setDocument(table, payload) {
    const docRef = doc(db, table, payload.id);
    setDoc(docRef, payload);
  }

  /**
   *
   * @param {"String"} table  Name of collection
   * @param {string} id
   */
  async function delete_doc(table, id) {
    const docRef = doc(db, table, id);
    await deleteDoc(docRef);
  }

  async function queryDelete(table, fields, value) {
    const collectionRef = collection(db, table);
    const q = query(collectionRef, where(fields, "==", value));
    const snapShot = await getDocs(q);

    const results = snapShot
      .docs()
      .map((doc) => ({ ...doc.data(), id: doc.id }));

    results.forEach(async (result) => {
      await deleteDoc(result.id);
    });
  }

  async function getDocumentByQuery(
    table,
    fields,
    value,
    sort = "ASC",
    sortBy = "createAt"
  ) {
    const collectionRef = collection(db, table);
    const q = query(collectionRef, where(fields, "==", value));
    const querySnapshot = await getDocs(q);

    const snap = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //Order by from scratch ^^
    if (sort === "ASC") {
      snap.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]));
      return snap;
    }

    snap.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
    return snap;
  }

  useEffect(
    () =>
      onSnapshot(collection(db, thisCollection), (snapshot) => {
        const snap = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCurrentCollection(snap);
      }),

    []
  );

  return [
    currentCollection,
    setDocument,
    createDocument,
    delete_doc,
    getDocumentByQuery,
  ];
}
