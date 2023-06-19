import React, { useEffect, useState } from "react";
import Navbar from "../comonents/navbar";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
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
import pacman from "../assets/Bean Eater-1s-200px.gif";
import { useTheme } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";
const initial = {
  Category: "",
  SubCategory: "",
  PriceRange: [100, 50000],
  city: "",
};

export default function UsedItems(props) {
  const theme = useTheme();

  const navigate = useNavigate();
  const [Products, setProducts] = useState(null);
  const [dummy, setDummy] = useState(null);
  const [C, setC] = useState(null);
  const [SubCategory, setSubCategory] = useState(null);
  const [city, setCity] = useState(null);

  const getSubcategory = (x) => {
    console.log("in start");

    api.get(`/sub-category/${x}`).then(function (response) {
      console.log(response);
      setSubCategory(response.data.data);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("user token");
    api
      .get("/products/used/")
      .then((response) => {
        console.log(response.data.data.allProducts[8]);
        setProducts(response.data.data.allProducts);
        setDummy(response.data.data.allProducts);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("/users/cities")
      .then((response) => {
        console.log(response.data.data);
        setCity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      if (FilterValue.SubCategory != "") {
        updatedList = updatedList.filter(
          (item) =>
            item.subcategoryId == FilterValue.SubCategory &&
            item.productPrice > FilterValue.PriceRange[0] &&
            item.productPrice < FilterValue.PriceRange[1]
        );
      }
      if (FilterValue.city != "") {
        console.log("hello");
        // console.log("city check",updatedList.userId.currentCity);

        updatedList = updatedList.filter((item) => {
          console.log("in", item.userId.currentCity);
          return item.userId.currentCity == FilterValue.city;
        });
      }

      setProducts(updatedList);
    }
  };
  const handleDetails = (data, mode) => {
    navigate("/Details", { state: { x: data, Mode: mode } });
  };
  const remove = () => {
    setProducts(dummy);
    setFilterValue(initial);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Stack direction="row" spacing={1}>
          <Filter
            label="Category"
            Name="Category"
            data={C != null ? C : [0, 1, 2]}
            value={FilterValue.Category}
            Change={FilterChange}
            style={{ width: 120 }}
          />
          <Filter
            label="Sub-Category"
            Name="SubCategory"
            data={SubCategory != null ? SubCategory : [0, 1, 2]}
            value={FilterValue.SubCategory}
            Change={FilterChange}
            style={{ width: 150 }}
          />
          <Filter
            label="City"
            Name="city"
            data={city != null ? city : [0, 1, 2]}
            value={FilterValue.city}
            Change={FilterChange}
            style={{ width: 200 }}
          />
        </Stack>
        <Box>
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

      <Grid container>
        {Products == null || Products.length == 0 ? (
          <Grid item sm={12}>
           <Empty/>
          </Grid>
        ) : (
          Products.map((p, index) => {
          
            return (
              (p.StatusOfActive==true? <Grid item xs={2} sm={4} md={3} key={index}>
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
            </Grid>:null)
             
            );
          })
        )}
      </Grid>
    </Container>
  );
}
