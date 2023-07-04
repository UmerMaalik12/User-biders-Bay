import React, { useEffect } from "react";
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
  Container,
  Box,
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


const BecomeSeller = () => {
  const navigate = useNavigate();
  
  const theme = useTheme();

  const [front, setFront] = useState(null);
  const [back, setback] = useState(null);
  const [CnicNumber, setCnicNumber] = useState(null);
  const [temp1, setTemp1] = useState(null);
  const [temp2, setTemp2] = useState(null);
  const [dis, setdis] = useState(null);
  const [Fpic,setFpic] = useState(false);
  const [Bpic,setBpic] = useState(false);
  const [cNuber,setCnumber]= useState(false);
  const paperStyle = {
    padding: 30,
    height: "auto",
    width: 600,
    margin: "150px auto",
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const Setvalue = (e) => {
    if (e.target.name == "front") {
      setFront(e.target.files[0]);
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          setTemp1(reader.result);
        };
      }
    } else if (e.target.name == "CnicNumber") {
      setCnicNumber(e.target.value);
    } else {
      setback(e.target.files[0]);
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          setTemp2(reader.result);
        };
      }
    }
  };
  useEffect(() => {
    console.log(front);
  }, [front]);
  const submit = (CNIC_front, CNIC_back, cnicNumber) => {
  
    console.log(cnicNumber);
    let formData = new FormData(),
      key;
    formData.append("CNIC_front", CNIC_front);
    api
      .patch(
        "/users/become-seller-cnic-front-pic",

        formData,
        {
          headers: {
            enctype: "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("front", response);
        setFpic(true)
      })
      .catch((error) => {
        console.log(error);
        setdis(error.response.data.message)
      });
    let formData1 = new FormData(),
      key1;
    formData1.append("CNIC_back", CNIC_back);
    api
      .patch(
        "/users/become-seller-cnic-back-pic",

        formData1,
        {
          headers: {
            enctype: "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("back", response);
     setBpic(true)
      })
      .catch((error) => {
        console.log(error);
       
      
        setdis(error.response.data.message)


      });

    api
      .patch(
        "/users/become-seller-cnic-number",

        { cnicNumber },
        {
          headers: {
            enctype: "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("number", response);
        setCnumber(true)
      })
      .catch((error) => {
        console.log(error);
        setdis(error.response.data.message)
      });
          
     
  };
  useEffect(()=>{
    console.log("all value",Fpic,Bpic,cNuber);
    if(Fpic&&Bpic&&cNuber)
    {
      navigate("/account")
    }
  },[Fpic,Bpic,cNuber])
  return (
    <Container maxWidth="sm" sx={{paddingBottom:2}}>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />
      {dis != null ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : null}
      <Typography variant="h4" textAlign="center" pb={3}>
        Become Seller
      </Typography>
      <Stack spacing={2}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack display="flex" justifyContent="center">
          <Box component="image" border="1px solid black" height={200}>
            <img
              style={{
              
                width: "100%",
                height: "100%",
              }}
              src={temp1}
            />
          </Box>
          <Button
            sx={{
              backgroundColor: "black",
              width: {xs:"70%",md:"53%"},
              alignSelf: "center",
              marginTop: "15px",
              marginBottom: "15px",
              fontSize:{xs:"11px",md:"15px"},
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            variant="contained"
            component="label"
          >
            Upload Front CNIC Picture
            <input
              hidden
              accept="image/*"
              name="front"
              onChange={Setvalue}
              type="file"
            />
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack display="flex" justifyContent="center">
          <Box component="image" border="1px solid black" height={200}>
            <img
              style={{
                alignSelf: "center",
               
                width: "100%",
                height: "100%",
              }}
              src={temp2}
            />
          </Box>
          <Button
            sx={{
              backgroundColor: "black",
              width: {xs:"70%",md:"50%"},
              alignSelf: "center",
              marginTop: "15px",
              marginBottom: "15px",
              fontSize:{xs:"11px",md:"15px"},
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            variant="contained"
            component="label"
          >
            Upload Back CNIC Picture
            <input
              hidden
              accept="image/*"
              name="back"
              onChange={Setvalue}
              type="file"
            />
          </Button>
        </Stack>
      </Paper>

      <Paper
        sx={{padding: 2}}
      >
        <Typography
          sx={{ alignSelf: "center", marginBottom: "5px" }}
          variant="h6"
        >
          Enter CNIC with dashes
        </Typography>
        <Type1Field
          label="CNIC"
          style={{ marginBottom: 10, width: "100%" }}
          type="text"
          Name="CnicNumber"
          // Value={values.phone}
          Change={Setvalue}
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
        />
      </Paper>

      <Button
      
        onClick={() => submit(front, back, CnicNumber)}
        variant="contained"
        sx={{
          marginLeft: 25,
          "&:hover": {
            backgroundColor: "black",
            color: "white",
           
          },
       
        }}
        fullWidth={true}
      >
        Verify
      </Button>
      </Stack>

      
    </Container>
  );
};
export default BecomeSeller;
