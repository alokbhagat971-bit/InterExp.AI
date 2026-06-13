import { RiRobot3Fill } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { ServerApi } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Auth({isModel = false}) {

  const dispatch = useDispatch();
  const handleGoogleAuth = async () =>{
    try {
        const response = await signInWithPopup(auth,provider);
        let user = response.user;
        let name = user.displayName;
        let email = user.email;
        const result = await axios.post(ServerApi+"/api/auth/google",{name,email},{withCredentials:true})
        dispatch(setUserData(result.data))
        console.log(result.data);
    }catch(error){
        console.error(error);
    }
  }
  return (
    <div className={`
    w-full
    ${isModel?"py-4":"min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>

        <motion.div
          initial={{y:-50,opacity:0}}
          animate={{y:0,opacity:1}}
          transition={{duration:1.05}}
         className={`
         w-full
         ${isModel? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
         bg-white shadow-2xl border border-gray-200
         `}>

            <div className='flex items-center justify-center gap-3 mb-6' >
                <div className='bg-black text-white p-2 rounded-lg' >
                    <RiRobot3Fill size={18} />  
                </div>
                <h2 className='text-lg font-semibold'>InterExp.AI</h2>
            </div>
            <h1 className='text-2xl font-semibold text-center leading-snug mb-4'>Continue With <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2' >
                <IoSparkles size={18} />
                AI Smart Interview
              </span>
              </h1>

              <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to continue to your AI-powered interview experience, track your progress, and access personalized insights to ace your next interview.
              </p>

              <motion.button 
                initial={{y:-10,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{duration:0.3}}
                whileHover={{y:-4,boxShadow:"0px 10px 20px rgba(0,0,0,0.2)"}}
                whileTap={{y:0,boxShadow:"0px 5px 10px rgba(0,0,0,0.1)"}}
                className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md
                hover:shadow-lg '
                onClick={handleGoogleAuth}
              >
                <FcGoogle size={20} />
                Sign in with Google
              </motion.button>
        </motion.div>
    </div>
  );
}

export default Auth;