import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Badge,
  Box,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Type1Field, Type2Field } from "./formcontrol/Fields";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonList from "./ButtonList";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SellIcon from "@mui/icons-material/Sell";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = (props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const SearchChange = (event) => {
    setSearch(event.target.value);
  };

  const x = JSON.parse(localStorage.getItem("user Info"));

  useEffect(() => {
    console.log("hello");
  }, []);

  const navigate = useNavigate();

  // const check = () => {
  //   console.log(localStorage.getItem("user Info"));
  //   if (localStorage.getItem("user Info") == "null") {
  //     navigate("/login");
  //   } else {
  //     navigate("/account");
  //   }
  // };
  // const check1 = () => {
  //   console.log(localStorage.getItem("user Info"));
  //   if (localStorage.getItem("user Info") == "null") {
  //     navigate("/login");
  //   } else if (x.role == "seller") {
  //     navigate("/post");
  //   } else {
  //     navigate("/account");
  //   }
  // };
  // const check2 = () => {
  //   console.log(localStorage.getItem("user Info"));
  //   if (localStorage.getItem("user Info") == "null") {
  //     navigate("/login");
  //   } else {
  //     navigate("/favourite");
  //   }
  // };

  const [cat, setCat] = useState(props.cat);

  useEffect(() => {
    setCat(props.cat);
  }, [cat]);

  // const SearchChange = (e) => {
  //   setSearch(e.target.value);
  // };

  useEffect(() => {
    console.log(search);
  }, [search]);

  const renderTabs = () => {
    if (isSmallScreen) {
      return null; // Don't render tabs on small screens
    }

    return (
      <Tabs aria-label="tabs">
        <Tab
          onClick={() => navigate("/")}
          label="Home"
          sx={{ color: "black" }}
        />
        <Tabs label="Categories" sx={{ color: "black",paddingTop:"1px" }}>
          <ButtonList  name="Categories"></ButtonList>
        </Tabs>
        <Tab
          onClick={() => navigate("/bid")}
          label="Bid"
          sx={{ color: "black" }}
        />
        <Tab
          onClick={() => navigate("/used")}
          label="Used Items"
          sx={{ color: "black" }}
        />
        <Tab onClick={()=>navigate("/post")} label="Sell" sx={{ color: "black" }} />
      </Tabs>
    );
  };

  const renderDrawer = () => {
    if (isSmallScreen) {
      return (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{ sx: { width: 200 } }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography
              variant="h6"
              sx={{ letterSpacing: 2, fontWeight: "bold" }}
            >
              Menu
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            <ListItem
              onClick={() => {
                handleDrawerClose();
                navigate("/");
              }}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem
              onClick={() => {
                handleDrawerClose();
                navigate("/bid");
              }}
            >
              <ListItemText primary="Bid" />
            </ListItem>
            <ListItem
              onClick={() => {
                handleDrawerClose();
                navigate("/used");
              }}
            >
              <ListItemText primary="Used Items" />
            </ListItem>
            <ListItem onClick={()=>navigate("/post")}>
              <ListItemText primary="Sell" />
            </ListItem>
          </List>
        </Drawer>
      );
    }
    return null;
  };

  return (
    <AppBar elevation={0}>
      <Toolbar
        sx={{
          background: "#ffffff",
          justifyContent: "center",
          // flexDirection: isSmallScreen ? "column" : "row",
          // alignItems: isSmallScreen ? "flex-start" : "center",
          // padding: isSmallScreen ? "8px 16px" : "0",
        }}
      >
        <Box>
          {isSmallScreen ? (
            <IconButton aria-label="menu" onClick={handleDrawerOpen}>
              <MenuIcon color="primary" />
            </IconButton>
          ) : (
            renderTabs()
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flex: { sm: "none", md: 1 },
            // ml: '-20px'
            ml: { sm: 0, md: "-20px" },
          }}
        >
          <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
            <Box
              aria-label="logo"
              component="img"
              sx={{ height: { xs: 60, sm: 75 } }}
              alt="shop logo"
              src={Logo}
            />
          </Link>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          flex={1}
          justifyContent="flex-end"
        >
          <Stack direction="row" spacing={15} alignItems='center'>
            <Box
              alignItems="center"
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid black",
                // borderRadius: "15px",
                marginRight: "-65px",
              }}
            >
              <InputBase
                placeholder="Search..."
                value={search}
                onChange={SearchChange}
              />

              <IconButton
                aria-label="search"
                onClick={() => {
                  navigate("/Search", { state: { Data: search } });
                }}
              >
                <SearchIcon color="primary" fontSize="medium" />
              </IconButton>
            </Box>

            <Box > 
              <Badge color="primary" badgeContent={props.wishlist?.length}>
                <FavoriteIcon onClick={()=>navigate("/favourite")} color="primary" />
              </Badge>
              <AccountCircleIcon
                onClick={() => navigate("/account")}
                sx={{ marginLeft: "30px", mr: 3 }}
                color="primary"
              />
            </Box>
          </Stack>
        </Box>
      </Toolbar>
      {renderDrawer()}
    </AppBar>
  );
};
export default Navbar;

//  <Type2Field
//             style={{
//               height: "4vh",
//               width: 300,
//               backgroundColor: "white",
//               flexGrow: 1,
//               borderRadius: 15,
//               marginLeft: "15px",
//             }}
//             SX={{
//               "& .MuiInput-underline:after": {
//                 borderBottomColor: "transparent",
//               },
//             }}
//             Variant="standard"
//             type="text"
//             Name="Search"
//             Value={search}
//             Change={SearchChange}
//             y={
//               <SearchIcon
//                 onClick={() => {
//                   navigate("/Search", { state: { Data: search } });
//                 }}
//                 sx={{ color: "black" }}
//               >
//                 {" "}
//               </SearchIcon>
//             } */
// }
//  ></Type2Field>
