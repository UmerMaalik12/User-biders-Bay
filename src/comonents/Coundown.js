import React, { useEffect, useState } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Typography, Box } from "@mui/material";
export default function (props) {
  const [days, setDays] = useState(-1);

  useEffect(() => {
    console.log("valie of time",props.time);
    if(props.time!==null)
    {
    const newDate = new Date(props.time);
    const x = dataChanger(newDate);
    const y = addDays(x, 7);
    let u = new Date();
    u = dataChanger(u);
    const z = calculateDaysDifference(u, y);
    console.log(x);
    console.log(y);
    console.log(z);

    if (isNaN(z)) {
      setDays(0);
    } else {
      setDays(z);
    }
  }
  }, []);
  const addDays = (dateString, days) => {
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const year = parseInt(dateParts[2], 10) + 2000; // Assuming 'YY' represents 20YY

    const currentDate = new Date(year, month, day);
    const futureDate = new Date(
      currentDate.getTime() + days * 24 * 60 * 60 * 1000
    );

    const futureDay = futureDate.getDate();
    const futureMonth = futureDate.getMonth() + 1; // Adding 1 since months are zero-based
    const futureYear = futureDate.getFullYear() - 2000; // Subtracting 2000 to get 'YY' format

    return `${futureDay}/${futureMonth}/${futureYear}`;
  };
  const dataChanger = (newDate) => {
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    // Parse the input dates
    const [startDay, startMonth, startYear] = startDate.split("/");
    const [endDay, endMonth, endYear] = endDate.split("/");

    // Convert the input dates to JavaScript Date objects
    const startDateObj = new Date(`20${startYear}`, startMonth - 1, startDay);
    const endDateObj = new Date(`20${endYear}`, endMonth - 1, endDay);

    // Calculate the difference in days
    const diffInDays = Math.round(
      Math.abs((startDateObj - endDateObj) / oneDay)
    );

    return diffInDays;
  };

  return (
    <>
    {props.time!==null?(
    <Box>
      {days == 0 ? (
        <Typography>post has expired</Typography>
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
