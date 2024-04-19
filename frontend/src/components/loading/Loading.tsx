"use client";
import React, { useEffect, useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import "./styles.css";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 90) {
        setProgress((prevProgress: number) => prevProgress + 20); // Increment progress by 10% each time
      } else {
        clearInterval(interval); // Stop the interval when progress reaches 90%
      }
    }, 50); // Update progress every 100 milliseconds (0.1 seconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <Progress.Root className="ProgressRoot" value={progress}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default Loading;
