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
      <AnimatedCursor
        innerSize={15}
        outerSize={8}
        color="111, 66, 201"
        outerAlpha={0.2}
        innerScale={0.7}
        outerStyle={{
          border: "3px solid rgb(111, 66, 201)",
        }}
        innerStyle={{
          backgroundColor: "rgb(111, 66, 201)",
        }}
        outerScale={5}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />
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
