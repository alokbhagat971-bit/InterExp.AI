import { motion } from "framer-motion";
import {useSelector} from 'react-redux'
import { FaTimes } from "react-icons/fa";
import {useEffect} from "react"
import Auth from "../pages/Auth"

function AuthModel({onClose}){
    const {userData} = useSelector((state)=>state.user)

    useEffect(() => {
      if(userData){
        onClose()
      }
    },[userData,onClose])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4'>
        <div className='relative w-full max-w-md'>

          {/* ✅ Button back in original place, fades in AFTER card animation */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 1.1 }} // card takes 1.05s, so delay slightly after
            onClick={onClose}
            className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl z-10 cursor-pointer'
          >
            <FaTimes size={18} />
          </motion.button>

          <Auth isModel={true} />
        </div>
    </div>
  );
}

export default AuthModel