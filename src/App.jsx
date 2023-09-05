import React, { useState, useEffect } from "react";
import Form from "../src/component/Form";
import DataList from "../src/component/DataList";

function App() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("crudData") || "[]");
    setData(storedData);
  }, []);

  const addData = (newData) => {
    if (editIndex !== null) {
      // Edit existing data
      const updatedData = [...data];
      updatedData[editIndex] = newData;
      setData(updatedData);
      setEditIndex(null);
    } else {
      // Add new data
      setData([...data, newData]);
    }

    // Store data in local storage
    localStorage.setItem("crudData", JSON.stringify(data));
  };

  const deleteData = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);

    // Store data in local storage
    localStorage.setItem("crudData", JSON.stringify(updatedData));
  };

  const editData = (index) => {
    setEditIndex(index);
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <Form addData={addData} />
      <DataList data={data} deleteData={deleteData} editData={editData} />
    </div>
  );
}

export default App;
