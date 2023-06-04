import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  Typography,
  Link,
  Box,
  Container,
} from "@mui/material";
import image from "../assets/logo.jpg";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Type1Field, Type2Field } from "../comonents/formcontrol/Fields";
import Formcontrol from "../comonents/formcontrol/FormControl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import api from "../Config/Api";
import { useTheme } from "@mui/material/styles";
const initial = {
  LUsername: "",
  LPassword: "",
};

const Login = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [dis, setdis] = useState(null);

  const check = (email, password) => {
    api
      .post("/users/login", {
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data) {
          localStorage.setItem("user Info", JSON.stringify(response.data.user));
          localStorage.setItem(
            "user token",
            JSON.stringify(response.data.token)
          );
            props.setToken("not ok")
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log("this is error");

        if (error) {
          setdis(error.response.data.message);

          console.log("full");
          console.log(error.response.data.message);
        }
      });
  };

  const validate = () => {
    let temp = {};
    temp.UserName = Svalue.LUsername ? "" : "Username should be filled";
    temp.password = Svalue.LPassword ? "" : "Pasword should be filled";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  const sumbit = (e) => {
    e.preventDefault();

    if (validate()) {
      check(Svalue.LUsername, Svalue.LPassword);
    }
  };

  const paperStyle = {
    height: "70vh",
    margin: "20px auto",
    display: "flex",
    alignItems: "center",
    padding: "40px",
  };
  const [showPassword, setShowPassword] = useState(false);
  const { Svalue, setSvalue, hanndleloginChange, errors, setErrors } =
    Formcontrol(initial);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="sm">
      <Box sx={theme.mixins.toolbar} />
      {dis != null ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : (
        <div>{null}</div>
      )}
      <Paper elevation={10} style={paperStyle}>
        <Box width='100%'>
        <Grid align="center" sx={{display:"flex",flexDirection:"row",paddingBottom:"10px"}}>
          <Typography variant="h5" sx={{marginLeft:"200px",marginBottom:"10px"}}
          >
            Login
          </Typography>
        </Grid>
        <Type1Field
          label="Username"
          error={errors.UserName}
          style={{ marginBottom: 10, width: "100%" }}
          x={<MailIcon sx={{ color: "black" }} />}
          Name="LUsername"
          value={Svalue.LUsername}
          Change={hanndleloginChange}
        ></Type1Field>
        <Type2Field
          Label="Password"
          error={errors.password}
          style={{ width: "100%" }}
          type={showPassword ? "text" : "password"}
          Name="LPassword"
          Value={Svalue.LPassword}
          Change={hanndleloginChange}
          y={
            <IconButton
              onClick={handleClickShowPassword}
              sx={{ color: "black" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
          z={<LockIcon sx={{ color: "black" }} />}
        ></Type2Field>

        {/* <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultUnChecked
                sx={{
                  "&.Mui-checked": { color: "black" },
                }}
              />
            }
            style={{
              color: "black",
            }}
            label="Remember Me"
          />
        </FormGroup> */}
        <Button
          variant="contained"
          onClick={sumbit}
          fullWidth
          style={{ marginBottom: 10,marginTop:"10px"}}
          sx={{
            backgroundColor: "black",

            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Sign In
        </Button>
        <Typography>
          <Link onClick={()=>{navigate("/ForgotPassword")}} sx={{cursor:"pointer"}}>Forgot password?</Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link href="/signup"> Sign Up</Link>
        </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
export default Login;
