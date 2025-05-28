import React, { use, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Hero from "./Hero";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const user = use(UserContext);
  console.log("UserPlan", user.plan);
  useEffect(() => {
    if (user.email == "") {
      navigate("/login");
    } else if (user.plan === "") {
      navigate("/subscribe");
    } else {
      return;
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-900">
       <NavBar/>
      <Hero />
    </div>
  );
}
