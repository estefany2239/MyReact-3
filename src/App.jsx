//import { useState } from 'react';
//import './shared/styles/App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
//components layout
import { Header } from './features/layout/components/Header';
import { Footer } from './features/layout/components/Footer';
import { Content } from './features/layout/components/Content';
//components auth
import { Myaccount } from './features/auth/components/Myaccount';
import { Mybuys } from './features/auth/components/Mybuys';
import  Myfavorites  from './features/auth/components/Myfavorites';
import Mycart from './features/auth/components/Mycart';
//components articles
import  Articles  from './features/articles/components/Articles';
import { Offers } from './features/articles/components/Offers'
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Content/>}></Route>
            <Route path="/Articles" element={<Articles />} />
            <Route path="/Offers" element={<Offers />}></Route>
            <Route path="/Myaccount" element={<Myaccount />}></Route>
            <Route path="/Mybuys" element={<Mybuys />}></Route>
            <Route path="/Myfavorites" element={<Myfavorites />}></Route>
            <Route path="/Mycart" element={<Mycart />}></Route>
            
          </Routes>
        <Footer />
      </BrowserRouter>   
    </>
  );
}

export default App;