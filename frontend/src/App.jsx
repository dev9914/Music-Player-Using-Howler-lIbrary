import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { useState } from "react";
import RightSidebar from "./components/RightSidebar";

function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  console.log(selectedSong)

  return (
    <>
      <Layout selectedSong={selectedSong} setSelectedSong={setSelectedSong}>
        <Routes>
          <Route path="/" element={<Home selectedSong={selectedSong} setSelectedSong={setSelectedSong} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
