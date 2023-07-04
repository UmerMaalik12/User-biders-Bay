import React from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField,InputAdornment,useMediaQuery } from "@mui/material";
import { Password } from "@mui/icons-material";
export function Type1Field(props){
  const isMobile = useMediaQuery("(max-width: 600px)");
   const {error=null}=props;
    return(
        <TextField id="outlined-basic" label={props.label} type={props.type} name={props.Name} value={props.Value} onChange={props.Change} variant="outlined"   required style={props.style} sx={props.as} multiline={isMobile &&props.multiline} disabled={props.dis}
        rows={isMobile && props.rows? 4 : 1}
        InputProps={{
          startAdornment:<InputAdornment position="start"><input hidden accept="image/*" type="file" />
         {props.x}</InputAdornment>
      }}
      {...(error && {error:true,helperText:error})}
        />
        
    );
}
export function Type2Field(props){
    const {error=null}=props;
    return(
        <TextField id="outlined-basic" label={props.Label} type={props.type} variant={(props.Variant||"outlined")} required style={props.style} value={props.Value} onChange={props.Change} name={props.Name} sx={props.SX} 
                InputProps={{
                  startAdornment:<InputAdornment position="start"><input hidden accept="image/*" type="file" />
                   {props.z}</InputAdornment>,
                  endAdornment:<InputAdornment position="end"><input hidden accept="image/*" type="file" />
                  {props.y}
                  </InputAdornment>
                  
              }}
              {...(error && {error:true,helperText:error})}
                />
        
    );
}

