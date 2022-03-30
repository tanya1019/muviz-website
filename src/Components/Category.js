import axios from "axios";
import React, { useState, useEffect } from "react";
import { requests } from "../axios/requests";
import { baseUrl, Colors, imageUrl } from "../Constants/Constants";
import "./Category.css";
import { AiFillStar } from "react-icons/ai";
import { RemoveScrollBar } from "react-remove-scroll-bar";

function Category({ title, fetchURL, type, toggleModal, setSelectedMovieId }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await axios.get(`${baseUrl}${fetchURL}`);
      setMovies(movies.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 style={{ paddingLeft: 10 }}>{title}</h1>
      <div style={{ display: "flex", overflowX: "scroll", padding: 20 }}>
        {movies.map((item, index) => {
          if (type === "detail") {
            return (
              <div
                onClick={() => {
                  toggleModal();
                  setSelectedMovieId(item.id);
                }}
                className="category_continer"
                style={{
                  margin: 10,
                  backgroundColor: Colors.lightgrey,
                  justifyContent: "center",
                  paddingBottom: 15,
                }}
                key={item.id}
              >
                <img
                  src={`${imageUrl}${item.backdrop_path}`}
                  style={{
                    width: 300,
                    objectFit: "contain",
                  }}
                />

                <div className="staff_pick">
                  <AiFillStar color="white" style={{ alignSelf: "center" }} />
                  <a
                    style={{
                      paddingLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    Staff Pick
                  </a>
                </div>
                <div className="overview">
                  <a style={{ color: "lightgrey", fontSize: 20 }}>
                    {item.overview}
                  </a>
                </div>
              </div>
            );
          }
          if (type === "numbers") {
            return (
              <div
                onClick={() => {
                  toggleModal();
                  setSelectedMovieId(item.id);
                }}
                className="example"
                style={{
                  display: "flex",
                  margin: 10,
                  position: "relative",
                  marginTop: -50,
                }}
              >
                <a
                  style={{
                    fontFamily: "Londrina Outline",
                    fontSize: 400,

                    color: Colors.grey,
                  }}
                >
                  {index + 1}
                </a>
                <img
                  src={`${imageUrl}${item.poster_path}`}
                  style={{
                    width: 200,
                    objectFit: "contain",
                    position: "relative",
                    right: 40,
                  }}
                />
              </div>
            );
          } else {
            return (
              <div
                onClick={() => {
                  toggleModal();
                  setSelectedMovieId(item.id);
                }}
                className="category_continer"
                style={{ margin: 10 }}
                key={item.id}
              >
                <img
                  src={`${imageUrl}${item.poster_path}`}
                  style={{ width: 200, objectFit: "contain" }}
                />
                {/* <a>{item.title}</a> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Category;
