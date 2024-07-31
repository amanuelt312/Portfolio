import { useState } from "react";

import "./App.css";
import AnimatedCursor from "react-animated-cursor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import { Contact } from "./pages/Contact";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      
      <Background></Background>
      <div className="content">
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
