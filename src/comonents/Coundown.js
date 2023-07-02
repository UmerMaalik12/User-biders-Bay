import React, { useEffect, useState } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Typography, Box } from "@mui/material";
export default function (props) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    let newDate = new Date(props.time);
    const expiry = newDate.setDate(newDate.getDate() + 7);
    // console.log(`Expiry: ${expiry}`);
    const today = new Date();
    const diffInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (diffInDays <= 0 && props.onExpired) {
      props.onExpired(true)
    }
    setDays(diffInDays);
  }, []);

  return (
    <>
    {props.time!==null?(
    <Box>
      {days <= 0 ? (
        <Typography>Expired</Typography>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TimerOutlinedIcon sx={{ color: "#ee0300",fontSize:{xs:12,sm:14,md:18}  }} />{" "}
          <Typography color='textSecondary' variant='body1' sx={{ fontSize:{xs:12,sm:14,md:18} , pl: 1}}>
            {" "}
            {days} {"days"}
          </Typography>{" "}
        </div>
      )}
    </Box>):null
        }
        </>
  );
}
