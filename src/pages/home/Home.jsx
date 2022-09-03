import Form from "../../components/Form";
import Table from "../../components/Table";
import "./home.css";

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center"
      style={{ height: "100vh", width: "100%" }}
    >
      <div className="container  text-center   ">
        <div className="row">
          <Form />
          <Table />

        </div>
      </div>
    </div>
  );
};

export default Home;
