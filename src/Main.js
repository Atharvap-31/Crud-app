import React, { useState } from "react";

const Main = () => {
  const [formData, setFormDate] = useState({
    name: "",
    contact: "",
  });
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormDate((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdd = () => {
    if (formData.contact === "") return;
    if (formData.name === "") return;
    setShowDetails(true);
    const newData = [...data, formData];
    setData(newData);
    setFormDate({ name: "", contact: "" });
    setShow(false);
  };

  const handleDelete = (i) => {
    const newData = data.filter((d, idx) => i !== idx);
    setData(newData);
  };

  const handleUpdateChange = () => {
    data[edit.id] = { name: formData.name, contact: formData.contact };
    setData(data);
    setFormDate({ name: "", contact: "" });
    setEdit("");
    setShow(false);
  };

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="bg-red-400  rounded-lg px-4 py-2 text-lg font-medium mx-[70rem] mt-10 "
      >
        {show ? "Disable" : " Create"}
      </button>
      {show === false ? (
        <h1 className="ml-[35rem] text-4xl font-bold mt-10">FORM is empty</h1>
      ) : (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-96 border border-black p-2 rounded-xl"
        >
          <div className="my-10">
            <label className="mr-16 text-lg">Name</label>
            <input
              value={formData.name}
              name="name"
              onChange={handleOnChange}
              className="bg-yellow-100 mx-10 p-2 rounded-lg"
              type="text"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="mr-10">Contact Number</label>
            <input
              value={formData.contact}
              name="contact"
              onChange={handleOnChange}
              className="bg-yellow-100 p-2 rounded-lg"
              type="text"
              placeholder="Enter Mobile Number"
            />
          </div>
          {edit === "" ? (
            <button
              onClick={handleAdd}
              className="my-10  bg-green-300 p-2 rounded-lg"
            >
              Add
            </button>
          ) : (
            <button
              onClick={handleUpdateChange}
              className="my-10  bg-green-300 p-2 rounded-lg"
            >
              Update
            </button>
          )}
        </form>
      )}
      <div className="flex flex-wrap m-4 mt-10">
        {showDetails &&
          data.map((d, i) => (
            <div className="mx-10" key={i}>
              <h1 className="">Name : {d.name}</h1>
              <h1 className="">Contact : {d.contact}</h1>
              <button
                onClick={() => {
                  setEdit({ data: d, id: i });
                  setFormDate({ name: d.name, contact: d.contact });
                  setShow(true);
                }}
                className="bg-blue-300 p-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(i);
                }}
                className="bg-red-300 ml-10 p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;
