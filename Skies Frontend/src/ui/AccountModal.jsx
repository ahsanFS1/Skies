import { useContext } from "react";
import { UserContext } from "../UserContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function AccountModal({ toggleModal }) {
  const context = useContext(UserContext);
  const { userName, email, plan,setUserName,setEmail,setPlan } = context || {};
const navigate = useNavigate()
  const userInitial = userName?.[0]?.toUpperCase() || "U";
  const handleLogout = ()=>{
    setUserName('')
    setEmail('')
    setPlan('')
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('plan');
    navigate('/login')
  
  }
  const planColors = {
    "basic": "bg-gray-200 text-gray-800",
    "starter": "bg-green-200 text-green-800",
    "premium": "bg-blue-200 text-blue-800",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={toggleModal}
          aria-label="Close"
        >
          &times;
        </button>

        <section className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-4xl shadow-inner">
            {userInitial}
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">Account Info</h2>

          <p className="text-gray-700">
            <span className="font-medium">Username:</span> {userName || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {email || "N/A"}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <span className="font-medium">Plan:</span>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                planColors[plan] || "bg-gray-100 text-gray-600"
              }`}
            >
              {plan?.[0]?.toUpperCase()+plan?.slice(1,plan?.length) || "N/A"}
            </span>
          </p>
           <p className="text-gray-700 flex items-center gap-2">
<Button onClick={handleLogout} className="bg-red-500 text-white cursor-pointer rounded-lg p-2">Logout</Button>
            
          </p>
        </section>
      </div>
    </div>
  );
}
