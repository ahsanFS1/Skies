import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Cloud, AlertTriangle, User, Rocket } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { use } from "react";
import AccountModal from "./AccountModal";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const context = use(UserContext)
  const { userName, email,plan } = context;
  console.log(context)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get the initial (first letter) of the userName, fallback to "U"
  const userInitial = userName && userName.length > 0 ? userName[0].toUpperCase() : "U";
  const toggleModal=()=>
  {
    setShowModal((showModal)=>(!showModal))
  }
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Cloud className="w-8 h-8 text-blue-400 animate-float" />
            <a href="/" className="cursor-pointer">
            <span className="ml-2 text-2xl font-bold text-white">Skies</span></a>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              className="px-4 cursor-pointer py-2 bg-gradient-to-l from-blue-600 to-blue-300 text-white rounded-lg
                         transition-all duration-300 flex items-center gap-2"
              onClick={() => navigate('/weather')}
            >
              <Cloud className="w-4 h-4" />
              Forecast
            </Button>
            {context.plan == "premium"&&(
                <Button
              className="px-4 cursor-pointer py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg
                         transition-all duration-300 flex items-center gap-2"
              onClick={()=>navigate("/ai")}
            >
              <Rocket className="w-4 h-4" />
              AI Insights
            </Button>
            )}
          
            {/* User Initial Button */}
            <button
              className="w-10 h-10 cursor-pointer rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg hover:bg-blue-700 transition-all"
              onClick={()=>toggleModal()}
              title="User Details"
            >
              {userInitial}
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
       <AccountModal toggleModal={toggleModal}/>
     
      )}
    </nav>
  );
}