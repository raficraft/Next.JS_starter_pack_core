import React, { useState, useEffect, useContext } from "react";
import Paginate from "../paginate/Paginate";

import useFirestore from "../../hooks/firestore/useFirestore";

/**HOC GET the data and hydrate children */

export default function List_paginate({
  active,
  collectionName,
  children,
  paginate = false,
}) {
  const [currentCollection, , , , getDocumentByQuery] = useFirestore(
    "user_review",
    {}
  );
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState({
    current: [],
    input: [],
    shallow: [],
  });

  const [pagination, setPagination] = useState({
    nbPage: 1,
    currentPageNumber: 1,
    nbItemPerPage: 6,
    currentPage: 1,
  });

  async function getData() {
    setLoading(true);
    try {
      const res = await getDocumentByQuery("user_review", "active", true);
      if (res) {
        //shallowCopy
        const shallowCopy_json = JSON.parse(JSON.stringify(res));
        const arraySplice = shallowCopy_json.splice(
          0,
          pagination.nbItemPerPage
        );

        setCollection((S) => ({
          ...S,
          current: currentCollection,
          input: res,
          shallow: arraySplice,
          currentPage: 1,
        }));
        setLoading(false);

        //goToPage(0, currentPageNumber);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function calculatePaginate() {
    const nbPage = Math.ceil(
      collection.input.length / pagination.nbItemPerPage
    );
    setPagination((S) => ({ ...S, nbPage: nbPage }));
  }

  //UX
  function goToPage(startIndex, pageNumber) {
    console.log(pageNumber);
    //shallow copy
    const dataRow = JSON.parse(JSON.stringify(collection.input));
    const start =
      startIndex === 0 ? 0 : startIndex * parseInt(pagination.nbItemPerPage);
    const end = pageNumber * parseInt(pagination.nbItemPerPage);

    setCollection((S) => ({ ...S, shallow: dataRow.slice(start, end) }));
    setPagination((S) => ({
      ...S,
      currentPage: Math.ceil(parseInt(pageNumber)),
    }));
  }

  const handleSelectChange = (e) => {
    //shallow copy
    let dataRow = JSON.parse(JSON.stringify(collection.input));
    const count = collection.input.length / e.target.value;
    setCollection((S) => ({
      ...S,
      shallow: dataRow.slice(0, parseInt(e.target.value)),
    }));

    setPagination((S) => ({
      ...S,
      nbItemPerPage: e.target.value,
      nbPage: Math.ceil(count),
    }));

    goToPage(0, pagination.currentPage);
    console.log("before jump to currentPage", pagination.currentPage);
  };

  //Hydrate items with specific data
  function dispatchItem() {
    const itemCollection = [];
    for (let i = 0; i < pagination.nbItemPerPage; i++) {
      const childrenCopy = React.cloneElement(children, {
        ...collection.shallow[i],
      });
      {
        itemCollection.push(childrenCopy);
      }
    }
    return itemCollection;
  }

  useEffect(() => {
    getData();
    calculatePaginate();
  }, [pagination.nbItemPerPage]);

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : !loading && collection.input.length > 0 ? (
        <>
          <div>
            {`il y à ${pagination.nbPage} page`}
            <Paginate
              perPage={pagination.nbItemPerPage}
              collectionLength={Object.keys(collection.input).length}
              currentPage={pagination.currentPage}
              goToPage={goToPage}
              limit={[4, 3]}
              nbPage={pagination.pageNumber}
              keyPrefix="primaryPaginate"
              setter={{ setCollection, setPagination }}
              handleSelectChange={handleSelectChange}
            ></Paginate>
            {dispatchItem()}
          </div>
        </>
      ) : (
        <p>Aucune donnée trouvé</p>
      )}
    </>
  );
}

export function Items(props) {
  console.log("on children", props);
  return <p>{props.name}</p>;
}
