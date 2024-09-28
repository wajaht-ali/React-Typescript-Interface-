import React from "react";
import { BiArchive } from "react-icons/bi";
import "./styles/App.css";
import Search from "./components/Search";

const App: React.FC = () => {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        <BiArchive className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <Search />
    </div>
  );
};

export default App;
