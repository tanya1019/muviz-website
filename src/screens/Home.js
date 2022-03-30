import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, requests } from "../axios/requests";
import Category from "../Components/Category";
import Modal from "../Components/Modal";
import * as ReactBootstrap from "react-bootstrap";

import NavBar from "../Components/NavBar";
import { baseUrl, Colors, imageUrl } from "../Constants/Constants";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [poster, setPoster] = useState({});
  const [posterLogo, setPosterLogo] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [id, setId] = useState(Math.floor(Math.random() * 19));
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
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

      const filteredLogo = posterImages.data.logos.filter(
        (item) => item.iso_639_1 === "en"
      );

      // const horrorMovies = await axios.get(
      //   `${baseUrl}${requests.horrorMovies}`
      // );

      // const trendingMovies = await axios.get(
      //   `${baseUrl}${requests.trendingMovies}`
      // );
      // console.log(trendingMovies.data.results);
      // console.log(horrorMovies.data.results);
      // console.log(genreMovies.data.genres);
      // console.log(upcomingMovies.data.results);
      // console.log("====================>", posterData.data);
      // console.log(res.data.results);
      // console.log(posterImages.data.logos);
      // console.log(trendingMovies);
      setPosterLogo(filteredLogo[0]);
      setMovies(res.data.results);
      setPoster(res.data.results[id]);
      setLoading(false);
      // setUpcomingMovies(upcomingMovies.data.results);
      // setLatestMovies(latestMovies.data);
      // setHorrorMovies(horrorMovies.data.results);
    };

    fetchMovies();
  }, []);

  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(true);
  };

  const [selectedMovieId, setSelectedMovieId] = useState("");

  return (
    <>
      {loading ? (
        <div
          style={{
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactBootstrap.Spinner animation="grow" />
        </div>
      ) : (
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
          <Category
            toggleModal={toggleModal}
            title={"Actions"}
            fetchURL={requests.actionMovies}
            type={"numbers"}
            setSelectedMovieId={setSelectedMovieId}
          />
          <Category
            title={"Horror"}
            fetchURL={requests.horrorMovies}
            setSelectedMovieId={setSelectedMovieId}
            toggleModal={toggleModal}
          />
          <Category
            title={"Trending"}
            fetchURL={requests.trendingMovies}
            type={"detail"}
            toggleModal={toggleModal}
            setSelectedMovieId={setSelectedMovieId}
          />
          <Category
            title={"Comedy"}
            fetchURL={requests.comedyMovies}
            toggleModal={toggleModal}
            setSelectedMovieId={setSelectedMovieId}
          />
          <Category
            title={"Adventure"}
            fetchURL={requests.adventureMovies}
            toggleModal={toggleModal}
            setSelectedMovieId={setSelectedMovieId}
          />

          <Category
            title={"SciFi Movies"}
            fetchURL={requests.SciFiMovies}
            toggleModal={toggleModal}
            setSelectedMovieId={setSelectedMovieId}
          />

          {show && (
            <div
              onClick={() => {
                setShow(false);
              }}
              style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 20,
                position: "fixed",
                top: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(5px)",
              }}
            >
              <Modal selectedMovieId={selectedMovieId} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
