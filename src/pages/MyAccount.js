import React from "react";
import { useState, useEffect } from "react";
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
  IconButton,
  Stack
} from "@mui/material";

import api from '../Config/Api'


import image from "../assets/logo.jpg";
import Datepicker from "../comonents/datePicker";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Type1Field, Type2Field } from "../comonents/formcontrol/Fields";
import Formcontrol from "../comonents/formcontrol/FormControl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import AbcIcon from "@mui/icons-material/Abc";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import LogoutIcon from "@mui/icons-material/Logout";
import Navbar from "../comonents/navbar";
import { AppbarSpace } from "../comonents/AppbarSpace";
import HomeIcon from "@mui/icons-material/Home";



const initial = JSON.parse(localStorage.getItem("user Info"));
console.log(initial);


const Login = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const x=JSON.parse(localStorage.getItem("user Info"))
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
  const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);
  const [dis, setdis] = useState(null);
  const [info, setinfo] = useState(null);
  const [change,setChange]=useState({"oldPassword":"",
  "newPassword":"",
  "rePassword":""});

  const paperStyle = {
    padding: 50,
  };

  const {
    errors,
    setAvalue,
    Avalue,
    AccountChange,
  } = Formcontrol(initial);
  const[Adate,setAdate]=useState(new Date(Avalue.dob));

  useEffect(() => {

    setAdate(new Date(Avalue.dob));
  },[Avalue.dob]);
  useEffect(() => {

    setAvalue(JSON.parse(localStorage.getItem("user Info")))
  },[]);

  const sumbit=()=>
  {
    let formData=new FormData(),key;
    const entries = Object.entries(Avalue);
    for (const [key,value] of entries) {
      if(key=='product_picture')
      {
        let images=[]
        for (let i = 0; i < value.length; i++) {
          images.push(value[i]);
          formData.append('product_picture',value[i])
      }
       
      }
      else{
        formData.append(key,value);
      }
      
    }
    api.post('/users/edit/', 
      
      formData,
    {
      headers: {
        'enctype': 'multipart/form-data' } 
    },
  
    )
    .then(response => {
      console.log("update res",response.data.message);

      localStorage.setItem("user Info",JSON.stringify(response.data.data))
      setAvalue(JSON.parse(localStorage.getItem("user Info")))
      setinfo(response.data.message)
      setdis(null)
      
    })
    .catch(error => {
      console.log(error);

      // if (error) {
      //   setdis(error.response.data.message);

        
      // }
    });
    for(key of entries) {
      console.log(key);
  }
  }
  const handleChanges=(e)=>
  {
    const a=e.target.name
    const b=e.target.value
    console.log(a);
    console.log(b);
    setChange({
      ...change,
      [a]:b
  });
}
  const ChangePassword=(oldPassword,newPassword,rePassword)=>
  {
    api.patch('/users/change-password/', 
      
    {
      oldPassword,newPassword,rePassword
    },
  {
    headers: {
      'enctype': 'multipart/form-data' } 
  },

  )
  .then(response => {
    console.log(response);
    setinfo(response.data.message)
      setdis(null)
    
  })
  .catch(error => {
    console.log(error);
    setdis(error.response.data.error)
    setinfo(null)
     
    // if (error) {
    //   setdis(error.response.data.message);

      
    // }
  });
  }
  const handleInfo=() => {
    navigate("/bsprofile",{state:{Info:JSON.parse(localStorage.getItem("user Info"))}})
  }
  return (
    <Container>
      <Box sx={theme.mixins.toolbar} />
      
      <AppbarSpace></AppbarSpace>
      {dis !== null ? (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="error">{dis}</Alert>
  </Stack>
) : info !== null ? (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="info">{info}</Alert>
  </Stack>
) : null}
      <Paper elevation={10} style={paperStyle}>
        <Typography variant="h4">My Account</Typography>
        
        <Box component="div" sx={{display: "flex", justifyContent: 'flex-end' }}>
        <LogoutIcon
          onClick={() => {
            localStorage.setItem("user Info", null);
            localStorage.setItem("user token",null);
            props.setToken("ok")
            props.setWhishlist([])

            navigate("/");
          }}
          sx={{ fontSize: 24 }}
        />
        
        </Box>
        
        <Grid align="center" style={{ paddingBottom: 35 }}>
          <Avatar sx={{ height: 100, width: 100, fontSize: 50,marginBottom:3}} alt={Avalue.firstName}
  src={Avalue.images}></Avatar>
  <Button sx={{backgroundColor: "black",

"&:hover": {
  backgroundColor: "black",
  color: "white",
}}} variant="contained" component="label">
        Change Image
        <input  hidden accept="image/*" name='product_picture'   multiple type="file" />
      </Button>
      <Grid sx={{marginTop:"50px"}}>
      {x.role=='seller'?<Link onClick={handleInfo}>My Post</Link>:<Typography onClick={()=>{navigate("/bseller")}}> Become Seller</Typography>}
          
      </Grid>
          
        </Grid>
        <Container maxWidth="sm">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Type1Field
                label="First Name"
                style={{ marginBottom: 10 }}
                x={<AbcIcon sx={{ color: "black" }} />}
                Name="firstName"
                sx={{ width: "100%" }}
                Value={Avalue.firstName}
                Change={AccountChange}
              ></Type1Field>
              <Type1Field
                label="Email"
                error={errors.email}
                style={{ marginBottom: 10 }}
                x={<MailIcon sx={{ color: "black" }} />}
                Name="email"
                Value={Avalue.email}
                
              ></Type1Field>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={Avalue.gender}
                  onChange={AccountChange}

                  // onChange={}
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
                style={{ marginBottom: 10 }}
                x={<AbcIcon sx={{ color: "black" }} />}
                Name="lastName"
                Value={Avalue.lastName}
                Change={AccountChange}
              ></Type1Field>
              <Type1Field
                label="Phone Number"
                error={errors.Phone}
                // style={{ marginBottom: 10}}
                x={<LocalPhoneIcon sx={{ color: "black" }} />}
                type="number"
                Name="phoneNo"
                Value={Avalue.phoneNo}
                Change={AccountChange}

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
              {/* <Grid item xs={12} sm={3}> */}
              <Typography>DOB</Typography>
              <Datepicker
                Name="dob"
                 value={Adate}
                  change={AccountChange}
              ></Datepicker>
              {/* </Grid> */}
            </Grid>
          </Grid>
          <Grid align="center" item xs={12} sm={12}>
          <Type1Field
              label="Address"
              error={errors.address}
              style={{ marginBottom: 10, marginTop: 10, width:"510px",marginLeft:-45 }}
              x={<HomeIcon sx={{ color: "black" }} />}
              Name="Address"
              Value={Avalue.address}
              Change={AccountChange}
            ></Type1Field>
          </Grid>
          <Grid align="center" item xs={12} sm={12}>
            <Button
              variant="contained"
              onClick={sumbit}

              style={{ marginBottom: 10, width: 200, marginTop: 60 }}
              sx={{
                backgroundColor: "black",

                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Save changes
            </Button>
          </Grid>
          
          <Grid sx={{marginTop:"10px"}}>
          <Typography sx={{marginBottom:"25px"}}variant="h5">Change Password</Typography>
            <Grid align="center" item xs={12} sm={12}>
          <Type2Field
                Label="Old Password"
                style={{ marginBottom: 10, width: "100%" }}
                type={showPassword ? "text" : "password"}
                Name="oldPassword"
                Value={change.oldPassword}
                Change={handleChanges}
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
                 <Type2Field
                Label="New Password"
                style={{ marginBottom: 10, width: "100%" }}
                type={showPassword1 ? "text" : "password"}
                Name="newPassword"
                Value={change.newPassword}
                Change={handleChanges}
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
                 <Type2Field
                Label="Re-Enter New Password"
                style={{ marginBottom: 10, width: "100%" }}
                type={showPassword2 ? "text" : "password"}
                Name="rePassword"
                Value={change.rePassword}
                Change={handleChanges}
                y={
                  <IconButton
                    onClick={handleClickShowPassword2}
                    sx={{ color: "black" }}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>
                }
                z={<LockIcon sx={{ color: "black" }} />}
              ></Type2Field>
              <Button
              variant="contained"
              onClick={()=>ChangePassword(change.oldPassword,change.newPassword,change.rePassword)}

              style={{ marginBottom: 10, width: 200, marginTop: 10 }}
              sx={{
                backgroundColor: "black",

                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Change Password
            </Button>
              </Grid>
          </Grid>
        </Container>
      </Paper>
      <Box sx={theme.mixins.toolbar} />
    </Container>
  );
};
export default Login;
