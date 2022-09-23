import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/authSlice";
import { toastErrorNotify } from "../helpers/ToastNotify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("login");
  };
  const handleHome = () => {
    toastErrorNotify("please login");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleHome}
          >
            My Contact Lists
          </Typography>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
