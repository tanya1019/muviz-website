import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, requests } from "../axios/requests";

import NavBar from "../Components/NavBar";
import { baseUrl, imageUrl } from "../Constants/Constants";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [poster, setPoster] = useState({});
  const [posterLogo, setPosterLogo] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [id, setId] = useState(Math.floor(Math.random() * 19));
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(`${baseUrl}${requests.discoverMovie}`);
      const posterData = await axios.get(
        `${baseUrl}/movie/${res.data.results[id].id}?api_key=${API_KEY}`
      );
      const posterImages = await axios.get(
        `${baseUrl}/movie/${res.data.results[id].id}/images?api_key=${API_KEY}`
      );
      const upcomingMovies = await axios.get(
        `${baseUrl}${requests.upcomingMovies}`
      );

      const genreMovies = await axios.get(
        `${baseUrl}${requests.genereMovieList}`
      );
      // console.log(genreMovies.data.genres);

      const horrorMovies = await axios.get(
        `${baseUrl}${requests.horrorMovies}`
      );
      console.log(horrorMovies.data.results);

      // console.log(upcomingMovies.data.results);
      // console.log("====================>", posterData.data);
      // console.log(res.data.results);
      // console.log(posterImages.data.logos[0]);
      setPosterLogo(posterImages.data.logos[0]);
      setMovies(res.data.results);
      setPoster(res.data.results[id]);
      setUpcomingMovies(upcomingMovies.data.results);
      setLatestMovies(latestMovies.data);
    };

    fetchMovies();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100% ",
        width: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <NavBar />
      <div className="poster_container">
        <img
          style={{
            position: "absolute",
            width: "100vw",
            height: "calc(100vw * 9/16)",
            objectFit: "cover",
          }}
          src={`${imageUrl}${poster.backdrop_path}`}
        />

        <img
          src={`${imageUrl}${posterLogo.file_path}`}
          className="movie_title"
        />
        <div
          style={{
            position: "absolute",
            left: 60,
            top: "calc(100vw / 3.5)",
            minWidth: 300,
            maxWidth: 800,
            width: "calc(100vw /3)",
          }}
          className="poster_title"
        >
          <a>{poster.overview}</a>
        </div>

        <div className="poster_fade"></div>
      </div>
      <div>
        <h1 className="title">Discoverable Movies</h1>
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
          }}
        >
          {movies.map((item) => {
            return (
              <div
                style={{
                  margin: 10,
                  width: 200,
                }}
                key={item.id}
              >
                <img
                  src={`${imageUrl}${item.poster_path}`}
                  style={{
                    width: 200,
                    objectFit: "contain",
                  }}
                />
                <a>{item.title}</a>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h1 className="title">Upcoming Movies</h1>
        <div style={{ display: "flex", overflowX: "scroll" }}>
          {upcomingMovies.map((item) => {
            return (
              <div style={{ margin: 10 }} key={item.id}>
                <img
                  src={`${imageUrl}${item.poster_path}`}
                  style={{ width: 200, objectFit: "contain" }}
                />
                <a>{item.title}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
