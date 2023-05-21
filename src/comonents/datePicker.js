import React from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './datapicker.css'
export default function Datepicker(props){
    
    const {Name,change,value}=props
    const convert=(name,value)=>(
    { 
       
        target:{
            name,value
        }
    }
    )
    return (
       <DatePicker value={value} wrapperClassName="datePicker" selected={value} dateFormat="dd/MM/yyyy"showYearDropdown scrollableMonthYearDropdown onChange={date =>change(convert(props.Name,date))}></DatePicker>
      );
}