import React, { useState, useEffect } from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome To NutShell!</h1>
      <div id="logoContainer">
        <img id="pageLogo" src="https://i.ibb.co/YyFxsT6/nutshell-logo.png" alt=""/>
        <button id="logoutButton" className="">Log Out</button>
      </div>
    </div>
  )
}

export default Home;