import React,{useEffect, useState} from 'react'
import { Grid,Box,Paper, Typography,Button,IconButton,Stack,Alert, Container} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from '../Config/Api'
export default function FeaturePost() {
  const location = useLocation();
    const theme = useTheme();
    const navigate = useNavigate();
    const paperStyle={padding:20,height:"900px",width:500,margin:"20px auto"}
    const [Temp1,setTemp1]=useState(null);
    const [ScreenShot,setScreenShot] = useState(null)
    const [dis, setdis] = useState(null);
    const ProductID=location.state.ProductDetails._id;
   


  const FeatureProduct=(postId,payment_ss)=>
  {
    console.log(ScreenShot);
    
    let formData=new FormData();
    formData.append("postId",postId)
    formData.append("payment_ss",payment_ss)
    api
    .post("/payment-featured/", 
     formData
      
    )
    .then(function (response) {
      console.log(response);
      navigate("/bsprofile");
      
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
    <Container>  <Box sx={theme.mixins.toolbar} />
     {dis != null ? (
        <Stack sx={{ width: "100%",marginTop:"40px" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : (
        <div>{null}</div>
      )}
    <Paper elevation={10} align="center" style={paperStyle}>
        <Grid  align="center" sx={{width:"70%",display:"flex",flexDirection:"column",alignItems:"center"}}>
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
             onClick={()=>FeatureProduct(ProductID,ScreenShot)}

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
    
    </Container>
  )
}
