import "./App.css";
import { Route, Routes,  Navigate } from "react-router-dom";
import JobRequest from "./pages/JobRequest/JobRequest";
import Manager from "./pages/Manager/Manager";
import Reviews from "./pages/Reviews/Reviews";
import ViewJobs from "./pages/ViewJobs/ViewJobs";
import Home from "./pages/Home";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobrequest" element={<JobRequest />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
      </Routes>
    </>
  );
}

export default App;
