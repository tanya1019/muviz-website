import logo from "./logo.svg";
import "./App.css";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        overflowX: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
