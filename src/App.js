import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout"
import Home from "./pages/Home"
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import WorkoutScreen from './pages/WorkoutScreen';
import WorkoutStopScreen from './pages/WorkoutStopScreen';

function App() {
  return (
    <>
    <p style={{textAlign: 'center', color: 'black'}}>Plus Fitness App</p>
    <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="workout" element={<WorkoutScreen />} />
        <Route path="workoutstop" element={<WorkoutStopScreen />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </HashRouter>
  
    </>
  )
}

export default App;
