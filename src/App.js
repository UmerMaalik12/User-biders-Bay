import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import SignUP from "./pages/signUp";
import Home from "./pages/home";
import Post from "./pages/Post";
import Account from "./pages/MyAccount";
import BidPage from "./pages/BidProduct";
import UsedItem from "./pages/UsedItems";
import Description from "./pages/Description";
import Favourite from "./pages/Favourites";
import BuyerSellerProfile from "./pages/BuyerSellerProfile";
import BecomeSeller from "./pages/BecomeSeller";
import Search from "./pages/Search";
import api from "../src/Config/Api";
import Navbar from "./comonents/navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./comonents/Footer";
import Otp from "./pages/Otp";
import EditPost from "./pages/EditPost";
import FeaturePost from "./pages/FeaturePost";


const theme = createTheme({
  palette: {
    primary: {
      main: "#010101",
    }
  },
  typography: {
    h1: {
      fontWeight: 500,
      letterSpacing: 0.5,
      fontSize: "1.7rem",
      textTransform: "capitalize",
      color: "#262626",
    },
  },
});

function App() {
  const [wishlist, setWhishlist] = useState([]);
  const [token, setToken] = useState(" ");
  const [Feature,SetFeature]=useState(null)

  useEffect(() => {
    console.log("start use");
    const handleTokenChange = (event) => {
      if (event.key === 'user token') {
        const updatedToken = event.newValue;
        setToken(updatedToken);
        // Perform any desired actions with the updated token
        console.log('Token changed:', updatedToken);
      }
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);
  useEffect(() => {
    console.log("app js log");
  
    
      api
      .get("/payment-featured/featured_post/")
      .then((response) => {
        console.log("this is feature",response.data.data);
      SetFeature(response.data.data)
        
      })
      .catch((error) => {
        console.log(error);
      });
    
  
  }, []);
  useEffect(()=>{
    api
    .get("/favorite/")
    .then((response) => {
      console.log("this is app res",response.data.FavoritePosts);
      setWhishlist(response.data.FavoritePosts);
    })
    .catch((error) => {
      console.log(error);
    });
  },[])
  const PrivateRoute = ({role, children }) => {
    let user = JSON.parse(localStorage.getItem("user Info")); 
    console.log("aa->",user);
    if(user){
      if(!role.includes(user.role)){
        return  <Navigate to="/account" />;
      }
      return children;
    }
    return  <Navigate to="/login" />;
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <Header/> */}
        <Navbar wishlist={wishlist}/>
        <Routes>
          <Route exact path="login" element={<Login setToken={setToken}/>} />
          <Route exact path="signup" element={<SignUP />} />
         
          <Route exact path="/" element={<Home setWhishlist={setWhishlist} Feature={Feature}/>} />
          <Route exact path="bid" element={<BidPage setWhishlist={setWhishlist}  Feature={Feature}/>} />
          <Route
            exact path="Used"
            element={<UsedItem setWhishlist={setWhishlist} Feature={Feature} />}
          />
          <Route
            exact path="Details"
            element={<PrivateRoute role={["seller","buyer"]}><Description setWhishlist={setWhishlist} /></PrivateRoute>}
          />
          
          <Route exact path="bsprofile" element={<BuyerSellerProfile Feature={Feature}/>} />
          
          <Route exact path="Search" element={<Search Feature={Feature}/>} />
          
          <Route exact path="ForgotPassword" element={<Otp />} />
      
          <Route exact path="account" element={<PrivateRoute role={["seller","buyer"]}><Account setWhishlist={setWhishlist} setToken={setToken}/></PrivateRoute>} />
          <Route exact path="post" element={<PrivateRoute role={["seller"]}><Post /></PrivateRoute>} />
          <Route
            exact path="favourite"
            element={
              <PrivateRoute role={["seller","buyer"]}><Favourite wishlist={wishlist} setWhishlist={setWhishlist} Feature={Feature}/></PrivateRoute>
              
            }
          />
          <Route exact path="bseller" element={<PrivateRoute role={["seller","buyer"]}><BecomeSeller /></PrivateRoute>} />
          
          <Route exact path="Edit" element={<PrivateRoute role={["seller","buyer"]}> <EditPost /></PrivateRoute>} />
          <Route exact path="Feature" element={<PrivateRoute role={["seller","buyer"]}><FeaturePost /></PrivateRoute>} />
          {/* <Route path="/create" element={<Create />} /> */}
        </Routes>
        
          
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
