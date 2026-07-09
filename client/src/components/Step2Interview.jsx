import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "framer-motion";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {useRef} from 'react'
import axios from 'axios'
import { ServerApi } from "../App";
import { BsArrowRight } from "react-icons/bs";

function Step2Interview({ interviewData, onFinish }) {
    const {interviewId, questions, userName} = interviewData;

    const [isIntroPhase,setIsIntroPhase] = useState(true);

    const [isMicOn, setIsMicOn] = useState(true);
    const recognitionRef = useRef(null);
    const [isAiPlaying,setIsAiPlaying] = useState(false);

    const [currentIndex,setCurrentIndex] = useState(0);
    const [answer,setAnswer] = useState("");
    const [feedback,setFeedback] = useState("");
    const [timeLeft,setTimeLeft] = useState(
      questions[0]?.timeLimit || 60
    );
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [voiceGender,setVoiceGender] = useState("male");
    const [subtitle,setSubtitle] = useState("");

    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const currentQuestion = questions[currentIndex];

    const videoSource = voiceGender === "male"?maleVideo : femaleVideo;

    // Speaks text using the backend Edge-TTS neural voice endpoint
    const speakText = (text) => {
      return new Promise(async (resolve) => {
        if (!text || !text.trim()) {
          resolve();
          return;
        }

        try {
          setSubtitle(text);

          const response = await axios.post(
            `${ServerApi}/api/interview/tts`,
            { text, gender: voiceGender },
            { responseType: "blob", withCredentials: true }
          );

          const audioUrl = URL.createObjectURL(response.data);
          const audio = new Audio(audioUrl);
          audioRef.current = audio;

          audio.onloadeddata = () => {
            setIsAiPlaying(true);
            stopMic();
            videoRef.current?.play();
          };

          audio.onended = () => {
            videoRef.current?.pause();
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
            setIsAiPlaying(false);

            if (isMicOn) {
              startMic();
            }

            URL.revokeObjectURL(audioUrl);

            setTimeout(() => {
              setSubtitle("");
              resolve();
            }, 300);
          };

          audio.onerror = () => {
            console.error("Audio playback failed");
            setIsAiPlaying(false);
            URL.revokeObjectURL(audioUrl);
            setSubtitle("");
            resolve();
          };

          audio.play();
        } catch (error) {
          console.error("TTS request failed:", error);
          setIsAiPlaying(false);
          setSubtitle("");
          resolve();
        }
      });
    };

    useEffect(() => {
      const runIntro = async () => {
        if(isIntroPhase){
          await speakText(
            `Hi ${userName}, it's great to meet you today. I'm Danny and I hope you're feeling confident and ready.`
          );

          await speakText(
            "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
          );

          setIsIntroPhase(false)
        }else if(currentQuestion){
          await new Promise(r => setTimeout(r, 800));

          if(currentIndex === questions.length-2){
            await speakText("Alright, this one might be a bit more challenging");
          }

          await speakText(currentQuestion.question);

        }
      }

      runIntro()

    },[isIntroPhase, currentIndex])

    useEffect(() => {
      if(isIntroPhase) return ;
      if(!currentQuestion) return ;
      if(isSubmitting) return ;
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if(prev <= 1){
            clearInterval(timer)
            return 0;
          }
          return prev-1;
        })
      },1000);

      return () => clearInterval(timer)
    },[isIntroPhase, currentIndex, isSubmitting])

    useEffect(() => {
      if(!("webkitSpeechRecognition" in window)) return ;

      const recognition = new window.webkitSpeechRecognition();
      recognition.lang="en-US";
      recognition.continuous=true;
      recognition.interimResults=false;

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length -1][0].transcript;

        setAnswer((prev) => prev + " " +transcript);
      };

      recognitionRef.current = recognition;
    },[]);

    const startMic = () => {
      if(recognitionRef.current && !isAiPlaying){

          recognitionRef.current.start();

      }
    };



    const stopMic = () => {
      if(recognitionRef.current && !isAiPlaying){
          recognitionRef.current.stop();

      }
    }

    const toggleMic = () => {
      if(isMicOn){
        stopMic();
      }else startMic();

      setIsMicOn(!isMicOn)
    }

    const handleSubmit = async () => {
      if (isSubmitting) return;
      stopMic();
      setIsSubmitting(true);

      try {
        const url = `${ServerApi}/api/interview/submit-answers`;

        const result = await axios.post(
          url,
          {
            interviewId,
            questionIndex: currentIndex,
            answer,
            timeTaken: currentQuestion.timeLimit - timeLeft,
          },
          { withCredentials: true }
        );

        setFeedback(result.data.feedback);
        speakText(result.data.feedback);
      } catch (error) {
        if (error.response) {
          console.error("Server error:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleNext = async () => {
      setAnswer("");
      setFeedback("");

      if(currentIndex+1 >= questions.length){
        finishInterview();
        return ;
      }

      await speakText("Alright, let's move to the next question.");

      setCurrentIndex(currentIndex+1);
      setTimeout(() => {
        if(isMicOn) startMic();
      },500);
    }

    const finishInterview = async () => {
      stopMic()
      setIsMicOn(false)
      try{
        const result = await axios.post(ServerApi+"/api/interview/finish", {interviewId}, {withCredentials:true})
        onFinish(result.data);
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      if(isIntroPhase) return ;
      if(!currentQuestion) return ;

      if(timeLeft===0 && !isSubmitting && !feedback) handleSubmit();
    },[timeLeft]);

    useEffect(() => {
      return () => {
        if(recognitionRef.current){
          recognitionRef.current.stop();
          recognitionRef.current.abort();
        }

        if(audioRef.current){
          audioRef.current.pause();
          audioRef.current.src = "";
        }
      }
    },[]);

    useEffect(() => {
      if (currentQuestion) {
        setTimeLeft(currentQuestion.timeLimit || 60);
      }
    }, [currentIndex]);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex  items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover
          "
            />
          </div>

          {subtitle && (
            <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm'>
              <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>
                {subtitle}
              </p>
              </div>
          )}

          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interview Status</span>
              {isAiPlaying && <span className="text-sm font-semibold text-emerald-600">
                {isAiPlaying ? "AI Speaking" : ""}
              </span>}
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex justify-center ">
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60}  />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-emerald-600">{currentIndex+1}</span>
                <span className="text-xs text-gray-400">Current Questions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-emerald-600">{questions.length} </span>
                <span className="text-xs text-gray-400">Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Smart Interview
          </h2>
          {!isIntroPhase && (<div className='relative mb-6 bg-gray-50 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
            <p className='text-xs sm:text-sm text-gray-400 mb-2'>
              Question {currentIndex+1} to {questions.length}
            </p>
            <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>{currentQuestion?.question}</div>
          </div>)
          }

          <textarea
          placeholder="Type your answer here..."
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          className='flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-500'
          />

          {!feedback ? (
            <div className='flex items-center gap-4 mt-6'>
              <motion.button
              onClick={toggleMic}
              whileTap={{scale:0.9}}
              className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'
              >
                {isMicOn?<FaMicrophone size={20} /> : <FaMicrophoneSlash size={20}/>}
              </motion.button>

              <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileTap={{scale:0.95}}
              className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:p-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500'

              >
                {isSubmitting?"Submitting...":"Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
            className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'
            >
              <p className='text-emerald-700 font-medium mb-4'>
                 {feedback}
              </p>
              <button
              onClick={handleNext}
              className='w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'>
              Next Question <BsArrowRight />
              </button>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step2Interview;