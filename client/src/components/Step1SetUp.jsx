import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
  FaLayerGroup,
  FaChevronDown,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ServerApi } from "../App";
import { setUserData } from "../redux/userSlice";
import laptop from "../assets/images/blue_laptop.png";

function Step1SetUp({ onStart }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const interviewDesc = [
    {
      icon: <FaUserTie className="text-green-600 text-base" />,
      text: "Choose Role & Experience",
      subtitle: "Personalized to your background",
    },
    {
      icon: <FaMicrophoneAlt className="text-green-600 text-base" />,
      text: "Smart Voice Interview",
      subtitle: "AI listens and evaluates",
    },
    {
      icon: <FaChartLine className="text-green-600 text-base" />,
      text: "Performance Analytics",
      subtitle: "Track and improve continuously",
    },
  ];

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    try {
      const result = await axios.post(
        ServerApi + "/api/interview/resume",
        formData,
        { withCredentials: true }
      );

      console.log(result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.error("Error uploading resume:", error);
      setAnalyzing(false);
    }
  };

  const handleStartInterview = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerApi + "/api/interview/generate-questions",
        {
          role,
          experience,
          mode,
          resumeText,
          projects,
          skills,
        },
        { withCredentials: true }
      );
      console.log(result.data);

      if (userData) {
        dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }));
      }

      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.error("Error starting interview:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-10"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-12 flex flex-col justify-center"
        >
          {/* decorative background accents */}
          <div className="pointer-events-none absolute -top-10 -right-16 w-56 h-56 rounded-full border border-green-200/60" />
          <div className="pointer-events-none absolute top-24 right-10 w-3 h-3 rounded-full bg-green-300/60" />
          <div className="pointer-events-none absolute top-40 left-8 w-2 h-2 rounded-full bg-green-300/50" />

          <span className="inline-flex items-center gap-2 w-fit bg-white/70 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold text-green-700 mb-6 shadow-sm">
            <HiSparkles className="text-green-500" />
            AI Powered Interview Practice
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Start Your
            <br />
            <span className="text-green-600 underline decoration-green-300 decoration-4 underline-offset-4">
              AI
            </span>{" "}
            Interview
          </h2>

          <p className="text-gray-600 mb-10 max-w-sm">
            Practice real interview scenarios powered by AI. Improve
            communication, technical skills, and confidence.
          </p>

          {/* illustration + overlapping feature cards */}
          <div className="relative w-full flex items-end justify-end">
            <img
              src={laptop}
              alt="Interview setup illustration"
              className="w-full max-w-xs h-auto object-contain mix-blend-multiply translate-x-6"
            />

            <div className="absolute bottom-16 left-0 space-y-3 z-10">
              {interviewDesc.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 bg-white/90 backdrop-blur p-3 rounded-xl shadow-sm cursor-pointer w-fit min-w-[220px]"
                >
                  <span className="w-9 h-9 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div className="leading-tight">
                    <p className="text-gray-800 font-semibold text-sm">
                      {item.text}
                    </p>
                    <p className="text-gray-400 text-xs">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* spacer so the overlapping cards below have room inside the panel */}
          <div className="h-24" />
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 bg-white flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <HiSparkles />
            </span>
            <h2 className="text-3xl font-bold text-gray-800">
              Set Up Your Interview
            </h2>
          </div>
          <p className="text-gray-500 mb-8">
            Tell us a bit about yourself to{" "}
            <span className="text-green-600 font-medium">personalize</span>{" "}
            your interview experience.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <FaUserTie />
              </span>
              <input
                type="text"
                placeholder="Enter your role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>

            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <FaBriefcase />
              </span>
              <input
                type="text"
                placeholder="Enter your experience (e.g., 3 years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>

            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition relative">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <FaLayerGroup />
              </span>
              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-400">Select Interview Type</span>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-gray-800 font-semibold appearance-none"
                >
                  <option value="Technical">Technical Interview</option>
                  <option value="HR">HR Interview</option>
                </select>
              </div>
              <FaChevronDown className="text-gray-400 text-xs shrink-0" />
            </div>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-green-200 rounded-2xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
              >
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <span className="mx-auto mb-3 w-14 h-14 rounded-full bg-green-50 border border-dashed border-green-300 flex items-center justify-center">
                  <FaFileUpload className="text-green-600 text-xl" />
                </span>

                <p className="text-gray-800 font-semibold">
                  {resumeFile ? resumeFile.name : "Upload your resume (PDF)"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Drag & drop your file here or click to browse
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-5 space-y-4 rounded-xl border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Resume Analysis Complete
                </h3>

                {projects.length > 0 && (
                  <div className="mb-2">
                    <p className="font-medium text-gray-700 mb-1">Projects:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {projects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <p className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-green-50 py-2.5 rounded-full">
              <FaShieldAlt className="text-green-500" />
              Your data is secure and private.
            </p>

            <motion.button
              onClick={handleStartInterview}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white py-3.5 rounded-full text-lg font-semibold transition duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <HiSparkles />
              {loading ? "Starting Interview..." : "Start Interview"}
              <span className="ml-1 w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
                <FaArrowRight className="text-white text-xs" />
              </span>
            </motion.button>

            <div className="flex items-center justify-center gap-3 text-xs text-gray-400 pt-1">
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-green-500" /> AI-Powered
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <HiSparkles className="text-green-500" /> Smart Feedback
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-green-500" /> Real Results
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step1SetUp;