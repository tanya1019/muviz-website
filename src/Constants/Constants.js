import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Colors = {
  backgroundColor: "black",
  red: "#E50914",
  grey: "#595959",
  darkgrey: "#181818",
  lightgrey: "#232323",
  white: "#FFFFFF",
};

const Sizes = {
  margin: 10,
  padding: 10,
};

export { useWindowDimensions, Colors, Sizes };

export const imageUrl = "https://image.tmdb.org/t/p/original/";
export const baseUrl = "https://api.themoviedb.org/3";
