import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import axios from 'axios';

const Layout = ({children,selectedSong,setSelectedSong}) => {

  const url = import.meta.env.VITE_URL;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch songs on component mount
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${url}/songs/getAll`);
        setSongs(response.data.songs || []);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function to check the screen width
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 950); // Set to true if screen width is less than 960px
    };

    // Check screen size initially
    checkScreenSize();

    // Add event listener to check screen size on resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    console.log(`isSmallScreen updated: ${isSmallScreen}`);
}, [isSmallScreen]);

  return (
    <div className="flex">
      {!isSmallScreen && (
    <Sidebar />
      )}
    <div className="flex-grow">
      {children}
    </div>
    <RightSidebar selectedSong={selectedSong} songs={songs} setSelectedSong={setSelectedSong} />
  </div>
  )
}

export default Layout
