import { Link, useLocation } from "react-router-dom";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { db } from "../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { getTodo } from "../features/todoSlice";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const { state } = useLocation();
  const { id, name, phone, gender } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [newGender, setNewGender] = useState(gender);

  const handleEdit = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "person", id);
    try {
      await updateDoc(userDoc, {
        name: newName,
        phone: newPhone,
        gender: newGender,
      });
      console.log("güncellendi");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
    setNewName("");
    setNewPhone("");
    setNewGender("");
    dispatch(getTodo());
  };
  // useEffect(() => {
  //   setNewName(name);
  //   setNewPhone(phone);
  //   setNewGender(gender);
  // }, [name, phone, gender]);

  return (
    <div className="col-md-4 col-xs-12 mb-5">
      <div className="">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label bg-white   form-control "
        >
          <i className="text-info">{"<Warriors/>"}</i> DESIGN
        </label>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label bg-white form-control mt-5"
          >
            Add Contact
          </label>
          <form onSubmit={handleEdit}>
            <div className="form-control">
              <div style={{ position: "relative" }}>
                <FaUser
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "4px",
                    opacity: "0.7",
                  }}
                />
                <input
                  type="text"
                  className="form-control ps-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div style={{ position: "relative" }}>
                <FaPhoneAlt
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "4px",
                    opacity: "0.7",
                  }}
                />
                <input
                  type="text"
                  className="form-control ps-4"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Phone Number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <select
                  className="custom-select "
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #bbb",
                    color: "#777",
                    padding: ".4rem",
                  }}
                  id="inputGroupSelect03"
                  placeholder="Gender"
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                  required
                >
                  <option value="">GENDER</option>
                  <option value="male">👨Male</option>
                  <option value="female">👩Female</option>
                  <option value="other">😮Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-info form-control text-white"
              >
                Edit
              </button>
              <li className="list-group-item">
                <Link to={-1} className="card-link">
                  Go Back
                </Link>
              </li>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
