import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Stack,
  Alert,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../Config/Api";
export default function FeaturePost() {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [Temp1, setTemp1] = useState(null);
  const [ScreenShot, setScreenShot] = useState(null);
  const [dis, setdis] = useState(null);
  const ProductID = location.state.ProductDetails._id;

  const FeatureProduct = (postId, payment_ss) => {
    console.log(ScreenShot);

    let formData = new FormData();
    formData.append("postId", postId);
    formData.append("payment_ss", payment_ss);
    api
      .post("/payment-featured/", formData)
      .then(function (response) {
        console.log(response);
        navigate(-1);
      })
      .catch(function (error) {
        console.log("this is error");
      });
  };
  const handleScreenShot = (e) => {
    setScreenShot(e.target.files[0]);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setTemp1(reader.result);
      };
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />
      {dis != null ? (
        <Stack sx={{ width: "100%", marginTop: "40px" }} spacing={2}>
          <Alert severity="error">{dis}</Alert>
        </Stack>
      ) : (
        <div>{null}</div>
      )}
      <Paper elevation={10} sx={{ padding: "50px" }}>
        <Typography variant="h5" textAlign="center">
          Feature Post
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "justify",
            marginTop: "10px",
            marginBottom: "50px",
          }}
        >
          Make your payment directly into our bank account. Please attach the
          payment screen Shot Below. Your Post will not be Featured until the
          funds have cleared in our account. Name: Bidders Bay<br></br>
          Bank: Bank HBL<br></br>
          Amount: Rs.1500<br></br>
          Account Number: 0234XXXXXXXXXX
        </Typography>
        <Box
          component="div"
          elevation={10}
          sx={{
            marginBottom: "15px",
            boxShadow: 10,
            border: "2px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          {Temp1 && (
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={Temp1}
              alt="Uploaded Screenshot"
            />
          )}
        </Box>
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ marginTop: "20px" }}
        >
          <Button
            align="center"
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "black",
              width: "100px",
              marginBottom: "60px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            Upload
            <input
              hidden
              accept="image/*"
              name="ScreenShot"
              multiple
              type="file"
              onChange={handleScreenShot}
            />
          </Button>

          <Button
            variant="contained"
            onClick={() => FeatureProduct(ProductID, ScreenShot)}
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
      <Box sx={theme.mixins.toolbar} />
    </Container>
  );
}