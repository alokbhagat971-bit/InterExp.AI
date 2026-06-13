import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import {setUserData} from './redux/userSlice'
import axios from 'axios'

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

    </Routes>
  );
}

 export default App;