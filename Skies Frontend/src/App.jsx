import { useState } from "react";
import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherPage from "./components/WeatherPage/WeatherPage";
import Login from "./components/Login/Signup/Login";
import Signup from "./components/Login/Signup/Signup";
import { UserProvider } from "./UserContext";
import SubscriptionPortal from "./components/SubscriptionPortal/SubscriptionPortal";
import WeatherInsights from "./components/WeatherInsights";
import NavBar from "./ui/NavBar";
export default function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/subscribe" element = {<SubscriptionPortal/>}></Route>
            <Route path="/ai" element = {<WeatherInsights/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
