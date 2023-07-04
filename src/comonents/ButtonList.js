import React, { useState,useEffect} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from "react-router-dom";
import api from '../Config/Api'
import { Box } from "@material-ui/core";

export default function MenuPopupState(props) {
  const navigate = useNavigate();
    const [item,setItem]=useState([])
  
    useEffect(()=>{
      console.log("Buttin list");
      api.get('/sub-category/')
      .then(function (response) {
        console.log(response.data.data.allSubCategory)
        
        setItem(response.data.data.allSubCategory)
       
      })
    },[])
    const help=()=>
    {
      console.log('mast',item);
    }
//   return (
//    ( props.check==1?(item.length!==0?item.map((p,index)=>(
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//     {item.map((p, index) => (
//       <MenuItem onClick={() => { navigate("/Search", { state: { Dbycat: p } }); }}>
//         {p.title}
//       </MenuItem>
//     ))}
//   </div>
// )):null):
//     <PopupState variant="popover" popupId="demo-popup-menu">
//       {(popupState) => (
//         <React.Fragment>
//           <Button variant="contained" sx={{background:"white",color:"black",boxShadow:"none",marginTop:"5px","&:hover":{backgroundColor:"white",boxShadow:"none"}}} {...bindTrigger(popupState)}>
//             {props.check==1?<span style={{ textTransform: "capitalize",fontSize:"17px",fontWeight:"normal",marginLeft:"-17px"}}>{props.name}</span>:props.name}
//           </Button>
//           <Menu {...bindMenu(popupState)}>
//             {item.length!==0?item.map((p,index)=>(
//                  <MenuItem onClick={()=>{navigate("/Search",{state:{Dbycat:p}})}} >{p.title}</MenuItem>
//             )):null}
            
//           </Menu>
//         </React.Fragment>
//       )}
//     </PopupState>)
//   );
// }

return (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {props.check === 1 ? (
      item.length !== 0 ? (
        item.map((p, index) => (
          <MenuItem key={index} sx={{fontSize:"14px",fontSize: "14px", width: "180px", whiteSpace: "normal",marginLeft:"15px"}} onClick={() => { navigate("/Search", { state: { Dbycat: p } }); }}>
            {/* <Box sx={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> */}
                {p.title}
              {/* </Box> */}
          </MenuItem>
        ))
      ) : null
    ) : (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" sx={{ background: "white", color: "black", boxShadow: "none", marginTop: "5px", "&:hover": { backgroundColor: "white", boxShadow: "none" } }} {...bindTrigger(popupState)}>
              {props.check === 1 ? <span style={{ textTransform: "capitalize", fontSize: "17px", fontWeight: "normal", marginLeft: "-17px" }}>{props.name}</span> : props.name}
            </Button>
            <Menu {...bindMenu(popupState)}>
              {item.length !== 0 ? item.map((p, index) => (
                <MenuItem key={index} onClick={() => { navigate("/Search", { state: { Dbycat: p } }); }}>
                  {p.title}
                </MenuItem>
              )) : null}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    )}
  </div>
);
}