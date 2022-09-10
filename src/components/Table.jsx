import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPenFancy, FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { clearTodoList, getTodo } from "../features/todoSlice";
import { useNavigate } from "react-router-dom";
import loadingGif from "../assets/spinner.gif";
import { Box } from "@mui/system";
import { toastWarnNotify } from "../helpers/ToastNotify";
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
  const { todoList, loading } = useSelector((state) => state.todo);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodo());
    return () => {
      dispatch(clearTodoList());
    };
  }, [dispatch]);

  // !below for delete data
  const handleDelete = async (id) => {
    console.log(id);
    const userDoc = doc(db, "person", id);
    await deleteDoc(userDoc);
    dispatch(getTodo());
    toastWarnNotify("Deleted successfully!");
  };

  console.log(todoList);
  return (
    <>
      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <img src={loadingGif} alt="gif" width="50%" height="300px" />
        </Box>
      )}
      {!loading && (
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
                        // data-bs-toggle="modal"
                        // data-bs-target="#edit-modal"
                        size={20}
                        className="me-2 text-warning"
                        onClick={() =>
                          navigate("edit", { state: todo, replace: false })
                        }
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
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
