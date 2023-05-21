import {React,useState} from "react";


export  default function Formcontrol(initial,handle)
{
    const [values,setValues]=useState(initial);
    const [errors,setErrors]=useState({});
    const [Svalue,setSvalue]=useState(initial);
    const [Avalue,setAvalue]=useState(initial);
    const [postValue,setPostValue]=useState(initial);
    const [FilterValue,setFilterValue]=useState(initial);
    const [Tcoment,setTcoments]=useState(initial);
    const hanndleInputChange= (e) =>{
      
        const x=e.target.name
        const y=e.target.value
        console.log(x);
        console.log(y);
        setValues({
          ...values,
          [x]:y
      });
      }
      const hanndleloginChange= (e) =>{
      
        const a=e.target.name
        const b=e.target.value
        setSvalue({
          ...Svalue,
          [a]:b
      });
      console.log(Svalue)
      }
      const AccountChange= (e) =>{
        console.log('in Account');
        const a=e.target.name
        const b=e.target.value
        console.log(a)
        console.log(b);
        setAvalue({
          ...Avalue,
          [a]:b
      });
   
      }
      const postChange= (e) =>{
      
        const a=e.target.name
        let b=e.target.value
        if(a=='product_picture')
        {
          console.log("hello")
         
          console.log('mae chala')
          b=e.target.files
          console.log(e.target.files)
        }
       
        setPostValue({
          ...postValue,
          [a]:b
      });
      if(a=='category')
      {
        handle(b)
      }
     
      }
      const FilterChange= (e) =>{
      
        const a=e.target.name
        const b=e.target.value
        setFilterValue({
          ...FilterValue,
          [a]:b
      });
      if(a=='Category')
      {
        handle(b)
      }
      
        console.log(a)
        console.log(b)
      }
      const hanndleComentChange= (e) =>{
      
        const x=e.target.name
        const y=e.target.value
        setTcoments({
          ...Tcoment,
          [x]:y
      });
      }
    return{
        values,setValues,hanndleInputChange,errors,setErrors,Svalue,setSvalue,hanndleloginChange,Avalue,setAvalue,AccountChange,postValue,setPostValue,postChange,FilterValue,FilterChange,setFilterValue,Tcoment,setTcoments,hanndleComentChange
    }
}
