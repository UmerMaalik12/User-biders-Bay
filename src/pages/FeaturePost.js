import React,{useEffect, useState} from 'react'
import { Grid,Box,Paper, Typography,Button,IconButton,Stack,Alert} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import api from '../Config/Api'
export default function FeaturePost() {
    const theme = useTheme();
    const navigate = useNavigate();
    const paperStyle={padding:20,height:"900px",width:500,margin:"20px auto"}
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [email,setEmail] = useState(null);
    const [flag1,setFlag1] = useState("grid")
    const [flag2,setFlag2] = useState("none")
    const [flag3,setFlag3] = useState("none")
    const [Temp1,setTemp1]=useState(null);
    const [ScreenShot,setScreenShot] = useState(null)
    const [MaskedMail,setMaskedMail] = useState(" ");
    const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
    const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);
    const [otpValue, setOtpValue] = useState('');
    const [dis, setdis] = useState(null);
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
            setdis(null)

          }
        })
        .catch(function (error) {
            setdis(error.response.data.error);
         
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
            setdis(null);
          }
        })
        .catch(function (error) {
            setdis(error.response.data.message);
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
  const handleScreenShot=(e)=>
  {
    setScreenShot(e.target.files[0]);
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          setTemp1(reader.result);
        };
  }
}
  return (
    <Grid>  <Box sx={theme.mixins.toolbar} />
     {dis != null ? (
        <Stack sx={{ width: "100%",marginTop:"40px" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : (
        <div>{null}</div>
      )}
    <Paper elevation={10} align="center" style={paperStyle}>
        <Grid  align="center" display={flag1} sx={{width:"70%",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography variant='h5'>
                Feature Post
            </Typography>
            <Typography  variant="subtitle1" sx={{textAlign:"justify",marginTop:"10px",marginBottom:"50px"}}>
            Make your payment directly into our bank account. Please attach the payment screen Shot Below. Your Post will not be Featured until the funds have cleared in our account. 


Name: Bidders Bay<br></br>
Bank: Bank HBL<br></br>
Account Number: 0234XXXXXXXXXX
            </Typography>
            <Box component="image" elevation={100} border="2px solid black" sx={{marginBottom:"15px",boxShadow:"10"}} height={400}>
            <img
              style={{
                alignSelf: "center",
               
                width: "200px",
                height: "100%"
              }}
              src={Temp1}
            />
          </Box>
          
        <Button sx={{backgroundColor: "black", width:"100px",marginBottom:"60px",

"&:hover": {
  backgroundColor: "black",
  color: "white",
}}} variant="contained" component="label">
        Upload
        <input  hidden accept="image/*" name='ScreenShot'  multiple type="file"  onChange={handleScreenShot}/>
      </Button>
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
             Apply
            </Button>
        </Grid>
      
      
        
    </Paper>
    
    </Grid>
  )
}
