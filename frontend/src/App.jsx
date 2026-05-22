import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Phone from "./components/Phone/Phone";

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <Phone />
      <Footer />
    </>
  );
}

export default App;
