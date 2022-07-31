import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const NavBar = () => {
  const { push } = useHistory();

  return (
    <AppBar color="inherit" position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button
          color="inherit"
          startIcon={<BlurOnOutlinedIcon />}
          onClick={() => push("/")}
        >
          code golf
        </Button>
        <Button
          color="inherit"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => push("/submit")}
        >
          submit
        </Button>
        <Button color="inherit">Profile</Button>
      </Toolbar>
    </AppBar>
  );
};
