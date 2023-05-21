import React, { useState} from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './card.css'
import Api from './api'
import { display } from '@mui/system';

const Card=(props)=> {
    

   
   
  return (
    

                
                     
                    <div className='card'>
                    
                    <img  className="image" src={props.Url}></img>
                    <div className='second'>
                    <h2 className='title'>{props.Title}</h2>
                    
                    <p className='description'>Price:{props.Price}</p>
                    </div>
                    {/* <p>
                        <button className='button'>Buy</button>
                    </p> */}
                    </div>
                           
                
                
        
                
            

  )
}

export default Card