import React from 'react';
import Slider from '@mui/material/Slider';

const CustomSlider = (props) => {
  return (
    <div  style={{width: 500}}>
      <Slider
        value={props.value}
        onChange={props.Change}
        name={props.Name}
        valueLabelDisplay="on"
        min={100}
        max={50000}
      />
    </div>
  );
};

export default CustomSlider;



