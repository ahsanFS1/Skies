//Skies.jsx
import React, { use, useEffect,useState } from 'react';
import './Skies.css';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../../../UserContext';




const Login = () => {
  const navigate = useNavigate();
  const context = use(UserContext)
  useEffect(() => {
    const rainContainer = document.getElementById('rain');
    if (!rainContainer) return;

    const rainCount = 100;
    for (let i = 0; i < rainCount; i++) {
      const drop = document.createElement('div');
      drop.classList.add('drop');
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.height = Math.random() * 20 + 10 + 'px';
      drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      rainContainer.appendChild(drop);
    }

    const flash = document.getElementById('lightning-flash');

    const lightningInterval = setInterval(() => {
      const chance = Math.random();
      if (chance < 0.3 && flash) {
        flash.classList.add('flash');
        setTimeout(() => flash.classList.remove('flash'), 200);
      }
    }, 3000); 

    return () => clearInterval(lightningInterval); 
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{

    
    const response = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email,password})
      
      
    })
    console.log(response.userName)
    if(response.ok)
      {
        console.log(response)
        const data = await response.json()
        console.log(data)
        const {setEmail,setUserName} = context;
        setEmail(email)
        setUserName(data.userName)
        navigate("/subscribe")
      }
      else{
       toast.error("Incorrect Password, or Email");
      }

  }catch(err){
    console.log("Error: ",err);
  }


  }


  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
  return (
    <>
      <Toaster position="top-right"></Toaster>
       <div className="body-background">
      <div id="lightning-flash"></div>
      <div className="rain" id="rain"></div>
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>

      <div className="container">
        <div className="header">
          <h1>Skies</h1>
          <p>Where the weather is just right.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" onChangeCapture={(e)=>{setEmail(e.target.value)}} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" onChangeCapture={(e)=>{setPassword(e.target.value)}} required />
          </div>
          <button type="submit" className="btn">Sign In</button>
        </form>

        <div className="footer-links">
          <a href="/signup">Create Account</a>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
