import { useLocation } from "react-router-dom";

const Edit = () => {
  const { state } = useLocation();

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
          <form onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setNumber(e.target.value)}
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
