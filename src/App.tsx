import React from 'react';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {Outlet} from 'react-router-dom'


function App() {
  return (
    <>
      <Header/>
      <Main>
        <Outlet/>
      </Main>
      <Footer/>
    </>
  );
}

export default App;
