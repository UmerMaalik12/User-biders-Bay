import React,{useEffect, useState} from 'react'
import { Grid,Box,Paper, Typography,Button,IconButton} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { Type1Field ,Type2Field} from '../comonents/formcontrol/Fields';
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OTPDigitsInput from '../comonents/OtpBox';
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import api from '../Config/Api'
export default function Otp() {
    const theme = useTheme();
    const navigate = useNavigate();
    const paperStyle={padding:20,height:"450px",width:800,margin:"20px auto"}
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [email,setEmail] = useState(null);
    const [flag1,setFlag1] = useState("grid")
    const [flag2,setFlag2] = useState("none")
    const [flag3,setFlag3] = useState("none")
    const [MaskedMail,setMaskedMail] = useState(" ");
    const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
    const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);
    const [otpValue, setOtpValue] = useState('');
    const [change,setChange]=useState({"oldPassword":"",
  "newPassword":"",
  "rePassword":""});


  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };
    const handleInputChange = (e) => {
        setEmail(e.target.value);
      };
      
      function maskEmail(email) {
        const atIndex = email.indexOf('@');
        const username = email.substring(0, atIndex);
        const domain = email.substring(atIndex + 1);
        const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
        const maskedEmail = maskedUsername + '@' + domain;
        return maskedEmail;
      }
     const sumbit=(email)=>{
        api
        .post("/forget_password/send-otp/", {
          email
          
        })
        .then(function (response) {
          console.log(response);
          if(response)
          {
            setMaskedMail(maskEmail(email));
            setFlag1("none")
            setFlag2("grid")

          }
        })
        .catch(function (error) {
          console.log("this is error");
        });
        
     }
     const verify=(email,OTP)=>{
        api
        .post("/forget_password/verify-otp", {
          email,OTP
          
        })
        .then(function (response) {
          console.log(response);
          if(response)
          {
           
            setFlag2("none")
            setFlag3("grid")
          }
        })
        .catch(function (error) {
          console.log("this is error");
        });
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
  const ChangePassword=(email,password,rePassword)=>
  {
    api
    .post("/forget_password/reset-password", {
        email,password,rePassword
      
    })
    .then(function (response) {
      console.log(response);
      navigate("/login");
      
    })
    .catch(function (error) {
      console.log("this is error");
    });
  }
  return (
    <Grid>  <Box sx={theme.mixins.toolbar} />
    <Paper elevation={10} align="center" style={paperStyle}>
        <Grid  align="center" display={flag1} sx={{marginTop:"90px",width:"70%"}}>
            <Typography variant='h5'>
                Please Enter Your Email For Verification Code
            </Typography>
            <Type1Field label="Email"  
         Name='Email'
         value={email}
         Change={handleInputChange}
        style={{marginTop:"30px",width:'100%'}} x={<MailIcon sx={{ color: "black" }} />} type='text'></Type1Field>
                  <Button
          variant="contained"
          onClick={()=>sumbit(email)}
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
          Confirm
        </Button>
        
        </Grid>
        <Grid align="center" display={flag2} sx={{marginTop:"90px",width:"70%",alignContent:"center",alignItems:"center"}}>
            <Typography variant='h6' sx={{marginBottom:"20px"}}>Please Enter The Code Sent to {MaskedMail}</Typography>
        <OTPDigitsInput onOtpChange={handleOtpChange}/>
        <Grid sx={{width:"100%",alignItems:"center"} }>
        <Button
          variant="contained"
          onClick={()=>verify(email,otpValue)}
          fullWidth
          style={{ marginBottom: 10,marginTop:"10px"}}
          sx={{
            
            backgroundColor: "black",
            width:"50%",

            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Verify
        </Button>
        </Grid>
        
        </Grid>
        <Grid align="center" display={flag3} sx={{width:"70%",marginTop:"75px"}}>
            <Typography variant='h5' sx={{marginBottom:"20px"}}>Reset Your Password</Typography>
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
             onClick={()=>ChangePassword(email,change.newPassword,change.rePassword)}

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
        
    </Paper>
    
    </Grid>
  )
}
