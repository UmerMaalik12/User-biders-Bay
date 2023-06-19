import React, { useEffect} from "react";
import { useState } from "react";
import {Grid, Paper, TextField,FormControlLabel,Checkbox,FormGroup,Button,Box, Typography,Link,IconButton,InputAdornment,Stack,Alert} from "@mui/material";
import image from '../assets/logo.jpg'
import AbcIcon from '@mui/icons-material/Abc';
import Formcontrol from "../comonents/formcontrol/FormControl";
import {Type1Field} from "../comonents/formcontrol/Fields";
import MenuItem from '@mui/material/MenuItem';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useTheme } from "@mui/material/styles";
import api from '../Config/Api'
import { useNavigate } from "react-router-dom";
import Slider from "../comonents/slider/Slider";
import { useLocation } from "react-router-dom";




const ProductType = [
    {
        value: '0',
        label: 'Used Item',
      },
      {
        value: '1',
        label: 'Bidding Item',
      },
      
    
  ];

  const initial = {
    category: "",
    subcategoryId: "",
    title: "",
    productType:"",
    productPrice: "",
    description: "",
    product_picture:[],
   

  };

const EditPost=()=>
{
    const location = useLocation();
  const [Category,setCategory]=useState(null)
  const [SubCategory,setSubCategory]=useState(null)
  const theme = useTheme();
  const [dis, setdis] = useState(null);
  const navigate = useNavigate();
  const PostDetails=location.state.ProductDetails
  console.log(PostDetails);
  const [images,setimages]=useState(PostDetails.images);
  const getSubcategory=(x)=>
  {
    console.log("in start")
    let y=idReturn(x)
    api.get(
      `/sub-category/${y}`)
    .then(function (response) {
      
      console.log(response)
      setSubCategory(response.data.data)
     
    })
  }
  function idReturn(x)
  {
   
    console.log(x)
    let z=''
      Category.map((option)=>{
      
        if(option.title==x)
        {
         
          z= option._id
        }
      })
      return z
     
  }
  const { values, setValues, hanndleInputChange, errors, setErrors,postChange,setPostValue,postValue } =
    Formcontrol(PostDetails,getSubcategory);
    console.log("product price",postValue.productPrice);
  useEffect(() => {
    // setPostValue(PostDetails)
    
    api.get('/category/')
    .then(function (response) {
      setCategory(response.data.data.allCategory)
    })
 
 
  },[]);
useEffect(() => {
// setimages(postValue. product_picture)
console.log(postValue.product_picture);
setimages(postValue.product_picture)
},[postValue.product_picture])
useEffect(() => {
  // setimages(postValue. product_picture)
  console.log("this is images",images);
  
  },[images])
  const UpdatePost=(title,product_picture,description,productPrice,subcategoryId,ProductType)=>
  {
    const token = localStorage.getItem("user token");
    console.log(token)
    let formData=new FormData(),key;
    const entries = Object.entries(postValue);
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
    for(key of entries) {
      console.log(key);
  }
  const config = { headers: {
    'Authorization':JSON.parse(token),
    'Content-Type': 'multipart/form-data' } };
    api.post(`/products/${PostDetails._id}`, 
      
      formData,
    {
      headers: {
        'enctype': 'multipart/form-data' } 
    },
  
    )
    .then(response => {
      console.log(response);
      if(response)
      {
        // if(postValue.productType=='Bidding Item')
        // {
        //   navigate("/bid");
        // }
        // else
        // {
        //   navigate("/used");
        // }
      }
    })
    .catch(error => {
      console.log(error);

      if (error) {
        setdis(error.response.data);

        
      }
    });
  }
    const paperStyle={padding:20,height:"auto",width:600,margin:"20px auto"}
    
    return(

        <Grid>
          <Box sx={theme.mixins.toolbar} />
            {dis != null ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : (
        <div>{null}</div>
      )}
             <Paper elevation={10} style={paperStyle}>
             <Grid align='center' >
              <Typography variant="h5" sx={{marginBottom:"10px"}}>Edit Post</Typography>
                
                <Grid container spacing={2}>
                  <Grid sx={{padding:"10px",height:"350px",overflow:"hidden",width:"100%",marginTop:"20px"}}>
                  <Slider
                style={{height:"300px"}}
               ShowDelete={true}
              data={PostDetails}
              // updateImages={postValue.product_picture}
              image={PostDetails.images.length
                  ? PostDetails.images
                  : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
              }
            />
                  </Grid>
                
                <Grid item xs={12} sm={6}>
                <TextField
          id="outlined-select-currency"
          select
          label="Category"
          defaultValue="Bid"
          name='category'
          onChange={postChange}
          value={postValue.category}
         
          style={{marginBottom:10,width:'100%'}}
          // onClick={()=>}
          
        > 
        {Category!=null?Category.map((option) => (
            <MenuItem key={option._id
            } value={option.title
            }>
              {option.title}
            </MenuItem>
          )):null}
        </TextField>
        
        <TextField
          id="outlined-select-currency"
          select
          label="Type"
          defaultValue="Bid"
          style={{marginBottom:10,width:'100%'}}
          name='productType'
          value={postValue.productType}
          onChange={postChange}
          
        > 
        {ProductType.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
                
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
          id="outlined-select-currency"
          select
          label="Sub-Category"
          defaultValue="Bid"
          style={{marginBottom:10,width:'100%'}}
          name='subcategoryId'
          value={postValue.subcategoryId}
          onChange={postChange}
          
        > 
       {SubCategory!=null?SubCategory.map((option) => (
            <MenuItem key={option._id
            } value={option._id
            }>
              {option.title}
            </MenuItem>
          )):null}
        </TextField>
        <Type1Field label="Price"  
         Name='productPrice'
         Value={postValue.productPrice}
         Change={postChange}
        style={{marginBottom:10,width:'100%'}} x={<LocalOfferIcon  sx={{color:"black"}}/>} type='number'  as={{input:{
                  '&::-webkit-outer-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0,
                  },
                  '&::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0,
                  }
                }}}></Type1Field>
        
         
                
                </Grid>
                
                
                </Grid>
                <Grid xs={12} container sx={{marginTop:3,display:"flex",alignItems:"center",flexDirection:"column"}}>
                <Type1Field label="Tittle"  Name='title' Value={postValue.title} Change={postChange} style={{marginBottom:10,width:'100%'}} x={<AbcIcon sx={{color:"black"}}/>} ></Type1Field>
       
                </Grid>
                <Grid xs={12} container sx={{marginTop:3,display:"flex",alignItems:"center",flexDirection:"column"}}>
                <TextField
          id="outlined-multiline-static"
          label="Description"
          name='description'
          value={postValue.description}
          onChange={postChange}
          multiline
          rows={4}
          style={{width:'100%'}}/>
                </Grid>
                
          <Grid xs={12} container sx={{marginTop:3,display:"flex",alignItems:"center",flexDirection:"column"}}>
     
      <Button sx={{backgroundColor: "black",

"&:hover": {
  backgroundColor: "black",
  color: "white",
}}} variant="contained" component="label">
        Upload
        <input  hidden accept="image/*" name='product_picture'  onChange={postChange} multiple type="file" />
      </Button>
      
  
    </Grid>
    <Grid xs={12} sm={4} sx={{display:"flex"}}>
        <Grid item xs={6} sx={{width:"100%"}}>
        <Button
          variant="contained"
          // onClick={()=>NewPost( postValue.title,postValue.product_picture,postValue.description,postValue.productPrice,postValue.subcategoryId,postValue.productType)}

          style={{ marginBottom: 10 ,width:100,marginTop:40}}
          sx={{
            backgroundColor: "red",

            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
          }}
        >
          Cancel
        </Button>
        </Grid>
          <Grid item xs={6} sm={6} sx={{width:"100%"}}>
          <Button
          variant="contained"
          onClick={()=>UpdatePost( postValue.title,postValue.product_picture,postValue.description,postValue.productPrice,postValue.subcategoryId,postValue.productType)}

          style={{ marginBottom: 10 ,width:100,marginTop:40}}
          sx={{
            backgroundColor: "black",

            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Save
        </Button>
          </Grid>
         
    </Grid>
    
        
       
                </Grid>
                
               
             </Paper>
        </Grid>

    );


}
export default EditPost;