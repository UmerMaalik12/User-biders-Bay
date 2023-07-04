import { Grid, Typography,Box,Container} from '@mui/material'
import {React,useEffect} from 'react'
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

export default function Inspection() {
    const theme = useTheme();
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);
    const banksInLahore = [
        {
          name: 'Habib Bank Limited (HBL)',
          address: 'G8FW+WCG, Round About, Main Market, Lahore, Punjab',
          googleMapsLink: 'https://www.google.com/maps/place/HBL/@31.5248199,74.3413161,17z/data=!4m6!3m5!1s0x391904f0b3d95e05:0x3f4aa4232874a500!8m2!3d31.5248199!4d74.3460797!16s%2Fg%2F11c1yrk2nk?entry=ttu',
        },
        {
          name: 'United Bank Limited (UBL)',
          address: 'FC9Q+7XF, Sector A DHA Phase 6, Lahore, Punjab, Pakistan',
          googleMapsLink: 'https://www.google.com/maps/place/United+Bank+Limited/@31.4681947,74.4208829,15z/data=!4m7!3m6!1s0x391908c345d7d0c1:0x570c114c190ef688!8m2!3d31.4681947!4d74.4399373!15sCht1YmwgOTg3IERIQSBQaGFzZSA2LCBMYWhvcmUiA4gBAZIBBGJhbmvgAQA!16s%2Fg%2F11cm01zz4_?entry=tts&shorturl=1',
        },
        {
          name: 'Bank Alfalah Limited',
          address: 'H889+FH3, Garhi Shahu, Lahore, Punjab 54000, Pakistan',
          googleMapsLink: 'https://www.google.com/maps/place/Bank+Alfalah+ATM/@31.5661423,74.299852,15z/data=!4m7!3m6!1s0x39191b514333515f:0xfc6dffcf074cb6dc!8m2!3d31.5661423!4d74.3189064!15sCgRBVE1zkgEDYXRt4AEA!16s%2Fg%2F11c1nd54pw?entry=tts&shorturl=1',
        },
        {
          name: 'Soneri Bank',
          address: 'F887+58M, Led Plaza, Maulana Shaukat Ali Rd, Mohammadpura Model Town, Punjab, 54600, Pakistan',
          googleMapsLink: 'https://www.google.com/maps/place/Soneri+Bank/@31.4654519,74.2370656,13z/data=!4m7!3m6!1s0x39190769dfb8bda1:0xd1d592db981dd1b9!8m2!3d31.4654519!4d74.3132833!15sCi9zb25lcmkgYmFuayA1NDMgTWFpbiBNYXJrZXQsIE1vZGVsIFRvd24sIExhaG9yZSIDiAEBkgEEYmFua-ABAA!16s%2Fg%2F11f5_yrfvp?entry=tts&shorturl=1',
        },
        {
          name: 'Meezan Bank',
          address: 'Quaid-e-Azam Industrial Estate Quaid e Azam Industrial Estate, Lahore, Punjab, Pakistan',
          googleMapsLink: 'https://www.google.com/maps/place/Meezan+Bank+-+Quaid-e-Azam+Industrial+Estate+Branch/@31.4421293,74.2874973,14z/data=!4m7!3m6!1s0x391906c5ec28288b:0x867d63ae2f14f771!8m2!3d31.4421293!4d74.3256061!15sCi1tZXp6YW4gYmFuayA3NiBTaGFocmFoLWUtUXVhaWQtZS1BemFtLCBMYWhvcmWSAQRiYW5r4AEA!16s%2Fg%2F11g68yy_v_?entry=tts&shorturl=1',
        },
        {
          name: 'Bank Islami',
          address: '20-B, Hali Rd, Block B Gulberg 2, Lahore, Punjab, Pakistan',
          googleMapsLink: 'https://www.google.com/maps/place/BankIslami+Pakistan+Ltd+Gulberg+Branch+Lhr(2053)/@31.4940647,74.3065414,13z/data=!4m6!3m5!1s0x391904f7118c51cf:0x875cb47bdd6fcdc3!8m2!3d31.5226933!4d74.3451168!16s%2Fg%2F11b8t7kfvz?entry=ttu',
        },
        
        
      ];
 return (
    <Container maxWidth="lg" sx={{ marginTop:"100px",height:{xs:"140em",md:"110em"}}} >
        <Box sx={{xs:{marginBottom:"50px"}}} >
            <Typography variant='h4'>Banks</Typography>
            {banksInLahore.map((p)=>(
                <div style={{marginBottom:"10px"}}>
                 <Typography>
                    {p.name}
                 </Typography>
                 <Typography>
                 {p.address}
              </Typography>
              <a href={p.googleMapsLink} target="_blank" rel="noopener noreferrer" >
                      Navigate to Google Maps
                    </a>
                   
              </div>
            ))}
           
           <Typography variant='h4' sx={{marginTop:"15px"}}>Electronics</Typography>
           <Typography>
                    Hafiz Center
                 </Typography>
                 <Typography>
                 Block E1 Block E 1 Gulberg III, Lahore, Punjab, Pakistan
              </Typography>
              <a href="https://www.google.com/maps/place/Hafeez+Centre,+Block+E1+Block+E+1+Gulberg+III,+Lahore,+Punjab/@31.5159977,74.3428656,17z/data=!3m1!4b1!4m6!3m5!1s0x39190458dd8b3dfb:0xf4339935ef318b45!8m2!3d31.5159977!4d74.3428656!16s%2Fg%2F1ptyp9cr_?entry=ttu" target="_blank" rel="noopener noreferrer">
                      Navigate to Google Maps
                    </a>
                    <Typography variant='h4' sx={{marginTop:"15px"}}>Vehicles</Typography>
           <Typography>
                    Pak Wheels
                 </Typography>
                 
              <a href="https://www.pakwheels.com/products/pakwheels-inspection" target="_blank" rel="noopener noreferrer">
                      Navigate to Pak Wheels
                    </a>
                    <Typography sx={{marginTop:"10px"}}>
                   Car Test
                 </Typography>
                 
              <a href="http://www.cartest.pk/" target="_blank" rel="noopener noreferrer">
                      Navigate to Car Test
                    </a>
                    
                    <Typography sx={{marginTop:"10px"}}>
                Gari.pk
                 </Typography >
                 
              <a href="https://www.gari.pk/" target="_blank" rel="noopener noreferrer">
                      Navigate to gari.pk
                    </a> 
                    <Typography variant='h4' sx={{marginTop:"15px"}}>Art Work</Typography>
                    <Typography>
                    Oyster Art Gallery
                 </Typography>
                 <Typography>
                 Near Pizza, 84-B-1, Off MM Alam Rd, Ghalib Market Gulberg III, Lahore, Punjab 52000
                 </Typography>
                 <a href="https://www.google.com/maps/place/Oyster+Art+Gallery/@31.5133604,74.3517349,18z/data=!4m6!3m5!1s0x39190453e1e2d1ed:0x16b80f86ecd55b2c!8m2!3d31.5130711!4d74.3524613!16s%2Fg%2F11cn8xqlq4?entry=ttu" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography sx={{marginTop:"10px"}}>
                    Hamail Art Galleries
                 </Typography>
                 <Typography>
                 67 C 1 Umar Saeed Rd, Block C1 Block C 1 Gulberg III, Lahore, Punjab 54660
                 </Typography>
                 <a href="https://www.google.com/maps/place/Hamail+Art+Galleries/@31.5148042,74.2779071,12z/data=!4m6!3m5!1s0x39190457250aba53:0x12f1f2aaac1f935e!8m2!3d31.5148233!4d74.3479473!16s%2Fg%2F1tffbl06?entry=ttu" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography variant='h4' sx={{marginTop:"15px"}}>Tickets/Stamps</Typography>
                    <Typography>
                    Pakistan Post Office
                 </Typography>
                 <Typography>
                 Block D1, Gulberg, Lahore, Punjab, Pakistan
                 </Typography>
                 <a href="https://goo.gl/maps/zhGeSTSaoezZR7EU9" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography sx={{marginTop:"10px"}}>
                    Pakistan Post Office
                 </Typography>
                 <Typography>
                 Shadman Rd, Shadman Colony 1, Shadman, Shadman 1 Shadman, Lahore, Punjab 54000, Pakistan
                 </Typography>
                 <a href="https://goo.gl/maps/WdKhmeZv4DsWr2ND8" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography sx={{marginTop:"10px"}}>
                    Pakistan Post Office
                 </Typography>
                 <Typography>
                 21 Davis Road, Garhi Shahu, Lahore, Punjab 54000, Pakistan
                 </Typography>
                 <a href="https://goo.gl/maps/D2hzDTYHgVepkKrW8" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography sx={{marginTop:"10px"}}>
                    Pakistan Post Office
                 </Typography>
                 <Typography>
                 Off Main Blvd Gulberg, Main Gulberg, Lahore, Punjab, Pakistan
                 </Typography>
                 <a href="https://goo.gl/maps/7ELa5wXcTBV7jSRh7" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography sx={{marginTop:"10px"}}>
                    Pakistan Post Office
                 </Typography>
                 <Typography>
                 474 Rohtas Rd, G-9 Markaz G 9/1 G-9, Islamabad Capital Territory, Islamabad Capital Territory, Pakistan
                 </Typography>
                 <a href="https://goo.gl/maps/DsNzWvKcG42y9YZM7" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 
                    <Typography sx={{marginTop:"10px"}}>
                    Pakistan Post Office
                 </Typography>
                 <Typography>
                 Site for Karachi Financial Towers, General Post Office, Main I.I Chundrigar Rd, adj. Railway Ground, New Chali, Karachi, Karachi City, Sindh 74200, Pakistan
                 </Typography>
                 <a href="https://goo.gl/maps/WPsmBWBhpt1fVMrKA" target="_blank" rel="noopener noreferrer">
                      Navigate to google maps
                    </a> 

        </Box>
    </Container>
  )
}
