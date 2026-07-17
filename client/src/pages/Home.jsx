import Navbar from "../components/Navbar"
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";
import { RiRobot3Fill } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";
import { 
    BsMic,
    BsClock,
    BsBarChart,
    BsFileEarmarkText,
    BsRocketTakeoff,
    BsClockHistory,
    BsArrowRight,
    BsShieldCheck,
    BsCpu,
    BsGraphUp,
    BsLock
   } from "react-icons/bs";
import {useState, Fragment} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthModel from '../components/AuthModel'
import evalImg from "../assets/images/ai-ans.png"
import hrImg from "../assets/images/HR.png"
import techImg from "../assets/images/tech.png"
import confidenceImg from "../assets/images/confi.png"
import creditImg from "../assets/images/credit.png"
import resumeImg from "../assets/images/resume.png"
import pdfImg from "../assets/images/pdf.png"
import analyticsImg from "../assets/images/history.png"
import laptop from '../assets/images/blue_laptop.png'
import Footer from '../components/Footer'

function Home() {
  const [showAuth,setShowAuth] = useState(false)
  const {userData} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const parts =[
    {
      icon:<RiRobot3Fill size={18} />,
      step:"STEP 1",
      title:"Role & Experience Slection",
      desc:"AI adjusts difficulty based on selected job role."
    },
    {
      icon:<BsMic size={18} />, 
      step:"STEP 2",
      title:"AI-Powered Voice Interview",
      desc:"Dynamic follow-up questions based on your answers."
    },
    {
      icon:<BsClock size={18} />,  
      step:"STEP 3",
      title:"Timer Based Simulation",
      desc:"Real Interview pressure with time tracking."
    }

  ]

  const stepColors = [
    "bg-green-50 text-green-500",
    "bg-blue-50 text-blue-500",
    "bg-purple-50 text-purple-500"
  ]

  const stepTextColors = [
    "text-green-600",
    "text-blue-600",
    "text-purple-600"
  ]

  const glowColors = [
    "bg-green-300",
    "bg-blue-300",
    "bg-purple-300"
  ]

  const trustBadges = [
    { icon:<BsShieldCheck size={20} />, label:"Realistic Experience", desc:"Industry standard interview simulation", color:"text-green-600", bg:"bg-green-50" },
    { icon:<BsCpu size={20} />, label:"AI Feedback", desc:"Get actionable insights to improve faster", color:"text-blue-600", bg:"bg-blue-50" },
    { icon:<BsGraphUp size={20} />, label:"Track & Improve", desc:"Analyze performance and grow continuously", color:"text-purple-600", bg:"bg-purple-50" },
    { icon:<BsLock size={20} />, label:"Secure & Private", desc:"Your data is encrypted and always safe", color:"text-green-600", bg:"bg-green-50" },
  ]

  const cards1=[
    {
  image: evalImg,
  icon: <BsBarChart size={20} />,
  title: "AI Answer Evaluation",
  desc: "Scores communication, technical accuracy and confidence."
},
{
  image: resumeImg,
  icon: <BsFileEarmarkText size={20} />,
  title: "Resume Based Interview",
  desc: "Project-specific questions based on uploaded resume."
},
{
  image: pdfImg,
  icon: <BsFileEarmarkText size={20} />,
  title: "Downloadable PDF Report",
  desc: "Detailed strengths, weaknesses and improvement insights."
},
{
  image: analyticsImg,
  icon: <BsBarChart size={20} />,
  title: "History & Analytics",
  desc: "Track progress with performance graphs and topic analysis."
}
  ]

  const card2=[
    {
  img: hrImg,
  title: "HR Interview Mode",
  desc: "Behavioral and communication based evaluation."
},
{
  img: techImg,
  title: "Technical Mode",
  desc: "Deep technical questioning based on selected role."
},
{
  img: confidenceImg,
  title: "Confidence Detection",
  desc: "Basic tone and voice analysis insights."
},
{
  img: creditImg,
  title: "Credits System",
  desc: "Unlock premium interview sessions easily."
}
  ]
  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar />
      <div className='flex-1 px-6 py-20'>
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <motion.div
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}}
            className='text-center md:text-left'
          >
            <div className="flex justify-center md:justify-start mb-6">
              <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
                <IoSparkles size={16} className='text-green-600' />
                AI Powered Smart Interview Platform
              </div>
            </div>

            <h1 className='text-4xl md:text-6xl font-semibold leading-tight'>
              Practice Interview with{" "}
              <span className='relative inline-block' >
                <span className='text-green-600' >
                  AI Intelligence
                </span>
                <svg className="absolute left-0 -bottom-1 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5.5C40 1 100 1 198 5.5" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.8}}
            className='text-gray-500 mt-6 max-w-xl mx-auto md:mx-0 text-lg'>
                  Role-based mock interviews with smart follow-up questions, adaptive difficulty and real-time performance evaluation.
            </motion.p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
              <motion.button
              onClick={() => {
                if(!userData){
                  setShowAuth(true)
                  return ;
                }
                navigate("/interview")
              }}
              initial={{y:-10,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{duration:0.12}}
                whileHover={{y:-4,boxShadow:"0px 10px 20px rgba(0,0,0,0.2)"}}
                whileTap={{y:0,boxShadow:"0px 5px 10px rgba(0,0,0,0.1)"}}
                className='bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition shadow-md flex items-center gap-2'
              >
                <BsRocketTakeoff size={16} />
                Start Interview
              </motion.button>

              <motion.button
              onClick={() => {
                if(!userData){
                  setShowAuth(true)
                  return ;
                }
                navigate("/history")
              }}
              initial={{y:-10,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{duration:0.12}}
                whileHover={{y:-4,boxShadow:"0px 10px 20px rgba(0,0,0,0.2)"}}
                whileTap={{y:0,boxShadow:"0px 5px 10px rgba(0,0,0,0.1)"}}
                className='border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-100 transition flex items-center gap-2'
              >
                <BsClockHistory size={16} />
                View History
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.8}}
            className='flex justify-center'
          >
            <div className="w-full max-w-md aspect-square flex items-center justify-center">
              <img src={laptop} alt="AI Interview" className='w-full h-full object-contain' />
            </div>
          </motion.div>
        </div>

          <div className="flex justify-center mb-4">
            <div className="bg-green-50 text-green-600 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 tracking-wider">
              <IoSparkles size={14} />
              HOW IT WORKS
            </div>
          </div>
          <h2 className='text-3xl md:text-4xl font-semibold text-center mb-16'>
            Your Journey to Interview <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Success</span>
          </h2>

          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0 mb-6">

            {parts.map((item,index) => (
              <Fragment key={index}>
              <motion.div
              initial={{opacity:0,y:20}}
              whileInView={{opacity:1,y:0}}
              viewport={{ once: true, amount: 0.2 }}
              transition={{duration:0.5+index*0.15}}
              whileHover={{y:-6}}
              className='relative flex-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300' >

                <div className='flex items-center justify-between mb-4'>
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full blur-md opacity-50 ${glowColors[index % glowColors.length]}`}></div>
                    <div className={`relative w-11 h-11 rounded-full flex items-center justify-center shadow-sm ${stepColors[index % stepColors.length]}`}>
                      {item.icon}
                    </div>
                  </div>
                  <span className='text-xs text-gray-300 font-semibold'>{String(index+1).padStart(2,"0")}</span>
                </div>
                <div className={`text-xs font-semibold mb-1.5 tracking-wider ${stepTextColors[index % stepTextColors.length]}`}>{item.step}</div>
                <h3 className='font-semibold mb-1.5 text-lg' >{item.title} </h3>
                <p className='text-sm text-gray-500 leading-relaxed' >
                  {item.desc}
                </p>
                </motion.div>

                {index < parts.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-10 shrink-0 mt-[3.25rem]">
                    <svg width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0" y1="7" x2="22" y2="7" stroke="#86efac" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                      <path d="M20 2L26 7L20 12" stroke="#86efac" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-7 mb-28 shadow-sm">
            {trustBadges.map((badge,index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${badge.bg} ${badge.color}`}>
                  {badge.icon}
                </div>
                <span className='text-sm text-gray-800 font-semibold'>{badge.label}</span>
                <span className='text-xs text-gray-400 leading-relaxed'>{badge.desc}</span>
              </div>
            ))}
          </div>

          <div className="mb-32">
            <div className="flex justify-center mb-4">
              <div className="bg-green-50 text-green-600 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 tracking-wider">
                <IoSparkles size={14} />
                POWERFUL FEATURES
              </div>
            </div>
            <motion.h2
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{ once: true, amount: 0.2 }}
            transition={{duration:0.6}}

            className='text-3xl md:text-4xl font-semibold text-center mb-3'
            >
                Advanced AI {" "}
                <span className='text-green-600' >Capabilities</span>
            </motion.h2>
            <p className='text-gray-500 text-center mb-16'>Smart tools to evaluate, analyze and improve your interview performance.</p>

            <div className="grid md:grid-cols-2 gap-8">
                {cards1.map((item,index) => (
                  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }} 
                  key={index} className='bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'>
                    <div className="flex flex-col md:flex-row items-center gap-8">

                      <div className="w-full md:w-1/2 order-2 md:order-1">
                      <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <h3 className='font-semibold mb-3 text-xl' > 
                        {item.title}
                      </h3>
                      <p className='text-gray-500 text-sm leading-relaxed mb-6' >
                        {item.desc}
                      </p>
                      <button className='w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition'>
                        <BsArrowRight size={16} />
                      </button>
                      </div>

                      <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                      <div className="w-full aspect-[4/3] flex items-center justify-center">
                      <img src={item.image} alt={item.title}
                      className='w-full h-full object-contain'
                      />
                      </div>
                      </div>
                    </div>

                    </motion.div>
                ))}
            </div>
          </div>

          <div className="mb-32">
            <div className="flex justify-center mb-4">
              <div className="bg-green-50 text-green-600 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 tracking-wider">
                <IoSparkles size={14} />
                FLEXIBLE MODES FOR EVERY GOAL
              </div>
            </div>
            <motion.h2
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{ once: true, amount: 0.2 }}
            transition={{duration:0.6}}

            className='text-3xl md:text-4xl font-semibold text-center mb-3'
            >
                Multiple Interview {" "}
                <span className='text-green-600' >Modes</span>
            </motion.h2>
            <p className='text-gray-500 text-center mb-16'>Choose the perfect interview mode that matches your needs and helps you perform your best.</p>

            <div className="grid md:grid-cols-2 gap-8">
                {card2.map((item,index) => (
                  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y:-6 }} 
                  key={index} className='bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'>
                    <div className="flex flex-col md:flex-row items-center gap-6">

                      <div className="w-full md:w-1/2 order-2 md:order-1">
                      <h3 className='font-semibold mb-3 text-xl' > 
                        {item.title}
                      </h3>
                      <p className='text-gray-500 text-sm leading-relaxed mb-6' >
                        {item.desc}
                      </p>
                      <button className='w-9 h-9 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition'>
                        <BsArrowRight size={16} />
                      </button>
                      </div>

                      <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                      <div className="w-full aspect-[4/3] flex items-center justify-center">
                      <img src={item.img} alt={item.title}
                      className='w-full h-full object-contain'
                      />
                      </div>
                      </div>
                    </div>

                    </motion.div>
                ))}
            </div>
          </div>
      </div>
      </div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)} />}
        <Footer />
    </div>
  );
}

export default Home;