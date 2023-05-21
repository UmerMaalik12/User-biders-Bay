import React, { useEffect, useRef, useState } from "react";
import Slider from "../comonents/slider/Slider";
import { useLocation } from "react-router-dom";
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

const initial = {
  comment: "",
};
export default function (props) {
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const [comments, setComents] = useState([]);
  const [dis, setdis] = useState(null);
  const [rating, setRating] = useState(null);
  const [bid, SetBid] = useState(" ");
  const [bidInfo, setBidInfo] = useState(null);

  const [check, setcheck] = useState(0);

  const { Tcoment, setTcoments, hanndleComentChange } = Formcontrol(initial);
  console.log("wadi awaz", location.state.x);
  console.log(location.state.Mode);
  const y = location.state.x._id;
  const z = location.state.x.userId._id;
  const UserData = JSON.parse(localStorage.getItem("user Info"));
  const ID = UserData._id;
  console.log(z);
  console.log(location.state.x._id);
  const descriptionRef = useRef(null);
  // useEffect(() => {
  //   const descriptionHeight = descriptionRef.current.clientHeight;
  //   const paperHeight = 200;
  //   const marginTop =
  //     descriptionHeight > paperHeight ? -(descriptionHeight - paperHeight) : 25;
  //   document.getElementById(
  //     "seller-description-paper"
  //   ).style.marginTop = `${marginTop}px`;
  // }, [location.state.x.description]);

  useEffect(() => {
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
  }, []);
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
              data={location.state.x}
              image={
                location.state.x.images.length
                  ? location.state.x.images
                  : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
              }
            />
          </Grid>

          <Grid item sm={12} md={12}>
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
                <h1>Write Comments</h1>
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
                          <Avatar sx={{width:30,height:30}}/>

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
                  sx={{ color: "black" }}
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
                <IconButton disableRipple onClick={() => fav(y)}>
                  {check == 1 ? (
                    <FavoriteIcon sx={{ color: "#e81111" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}
                </IconButton>
              </Box>

              <Box>
                {location.state.Mode != "used" ? (
                  <Typography>
                    <Coundown time={location.state.x.createdAt} />
                  </Typography>
                ) : null}
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
              <Paper sx={{ p: 3, width: "100%" }}>
                  <Typography variant="h6">Please Enter your Bid</Typography>
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
                  ></Type2Field>
              </Paper>
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

                <Rating per="readOnly" data={rating} star={0.5} />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}