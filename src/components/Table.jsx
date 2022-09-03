import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setTodo } from "../../redux/actions/todoActions";
import { FaPenFancy, FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { getTodo } from "../../redux/thunk/dataThunk";
import EditForm from "../edit/EditForm";

const Table = () => {
  // const [personList, setPersonList] = useState([]);
  // const toDoCollectionRef = collection(db, "person");
  // const getTodo = async () => {
  //   const data = await getDocs(toDoCollectionRef);
  //   setPersonList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };
  // useEffect(() => {
  //   getTodo();
  // }, []);
  // console.log(personList);
  //!below for read data
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  //!below for update data
  const [editItem, setEditItem] = useState("");
  //!below for delete data
  const handleDelete = async (id) => {
    console.log(id);
    const userDoc = doc(db, "person", id);
    await deleteDoc(userDoc);
    dispatch(getTodo());
  };

  console.log(todoList);
  return (
    <div className="col-md-8 col-xs-12">
      <div className="mx-5">
        <label htmlFor="" className="bg-white form-control mb-4">
          Contacts
        </label>
        <table className="table bg-white form-control ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phnone</th>
              <th scope="col">Gender</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todoList?.map((todo, index) => (
              <tr key={todo.id}>
                <th scope="row">{index + 1} </th>
                <td>{todo.name}</td>
                <td>{todo.phone}</td>
                <td>{todo.gender}</td>
                <td>
                  <FaPenFancy
                    data-bs-toggle="modal"
                    data-bs-target="#edit-modal"
                    size={20}
                    className="me-2 text-warning"
                    onClick={() => setEditItem(todo)}
                    style={{ color: "green" }}
                    role="button"
                  />
                </td>
                <td>
                  <FaTrash
                    onClick={() => handleDelete(todo.id)}
                    style={{ color: "red" }}
                    role="button"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditForm editItem={editItem} />
      </div>
    </div>
  );
};

export default Table;
