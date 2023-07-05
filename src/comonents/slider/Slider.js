// import React, { useState } from "react";
// import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
// import { RxDotFilled } from "react-icons/rx";
// import { BASE_URL } from "../../Config/constant";

// export default function Slider(props) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [imageError, setImageError] = useState(false);
//   const slide = props.image;
//   console.log(props.data);
//   console.log(slide);

//   const handleImageError = () => {
//     console.log("error detected");
//     setImageError(true);
//   };
//   const prevSlide = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };
//   const fallbackImage =
//     "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image";
//   const nextSlide = () => {
//     const isLastSlide = currentIndex === slide.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };
//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex);
//   };
//   return (
//     <div className="max-w-[1400px] h-[500px] w-full m-auto py-0 px-0 relative group">
//       <div
//         style={{
//           backgroundImage: `url(${
//             imageError ? fallbackImage : BASE_URL + slide[currentIndex]
//           })`,
//           objectFit: 'fill'
//         }}
//         onError={({ currentTarget }) => handleImageError}
//         className=" w-full h-full rounded-2xl bg-center bg-cover duration-500 "
//       ></div>
//       <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
//         <BsChevronCompactLeft onClick={prevSlide} size={30} />
//       </div>
//       <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
//         <BsChevronCompactRight onClick={nextSlide} size={30} />
//       </div>
//       <div className="flex top-4 justify-center py-2">
//         {slide.map((slide, slideIndex) => (
//           <div
//             key={slideIndex}
//             onClick={() => goToSlide(slideIndex)}
//             className="text-2xl cursor-pointer"
//           >
//             <RxDotFilled />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// // ${BASE_URL}${p.images[0]}

import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { BASE_URL } from "../../Config/constant";
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../Config/Api'

export default function Slider(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [slide,setslide]=useState(props.image);

  console.log(props.data);
  console.log("this is slide",slide);
console.log(props.data._id);
  const handleImageError = () => {
    console.log("error detected");
    setImageError(true);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const fallbackImage =
    "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image";

  const nextSlide = () => {
    const isLastSlide = currentIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(()=>{
    console.log(slide[currentIndex]);
  },[currentIndex])

  const deleteImage=(image_name)=>{
    api
    .put(`/products/image/${props.data._id}`, 
   
    {image_name}
    )
    .then(function (response) {
      console.log(response);
      if(response)
      {
        const updatedImageUrls = [...slide];
    updatedImageUrls.splice(currentIndex, 1);
    setslide(updatedImageUrls);
    console.log(slide);

      }
      
      
    })
    .catch(function (error) {
      console.log("this is error");
    });
console.log("hello");

  }
  // useEffect(()=>{
  //   setslide(props.updateImages)
  //   },[props.updateImages])
  return (
    <div className="  max-w-[1400px]  m-auto py-0 px-0 relative group bg-black" style={props.style}>
    
      <img
        src={imageError ? fallbackImage : BASE_URL + slide[currentIndex]}
        onError={handleImageError}
        className="w-full h-full object-scale-down rounded-2xl bg-center bg-cover duration-500 md:h-30"
        alt="Slider Image"
      />
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:top-[50%]" >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:top-[50%]">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      {props.ShowDelete==true && slide!=="https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"?
      <div className="hidden group-hover:block absolute top-[10%] -translate-x-0 translate-y-[-50%] right-5 text-2xl  p-2  text-white cursor-pointer">
      <DeleteIcon onClick={()=>deleteImage(slide[currentIndex])} sx={{color:"red"}}/>
      </div>:null}
      <div className="flex top-4 justify-center py-2">
        {Array.isArray(slide)&& slide.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
