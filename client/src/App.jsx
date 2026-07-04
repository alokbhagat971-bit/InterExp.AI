import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import {setUserData} from './redux/userSlice'
import axios from 'axios'
import Interview from './pages/Interview'

export const ServerApi = "http://localhost:8000";

function App() {

  const dispatch = useDispatch()
  useEffect (() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerApi+"/api/user/current-user",{withCredentials:true});
        dispatch(setUserData(result.data))
      }catch(error){
        console.error("Error checking user authentication:", error);
      }
    }

    getUser()
  },[dispatch])
  return (
    <Routes>

      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/interview' element={<Interview/>} />

    </Routes>
  );
}

 export default App;