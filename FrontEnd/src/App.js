import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Component/NavBar';
import Body from './Component/Body';
import Login from './Component/Login';
import HeadersQuestion from './Component/HeadersQuestion';
import Admin from './Component/Admin';
import Users from './Component/Users';
import ProfilePage from './Component/ProfilePage';
import MathPage from './Component/MathPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './Component/Auth';
import ImageUpload from './Component/ImageUpload';
import FIRSTVIEW from './FirstView/FIRSTVIEW';
import BuskyHome from './BskyAppClone/HeaderBusky/BuskyHome';
import Posts from './BskyAppClone/All__Card/Posts';
import BuskyHomeFreind from './HeaderBuskyFreind/BuskyHomeFreind';
import ReallChat from './ReallChat/ReallChat';
import Ofline from './FirstView/Ofline';
import RightCard from './ReelsSection/RightCard/RightCard';
import Test from './Test';
import UplodRellsSection from './ReelsSection/UplodRellsSection';
import ProfileBuskt from './ProfileUser/ProfileBuskt.js';
import Rank from './RankUsers/Rank.js';
import CircleAnimation from './RankUsers/CircleAnimation.js';
import AdminPosterPdf from './UniverstyPdf/AdminPosterPdf.js';
import Eroor from './Eroor/Eroor.js';
import Draw from './DrawCompon/Draw.js';
 
import FlexYoutube from './FlexYoutube/FlexYoutube.js';
import Ai from './aiModels/Ai.js';
import FlexSiri from './aiModels/FlexSiri.js';
import AiTesting from './AiTesting/AiTesting.js';
import AudioRecorder from './ReallChat/AudioRecorder.js';
 
const App = () => {
 const [online,setIsOnline] = useState(true)
 // here dedict if i onlin or no
 
    
//   
  return (
    <>
      {online === false ? (
        <Ofline />  
      ) : (
        <>
          <Routes>
            <Route path='/Headers' element={<> <NavBar/> <Body/></>} />
            <Route path='/login' element={<><Login/></>} />
            <Route path='/HeadersTopQuestion' element={<><NavBar/> <HeadersQuestion/></>} />
            <Route path='/Admin' element={<><NavBar/> <Admin/></>} />
            <Route path='/Users' element={<><NavBar/> <Users/></>} />
            <Route path='/Profile' element={<><ProfilePage/></>} />
            <Route path='/MathPage' element={<><MathPage/></>} />
            <Route path='/auth' element={<><Auth/></>} />
            <Route path='/Admin/upload/page' element={<><ImageUpload/></>} />
            <Route path='/' element={<><FIRSTVIEW/></>} /> 
               <Route path='/*' element={<><Eroor/>
            </>} />


            <Route path='/bluskG' element={<><Ai/><BuskyHome/></>} />
            <Route path='/card' element={<><Posts/></>} />
            <Route path='/bluskG/freind' element={<><BuskyHomeFreind/></>} />
            <Route path='/bluskG/chat' element={<> <ReallChat/></>} />
            <Route path='/testfile' element={<><UplodRellsSection/></>} />
            <Route path='/flexProfile' element={<><ProfileBuskt/></>} />
            <Route path='/RankPage' element={<><Rank/></>} />
            <Route path='/blsuky/pdf' element={<><AdminPosterPdf/></>} />
            <Route path='/blsuky/Draw' element={<><Draw/></>} />
            <Route path='blsuky/flexYoutube' element={<><Ai/><FlexYoutube/></>} />
            <Route path='/ai' element={<><Ai/></>} />
            <Route path='/ping' element={<><FlexSiri/></>} />
            <Route path='/AiTesting' element={<><AiTesting/></>} />
            {/* <Route path='/testRecord' element={<><AudioRecorder/></>} /> */} 
            {/* // check this in this page app in auth  */}
                
          </Routes>
          <ToastContainer />
  
        </>
      )}
    </>
  );
};

export default App;
