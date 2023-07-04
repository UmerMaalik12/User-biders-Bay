import React, { useEffect, useState } from "react";
import Navbar from "../comonents/navbar";
import { Button, Grid, Box, Container, Stack,Typography } from "@mui/material";
import Card from "../comonents/card";
import { AppbarSpace } from "../comonents/AppbarSpace";
import axios from "axios";
import CardUpdate from "../comonents/updateCard";
import { BASE_URL } from "../Config/constant";
import api from "../Config/Api";
import Filter from "../comonents/FilterMenu/FilterButton";
import Formcontrol from "../comonents/formcontrol/FormControl";
import Ranger from "../comonents/PriceSlider/Slider";
import Empty from "../comonents/EMPTYPAGE/Empty";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
const initial = {
  Category: "",
  SubCategory: "",
  PriceRange: [100, 50000],
};

export default function Favorite(props) {
  const theme = useTheme();

  const navigate = useNavigate();
  const [Products, setProducts] = useState(null);
  const [dummy, setDummy] = useState(null);
  const [C, setC] = useState(null);
  const [SubCategory, setSubCategory] = useState(null);
  const [city, setCity] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const getSubcategory = (x) => {
    console.log("in start");

    api.get(`/sub-category/${x}`).then(function (response) {
      console.log(response);
      setSubCategory(response.data.data);
    });
  };

  useEffect(() => {
    console.log("hello workd", props.wishlist);
    setProducts(props.wishlist);
    setDummy(props.wishlist);
  }, [props.wishlist]);

  useEffect(() => {
    api
      .get("/category/")
      .then(function (response) {
        console.log(response.data.data.allCategory);
        setC(response.data.data.allCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log("Wow");
    console.log(C);
  }, [C]);
  const { FilterChange, FilterValue, setFilterValue } = Formcontrol(
    initial,
    getSubcategory
  );
  const filter = () => {
    if (dummy != null) {
      console.log(Products);
      let updatedList = dummy;
      updatedList = updatedList.filter(
        (item) =>
          item.subcategoryId == FilterValue.SubCategory &&
          item.productPrice > FilterValue.PriceRange[0] &&
          item.productPrice < FilterValue.PriceRange[1]
      );

      setProducts(updatedList);
    }
  };
  const handleDetails = (data) => {
    navigate("/Details", { state: { x: data } });
  };

  const remove = () => {
    setProducts(dummy);
    setFilterValue(initial);
  };
useEffect(() => {
  console.log("this is the avalue of products",Products);
},[Products])
  return (
    // <Grid sx={{ backgroundColor: "white" }}>
    //   <AppbarSpace></AppbarSpace>
    //   <AppbarSpace></AppbarSpace>
    <Container maxWidth="xl">
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />
      {/* <Grid sx={{ display: "flex", marginLeft: 10 }}>
        <Filter
          label="Category"
          Name="Category"
          data={C != null ? C : [0, 1, 2]}
          value={FilterValue.Category}
          Change={FilterChange}
          style={{ width: 120 }}
        ></Filter>
        <Filter
          label="Sub-Category"
          Name="SubCategory"
          data={SubCategory != null ? SubCategory : [0, 1, 2]}
          value={FilterValue.SubCategory}
          Change={FilterChange}
          style={{ width: 150 }}
        ></Filter>
        <Ranger
          Name="PriceRange"
          Change={FilterChange}
          value={FilterValue.PriceRange}
        ></Ranger>
        <Button
          onClick={filter}
          variant="contained"
          sx={{
            marginLeft: "150px",
            marginBottom: "10px",
            backgroundColor: "black",
            borderRadius: "10%",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Filter
        </Button>
      </Grid> */}
    <Box display="flex" justifyContent="space-around" alignItems="center" sx={{
        width: "100%",
        flexDirection:{xs:"column",md:"row"},
        marginBottom:{xs:"20px",md:"20px"}
       
       
      }}>
        <Stack direction={{sm: 'row', xs: 'column' }} spacing={1} sx={{width:{xs:"100%",md:"auto"}}}>
          <Filter
            label="Category"
            Name="Category"
            data={C != null ? C : [0, 1, 2]}
            value={FilterValue.Category}
            Change={FilterChange}
            // style={{ width: 120,}}
          />

          <Filter
            label="Sub-Category"
            Name="SubCategory"
            data={SubCategory != null ? SubCategory : [0, 1, 2]}
            value={FilterValue.SubCategory}
            Change={FilterChange}
            // style={{ width: 150}}
          />

          <Filter
            label="City"
            Name="city"
            data={city != null ? city : [0, 1, 2]}
            value={FilterValue.city}
            Change={FilterChange}
            // style={{ width: 200}}
          />
        </Stack>

        <Box sx={{marginTop:{xs:"35px",md:"0px"}}}>
          <Ranger
            Name="PriceRange"
            Change={FilterChange}
            value={FilterValue.PriceRange}
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <Button onClick={filter} variant="contained">
            Filter
          </Button>
          <Button onClick={remove} variant="contained">
            Remove Filter
          </Button>
        </Stack>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Products == null ? (
          
         <Grid item sm={12}>
         <Empty />
       </Grid>
        ) : (
          Products.length == 0?<Box sx={{
            display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',

  width:"100%",
        
  
          }}><Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}><ProductionQuantityLimitsIcon sx={{fontSize:"100px" }}/> <Typography variant="h4">No Favorites Added</Typography></Box></Box>:
          
          Products.map((p, index) => {
            // return (
            //   <Grid item xs={2} sm={4} md={3} key={index}>
            //     <CardUpdate
            //       click={() => handleDetails(p.postId)}
            //       heartData={p.postId && p.postId._id}
            //       per="fav"
            //        setWhishlist={props.setWhishlist}
            //       title={p.postId && p.postId.title}
            //       url={
            //         p.postId && p.postId.images.length
            //           ? `${BASE_URL}${p.postId.images[0]}`
            //           : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
            //       }
            //       price={p.postId && p.postId.productPrice}
            //     ></CardUpdate>
            //   </Grid>
            // );
            const isFeatured =
            props.Feature !== null &&
            Array.isArray(props.Feature) &&
            props.Feature.some(feature => feature.postId._id === p.postId._id);
                    
                    return (
                   
                        <Grid item xs={2} sm={4} md={3} key={index}>
                          {isFeatured ? (
                            <CardUpdate
                            click={() => handleDetails(p.postId)}
                                  heartData={p.postId && p.postId._id}
                                  per="fav"
                                   setWhishlist={props.setWhishlist}
                                  title={p.postId && p.postId.title}
                                  url={
                                    p.postId && p.postId.images.length
                                      ? `${BASE_URL}${p.postId.images[0]}`
                                      : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                                  }
                                  price={p.postId && p.postId.productPrice}
                              name={p.postId.productType==="Bidding Item"?"bid":"used"}
                                    date={p.postId.createdAt}
                                extraProp={true}
                            
                 
                            />
                          ) : (
                            <CardUpdate
                            click={() => handleDetails(p.postId)}
                            heartData={p.postId && p.postId._id}
                            per="fav"
                             setWhishlist={props.setWhishlist}
                            title={p.postId && p.postId.title}
                            url={
                              p.postId && p.postId.images.length
                                ? `${BASE_URL}${p.postId.images[0]}`
                                : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                            }
                            price={p.postId && p.postId.productPrice}
                        name={p.postId.productType==="Bidding Item"?"bid":"used"}
                              date={p.postId.createdAt}
                            />
                          )}
                        </Grid>
                      
                    );
          })
        )}
      </Grid>
    </Container>
  );
}
