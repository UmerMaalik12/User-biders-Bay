import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import Navbar from "../comonents/navbar";
import { AppbarSpace } from "../comonents/AppbarSpace";
import Rating from "../comonents/rating/rating";
import { useLocation } from "react-router-dom";
import api from "../Config/Api";
import Empty from "../comonents/EMPTYPAGE/Empty";
import { BASE_URL } from "../Config/constant";
import CardUpdate from "../comonents/updateCard";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function () {
  const location = useLocation();
  const theme = useTheme();

  const [userData, setuserData] = useState(" ");
  const navigate = useNavigate();
  const [sellerproduct, setSellerProduct] = useState(null);
  const [rating, setRating] = React.useState(0);

  const [JoiDate, setDate] = useState("");
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  const convertData = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    if (location.state.Data == null) {
      console.log(location.state.Info);
      setuserData(location.state.Info);
    } else {
      console.log("if else ", location.state.Data.userId);
      setuserData(location.state.Data.userId);
    }
  }, []);
  useEffect(() => {
    console.log("user data from paper", userData);
    console.log("user data id", userData._id);

    api
      .get(`/products/user_product/${userData._id}`)
      .then(function (response) {
        console.log("what", response.data.data.allProducts);
        setSellerProduct(response.data.data.allProducts);
      })
      .catch(function (error) {
        console.log("this is error");
      });
    const originalDate = userData.createdAt;
    const convertedDate = convertData(originalDate);
    setDate(convertedDate);
    console.log("date", convertedDate);
  }, [userData]);
  useEffect(() => {
    updaterating(userData._id, rating);
  }, [rating]);
  const updaterating = (sellerId, rating) => {
    console.log(rating);
    api
      .post(
        "/rating/",

        {
          sellerId,
          rating,
        },
        {
          headers: {
            enctype: "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);

        // if (error) {
        //   setdis(error.response.data.message);

        // }
      });
  };
  console.log(userData);
  const handleDetails = (data, mode) => {
    navigate("/Details", { state: { x: data, Mode: mode } });
  };
  return (
    <Container>
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />

      <Container sx={{ display: "flex" }}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Stack
              spacing={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <img
                  style={{
                    height: "170px",
                    borderRadius: 110,
                    width: "190px",
                    height: "190px"
                  }}
                  src={`${BASE_URL}${userData.dp}`}
                />
              </Box>
              <Typography variant="subtitle" textAlign='center'>
                {"Joined Since"} {JoiDate}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={9} display="flex" alignItems="center">
            <Stack
              sx={{ width: "100%" }}
              display="flex"
              justifyContent="flex-start"
            >
              <Typography variant="h1">
                {userData.firstName} {userData.lastName}
              </Typography>

              <Rating
                per=""
                data={rating}
                star={1}
                change={handleRatingChange}
              />
              <Divider sx={{ width: "100%" }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{py: 3}}> 
        <Typography variant="h6" pl={2}>
          Seller Post
        </Typography>
        {sellerproduct == null || sellerproduct.length == 0 ? (
          <Empty />
        ) : (
          <Grid container>
            {sellerproduct.map((p, index) => {
              return (
                (p.StatusOfActive==true?
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <CardUpdate
                    click={() =>
                      handleDetails(
                        p,
                        p.productType === "Bidding Item" ? "bid" : "used"

                      )
                    }
                    title={p.title}
                    url={
                      p.images.length
                        ? `${BASE_URL}${p.images[0]}`
                        : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                    }
                    price={p.productPrice}
                  />
                </Grid>:null)
              );
            })}
          </Grid>
        )}
      </Container>
      <Container sx={{py: 3}}> 
        <Typography variant="h6" pl={2}>
          Seller Deleted Post
        </Typography>
        {sellerproduct == null || sellerproduct.length == 0 ? (
          <Empty />
        ) : (
          <Grid container>
            {sellerproduct.map((p, index) => {
              return (
                (p.StatusOfActive==false?<Grid item xs={2} sm={4} md={4} key={index}>
                  <CardUpdate
                    click={() =>
                      handleDetails(
                        p,
                        p.productType === "Bidding Item" ? "bid" : "used"
                      )
                    }
                    title={p.title}
                    url={
                      p.images.length
                        ? `${BASE_URL}${p.images[0]}`
                        : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                    }
                    price={p.productPrice}
                  />
                </Grid>:null)
                
              );
            })}
          </Grid>
        )}
      </Container>
    </Container>
  );
}
