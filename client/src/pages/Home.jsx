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
    BsLock,
    BsCheckCircleFill,
    BsPeopleFill,
    BsCodeSlash,
    BsSoundwave,
    BsWallet2
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
  titleLine1: "AI Answer",
  titleLine2: "Evaluation",
  desc: "AI evaluates your answers in real-time across key parameters.",
  points: ["Communication", "Technical Accuracy", "Confidence Score"],
  accent: "green"
},
{
  image: resumeImg,
  icon: <BsFileEarmarkText size={20} />,
  titleLine1: "Resume Based",
  titleLine2: "Interview",
  desc: "Get highly relevant, project-specific questions based on your resume.",
  points: ["Resume Parsing", "Skill Mapping", "Personalized Questions"],
  accent: "blue"
},
{
  image: pdfImg,
  icon: <BsFileEarmarkText size={20} />,
  titleLine1: "Downloadable",
  titleLine2: "PDF Report",
  desc: "Get a comprehensive report with actionable insights and suggestions.",
  points: ["Strengths & Weaknesses", "Detailed Feedback", "Improvement Tips"],
  accent: "purple"
},
{
  image: analyticsImg,
  icon: <BsBarChart size={20} />,
  titleLine1: "History &",
  titleLine2: "Analytics",
  desc: "Track your progress over time with detailed analytics and insights.",
  points: ["Performance Trends", "Topic Analysis", "Compare & Improve"],
  accent: "orange"
}
  ]

  const accentClasses = {
    green: { iconBg:"bg-green-50", iconText:"text-green-600", title:"text-green-600", check:"text-green-500", btnBg:"bg-green-50", btnText:"text-green-600", btnHover:"hover:bg-green-100", underline:"bg-green-400" },
    blue: { iconBg:"bg-blue-50", iconText:"text-blue-600", title:"text-blue-600", check:"text-blue-500", btnBg:"bg-blue-50", btnText:"text-blue-600", btnHover:"hover:bg-blue-100", underline:"bg-blue-400" },
    purple: { iconBg:"bg-purple-50", iconText:"text-purple-600", title:"text-purple-600", check:"text-purple-500", btnBg:"bg-purple-50", btnText:"text-purple-600", btnHover:"hover:bg-purple-100", underline:"bg-purple-400" },
    orange: { iconBg:"bg-orange-50", iconText:"text-orange-600", title:"text-orange-600", check:"text-orange-500", btnBg:"bg-orange-50", btnText:"text-orange-600", btnHover:"hover:bg-orange-100", underline:"bg-orange-400" },
  }

  const card2=[
    {
  img: hrImg,
  icon: <BsPeopleFill size={20} />,
  titleLine1: "HR",
  titleLine2: "Interview Mode",
  desc: "Behavioral and communication based evaluation to assess your people skills.",
  points: ["Communication Skills", "Behavioral Analysis", "Situational Questions"],
  accent: "green"
},
{
  img: techImg,
  icon: <BsCodeSlash size={20} />,
  titleLine1: "Technical",
  titleLine2: "Mode",
  desc: "Deep technical questioning based on your selected role and expertise.",
  points: ["In-depth Concepts", "Coding & Problem Solving", "Technical Scenarios"],
  accent: "purple"
},
{
  img: confidenceImg,
  icon: <BsSoundwave size={20} />,
  titleLine1: "Confidence",
  titleLine2: "Detection",
  desc: "Analyze your tone and voice to detect confidence and areas of improvement.",
  points: ["Tone & Pitch Analysis", "Speech Clarity", "Confidence Insights"],
  accent: "orange"
},
{
  img: creditImg,
  icon: <BsWallet2 size={20} />,
  titleLine1: "Credits",
  titleLine2: "System",
  desc: "Unlock premium interview sessions and advanced features easily.",
  points: ["Flexible Credit Plans", "Unlock Premium Features", "Secure Transactions"],
  accent: "blue"
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
                {cards1.map((item,index) => {
                  const accent = accentClasses[item.accent]
                  return (
                  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }} 
                  key={index} className='bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all overflow-hidden'>
                    <div className="flex items-center gap-6">

                      <div className="w-1/2 shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${accent.iconBg} ${accent.iconText}`}>
                          {item.icon}
                        </div>
                        <h3 className='font-semibold mb-3 text-xl leading-snug'>
                          {item.titleLine1}
                          <br />
                          <span className={accent.title}>{item.titleLine2}</span>
                        </h3>
                        <p className='text-gray-500 text-sm leading-relaxed mb-5'>
                          {item.desc}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {item.points.map((point, pIndex) => (
                            <li key={pIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <BsCheckCircleFill size={14} className={accent.check} />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-9 h-9 rounded-full flex items-center justify-center transition ${accent.btnBg} ${accent.btnText} ${accent.btnHover}`}>
                          <BsArrowRight size={16} />
                        </button>
                      </div>

                      <div className="w-1/2 flex justify-center">
                        <div className="w-full aspect-square flex items-center justify-center">
                          <img src={item.image} alt={item.titleLine1 + " " + item.titleLine2}
                          className='w-full h-full object-contain'
                          />
                        </div>
                      </div>
                    </div>

                    </motion.div>
                  )
                })}
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

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {card2.map((item,index) => {
                  const accent = accentClasses[item.accent]
                  return (
                  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y:-6 }} 
                  key={index} className='bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all overflow-hidden'>
                    <div className="flex items-center gap-6">

                      <div className="w-1/2 shrink-0">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accent.iconBg} ${accent.iconText}`}>
                          {item.icon}
                        </div>
                        <h3 className='font-semibold mb-2 text-xl leading-snug'>
                          <span className={accent.title}>{item.titleLine1}</span> {item.titleLine2}
                        </h3>
                        <div className={`w-8 h-1 rounded-full mb-3 ${accent.underline}`}></div>
                        <p className='text-gray-500 text-sm leading-relaxed mb-5'>
                          {item.desc}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {item.points.map((point, pIndex) => (
                            <li key={pIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <BsCheckCircleFill size={14} className={accent.check} />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-9 h-9 rounded-full flex items-center justify-center transition ${accent.btnBg} ${accent.btnText} ${accent.btnHover}`}>
                          <BsArrowRight size={16} />
                        </button>
                      </div>

                      <div className="w-1/2 flex justify-center">
                        <div className="w-full aspect-square flex items-center justify-center">
                          <img src={item.img} alt={item.titleLine1 + " " + item.titleLine2}
                          className='w-full h-full object-contain'
                          />
                        </div>
                      </div>
                    </div>

                    </motion.div>
                  )
                })}
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