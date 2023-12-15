import React, { useEffect, useState } from "react";

const Input = () => {
  const [listValue, setListValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const endpoint = 'https://playground.4geeks.com/apis/fake/todos/user/MoicoeMT'

  const getApi = async () =>{
    const response = await fetch(endpoint);
    const data = await response.json();
    setListValue(data);
  }

  const addtask = async (task) => {
    const response = await fetch(endpoint, {
      method:'PUT',
      body:JSON.stringify(task),
      headers:{
        'Content-Type':'application/json',
      }
    })
    getApi();
  }

  useEffect(()=> {
    getApi();
  },[])

  const handleClick = () => {
    if(inputValue.trim() === ""){
      return alert("Add a task first")
    }
    const newTask = [...listValue, {done:false, label:inputValue}];
    setInputValue("");
    setListValue(newTask);
    addtask(newTask);
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
    addtask(removedItem);
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
            placeholder="Add a new task"
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
                  className="container d-flex justify-content-between p-2 px-2"
                >
                  <h5 className="my-1">{listItem.label}</h5>
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
          <hr className="m-0 p-0 bg-light"/>
          <h5 className="p-2 my-1 text-center"><i class="fa-solid fa-address-book"></i> Total: {listValue.length}</h5>
        </div>
      </div>
    </>
  );
};

export default Input;
