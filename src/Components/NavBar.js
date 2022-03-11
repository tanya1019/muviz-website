import React from "react";
import "./NavBar.css";
import { BsSearch } from "react-icons/bs";
import { IoNotifications, IoTvSharp } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useWindowDimensions } from "../Constants/Constants";
import { AiFillHome } from "react-icons/ai";
import { MdMovieFilter, MdLocalMovies } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
function NavBar() {
  const { width, height } = useWindowDimensions();

  return (
    <div
      style={{
        // backgroundColor: "black",
        height: 70,
        overflowX: "hidden",
        overflowY: "hidden",
        position: "fixed",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        width: "100vw",
        justifyContent: "space-between",
        backgroundImage: "linear-gradient(black , transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={require("../assets/netflixpng.png")}
          style={{
            width: 180,
            position: "relative",
            //   top: -10,
            left: -5,
          }}
        />
        {width > 1000 ? (
          <>
            <a className="nav_options">Home</a>
            <a className="nav_options">TV Shows</a>
            <a className="nav_options">New and Popular</a>
            <a className="nav_options">MyList</a>
            <a className="nav_options">Movies</a>
          </>
        ) : (
          <div>
            <AiFillHome className="headerIcons" color="white" fontSize={30} />
            <IoTvSharp className="headerIcons" color="white" fontSize={30} />
            <MdMovieFilter
              className="headerIcons"
              color="white"
              fontSize={30}
            />
            <FaClipboardList
              className="headerIcons"
              color="white"
              fontSize={30}
            />
            <MdLocalMovies
              className="headerIcons"
              color="white"
              fontSize={30}
            />
          </div>
        )}
      </div>

      <div style={{ display: "flex", paddingRight: 30 }}>
        <BsSearch color="white" className="nav_elements" />

        <IoNotifications color="white" className="nav_elements" />

        <MdAccountBox color="white" style={{ fontSize: 35 }} />
        <IoMdArrowDropdown
          color="white"
          style={{ fontSize: 20, alignSelf: "center" }}
        />
      </div>
    </div>
  );
}

export default NavBar;
