import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "./category.css";

const Category = () => {
  return (
    <div className="bigDiv">

      <div className="head">
        <img
          className="Headimage"
          src="https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        />
        <h2 className="Headtitle">Electronic</h2>
      </div>

      <div className="head">
        <img
          className="Headimage"
          src="https://plus.unsplash.com/premium_photo-1671439429636-6d8d66247143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80"
        />

        <h2 className="Headtitle">Hardware</h2>
      </div>

      <div className="head">
        <img
          className="Headimage"
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        />

        <h2 className="Headtitle">Furniture</h2>
      </div>
    </div>
  );
};

export default Category;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   categoryContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: 20,
//     padding: 20,

//   },
//   category: {
//     backgroundColor: '#f1f1f1',
//     padding: 10,
//     borderRadius: 4,
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: '#dcdcdc',
//     },
//   },
// }));

// const CategoryBanner = () => {

//   const categories = [
//     { id: 1, name: 'Electronics' },
//     { id: 2, name: 'Clothing' },
//     { id: 3, name: 'Home Decor' },
//   ]

//   const classes = useStyles();

//   return (
//     <div>
//       <div className={classes.categoryContainer}>
//         {categories.map((category) => (
//           <div key={category.id} className={classes.category}>
//             <Typography variant="body1">{category.name}</Typography>
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// };

// export default CategoryBanner;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';

// import electronicsImage from './../assets/bidders bay.png';
// import clothingImage from './../assets/bidders bay.png';
// import homeDecorImage from './../assets/bidders bay.png';

// const useStyles = makeStyles((theme) => ({
//   categoryContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: 20,
//     padding: 20,
//   },
//   category: {
//     backgroundColor: '#f1f1f1',
//     padding: 10,
//     borderRadius: 4,
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: '#dcdcdc',
//     },
//   },
//   categoryImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 4,
//     objectFit: 'cover',
//   },
// }));

// const CategoryBanner = () => {
//   const categories = [
//     { id: 1, name: 'Electronics', image: electronicsImage },
//     { id: 2, name: 'Clothing', image: clothingImage },
//     { id: 3, name: 'Home Decor', image: homeDecorImage },
//   ];

//   const classes = useStyles();

//   return (
//     <div>
//       <div className={classes.categoryContainer}>
//         {categories.map((category) => (
//           <div key={category.id} className={classes.category}>
//             <img
//               src={category.image}
//               alt={category.name}
//               className={classes.categoryImage}
//               height='100px'
//             />
//             <Typography variant="body1">{category.name}</Typography>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryBanner;
