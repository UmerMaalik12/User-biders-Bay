import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton, Box,useMediaQuery } from "@mui/material";
import api from "../Config/Api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Coundown from '../comonents/Coundown'
import VerifiedIcon from '@mui/icons-material/Verified';
import "./updatedCard.css"

export default function ActionAreaCard({
  url,
  title,
  price,
  click,
  setWhishlist,
  heartData,
  per,
  date,
  name,
  status,
  MypostCheck,
  extraProp,
  resume,
  expired

}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const MAX_TITLE_LENGTH = isMobile?7:15;

  const [check, setcheck] = useState(0);

  const truncatedTitle =
   title && title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title;
  const y = heartData;
  console.log(heartData);
  useEffect(()=>{
    api.get('/favorite/')
    .then(response => {
      
      if(response)
      {
       
        response.data.FavoritePosts.map((item)=>{
         
         if(item.postId._id==y)
         {
           console.log("mae chala");
           
           setcheck(1)
         }
       
       })
       
       
       
      }
    
    
    })
    .catch(error => {
      console.log(error);
    });
  },[])
  useEffect(()=>{
    console.log("this is extra props",extraProp);
  },[extraProp])
  const fav = (postId) => {
    api
      .post("/favorite/", {
        postId,
      })
      .then(function (response) {
        console.log("mega", response);

        if (response) {
          api
            .get("/favorite/")
            .then((response) => {
              console.log(response.data.FavoritePosts);
              setWhishlist(response.data.FavoritePosts);
            })
            .catch((error) => {
              console.log(error);
            });
          if (response.data.message == "The post is added to Favorites") {
            setcheck(1);
          } else if(per=="fav"){
            setcheck(1);
          }
          else
          {
            setcheck(0)
          }
        }
      })
      .catch(function (error) {
        console.log("this is error");
      });
  };

  return (
    <Card
      disableRipple
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        minWidth: 300,
        margin: 2,
        borderRadius: "5%",
        boxShadow: "5px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        "@media (max-width: 600px)": {
          maxWidth: 120,
          minWidth: 120,
          
          borderRadius: "3%",
        },
      }}
    >
      {/* <CardActionArea> */}
      {/* <CardMedia 
      component="image"
      height="200"
      alt={title}
      src={url}
      style={{objectFit:"fill"}}
      /> */}
 
  <div style={{ position: 'relative' }}> 
      <img
        onClick={click}
        className="img-container"
        src={url}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image";
        }}
        
      ></img>
       {name=="bid"?
      <Card style={{
      position: 'absolute',
      top: '7px',
      left:"7px",
      backgroundColor: 'white',
      boxShadow: "5px 4px 8px 0px rgba(0, 0, 0, 0.2)",
      padding: '4px',
     
    }}>
      <div > 
          {name=="bid"?<Coundown time={date}></Coundown>:null}
        </div >
      </Card>:null}
      
     {extraProp==true?
     <Card style={{
      position: 'absolute',
      top: '7px',
      right:"7px",
      backgroundColor: 'black',
      boxShadow: "5px 4px 8px 0px rgba(0, 0, 0, 0.2)",
      padding: '4px',
     
    }}>
      <Typography sx={{color:"white",fontSize:{xs:10,sm:12,md:16}}} >
         Featured
        </Typography >
      </Card>:null}
      
</div>
      <CardContent>
        <Box display='flex' justifyContent='space-between'>
          <Typography sx={{fontSize:{xs:12,sm:14,md:25}}} gutterBottom variant="h5" component="div" numberOfLines={1}>
            {truncatedTitle}
          </Typography>
          <IconButton disableRipple onClick={() => fav(y)} sx={{padding: 0}}>
            {check == 1 ? (
              <FavoriteIcon sx={{ color: "#e81111", p: 0,fontSize:{xs:18,sm:12,md:25} }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{fontSize:{xs:18,sm:12,md:25}}} />
            )}
          </IconButton>
        </Box>

        <Typography  sx={{fontSize:{xs:8,sm:9,md:16}}}variant="body2" color="text.secondary">
          {"RS."}{price}
        </Typography>
       
        {MypostCheck==1?
        <Typography sx={{marginTop:"10px",fontSize:{xs:10,md:15}}}>
          Status:{status==true?<Typography sx={{color:"#72a4d4",display:"inline",fontSize:{xs:10,md:15}}}>Active</Typography>:<Typography sx={{color:"red",display:"inline",fontSize:{xs:10,md:15}}}>Not Active</Typography>}
        </Typography>:null}
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
