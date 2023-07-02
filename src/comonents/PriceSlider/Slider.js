import React from 'react';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

const CustomSlider = (props) => {
  return (
    <Box  sx={{width:{xs:300,md:500}}}>
      <Slider
        value={props.value}
        onChange={props.Change}
        name={props.Name}
        valueLabelDisplay="on"
        min={100}
        max={50000}
      />
    </Box>
  );
};

export default CustomSlider;



