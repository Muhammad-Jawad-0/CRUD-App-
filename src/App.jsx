import React, { useState } from "react";
import "./App.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { PlusCircle, Edit, Trash2 } from "react-feather";

function App() {
  const blankUser = {
    name: "",
    email: "",
    age: "",
    address: "",
  };

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(blankUser);
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction("Add");
  };

  const addUser = () => {
    setUserData([...userData, user]);
    setUser(blankUser);
    onCloseModal();
  };

  const editUser = (index) => {
    setAction("Edit");
    const selectedUser = userData.find((x, i) => i == index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  };

  const updateUser = () => {
    const newUsers = userData.map((x, i) => {
      if (i === editIndex) {
        x = user;
      }
      return x;
    });
    setUserData(newUsers);
    setUser(blankUser);
    setEditIndex(null);
    onCloseModal();
  };

  const deleteUser = (index) => {
    const newUsers = userData.filter((x, i) => {
      return i !== index;
    });
    setUserData(newUsers);
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className="btn btn-p" onClick={onOpenModal}>
          <PlusCircle size={16} />
          <span>ADD</span>
        </button>
      </div>
      <hr />

      {/* <p>{JSON.stringify(userData)}</p> */}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((user, index) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>
                    <button className="btn ml2" onClick={() => editUser(index)}>
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn ml2"
                      onClick={() => deleteUser(index)}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        {/* <p>{JSON.stringify(user)}</p> */}
        <div className="form">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={user.name}
            id="name"
            placeholder="Enter Your Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            value={user.email}
            placeholder="Enter Your Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            id="age"
            value={user.age}
            placeholder="Enter Your Age"
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />
          <label htmlFor="address">Address: </label>
          <textarea
            name="address"
            value={user.address}
            id="address"
            cols="30"
            rows="4"
            placeholder="Enter Your Address"
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          ></textarea>
          {/* <input type="checkbox" name="cheak-Box" id="cheak-Box"  />
          <label htmlFor="cheak-Box" className="cheakbox">I agree to the trems and Conditions</label> */}
          <div className="box-div">
            <input type="checkbox" name="" id="cheak-Box" className="cheakBox" />
            <label htmlFor="cheak-Box" className="cheakbox-text">
              I agree to the trems and Conditions
            </label>
          </div>
          <br />
          <br />
          {action === "Add" && (
            <button className="btn" onClick={() => addUser()}>
              Submit
            </button>
          )}
          {action === "Edit" && (
            <button className="btn" onClick={() => updateUser()}>
              Update
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
