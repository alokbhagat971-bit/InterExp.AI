import { RiRobot3Fill } from "react-icons/ri";
import { BsShieldCheck } from "react-icons/bs";

function Footer(){

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pb-10 py-4 pt-4">
      <div className="w-full max-w-6xl bg-gradient-to-r from-green-50 via-emerald-50 to-white rounded-[24px] shadow-sm border border-green-100 py-8 px-6 md:px-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-2 rounded-lg">
                <RiRobot3Fill size={16} />
              </div>
              <h2 className='font-semibold' >InterExp.AI</h2>
            </div>
            <p className='text-gray-500 text-sm max-w-xl' >Transform interview anxiety into confidence with personalized AI coaching, realistic mock interviews, and actionable feedback.</p>
          </div>

          <div className="w-12 h-12 rounded-full bg-white border border-green-100 flex items-center justify-center flex-shrink-0">
            <BsShieldCheck className="text-green-600" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;