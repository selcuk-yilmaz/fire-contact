import store from "./app/store";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
