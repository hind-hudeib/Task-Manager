import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sidbar from "./components/Sidbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<Sidbar />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
