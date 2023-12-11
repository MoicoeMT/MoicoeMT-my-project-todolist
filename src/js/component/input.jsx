import React, { useState } from "react";

const Input = () => {
  const [listValue, setListValue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    setListValue([...listValue, inputValue]);
    setInputValue("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const removeItem = (id) => {
    const removedItem = listValue.filter((item, index) => index !== id);
    setListValue(removedItem);
  };

  

  return (
    <>
      <div className="container mb-3 ">
        <div className="header mb-3">
          <h1 className="text-center text-white">
            <i className="fa-solid fa-book"></i> TODO LIST
          </h1>
        </div>
        <div className="d-flex gap-4 mb-1">
          <input
            value={inputValue}
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Add your task"
            onChange={handleChange}
            onKeyDown={handlePress}
          />
          <button className="btn btn-primary" onClick={() => handleClick()}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="card">
          {listValue.map((listItem, index) => {
            return (
              <div key={index}>
                <div
                  id="contcard"
                  className="container d-flex justify-content-between p-1 px-2"
                >
                  <h5 className="my-1">{listItem}</h5>
                  <button
                    id="secondbutton"
                    className="btn btn-danger"
                    onClick={() => removeItem(index)}
                    
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <hr className="m-0 p-0" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Input;
