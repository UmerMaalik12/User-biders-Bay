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
  const [x, setx] = useState(data);
  const navigate = useNavigate();
  useEffect(() => {
    setx(data);
  }, [data]);

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
      items: 1,
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
      <Typography variant="h1">
        Featured Post
      </Typography>
      {Products == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {
            <Carousel responsive={responsive}>
              {Products == null ? (
                <h1>Wait.......</h1>
              ) : (
                Products.map((p, index) => {
                  return (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <CardUpdate
                        title={p.title}
                        url={
                          p.images.length
                            ? `${BASE_URL}${p.images[0]}`
                            : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                        }
                        price={p.productPrice}
                      ></CardUpdate>
                    </Grid>
                  );
                })
              )}
            </Carousel>
          }
        </div>
      )}
      <Typography variant="h1">
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
                  return (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <CardUpdate
                        title={p.title}
                        click={() => handleDetails(p, "used")}
                        heartData={p._id}
                        setWhishlist={props.setWhishlist}
                        url={
                          p.images.length
                            ? `${BASE_URL}${p.images[0]}`
                            : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                        }
                        price={p.productPrice}
                      ></CardUpdate>
                    </Grid>
                  );
                })
              }
            </Carousel>
          }
        </div>
      )}
      <Typography variant="h1">
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
                  return (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <CardUpdate
                        title={p.title}
                        click={() => handleDetails(p, "bid")}
                        heartData={p._id}
                        setWhishlist={props.setWhishlist}
                        date={p.createdAt}
                        name="bid"
                        url={
                          p.images.length
                            ? `${BASE_URL}${p.images[0]}`
                            : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                        }
                        price={p.productPrice}
                      ></CardUpdate>
                    </Grid>
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
