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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./comonents/Footer";


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
    if(token!=="ok")
    {
      api
      .get("/favorite/")
      .then((response) => {
        console.log(response.data.FavoritePosts);
        setWhishlist(response.data.FavoritePosts);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
  }, [token]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <Header/> */}
        <Navbar wishlist={wishlist}/>
        <Routes>
          <Route path="login" element={<Login setToken={setToken}/>} />
          <Route path="signup" element={<SignUP />} />
          <Route path="post" element={<Post />} />
          <Route path="/" element={<Home setWhishlist={setWhishlist} />} />
          <Route path="account" element={<Account setWhishlist={setWhishlist} setToken={setToken}/>} />
          <Route path="bid" element={<BidPage setWhishlist={setWhishlist} />} />
          <Route
            path="Used"
            element={<UsedItem setWhishlist={setWhishlist} />}
          />
          <Route
            path="Details"
            element={<Description setWhishlist={setWhishlist} />}
          />
          <Route
            path="favourite"
            element={
              <Favourite wishlist={wishlist} setWhishlist={setWhishlist} />
            }
          />
          <Route path="bsprofile" element={<BuyerSellerProfile />} />
          <Route path="bseller" element={<BecomeSeller />} />
          <Route path="Search" element={<Search />} />
       

          {/* <Route path="/create" element={<Create />} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
