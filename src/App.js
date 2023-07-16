import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import img1 from "../src/images/img1.jpg"
import img2 from "../src/images/img2.jpg"
import img3 from "../src/images/img3.jpg"
import img4 from "../src/images/img4.jpg"
import img5 from "../src/images/img5.jpg"

export default function App() {
  const [advice, setadvice] = useState();
  const boxRef = useRef(null);
  const textRef = useRef(null);
  // const backgroundImageUrls = [
  //   `url(${img1})`,
  //   `url(${img2})`,
  //   `url(${img3})`,
  //   `url(${img4})`,
  //   `url(${img5})`,
  // ];
  const backgroundImageUrls = [img1, img2, img3, img4, img5];
  
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        setadvice(response.data.slip.advice);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    // const text = textRef.current;

    // const resizeBox = () => {
    //   const textHeight = text.offsetHeight;
    //   const textWidth = text.offsetWidth;
    //   console.log("textHeight",textHeight)
    //   box.style.height = textHeight + "px";
    //   box.style.width = textWidth + "px";
    // };
    const resizeBox = () => {
      box.style.width = "fit-content"; // Set a fixed width for the box

      // getComputedStyle(text): This is a method that returns the computed style object of the specified element. In this case, it returns the computed styles of the text element.lineHeight: This refers to the line-height CSS property, which specifies the height of a line of text within an element. It can be set in various units like pixels, ems, or percentages.parseInt(..., 10): This is a JavaScript function that parses a string and returns an integer. In this case, it converts the computed line height, which is returned as a string (e.g., "1.5"), into an integer. The second argument 10 is the radix parameter, indicating that the string should be parsed as a decimal number.By calculating the line height, you can determine the height of a single line of text. In the subsequent line of code (box.style.height = lineHeight * 2 + "px"), the calculated line height is multiplied by 2 to set the height of the box to accommodate two lines of text.
      // const lineHeight = parseInt(getComputedStyle(text).lineHeight, 10);
      // box.style.height = lineHeight * 2 + "px"; // Set the height for two lines of text
    };


    resizeBox();
  }, [advice]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImageUrls.length);
     
    }, 3000); 

    return () => {
      clearInterval(interval); 
    };
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchAdvice()
  //   }, 1000); // 4sec
  //   return () => {
  //     // Clean up the interval on component unmount
  //     clearInterval(interval);
  //   };
  // }, []);

  const currentBackgroundUrl = backgroundImageUrls[backgroundIndex];

  return (
    <div className="app" 
    // style={{
    //   background:currentBackgroundUrl,
      
    // }}
    style={{ backgroundImage: `url(${currentBackgroundUrl})`, backgroundSize: "cover" }}
    >
      <div className="card" ref={boxRef}>
        <h1 className="heading>" ref={textRef}>

          <span className="truncate">{advice}</span>
        </h1>
        <button className="button" onClick={fetchAdvice}>
          <span>give me advice!</span>
        </button>
      </div>
      
    </div>
  );
}
