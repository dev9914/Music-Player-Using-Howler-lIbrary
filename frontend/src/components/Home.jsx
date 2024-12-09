import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import RightSidebar from './RightSidebar';
import { Link } from 'react-router-dom';


const Home = ({ setSelectedSong ,selectedSong}) => {
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

  return (
    <div className='max-sm:h-[194.8vh] h-screen' style={{
      background: 'linear-gradient(to bottom, #540d0e, #000000)',
    }}>
      <div >
        <div className='p-4 pl-16 flex max-sm:flex-col gap-x-16'>
          <div className='flex max-sm:text-3xl max-sm:justify-center gap-x-9'>
            <button className='text-white font-sans font-semibold'>Music</button>
            <button className='text-gray-300 hover:text-white hover:opacity-100 opacity-90 font-sans font-semibold'>Podcast</button>
            <button className='text-gray-300 hover:text-white hover:opacity-100 font-sans opacity-90 font-semibold'>Live</button>
            <button className='text-gray-300 hover:text-white hover:opacity-100 font-sans opacity-90 font-semibold'>Radio</button>
          </div>
          <div className='rounded-full max-sm:mt-5 w-[395px] max-sm:w-[150vw] max-sm: max-sm:flex max-sm:justify-center  h-10 bg-third-primary'>
        <div className='flex justify-between rounded-full relative'>
          <input className='ml-2 max-sm:mr-52 h-10 placeholder-opacity-30 text-white w-full rounded-full bg-third-primary px-3 outline-none' type="text" placeholder='Search your favourite song' />
          <FiSearch size={27} className='text-white max-sm:justify-end mr-3 mt-1'/>
        </div>
      </div>
        </div>

        <div style={{ backgroundImage: "url('https://i.ytimg.com/vi/YnhXZiHIne0/maxresdefault.jpg')" }} className='mx-16 mt-14 max-sm:mt-32 text-white h-[230px] flex items-center rounded-xl'>
          <div className='px-8'>
            <div className='flex'><MdVerified size={22} className='text-sky-500'/><span className='text-xs py-2 text-gray-300 font-sans font-semibold ml-3 -mt-1 opacity-75'>Varified Artist</span></div>
            <p className='text-3xl font-sans font-semibold'>{selectedSong?.artist}</p>
            <p className='text-gray-100 opacity-95 font-sans mt-6 text-xs'>{selectedSong?.monthlyListeners} monthly listeners</p>
          </div>

          {/* for artist pic */}
          <div>
            <img src="https://i.postimg.cc/3NYKhTk5/singer-removebg-preview.png" className='w-[300px] mb-[70px] h-[300px] max-sm:w-[370px] max-sm:h-[370px] fixed top-[59px] max-sm:top-[116px] max-sm:right-[50px] right-[420px]' alt="" />
          </div>
          <div></div>
        </div>
      </div>

      {/* for listing songs  */}
      <div className='pt-7'>
        <div className='px-16'>
        <div className='flex pb-2 justify-between'>
          <p className='text-white text-xl font-semibold font-sans'>Popular</p>
          <p className='text-gray-300 text-sm font-sans font-semibold opacity-90'>See All</p>
        </div>
        <div className='flex justify-between'>
          <div className='text-gray-300 opacity-90 font-sans font-semibold flex gap-20'>
            <p>#</p>
            <p>TITLE</p>
          </div>
          <div className='text-gray-300 opacity-90 font-sans font-semibold flex gap-20'>
            <p>PLAYING</p>
            <p>TIME</p>
          </div>
          <div className='text-gray-300 opacity-90 font-sans font-semibold'>
            <p>ALBUM</p>
          </div>
        </div>
        </div>

        <div style={{
    overflowY: 'scroll', 
    scrollbarWidth: 'none', 
    msOverflowStyle: 'none', 
    overflow: '-moz-scrollbars-none',
  }} className='h-[240px] overflow-y-auto'>
          {songs.map((item,index)=>(
            <Link to={`${isSmallScreen=== true ? '/music': ''}`}>
        <div onClick={() => setSelectedSong(item)} key={index} className={`flex px-16 ${selectedSong?._id === item._id ? 'bg-sixth-primary': ''} text-sm pt-4 cursor-pointer`}>
          <div className='text-gray-300 opacity-90 font-sans flex'>
            <p className='text-white opacity-100 w-11'>{index+1}</p>
            <img src={item.songImage} className='w-9 object-cover -mt-1 h-9 mr-5' alt="" />
            <p className='w-[200px]'>{item.title}</p>
          </div>
          <div className='text-gray-300 opacity-90 font-sans flex'>
            <p className='w-[150px]'>{item.monthlyListeners}</p>
            <p className='w-[100px]'>{item.duration}</p>
          </div>
          <div className='text-gray-300 w-[160px] opacity-90 flex justify-end font-sans'>
            <p className=''>{item.album}</p>
          </div>
        </div>
        </Link>
          ))}
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Home
