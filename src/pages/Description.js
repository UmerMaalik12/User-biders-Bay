import React, { useEffect, useRef, useState } from "react";
import Slider from "../comonents/slider/Slider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useLocation } from "react-router-dom";

import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';

import {
  Button,
  Grid,
  Typography,
  Paper,
  Stack,
  Alert,
  IconButton,
  Container,
  Box,
  Avatar,
  Divider,
  Tooltip,
  Badge
} from "@mui/material";
import Navbar from "../comonents/navbar";
import { AppbarSpace } from "../comonents/AppbarSpace";
import BadgeIcon from "@mui/icons-material/Badge";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Type1Field, Type2Field } from "../comonents/formcontrol/Fields";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ".././css/Scroll.css";
import api from "../Config/Api";
import Formcontrol from "../comonents/formcontrol/FormControl";
import Rating from "../comonents/rating/rating";
import { Link, useNavigate } from "react-router-dom";
import Coundown from "../comonents/Coundown";
import { useTheme } from "@mui/material/styles";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import { Edit } from "@mui/icons-material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { createBrowserHistory } from "history";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BASE_URL } from "../Config/constant";

const initial = {
  comment: "",
};
export default function (props) {
  const theme = useTheme();

  const location = useLocation();
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const [comments, setComents] = useState([]);
  const [dis, setdis] = useState(null);
  const [rating, setRating] = useState(null);
  const [bid, SetBid] = useState(" ");
  const [bidInfo, setBidInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [allBids,setAllBids]=useState([])
  const [editFlag,setEditFlag]=useState(0);
  const [expired, setExpired] = useState(false)


  const [check, setcheck] = useState(0);

  const { Tcoment, setTcoments, hanndleComentChange } = Formcontrol(initial);
  console.log("wadi awaz", location.state.x);
  console.log(location.state.Mode);
  const y = location.state.x._id;
  const z = location.state.x.userId._id;
  const UserData = JSON.parse(localStorage.getItem("user Info"));
  const ID = UserData._id;
  console.log(location.state.x);
  console.log(location.state.x._id);
  const descriptionRef = useRef(null);
  const [CloseBIdFlag,setcloseBIdFlag] = useState(location.state.x.closeBid)
  const [HideBidFlag,setHideBidFlag] = useState(true)
  const [JoiDate, setDate] = useState("");
  // useEffect(() => {
  //   const descriptionHeight = descriptionRef.current.clientHeight;
  //   const paperHeight = 200;
  //   const marginTop =
  //     descriptionHeight > paperHeight ? -(descriptionHeight - paperHeight) : 25;
  //   document.getElementById(
  //     "seller-description-paper"
  //   ).style.marginTop = `${marginTop}px`;
  // }, [location.state.x.description]);
  const convertData = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long",day:"numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    const localUserId=JSON.parse(localStorage.getItem("user Info"));
    if(z==localUserId._id)
    {
      setEditFlag(1)
    }

  
    api
      .get(`/comment/${y}`)
      .then(function (response) {
        console.log(
          "name",
          response.data.data.allCommentsOfPost[0].userId.lastName
        );
        setComents(response.data.data.allCommentsOfPost);
        console.log(comments);
      })
      .catch(function (error) {
        console.log("this is error");
      });
      console.log("value of z",z);
   
    api
      .get(`/bidding/${y}`)
      .then(function (response) {
        console.log("server Bidding ", response.data);
        setBidInfo(response.data);
      })
      .catch(function (error) {
        console.log("this is error");
      });
    api
      .get("/favorite/")
      .then((response) => {
        console.log("check", response.data.FavoritePosts);
        if (response) {
          let des = 0;
          response.data.FavoritePosts.map((item) => {
            console.log("tem.postId._id", item.postId._id);
            console.log("location.state.x._id", location.state.x._id);
            if (item.postId._id == location.state.x._id) {
              console.log("mae chala");

              setcheck(1);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

      api
      .get(`/bidding/${y}`)
      .then(function (response) {
        console.log(
          "all bids",
          response.data.allBidsOfPost
          );
          setAllBids(response.data.allBidsOfPost)
       
      })
      .catch(function (error) {
        console.log("this is error");
      });
      console.log("close bid",CloseBIdFlag);
      console.log("edit flag",editFlag);
      
      console.log("hide walue",HideBidFlag);

      const originalDate = location.state.x.createdAt;
    const convertedDate = convertData(originalDate);
    setDate(convertedDate);
  }, []);
  useEffect(()=>{
    console.log("the value of edit flag ",editFlag);
    setHideBidFlag(true)
    if(editFlag==0 && CloseBIdFlag==true)
      {
        console.log("check is working");
        setHideBidFlag(false)
      }
  },[editFlag])
  useEffect(() => {
    api
    .get(`/rating/${z}`)
    .then(function (response) {
      console.log("what is", response.data.data[0].avgRating);
      setRating(response.data.data[0].avgRating);
    })
    .catch(function (error) {
      console.log("this is error rating");
    });
  },[])

  const handleChange = (event) => {
    SetBid(event.target.value);
  };
  const postComent = (comment, postId) => {
    api
      .post("/comment/", {
        postId,
        comment,
      })
      .then(function (response) {
        setTcoments({
          comment: "",
        });
        console.log(response);
      })
      .catch(function (error) {
        //  console.log(error);
      });
    api
      .get(`/comment/${y}`)
      .then(function (response) {
        console.log("coments", response);
        setComents(response.data.data.allCommentsOfPost);
        console.log(comments);
      })
      .catch(function (error) {
        console.log("this is error");
      });
  };
  const fav = (postId) => {
    api
      .post("/favorite/", {
        postId,
      })
      .then(function (response) {
        console.log("mega", response);
        setdis(response.data.message);

        if (response) {
          api
            .get("/favorite/")
            .then((response) => {
              console.log(response.data.FavoritePosts);
              props.setWhishlist(response.data.FavoritePosts);
            })
            .catch((error) => {
              console.log(error);
            });
          if (response.data.message == "The post is added to Favorites") {
            setcheck(1);
          } else {
            setcheck(0);
          }
        }
      })
      .catch(function (error) {
        console.log("this is error");
      });
  };
  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const Postbid = (bidingPrice, productId) => {
    api
      .post("/bidding/", {
        bidingPrice,
        productId,
      })
      .then(function (response) {
        if (response) {
          api
            .get(`/bidding/${y}`)
            .then(function (response) {
              console.log("server Bidding ", response.data);
              setBidInfo(response.data);
            })
            .catch(function (error) {
              // console.log("this is error",error.response.data);
           
            });
        }
      })
      .catch(function (error) {
        console.log("this is error",error);
        if((bid<location.state.x.productPrice && bid>0)||(bid<bidInfo.highestBid &&bid>0))
        {
          setdis(error.response.data.message)
        }
        else if(bid==0)
        {
          setdis(error.response.data)
        }
        else{
          setdis(error.response.data)
        }
        
      });
    SetBid("");
  };
  const HandlePostDeletion=()=>
  {
    if(location.state.x.StatusOfActive==true)
    {
      api
    .put(`/products/add_to_deleted/${location.state.x._id}`
      
    )
    .then(function (response) {
      console.log(response);
      navigate(-1);
      
    })
    .catch(function (error) {
      console.log("this is error");
      
    });
    }
    else
    {
      api
      .delete(`/products/${location.state.x._id}`
        
      )
      .then(function (response) {
        console.log(response);
        navigate(-1);
       
        
      })
      .catch(function (error) {
        console.log("this is error");
      });
    }
  }
const PauseBid=()=>{
  api
      .put(`/bidding/close_bidding/${location.state.x._id}`
        
      )
      .then(function (response) {
        console.log(response);
        if(response)
        {
          setcloseBIdFlag(true)
        }
       
       
        
      })
      .catch(function (error) {
        console.log("this is error");
      });
}
const ResumeBid=()=>
{
  api
  .put(`/bidding/resume_bidding/${location.state.x._id}`
    
  )
  .then(function (response) {
    console.log(response);
    if(response)
    {
      setcloseBIdFlag(false)
    }
   
   
    
  })
  .catch(function (error) {
    console.log("this is error");
  });
}
  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />

      {dis != null ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : null}

      <Grid container spacing={2} display="flex">
        <Grid container item direction="row" md={8} spacing={5}>
          <Grid item xs={12} md={12}>
            <Slider
             ShowDelete={false}
             
             style={{height:"500px","@media (max-width: 576px)": {
              height:"250px"
            },}}
              data={location.state.x}
              image={
                location.state.x.images.length
                  ? location.state.x.images
                  : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <div
              className="Scroll"
              style={{
                border: "1px solid #D3D3D3",
                borderRadius: "10px",
                height: 250,
                overflow: "scroll",
                padding: 20,
              }}
            >
              {comments.length == 0 ? (
                <h1>No Comments</h1>
              ) : (
                comments.map((p, index) => {
                  return (
                    <div
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                        marginBottom: 5,
                        wordBreak: "break-word",
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: 10,
                        margin: 3,
                        padding: 10,
                        width: "fit-content",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Paper sx={{ px: 3, py: 1 }}>
                        <Box display="flex">
                          {p.userId._id==location.state.x.userId._id?<Badge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  badgeContent={
    <LocalPoliceRoundedIcon sx={{fontSize:"20px"}}/>
  }
>
  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
</Badge>: <Avatar sx={{width:30,height:30}}/>}
                         

                          <Stack pl={1} pt={0.2}>
                            <Typography variant="body1" color="text.disable">
                              {p.userId.firstName} {p.userId.lastName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              pt={0.5}
                              color="textSecondary"
                              lineHeight={1.2}
                            >
                              {p.comment}
                            </Typography>
                          </Stack>

                          {/* <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              lineHeight={1}
                              pb={1}
                            >
                              {review.body}
                            </Typography> */}
                        </Box>
                      </Paper>
                      {/* <Typography sx={{ fontWeight: "bold" }} variant="subtitle">
                      {p.userId.firstName} {p.userId.lastName}
                    </Typography>
                    {p.comment} */}
                    </div>
                  );
                })
              )}
            </div>
            <Type2Field
              Label="Comment"
              //  error={errors.password}
              style={{ width: "100%", marginTop: 10 }}
              type="text"
              Name="comment"
              Value={Tcoment.comment}
              Change={hanndleComentChange}
              y={
                <ArrowForwardIcon
                  onClick={() => postComent(Tcoment.comment, y)}
                  sx={{ color: "black",cursor:"pointer" }}
                ></ArrowForwardIcon>
              }
            ></Type2Field>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <Paper sx={{ p: 3, width: "100%", height: "auto" }}>
              {/* Title */}
              <Typography variant="h5" sx={{ wordWrap: "break-word" }}>
                {location.state.x.title}
              </Typography>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                
              >
                {/* Price */}
                <Typography variant="body1" sx={{ fontSize: 20 }}>
                  Rs.{location.state.x.productPrice}
                </Typography>
                {/* Fvrt */}
                <Grid>
               {editFlag==1?<Grid><Tooltip title="Feature Post">
                         <IconButton sx={{color:"black"}} onClick={()=>navigate("/Feature",{ state: { ProductDetails: location.state.x }})}>
                         <PaidIcon/>
                       </IconButton>
                         </Tooltip>
                  
                  <Tooltip title={location.state.x.StatusOfActive==true?"Add to Deleted Product":"Permanently Deleted Product"}>
                         <IconButton>
                         <DeleteIcon sx={{color:"red"}} onClick={HandlePostDeletion}/>
                       </IconButton>
                         </Tooltip>
                         {location.state.x.productType=='Bidding Item'?<Tooltip title={CloseBIdFlag==false?"Pause Bid":"Resume Bid"}>
                        <IconButton  sx={{color:"black"}}>
                        {CloseBIdFlag==false? <PauseIcon onClick={PauseBid}/>:<PlayArrowIcon onClick={ResumeBid}/>}
                       </IconButton>
                         </Tooltip>:null}
                       
                  <Tooltip title="Edit">
                         <IconButton  sx={{color:"black"}}> 
                         <ModeIcon   onClick={()=>navigate("/Edit",{ state: { ProductDetails: location.state.x }})}/>
                       </IconButton>
                         </Tooltip></Grid>:  <IconButton sx={{alignContent:"end"}} disableRipple onClick={() => fav(y)}>
                  {check == 1 ? (
                    <FavoriteIcon sx={{ color: "#e81111" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}
                </IconButton>}
                
               
              
                </Grid>
                
               
              </Box>

              <Box>
                {location.state.Mode != "used" ? (
                  <Typography>
                    <Coundown time={location.state.x.createdAt} onExpired={(val)=>{setExpired(val)}} />
                  </Typography>
                ) : null}
                <Typography variant="subtitle" fontWeight={500}>
               {JoiDate}
              </Typography>
              </Box>

              <Box pt={8}>
              
                <Typography variant="h6">Description</Typography>
                <Typography
                  ref={descriptionRef}
                  variant="body1"
                  color="textSecondary"
                  sx={{ wordWrap: "break-word", lineHeight: "1.2" }}
                >
                  {location.state.x.description}
                </Typography>
              </Box>
            </Paper>

            
              {location.state.Mode != "used" ? (
                
            
             HideBidFlag==true ?(<Paper sx={{ p: 3, width: "100%" }}>
                
                  <Typography variant="h6">
                    {editFlag==1?"Bidding Details":"Please Enter your Bid"}
                    </Typography>
                  <Box display="flex">
                    <Typography variant="body1" pr={1}>
                      Starting Bid:
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Rs.{location.state.x.productPrice}{" "}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" pr={1}>
                      Highest Bid:
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Rs.{bidInfo != null ? bidInfo.highestBid : "loading"}
                    </Typography>
                    
                  </Box>
                  
                  <Accordion
              expanded={expanded === "panel2"}
              onChange={handleExpand("panel2")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  All Bids
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                
                {allBids?.map((p) => (
                  <Box key={p._id} py={1}>
                    <Grid container>
                      <Grid item>
                        <Avatar src={editFlag==1?`${BASE_URL}${p.userId.dp}`:null}/>
                      </Grid>
                      <Grid item ml={1}>
                        <Stack sx={{ lineHeight: "1" }}>
                          <Typography variant="subtitle1" color="text.disable">
                            {p.userId.firstName}
                          </Typography>
                          
                        </Stack>
                      </Grid>
                    </Grid>

                    {/* <Typography variant="body1" py={1}>
                      {review.title}
                    </Typography> */}
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      lineHeight={1}
                      pb={1}
                      sx={{fontWeight:"bold",marginLeft:"50px"}}
                    >
                      
                     {"Bid:"}{p.bidingPrice}
                    </Typography>
                    {editFlag==1?
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      lineHeight={1}
                      pb={1}
                      sx={{fontWeight:"bold",marginLeft:"50px"}}
                    >
                      
                     {"Phone No:"}{p.userId.phoneNo}
                    </Typography>
:null}
                    <Divider />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            {editFlag==1 ?null:(
              !expired &&
                  <Type2Field
                    Label="Bid"
                    //  error={errors.password}
                    style={{
                      width: "100%",
                      marginTop: "25px",
                      alignSelf: "center",
                    }}
                    type="text"
                    Name="Bid"
                    Value={bid}
                    Change={handleChange}
                    y={
                      <ArrowForwardIcon
                        onClick={() => Postbid(bid, y)}
                        sx={{ color: "black" }}
                      />
                    }
                  ></Type2Field>)}
                  
              </Paper>):<Paper sx={{ p: 3, width: "100%" }}><Typography sx={{color:"red"}}>The Seller Has Paused The Bidding</Typography></Paper>
              ) : null}
           

            <Paper
              id="seller-description-paper"
              onClick={() =>
                navigate("/bsprofile", { state: { Data: location.state.x } })
              }
              sx={{ p: 3, width: "100%", mt: "-25px" }}
            >
              
              <Typography variant="h6" fontWeight={500}>
                Seller Description
              </Typography>
              <Stack spacing={0.1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BadgeIcon />
                  <Typography variant="body1">
                    {location.state.x.userId.firstName}
                  </Typography>
                  <Typography variant="body1">
                    {location.state.x.userId.lastName}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalPhoneIcon />
                  <Typography variant="body1">
                    {location.state.x.userId.phoneNo}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationCityIcon />
                  <Typography variant="body1">
                    {location.state.x.userId.currentCity}
                  </Typography>
                </Stack>
           
                <Rating per="readOnly" data={rating} star={0.5} />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
       
      </Grid>
    </Container>
  );
}
