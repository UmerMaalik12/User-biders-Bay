import React, { useEffect, useState } from "react";
import Navbar from "../comonents/navbar";
import { Box, Button, Container, Grid, Stack,Typography } from "@mui/material";
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
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
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
  const [filtered,setFiltered] = useState(null);

  const getSubcategory = (x) => {
    console.log("in start");

    api.get(`/sub-category/${x}`).then(function (response) {
      console.log(response);
      setSubCategory(response.data.data);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("user token");
    api
      .get("/products/used/")
      .then((response) => {
        console.log(response.data.data.allProducts[8]);
        setProducts(response.data.data.allProducts);
     
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

      
      setFiltered(updatedList);
    }
  };
  const handleDetails = (data, mode) => {
    navigate("/Details", { state: { x: data, Mode: mode } });
  };
  const remove = () => {
    
    setFiltered(dummy);
    setFilterValue(initial);
  };
  useEffect(() => {
    console.log("testing 123");
    console.log("what is ,",props.Feature);
     
    if(props.Feature!==null  && Products!==null)
    {
      const converted = props.Feature.map((feature) => {
        return ChangeObject(feature);
      }).filter((obj) => obj !== null);
      setFiltered(converted)
      setDummy(converted)
      const filteredProducts = Products.filter((item) => !props.Feature.some((featureItem) => featureItem.postId._id === item._id));
      setFiltered((prevFiltered) => [...prevFiltered, ...filteredProducts]);
      setDummy((prevFiltered) => [...prevFiltered, ...filteredProducts])
    }
    else if( Products!==null)
    {
      setFiltered(Products)
    }
  },[props.Feature,Products])
  const ChangeObject=(item)=>{
    if(item.postId.productType!=="Bidding Item")
    {
    const inputObject = {
      "_id": item._id,
      "postId": {
        "closeBid": item.postId.closeBid,
        "StatusOfActive": item.postId.StatusOfActive,
        "_id":item.postId._id,
        "title": item.postId.title,
        "description":  item.postId.description,
        "images":item.postId.images,
        "productPrice": item.postId.productPrice,
        "subcategoryId":item.postId.subcategoryId,
        "userId": {
          "_id": item.postId.userId._id,
          "firstName": item.postId.userId.firstName,
          "lastName": item.postId.userId.lastName,
          "password":item.postId.userId.password,
          "email": item.postId.userId.email,
          "phoneNo":item.postId.userId.phoneNo,
          "gender": item.postId.userId.gender,
          "address": item.postId.userId.address,
          "dob": item.postId.userId.dob,
          "role": item.postId.userId.role,
          "currentCity":item.postId.userId.currentCity,
          "statusOfUser":item.postId.userId.statusOfUser,
          "tryAgainToBecomeSeller": item.postId.userId.tryAgainToBecomeSeller,
          "createdAt": item.postId.userId.createdAt,
          "updatedAt":item.postId.userId.updatedAt,
          "__v": item.postId.userId.__v,
          "dp": item.postId.userId.dp
        },
        "productType": item.postId.productType,
        "createdAt": item.postId.createdAt,
        "updatedAt":item.postId.updatedAt,
        "__v": item.postId.__v
      },
      "__v": item.__v,
      "approvedStatus": item.approvedStatus,
      "createdAt": item.createdAt,
      "paymentScreenShot":item.paymentScreenShot ,
      "updatedAt":item.updatedAt,
      "approvedDate":item.approvedDate
    };
    
    const outputObject = {
      "_id": inputObject.postId._id,
      "title": inputObject.postId.title,
      "description": inputObject.postId.description,
      "images": inputObject.postId.images.map((image) => image.replace("\\", "/")),
      "productPrice": inputObject.postId.productPrice,
      "subcategoryId": inputObject.postId.subcategoryId,
      "userId": inputObject.postId.userId,
      "productType": inputObject.postId.productType,
      "closeBid": inputObject.postId.closeBid,
      "StatusOfActive": inputObject.postId.StatusOfActive,
      "createdAt": inputObject.postId.createdAt,
      "updatedAt": inputObject.postId.updatedAt,
      "__v": inputObject.postId.__v
    };
    console.log("not converted",item);
    console.log("this is converted",outputObject);
    return outputObject;
  }
  return null;
  
  }

  return (
    <Container maxWidth="xl">
      <Box sx={theme.mixins.toolbar} />
      <Box sx={theme.mixins.toolbar} />
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

      {/* <Grid container>
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
      </Grid> */}
       <Grid container>
        {filtered == null  ? (
          <Grid item sm={12}>
            <Empty />
          </Grid>
        ) : (
          filtered.length == 0?<Box sx={{
            display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',

  width:"100%",
        
  
          }}><Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}><ProductionQuantityLimitsIcon sx={{fontSize:"100px" }}/> <Typography variant="h4">No Product Found</Typography></Box></Box>:
          filtered.map((p, index) => {
            const isFeatured =
    props.Feature !== null &&
    Array.isArray(props.Feature) &&
    props.Feature.some(feature => feature.postId._id === p._id);
            
            return (
              p.StatusOfActive && (
                <Grid item xs={6} sm={4} md={3} key={index}>
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
        )}
      </Grid>
    </Container>
  );
}
