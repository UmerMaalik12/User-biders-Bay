import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton, Box } from "@mui/material";
import api from "../Config/Api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Coundown from '../comonents/Coundown'
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
  MypostCheck
}) {
  const MAX_TITLE_LENGTH = 17;

  const [check, setcheck] = useState(0);
  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
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

      <img
        onClick={click}
        style={{
          height: 200,
          width: "100%",
          objectFit: "fill",
          cursor: "pointer",
        }}
        src={url}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image";
        }}
      ></img>

      <CardContent>
        <Box display='flex' justifyContent='space-between'>
          <Typography gutterBottom variant="h5" component="div">
            {truncatedTitle}
          </Typography>
          <IconButton disableRipple onClick={() => fav(y)} sx={{padding: 0}}>
            {check == 1 ? (
              <FavoriteIcon sx={{ color: "#e81111", p: 0 }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {"RS."}{price}
        </Typography>
        <Typography >
          {name=="bid"?<Coundown time={date}></Coundown>:null}
        </Typography >
        {MypostCheck==1?
        <Typography sx={{marginTop:"10px"}}>
          Status:{status==true?<Typography sx={{color:"#72a4d4",display:"inline"}}>Active</Typography>:<Typography sx={{color:"red",display:"inline"}}>Not Active</Typography>}
        </Typography>:null}
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
