import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY } from "../axios/requests";
import {
  baseUrl,
  Colors,
  imageUrl,
  useWindowDimensions,
} from "../Constants/Constants";
import "./Modal.css";

function Modal({ selectedMovieId }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [posterLogo, setPosterLogo] = useState("");
  const [trailerID, setTrailerID] = useState("");
  const [castDetails, setCastDetails] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    const movieDetail = async () => {
      const movie = await axios.get(
        `${baseUrl}/movie/${selectedMovieId}?api_key=${API_KEY}&language=en-US`
      );
      // console.log(movie.data);
      setMovieDetails(movie.data);

      const posterLogo = await axios.get(
        `${baseUrl}/movie/${selectedMovieId}/images?api_key=${API_KEY}`
      );

      const trailer = await axios.get(
        `${baseUrl}/movie/${selectedMovieId}/videos?api_key=${API_KEY}`
      );

      setPosterLogo(posterLogo.data.logos);
      // console.log(posterLogo.data.logos);
      // console.log(trailer.data);

      const filterTrailer = trailer.data.results.filter(
        (item) => item.type === "Trailer"
      );
      setTrailerID(filterTrailer[0].key);

      const castDetails = await axios.get(
        `${baseUrl}/movie/${selectedMovieId}/credits?api_key=${API_KEY}&language=en-US`
      );
      // console.log(castDetails.data.cast);
      setCastDetails(castDetails.data.cast);

      const similarMovies = await axios.get(
        `${baseUrl}/movie/${selectedMovieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );
      console.log(similarMovies.data.results);
      setSimilarMovies(similarMovies.data.results);
    };

    movieDetail();
  }, []);
  const { width, height } = useWindowDimensions();
  const opts = {
    height: ((width / 2) * 9) / 16,
    width: width / 2,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div
      style={{
        backgroundColor: Colors.backgroundColor,
        display: "flex",
        width: "50vw",
        height: "90vh",
        borderRadius: 10,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: ((width / 2) * 9) / 16,
          position: "relative",
        }}
      >
        <YouTube videoId={trailerID} opts={opts} />

        <div className="trailer_fade"></div>
        <div
          style={{
            position: "absolute",
            top: width / 7,
            left: 20,
          }}
        >
          {posterLogo && posterLogo[0].file_path && (
            <img
              src={`${imageUrl}${posterLogo[0].file_path}`}
              style={{ height: 100, objectFit: "contain", maxWidth: "30vw" }}
            />
          )}
        </div>
      </div>

      <div style={{ flexDirection: "row", paddingLeft: 10 }}>
        <a style={{ fontSize: 40, fontFamily: "Bree Serif" }}>
          {movieDetails.title}
        </a>
        <a
          style={{
            fontFamily: "Playball",
            fontSize: 30,
            paddingLeft: 10,
          }}
        >
          {movieDetails.tagline}
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50vw",
          alignSelf: "center",

          marginTop: 10,
        }}
      >
        <div style={{ width: "30vw", marginLeft: 10, fontSize: 20 }}>
          <a>{movieDetails.overview}</a>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "20vw",
              alignSelf: "flex-end",

              paddingLeft: 20,
              marginBottom: 10,
            }}
          >
            <a style={{ color: "grey" }}>
              Genres:
              <span>
                {movieDetails &&
                  movieDetails.genres &&
                  movieDetails.genres.map((item) => {
                    return <a> {item.name}, </a>;
                  })}
              </span>
            </a>
          </div>
          <div
            style={{
              display: "flex",

              padding: 10,
              width: "20vw",

              alignSelf: "flex-end",
            }}
          >
            <a style={{ color: "grey" }}>
              Cast:
              <span>
                {castDetails.slice(0, 4).map((item) => {
                  return <a> {item.name} , </a>;
                })}
              </span>
              <a style={{ color: "grey" }}>more</a>
            </a>
          </div>
        </div>
      </div>

      <div>
        {similarMovies.map((item) => {
          return (
            <div style={{ display: "flex", overflowY: "scroll" }}>
              <img
                className="similarMovies_image"
                src={`${imageUrl}${item.poster_path}`}
              />
              <a>{item.title}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Modal;
