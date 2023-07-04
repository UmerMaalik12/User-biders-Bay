import React, { useState, useEffect } from "react";
import Navbar from "../comonents/navbar";
import Api from "../comonents/api";
import { Paper, Typography, CardMedia, Grid, Box, Container } from "@mui/material";
import { AppbarSpace } from "../comonents/AppbarSpace";
import { Image } from "mui-image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Banner from "../comonents/banner/Banner";
import Card from "../comonents/card";
import Carousel from "react-multi-carousel";
import Cat from "../comonents/category";
import axios from "axios";
import CardUpdate from "../comonents/updateCard";
import { BASE_URL } from "../Config/constant";
import api from "../Config/Api";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Home(props) {
  const theme = useTheme();

  const [Products, setProducts] = useState(null);
  const [BidProducts, setBidProducts] = useState(null);
  const [data, setData] = useState("");
  const [FeaturedPost,setFeaturedPost] = useState(null);
  const [x, setx] = useState(data);
  const navigate = useNavigate();
  useEffect(() => {
    setx(data);
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("user token");
    api
      .get("/products/used")
      .then((response) => {
        console.log(response.data.data.allProducts);
        setProducts(response.data.data.allProducts);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .get("/products/bid")
      .then((response) => {
        console.log("yellow", response.data.data.allProducts);
        setBidProducts(response.data.data.allProducts);
      })
      .catch((error) => {
        console.log(error);
      });
      api
      .get("/payment-featured/featured_post/")
      .then((response) => {
        console.log("Featured", response.data.data);
        setFeaturedPost(response.data.data)
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const handleDetails = (data, mode) => {
    navigate("/Details", { state: { x: data, Mode: mode } });
  };
  return (
    <div>
      <Box sx={theme.mixins.toolbar} />
      <Banner />
      <Container maxWidth="xl">
      <Cat  />
      <Box sx={theme.mixins.toolbar} />
      <Typography variant="h1" sx={{fontSize:{xs:18,sm:20,md:25}}}>
        Featured Post
      </Typography>
      {FeaturedPost == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {
            <Carousel responsive={responsive}>
              {FeaturedPost == null ? (
                <h1>Wait.......</h1>
              ) : (
                FeaturedPost.map((p, index) => {
                  return (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <CardUpdate
                        title={p.postId.title}
                        click={() => handleDetails(p.postId, p.postId.productType!=="used"?"bid":"used")}
                        url={
                          p.postId.images.length
                            ? `${BASE_URL}${p.postId.images[0]}`
                            : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                        }
                        price={p.postId.productPrice}
                           date={p.postId.productType=="Bidding Item"?p.postId.createdAt:null}
                           name={p.postId.productType=="Bidding Item"?"bid":"used"}
                           heartData={p.postId._id}
                        setWhishlist={props.setWhishlist}
                         
                      ></CardUpdate>
                    </Grid>
                  );
                })
              )}
            </Carousel>
          }
        </div>
      )}
      <Typography variant="h1" sx={{fontSize:{xs:18,sm:20,md:25}}}>
        Used Products
      </Typography>

      {Products == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {
            <Carousel responsive={responsive}>
              {/* {Products == null ? (
                <h1>Loading...</h1>
              ) : ( */}
              {
                Products.map((p, index) => {
                  const isFeatured =
                  props.Feature !== null &&
                  Array.isArray(props.Feature) &&
                  props.Feature.some(feature => feature.postId._id === p._id);
                          
                          return (
                            p.StatusOfActive && (
                              <Grid item xs={2} sm={4} md={3} key={index}>
                                {isFeatured ? (
                                  <CardUpdate
                                  click={() => handleDetails(p, "used")}
                                    heartData={p._id}
                                    setWhishlist={props.setWhishlist}
                                    title={p.title}
                                  
                                    url={
                                      p.images.length
                                        ? `${BASE_URL}${p.images[0]}`
                                        : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                                    }
                                    price={p.productPrice}
                                    extraProp={true}
                                  />
                                ) : (
                                  <CardUpdate
                                  click={() => handleDetails(p, "used")}
                                    heartData={p._id}
                                    setWhishlist={props.setWhishlist}
                                    title={p.title}
                                    
                                    url={
                                      p.images.length
                                        ? `${BASE_URL}${p.images[0]}`
                                        : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                                    }
                                    price={p.productPrice}
                                  />
                                )}
                              </Grid>
                            )
                          );
                })
              }
            </Carousel>
          }
        </div>
      )}
      <Typography variant="h1" sx={{fontSize:{xs:18,sm:20,md:25}}}>
        Bid Products
      </Typography>

      {BidProducts == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {
            <Carousel responsive={responsive}>
              {BidProducts == null ? (
                <h1>Wait.......</h1>
              ) : (
                BidProducts.map((p, index) => {
                  const isFeatured =
                  props.Feature !== null &&
                  Array.isArray(props.Feature) &&
                  props.Feature.some(feature => feature.postId._id === p._id);
                          
                          return (
                            p.StatusOfActive && (
                              <Grid item xs={2} sm={4} md={3} key={index}>
                                {isFeatured ? (
                                  <CardUpdate
                                    click={() => handleDetails(p, "bid")}
                                    heartData={p._id}
                                    setWhishlist={props.setWhishlist}
                                    title={p.title}
                                    date={p.createdAt}
                                      name="bid"
                                    url={
                                      p.images.length
                                        ? `${BASE_URL}${p.images[0]}`
                                        : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                                    }
                                    price={p.productPrice}
                                    extraProp={true}
                                  />
                                ) : (
                                  <CardUpdate
                                    click={() => handleDetails(p, "bid")}
                                    heartData={p._id}
                                    setWhishlist={props.setWhishlist}
                                    title={p.title}
                                    date={p.createdAt}
                                      name="bid"
                                    url={
                                      p.images.length
                                        ? `${BASE_URL}${p.images[0]}`
                                        : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                                    }
                                    price={p.productPrice}
                                  />
                                )}
                              </Grid>
                            )
                          );
                })
              )}
            </Carousel>
          }
        </div>
      )}
      </Container>
    </div>
  );
}
