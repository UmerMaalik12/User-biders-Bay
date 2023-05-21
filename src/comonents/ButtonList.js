import React, { useState,useEffect} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from "react-router-dom";
import api from '../Config/Api'

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
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" sx={{background:"white",color:"black", boxShadow:"none",marginTop:"5px","&:hover":{backgroundColor:"white",boxShadow:"none"}}} {...bindTrigger(popupState)}>
            {props.name}
          </Button>
          <Menu {...bindMenu(popupState)}>
            {item.length!==0?item.map((p,index)=>(
                 <MenuItem onClick={()=>{navigate("/Search",{state:{Dbycat:p}})}} >{p.title}</MenuItem>
            )):null}
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}