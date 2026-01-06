import "./App.css";
import { Route, Routes,  Navigate } from "react-router-dom";
import Manager from "./pages/Manager/Manager";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Phone from "./components/Phone/Phone";

function App() {
  
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
      <Phone />
      <Footer />
    </>
  );
}

export default App;
