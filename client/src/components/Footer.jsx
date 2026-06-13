import { RiRobot3Fill } from "react-icons/ri";

function Footer(){

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pb-10 py-4 pt-10">
      <div className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-8 px-3 text-center">

        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="bg-black text-white p-2 rounded-lg">
            <RiRobot3Fill size={16} />
          </div>
          <h2 className='font-semibold' >InterExp.AI</h2>
        </div>
        <p className='text-gray-500 text-sm max-w-xl mx-auto' >Transform interview anxiety into confidence with personalized AI coaching, realistic mock interviews, and actionable feedback.</p>
      </div>
    </div>
  );
}

export default Footer;