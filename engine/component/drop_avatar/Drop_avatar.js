import React, { useEffect, useState } from "react";

import G from "./../../../Sass/abstract/global.module.scss";
import S from "./Drop_avatar.module.scss";

//With this article https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

export default function Drop_avatar() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave(e) {
    e.preventDefault();
  }
  function fileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length) {
      handleFiles(files);
    }
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("");
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        // set error message
        setErrorMessage("Gnnn");
      }
    }
  }

  function fileSize(size) {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  function fileType(fileName) {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  }

  function validateFile(file) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  return (
    <div className={S.preview_avatar}>
      <label htmlFor="load_file">
        <canvas
          className={S.preview_avatar__trigger}
          width="270px"
          height="270px"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        ></canvas>
      </label>
      <input
        type="file"
        id="load_file"
        className="hidden"
        onChange={handleFiles}
      />
      {errorMessage && (
        <>
          <p className="errorText">Format d'image invalid.</p>
          <p className="errorText"> Format autorisé [ jpeg - jpg - png ]</p>
        </>
      )}
    </div>
  );
}
