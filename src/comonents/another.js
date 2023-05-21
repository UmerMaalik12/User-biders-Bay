import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MenuPopupState(props) {
    console.log("hello")
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Menu {...bindMenu(popupState)}>
            {props.arr.map((p,index)=>(
                 <MenuItem >{p}</MenuItem>
            ))}
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}