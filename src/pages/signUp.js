import React from "react";
import { useState,useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  MenuItem
} from "@mui/material";
import image from "../assets/logo.jpg";
import { PhotoCamera } from "@mui/icons-material";
import AbcIcon from "@mui/icons-material/Abc";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ManIcon from "@mui/icons-material/Man";
import HomeIcon from "@mui/icons-material/Home";
import Radio from "@mui/material/Radio";
import Datepicker from "../comonents/datePicker";
import { color } from "@mui/system";
import Formcontrol from "../comonents/formcontrol/FormControl";
import { Type1Field, Type2Field } from "../comonents/formcontrol/Fields";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import api from '../Config/Api'

const initial = {
  Firstname: "",
  Lastname: "",
  Email: "",
  Password: "",
  RePass: "",
  phone: "",
  gender: "male",
  Address: "",
  age: new Date(),
  currentCity:""
};
const SignUp = () => {
  
  const [dis, setdis] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [city,setCity]=useState(null)
  const { values, setValues, hanndleInputChange, errors, setErrors } =
    Formcontrol(initial);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
  const check = (
    email,
    password,
    rePassword,
    firstName,
    lastName,
    phoneNo,
    address,
    dob,
    gender,
    currentCity
  ) => {
    
      api.post("/users/signup", {
        email,
        password,
        rePassword,
        firstName,
        lastName,
        phoneNo,
        address,
        dob,
        gender,
        currentCity
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data) {
          navigate("/login");
        }
      })
      .catch(function (error) {
        console.log("this is error");

        if (error) {
          setdis(error.response.data.message);

          console.log(error.response.data.message);
        }
      });
  };
  useEffect(() => {
    
   
    api.get('/users/cities')
    .then(function (response) {
      console.log(response.data.data)
      setCity(response.data.data)
    })
 
  },[]);
  const validate = () => {
    let temp = {};
    temp.firstname = values.Firstname ? "" : "Firstname should be filled";
    temp.lastname = values.Lastname ? "" : "Lastname should be filled";
    temp.Phone = values.phone ? "" : "Phone Number should be filled";
    temp.address = values.Address ? "" : "Address should be filled";
    temp.password = values.Password ? "" : "password should be filled";
    temp.password2 = values.RePass ? "" : "password should be filled";
    temp.email = values.Email ? "" : "Email should be filled";
    temp.Gender = values.gender ? "" : "Gender should be filled";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  const sumbit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("hello" + values.currentCity);
      check(
        values.Email,
        values.Password,
        values.RePass,
        values.Firstname,
        values.Lastname,
        values.phone,
        values.Address,
        values.age,
        values.gender,
        values.currentCity
      );
    }
  };
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 600,
    margin: "20px auto",
  };
  console.log(values.age)
  return (
    <Grid>
      {dis != null ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : (
        <div>{null}</div>
      )}
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <img src={image} alt="bidderbay" style={{height:"100px"}}></img>
          <Typography  style={{marginBottom:"15px"}} variant="h6">SignUp</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Type1Field
                label="First Name"
                error={errors.firstname}
                style={{ marginBottom: 10, width: "100%" }}
                x={<AbcIcon sx={{ color: "black" }} />}
                Name="Firstname"
                Value={values.Firstname}
                Change={hanndleInputChange}
              ></Type1Field>
              <Type1Field
                label="Email"
                error={errors.email}
                style={{ marginBottom: 10, width: "100%" }}
                x={<MailIcon sx={{ color: "black" }} />}
                Name="Email"
                Value={values.Email}
                Change={hanndleInputChange}
              ></Type1Field>
              <Type2Field
                Label="Password"
                error={errors.password}
                style={{ marginBottom: 10, width: "100%" }}
                type={showPassword ? "text" : "password"}
                Name="Password"
                Value={values.Password}
                Change={hanndleInputChange}
                y={
                  <IconButton
                    onClick={handleClickShowPassword}
                    sx={{ color: "black" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>
                }
                z={<LockIcon sx={{ color: "black" }} />}
              ></Type2Field>
              <TextField
          id="outlined-select-currency"
          select
          label="City"
          defaultValue="Lahore"
          name='currentCity'
          value={values.currentCity}
          onChange={hanndleInputChange}
         
          style={{marginBottom:10,width:'100%'}}
          // onClick={()=>}
          
        > 
        {city!=null?city.map((option) => (
            <MenuItem key={option.lat
            } value={option.name
            }>
              {option.name}
            </MenuItem>
          )):null}
        </TextField> 
              <FormControl sx={{ marginLeft: -10 }}>
                <FormLabel sx={{ marginLeft: -15 }}>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={values.gender}
                  onChange={hanndleInputChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Type1Field
                label="Last Name"
                error={errors.lastname}
                style={{ marginBottom: 10, width: "100%" }}
                x={<AbcIcon sx={{ color: "black" }} />}
                Name="Lastname"
                Value={values.Lastname}
                Change={hanndleInputChange}
              ></Type1Field>
              <Type1Field
                label="Phone Number"
                error={errors.Phone}
                style={{ marginBottom: 10, width: "100%" }}
                x={<LocalPhoneIcon sx={{ color: "black" }} />}
                type="number"
                Name="phone"
                Value={values.phone}
                Change={hanndleInputChange}
                as={{
                  input: {
                    "&::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "&::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  },
                }}
              ></Type1Field>

              <Type2Field
                Label="Retype Password"
                error={errors.password2}
                style={{ marginBottom: 10, width: "100%" }}
                type={showPassword1 ? "text" : "password"}
                Name="RePass"
                Value={values.RePass}
                Change={hanndleInputChange}
                y={
                  <IconButton
                    onClick={handleClickShowPassword1}
                    sx={{ color: "black" }}
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>
                }
                z={<LockIcon sx={{ color: "black" }} />}
              ></Type2Field>
              <Typography sx={{ marginLeft: -30, paddingBottom: 1 }}>
                Date
              </Typography>
              <Datepicker
                Name="age"
                value={values.age}
                change={hanndleInputChange}
              ></Datepicker>
            </Grid>
            <Type1Field
              label="Address"
              error={errors.address}
              style={{ marginBottom: 10, marginTop: 10, width: "100%" }}
              x={<HomeIcon sx={{ color: "black" }} />}
              Name="Address"
              Value={values.Address}
              Change={hanndleInputChange}
            ></Type1Field>
          </Grid>
        </Grid>
        <Button
          onClick={sumbit}
          variant="contained"
          fullWidth
          style={{ marginBottom: 10 }}
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

        <Typography style={{ marginLeft: 200 }}>
          Already have an account?
          <Link href="/login"> Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default SignUp;
