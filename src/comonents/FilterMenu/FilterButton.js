import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Filter = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  return (
    <FormControl>
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select
        labelId="select-label"
        id="simple-select"
        value={props.value}
        onChange={props.Change}
        name={props.Name}
        label={props.label}
        sx={{
          "& fieldset": { border: "1px solid black" },
        }}
        style={props.style}
      >
        {Array.isArray(data) && data[0] && data[0].title !== undefined
          ? data.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.title}
              </MenuItem>
            ))
          : Array.isArray(data)
          ? data.map((option) => (
              <MenuItem key={option.lat} value={option.name}>
                {option.name}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
};

export default Filter;

// import React, { useEffect, useState } from "react";
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// const Filter = (props) => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     if (props.data) {
//       setData(props.data);
//     }
//   }, [props.data]);

//   return (
//     <FormControl sx={{ minWidth: 120 }}>
//       <InputLabel
//         id="select-label"
//         sx={{
//           height: "14px", // Adjust the height of the inner label
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         {props.label}
//       </InputLabel>
//       <Select
//         labelId="select-label"
//         id="simple-select"
//         value={props.value}
//         onChange={props.Change}
//         name={props.Name}
//         label={props.label}
//         sx={{
//           "& fieldset": {
//             border: "1px solid black",
//             height: "45px", // Adjust the height of the field
//           },
//           "& .MuiSelect-root": {
//             paddingTop: "px", // Adjust the top padding of the field
//             paddingBottom: "-10px", // Adjust the bottom padding of the field
//           },
//           "& .MuiSelect-icon": {
//             top: "calc(50% - 10px)", // Adjust the vertical position of the arrow
//             height: "15px", // Adjust the height of the arrow
//           },
//         }}
//         style={props.style}
//       >
//         {Array.isArray(data) && data[0] && data[0].title !== undefined
//           ? data.map((option) => (
//               <MenuItem key={option._id} value={option._id}>
//                 {option.title}
//               </MenuItem>
//             ))
//           : Array.isArray(data)
//           ? data.map((option) => (
//               <MenuItem key={option.lat} value={option.name}>
//                 {option.name}
//               </MenuItem>
//             ))
//           : null}
//       </Select>
//     </FormControl>
//   );
// };

// export default Filter;



