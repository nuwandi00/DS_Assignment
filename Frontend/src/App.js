import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Courses from "./components/Courses";
import { Route, Routes, Router } from "react-router";

function Dashboard() {
  return (
    <div>
      <Main />
      <Courses />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
